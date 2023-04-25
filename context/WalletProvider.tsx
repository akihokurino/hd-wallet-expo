// 順番が大事（shimsより前）
import "react-native-get-random-values";
// 順番が大事（ethersより前）
import "@ethersproject/shims";

import { ethers, Wallet } from "ethers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, InteractionManager, View } from "react-native";
import {
  AccountListStorage,
  ExternalAccountListStorage,
  PrimaryAccountStorage,
} from "../infra/AccountStorage";
import { MnemonicsStorage } from "../infra/MnemonicsStorage";
import { WalletStorage } from "../infra/WalletStorage";
import { Account } from "../model/Account";

interface Props {
  children: ReactNode;
}

interface WalletContextValue {
  isLoading: boolean;
  accounts: Account[];
  primaryAccount?: Account;
  balance: string;
  addChildAccount: () => Promise<void>;
  importAccount: (privateKey: string) => Promise<void>;
  restoreWallet: (mnemonics: string) => Promise<void>;
  changeAccount: (account: Account) => Promise<void>;
  getBalance: (account: Account) => Promise<void>;
  sendEther: (ether: string, to: string) => Promise<void>;
  exportMnemonics: () => Promise<string>;
  exportPrivateKey: () => Promise<string>;
  reset: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue>({
  isLoading: false,
  accounts: [],
  primaryAccount: undefined,
  balance: "",
  addChildAccount: async () => {},
  importAccount: async () => {},
  restoreWallet: async () => {},
  changeAccount: async () => {},
  getBalance: async () => {},
  sendEther: async () => {},
  exportMnemonics: async () => {
    return "";
  },
  exportPrivateKey: async () => {
    return "";
  },
  reset: async () => {},
});

const password = "mypassword";
const mumbaiRpcUrl = "https://rpc-mumbai.maticvigil.com";

export const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [primaryAccount, setPrimaryAccount] = useState<Account | undefined>(
    undefined
  );
  const [balance, setBalance] = useState<string>("");

  const init = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const mnemonics = await MnemonicsStorage.getItem();

      if (mnemonics) {
        const account = (await PrimaryAccountStorage.getItem())!;
        const wallet = await ethers.Wallet.fromEncryptedJson(
          (await WalletStorage.getItem(account.address))!,
          password
        );

        setWallet(wallet);
        setAccounts(await getAllAccounts());
        setPrimaryAccount(account);

        await getBalance(account);
      } else {
        const wallet = ethers.Wallet.createRandom();
        const account: Account = {
          address: wallet.address,
          name: "Account1",
          fromMnemonics: true,
          createdAt: new Date(),
        };

        await MnemonicsStorage.setItem(wallet.mnemonic!.phrase);
        await WalletStorage.setItem(
          wallet.address,
          await wallet.encrypt(password)
        );
        await AccountListStorage.setItem([account]);
        await PrimaryAccountStorage.setItem(account);

        setWallet(wallet);
        setAccounts(await getAllAccounts());
        setPrimaryAccount(account);

        await getBalance(account);
      }
    } catch (err: any) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllAccounts = async (): Promise<Account[]> => {
    const internalAccounts = (await AccountListStorage.getItem()) ?? [];
    const externalAccounts = (await ExternalAccountListStorage.getItem()) ?? [];
    const all = internalAccounts.concat(externalAccounts);
    // const sorted = all.sort((a, b) => {
    //   return a.createdAt.getTime() - b.createdAt.getTime();
    // });
    return all;
  };

  const addChildAccount = async (): Promise<void> => {
    setIsLoading(true);

    try {
      let accounts = (await AccountListStorage.getItem())!;
      const mnemonics = (await MnemonicsStorage.getItem())!;
      const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonics);
      const walletHDNode = hdNode.derivePath(
        `m/44'/60'/0'/0/${accounts.length}`
      );
      const wallet = new ethers.Wallet(walletHDNode.privateKey);
      const account: Account = {
        address: wallet.address,
        name: `Account${(await getAllAccounts()).length + 1}`,
        fromMnemonics: true,
        createdAt: new Date(),
      };
      accounts.push(account);

      await WalletStorage.setItem(
        wallet.address,
        await wallet.encrypt(password)
      );
      await AccountListStorage.setItem(accounts);
      await PrimaryAccountStorage.setItem(account);

      setWallet(wallet);
      setAccounts(await getAllAccounts());
      setPrimaryAccount(account);

      await getBalance(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const importAccount = async (privateKey: string): Promise<void> => {
    setIsLoading(true);

    try {
      let accounts = (await ExternalAccountListStorage.getItem()) ?? [];
      const wallet = new ethers.Wallet(privateKey);
      const account: Account = {
        address: wallet.address,
        name: `Account${(await getAllAccounts()).length + 1}`,
        fromMnemonics: false,
        createdAt: new Date(),
      };
      accounts.push(account);

      await WalletStorage.setItem(
        wallet.address,
        await wallet.encrypt(password)
      );
      await ExternalAccountListStorage.setItem(accounts);
      await PrimaryAccountStorage.setItem(account);

      setWallet(wallet);
      setAccounts(await getAllAccounts());
      setPrimaryAccount(account);

      await getBalance(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreWallet = async (mnemonics: string): Promise<void> => {
    setIsLoading(true);

    try {
      await MnemonicsStorage.removeItem();
      const accounts = await getAllAccounts();
      for (let i in accounts) {
        await WalletStorage.removeItem(accounts[i].address);
      }
      await AccountListStorage.removeItem();
      await ExternalAccountListStorage.removeItem();
      await PrimaryAccountStorage.removeItem();

      const wallet = await ethers.Wallet.fromMnemonic(mnemonics);
      const account: Account = {
        address: wallet.address,
        name: "Account1",
        fromMnemonics: true,
        createdAt: new Date(),
      };

      await MnemonicsStorage.setItem(wallet.mnemonic!.phrase);
      await WalletStorage.setItem(
        wallet.address,
        await wallet.encrypt(password)
      );
      await AccountListStorage.setItem([account]);
      await PrimaryAccountStorage.setItem(account);

      setWallet(wallet);
      setAccounts(await getAllAccounts());
      setPrimaryAccount(account);

      await getBalance(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const changeAccount = async (account: Account): Promise<void> => {
    setIsLoading(true);

    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(
        (await WalletStorage.getItem(account.address))!,
        password
      );
      await PrimaryAccountStorage.setItem(account);

      setWallet(wallet);
      setPrimaryAccount(account);

      await getBalance(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async (account: Account): Promise<void> => {
    setIsLoading(true);

    try {
      // const provider = new ethers.providers.InfuraProvider(
      //   "mumbai",
      //   Constants.manifest!.extra!.infuraKey
      // );
      const provider = new ethers.providers.JsonRpcProvider(mumbaiRpcUrl);
      const balance = await provider.getBalance(account.address);
      const ether = ethers.utils.formatEther(balance);

      setBalance(parseFloat(ether).toFixed(6));
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEther = async (ether: string, to: string): Promise<void> => {
    if (!wallet || !primaryAccount) {
      return;
    }

    setIsLoading(true);

    try {
      // const provider = new ethers.providers.InfuraProvider(
      //   "mumbai",
      //   Constants.manifest!.extra!.infuraKey
      // );
      const provider = new ethers.providers.JsonRpcProvider(mumbaiRpcUrl);
      const tx = await wallet.connect(provider).sendTransaction({
        to,
        value: ethers.utils.parseEther(ether),
      });
      console.log(`transaction hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`transaction was mined in block ${receipt.blockNumber}`);

      await getBalance(primaryAccount);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const exportMnemonics = async (): Promise<string> => {
    const mnemonics = await MnemonicsStorage.getItem();
    return mnemonics ?? "";
  };

  const exportPrivateKey = async (): Promise<string> => {
    if (!wallet) {
      return "";
    }

    return wallet.privateKey;
  };

  const reset = async (): Promise<void> => {
    await MnemonicsStorage.removeItem();
    const accounts = await getAllAccounts();
    for (let i in accounts) {
      await WalletStorage.removeItem(accounts[i].address);
    }
    await AccountListStorage.removeItem();
    await ExternalAccountListStorage.removeItem();
    await PrimaryAccountStorage.removeItem();

    setWallet(undefined);
    setAccounts([]);
    setPrimaryAccount(undefined);

    await init();
  };

  useEffect(() => {
    async function initialize() {
      InteractionManager.runAfterInteractions(() => {
        init();
      });
    }

    initialize();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isLoading,
        restoreWallet,
        addChildAccount,
        importAccount,
        primaryAccount,
        accounts,
        balance,
        changeAccount,
        getBalance,
        sendEther,
        exportMnemonics,
        exportPrivateKey,
        reset,
      }}
    >
      {children}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};

export default WalletContext;

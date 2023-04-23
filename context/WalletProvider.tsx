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
import { AccountStorage } from "../infra/AccountStorage";
import { MnemonicsStorage } from "../infra/MnemonicsStorage";
import { WalletStorage } from "../infra/WalletStorage";
import { Account } from "../model/Account";

interface Props {
  children: ReactNode;
}

interface WalletContextValue {
  isLoading: boolean;
  addChildWallet: () => Promise<void>;
  restoreWallet: (mnemonics: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextValue>({
  isLoading: false,
  addChildWallet: async () => {},
  restoreWallet: async (mnemonics: string) => {},
});

const password = "mypassword";

export const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [mnemonics, setMnemonics] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  const init = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const mnemonics = await MnemonicsStorage.getItem();

      if (mnemonics) {
        const accounts = await AccountStorage.getItem();
        const account = accounts![0];
        const wallet = await ethers.Wallet.fromEncryptedJson(
          (await WalletStorage.getItem(account.address))!,
          password
        );

        setWallet(wallet);
        setAccount(account);
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
        await AccountStorage.setItem([account]);

        setWallet(wallet);
        setAccount(account);
      }
    } catch (err: any) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addChild = async (): Promise<void> => {
    setIsLoading(true);

    try {
      let accounts = (await AccountStorage.getItem())!;
      const mnemonics = (await MnemonicsStorage.getItem())!;
      const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonics);
      const walletHDNode = hdNode.derivePath(
        `m/44'/60'/0'/0/${accounts.length}`
      );
      const wallet = new ethers.Wallet(walletHDNode.privateKey);

      const account: Account = {
        address: wallet.address,
        name: `Account${accounts.length + 1}`,
        fromMnemonics: true,
        createdAt: new Date(),
      };
      accounts.push(account);

      await WalletStorage.setItem(
        wallet.address,
        await wallet.encrypt(password)
      );
      await AccountStorage.setItem(accounts);

      setWallet(wallet);
      setAccount(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const restore = async (mnemonics: string): Promise<void> => {
    setIsLoading(true);

    try {
      await MnemonicsStorage.removeItem();
      const accounts = (await AccountStorage.getItem())!;
      for (let i in accounts) {
        await WalletStorage.removeItem(accounts[i].address);
      }
      await AccountStorage.removeItem();

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
      await AccountStorage.setItem([account]);

      setWallet(wallet);
      setAccount(account);
    } catch (err) {
      console.error(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
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
      value={{ isLoading, restoreWallet: restore, addChildWallet: addChild }}
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

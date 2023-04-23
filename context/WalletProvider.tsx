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
import { BIP32KeystoreStorage } from "../infra/KeystoreStorage";
import { Account } from "../model/Account";

interface Props {
  children: ReactNode;
}

interface WalletContextValue {
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextValue>({
  isLoading: false,
});

export const useWallet = () => {
  return useContext(WalletContext);
};

const password = "mypassword";

export const WalletProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [mnemonics, setMnemonics] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  const init = async (): Promise<void> => {
    const keystore = await BIP32KeystoreStorage.getItem();
    if (keystore) {
      const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
      const accounts = await AccountStorage.getItem();
      setWallet(wallet);
      setMnemonics(wallet.mnemonic!.phrase);
      setAccount(accounts![0]);
    } else {
      const wallet = ethers.Wallet.createRandom();
      const account: Account = {
        address: wallet.address,
        name: "Account1",
        fromMnemonics: false,
        createdAt: new Date(),
      };
      await BIP32KeystoreStorage.setItem(await wallet.encrypt(password));
      await AccountStorage.setItem([account]);
      setWallet(wallet);
      setMnemonics(wallet.mnemonic!.phrase);
      setAccount(account);
    }
  };

  useEffect(() => {
    async function initialize() {
      InteractionManager.runAfterInteractions(async () => {
        setIsLoading(true);
        await init();
        setIsLoading(false);
      });
    }

    initialize();
  }, []);

  return (
    <WalletContext.Provider value={{ isLoading }}>
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

export default WalletContext;

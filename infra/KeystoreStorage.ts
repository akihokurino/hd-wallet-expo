// セキュリティは気にせずに永続化をする
import AsyncStorage from "@react-native-async-storage/async-storage";

export class BIP32KeystoreStorage {
  static key: string = "bip32-keystore";

  static getItem = async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(this.key);
      return value;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  static setItem = async (value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(this.key, value);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  static removeItem = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };
}

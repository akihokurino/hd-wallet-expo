// セキュリティは気にせずに永続化をする
import AsyncStorage from "@react-native-async-storage/async-storage";

export class WalletStorage {
  static key: string = "wallet";

  static getItem = async (address: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(`${this.key}-${address}`);
      return value;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  static setItem = async (address: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(`${this.key}-${address}`, value);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  static removeItem = async (address: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(`${this.key}-${address}`);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };
}

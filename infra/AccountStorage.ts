// セキュリティは気にせずに永続化をする
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Account } from "../model/Account";

export class AccountStorage {
  static key: string = "accounts";

  static getItem = async (): Promise<Account[] | null> => {
    try {
      const value = await AsyncStorage.getItem(this.key);
      if (value) {
        const items: Account[] = JSON.parse(value);
        return items;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  static setItem = async (items: Account[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(items));
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

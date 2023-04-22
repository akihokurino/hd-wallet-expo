import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PrimaryColor } from "../Colors";
import { SendEtherScreen } from "./SendEther";
import { WalletScreen } from "./Wallet";

type WalletStackParam = {
  Wallet: { showActionSheet?: boolean };
  SendEther: undefined;
};

export type WalletRouteProp = RouteProp<WalletStackParam, "Wallet">;
export type WalletNavigationProp = StackNavigationProp<
  WalletStackParam,
  "Wallet"
>;

export type SendEtherNavigationProp = StackNavigationProp<
  WalletStackParam,
  "SendEther"
>;

const Stack = createStackNavigator<WalletStackParam>();

export const WalletStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }) => ({
          title: "Mumbai Network",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.setParams({ showActionSheet: true });
              }}
              style={styles.menuButton}
            >
              <AntDesign name="ellipsis1" size={24} color={PrimaryColor} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SendEther"
        component={SendEtherScreen}
        options={({ route }) => ({
          title: "",
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 20,
  },
});

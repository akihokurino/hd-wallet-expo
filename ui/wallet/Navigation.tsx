import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { SendEtherScreen } from "./SendEther";
import { WalletScreen } from "./Wallet";

type WalletStackParam = {
  Wallet: undefined;
  SendEther: undefined;
};

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
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="SendEther" component={SendEtherScreen} />
    </Stack.Navigator>
  );
};

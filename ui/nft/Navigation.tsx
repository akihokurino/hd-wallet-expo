import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { NftListScreen } from "./NftList";

type NftStackParam = {
  NftList: undefined;
};

export type NftNavigationProp = StackNavigationProp<NftStackParam, "NftList">;

const Stack = createStackNavigator<NftStackParam>();

export const NftStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NftList"
        component={NftListScreen}
        options={({ route }) => ({
          title: "NFT",
        })}
      />
    </Stack.Navigator>
  );
};

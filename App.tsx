import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { LoadingProvider } from "./context/LoadingProvider";
import { WalletProvider } from "./context/WalletProvider";
import { NftStackNavigator } from "./ui/nft/Navigation";
import { WalletStackNavigator } from "./ui/wallet/Navigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <LoadingProvider>
      <WalletProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="wallet"
              component={WalletStackNavigator}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? "wallet" : "wallet"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="nft"
              component={NftStackNavigator}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? "grid" : "grid"}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </WalletProvider>
    </LoadingProvider>
  );
}

import { StyleSheet, Text, View } from "react-native";
import { PrimaryColor } from "../Colors";
import { IconButton } from "../components/IconButton";
import { WalletNavigationProp } from "./Navigation";

interface Props {
  navigation: WalletNavigationProp;
}

export const WalletScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.accountText}>Account1</Text>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>10 Ether</Text>
      </View>
      <Text style={styles.addressText}>
        0x1341048E3d37046Ca18A09EFB154Ea9771744f41
      </Text>
      <View style={styles.buttons}>
        <IconButton
          icon={"arrowdown"}
          text={"Receive"}
          handlePress={() => {}}
        />
        <IconButton
          icon={"arrowup"}
          text={"Send"}
          handlePress={() => {
            navigation.navigate("SendEther");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  accountText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  balance: {
    backgroundColor: PrimaryColor,
    maxWidth: "100%",
    height: 60,
    marginTop: 20,
    borderRadius: 4,
  },
  balanceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 60,
  },
  addressText: {
    color: "#000",
    fontWeight: "normal",
    fontSize: 12,
    width: "100%",
    textAlign: "center",
    marginTop: 40,
  },
  buttons: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
});

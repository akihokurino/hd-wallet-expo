import { Button, StyleSheet, Text, View } from "react-native";
import { WalletNavigationProp } from "./Navigation";

interface Props {
  navigation: WalletNavigationProp;
}

export const WalletScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.account}>Account1</Text>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>10 Ether</Text>
      </View>
      <Button
        title="Go to First Details"
        onPress={() => navigation.navigate("SendEther")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  balance: {
    backgroundColor: "#3078F2",
    maxWidth: "100%",
    height: 60,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 4,
  },
  balanceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 60,
  },
});

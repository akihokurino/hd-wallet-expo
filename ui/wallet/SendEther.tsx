import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useWallet } from "../../context/WalletProvider";
import { ActionButton } from "../components/ActionButton";
import { TextField } from "../components/TextField";
import { SendEtherNavigationProp } from "./Navigation";

interface Props {
  navigation: SendEtherNavigationProp;
}

export const SendEtherScreen: React.FC<Props> = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const [toAddress, setToAddress] = useState<string>("");
  const [ether, setEther] = useState<string>("");
  const { primaryAccount, balance, sendEther } = useWallet();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>From:</Text>
        <View>
          <Text style={styles.accountText}>{primaryAccount?.name}</Text>
          <Text>Balance: {balance} Matic</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>To:</Text>
        <TextField
          width={screenWidth - 30 - 80}
          keyboard="email-address"
          placeholder={"0x00.."}
          onChangeText={(text) => {
            setToAddress(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount:</Text>
        <TextField
          width={screenWidth - 30 - 80}
          keyboard="decimal-pad"
          placeholder={"0.1"}
          onChangeText={(text) => {
            setEther(text);
          }}
        />
      </View>

      <View style={{ flex: 1 }} />

      <ActionButton
        width={screenWidth - 30}
        text="Send"
        handlePress={async () => {
          await sendEther(ether, toAddress);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    width: 80,
    fontWeight: "bold",
  },
  accountText: {
    marginBottom: 5,
  },
});

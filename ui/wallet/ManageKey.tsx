import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWallet } from "../../context/WalletProvider";
import { ActionButton } from "../components/ActionButton";
import { TextField } from "../components/TextField";

interface Props {
  dismiss: () => void;
}

export const ManageKey: React.FC<Props> = ({ dismiss }) => {
  const screenWidth = Dimensions.get("window").width;
  const [privateKey, setPrivateKey] = useState<string>("");
  const [mnemonics, setMnemonics] = useState<string>("");
  const { addChildAccount, importAccount, restoreWallet } = useWallet();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{ marginTop: 40 }} />

        <Text style={styles.descriptionText}>
          Generate a private key. The generated private key is stored in the
          app.
        </Text>
        <View style={{ marginTop: 10 }} />
        <ActionButton
          width={screenWidth - 30}
          text={"Generate"}
          handlePress={() => {
            addChildAccount();
            dismiss();
          }}
        />

        <View style={{ marginTop: 40 }} />

        <Text style={styles.descriptionText}>
          Import your private key. The imported private key is stored in the
          app.
        </Text>
        <View style={{ marginTop: 10 }} />
        <TextField
          width={screenWidth - 30}
          keyboard="email-address"
          placeholder={"private key..."}
          onChangeText={(text) => {
            setPrivateKey(text);
          }}
        />
        <View style={{ marginTop: 10 }} />
        <ActionButton
          width={screenWidth - 30}
          text={"Import"}
          handlePress={() => {
            importAccount(privateKey);
            dismiss();
          }}
        />

        <View style={{ marginTop: 40 }} />

        <Text style={styles.descriptionText}>
          Recover private key from mnemonic.
        </Text>
        <View style={{ marginTop: 10 }} />
        <TextField
          width={screenWidth - 30}
          keyboard="email-address"
          placeholder={"patrol moment olive ..."}
          onChangeText={(text) => {
            setMnemonics(text);
          }}
        />
        <View style={{ marginTop: 10 }} />
        <ActionButton
          width={screenWidth - 30}
          text={"Restore"}
          actionType="alert"
          handlePress={() => {
            restoreWallet(mnemonics);
            dismiss();
          }}
        />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
});

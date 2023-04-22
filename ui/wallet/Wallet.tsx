import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Modal from "react-native-modal";
import { Snackbar } from "react-native-paper";
import { PrimaryColor } from "../Colors";
import { ActionSheetItem } from "../components/ActionSheetItem";
import { IconButton } from "../components/IconButton";
import { SelectItem } from "../components/SelectItem";
import { WalletNavigationProp, WalletRouteProp } from "./Navigation";

interface Props {
  navigation: WalletNavigationProp;
  route: WalletRouteProp;
}

type ModalType = "SelectAccount" | "SelectNetwork";

export const WalletScreen: React.FC<Props> = ({ navigation, route }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [modalVisible, setModalVisible] = useState<ModalType | null>(null);
  const [secretValue, setSecretValue] = useState<string>("");

  useEffect(() => {
    if (route.params?.showActionSheet) {
      actionSheetRef.current?.setModalVisible(true);
      navigation.setParams({ showActionSheet: false });
    }
  }, [route.params?.showActionSheet]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
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

      <ActionSheet ref={actionSheetRef} containerStyle={styles.actionSheet}>
        <ActionSheetItem
          text={"Select Account"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              setModalVisible("SelectAccount");
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Select Network"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              setModalVisible("SelectNetwork");
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Import Key"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
          }}
        />
        <ActionSheetItem
          text={"Export Key"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              setSecretValue("private key....");
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Export Mnemonics"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              setSecretValue("mnemonics....");
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Reset"}
          destructive={true}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
          }}
        />
      </ActionSheet>

      <Modal
        isVisible={modalVisible !== null}
        onBackdropPress={() => setModalVisible(null)}
        style={styles.modal}
      >
        {modalVisible === "SelectAccount" && <SelectItem />}
        {modalVisible === "SelectNetwork" && <SelectItem />}
      </Modal>

      <Snackbar
        visible={secretValue !== ""}
        onDismiss={() => {
          setSecretValue("");
        }}
        action={{
          label: "Copy",
          onPress: () => {
            setSecretValue("");
          },
        }}
      >
        {secretValue}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
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
  actionSheet: {
    paddingBottom: 40,
  },
  modal: {
    margin: 0,
    marginTop: 300,
  },
  secretModal: {
    marginTop: 300,
  },
});

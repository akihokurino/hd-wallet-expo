import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Modal from "react-native-modal";
import { Snackbar } from "react-native-paper";
import { useWallet } from "../../context/WalletProvider";
import { PrimaryColor } from "../Colors";
import { ActionSheetItem } from "../components/ActionSheetItem";
import { IconButton } from "../components/IconButton";
import { SelectItem, SelectItemData } from "../components/SelectItem";
import { ManageKey } from "./ManageKey";
import { WalletNavigationProp, WalletRouteProp } from "./Navigation";

interface Props {
  navigation: WalletNavigationProp;
  route: WalletRouteProp;
}

type ModalType = "SelectAccount" | "ManageKey";

export const WalletScreen: React.FC<Props> = ({ navigation, route }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [modalVisible, setModalVisible] = useState<ModalType | null>(null);
  const [secretValue, setSecretValue] = useState<string>("");
  const {
    accounts,
    primaryAccount,
    balance,
    changeAccount,
    exportMnemonics,
    exportPrivateKey,
    reset,
  } = useWallet();

  useEffect(() => {
    if (route.params?.showActionSheet) {
      actionSheetRef.current?.setModalVisible(true);
      navigation.setParams({ showActionSheet: false });
    }
  }, [route.params?.showActionSheet]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.accountText}>{primaryAccount?.name}</Text>
        <View style={styles.balance}>
          <Text style={styles.balanceText}>{balance} MATIC</Text>
        </View>
        <Text style={styles.addressText}>{primaryAccount?.address}</Text>
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
          text={"Import Key"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              setModalVisible("ManageKey");
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Export Key"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              exportPrivateKey().then((val) => {
                setSecretValue(val ?? "");
              });
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Export Mnemonics"}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              exportMnemonics().then((val) => {
                setSecretValue(val);
              });
            }, 1000);
          }}
        />
        <ActionSheetItem
          text={"Reset"}
          destructive={true}
          handlePress={() => {
            actionSheetRef.current?.setModalVisible(false);
            setTimeout(() => {
              reset();
            }, 1000);
          }}
        />
      </ActionSheet>

      <Modal
        isVisible={modalVisible !== null}
        onBackdropPress={() => setModalVisible(null)}
        style={styles.modal}
      >
        {modalVisible === "SelectAccount" && (
          <SelectItem
            current={primaryAccount?.address ?? ""}
            items={accounts.map((account): SelectItemData => {
              return {
                id: account.address,
                name: account.name,
              };
            })}
            onSelect={(id: string) => {
              changeAccount(
                accounts.filter((account) => account.address === id)[0]
              );
              setModalVisible(null);
            }}
          />
        )}
        {modalVisible === "ManageKey" && (
          <ManageKey
            dismiss={() => {
              setModalVisible(null);
            }}
          />
        )}
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
    marginTop: 100,
  },
  secretModal: {
    marginTop: 300,
  },
});

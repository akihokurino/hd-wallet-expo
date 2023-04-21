import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PrimaryColor } from "../colors";

interface Props {
  icon: any;
  text: string;
  handlePress: () => void;
}

export const IconButton: React.FC<Props> = ({ icon, text, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.iconButtonContainer}>
        <View style={styles.iconButton}>
          <AntDesign name={icon} size={20} color={"#fff"} />
        </View>

        <Text style={styles.iconButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PrimaryColor,
  },
  iconButtonText: {
    color: "#000",
    fontWeight: "normal",
    fontSize: 12,
    marginTop: 5,
  },
});

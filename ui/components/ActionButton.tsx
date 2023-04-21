import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PrimaryColor } from "../Colors";

interface Props {
  width: number;
  text: string;
  handlePress: () => void;
}

export const ActionButton: React.FC<Props> = ({ width, text, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.buttonContainer, { width }]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PrimaryColor,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

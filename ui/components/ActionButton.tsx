import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AlertColor, PrimaryColor } from "../Colors";

type ActionType = "normal" | "alert";

interface Props {
  width: number;
  text: string;
  actionType?: ActionType;
  handlePress: () => void;
}

export const ActionButton: React.FC<Props> = ({
  width,
  text,
  actionType = "normal",
  handlePress,
}) => {
  let backgroundColor = PrimaryColor;
  switch (actionType) {
    case "normal":
      backgroundColor = PrimaryColor;
      break;
    case "alert":
      backgroundColor = AlertColor;
      break;
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, { width, backgroundColor }]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

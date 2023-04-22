import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PrimaryColor } from "../Colors";

interface Props {
  text: string;
  destructive?: boolean;
  handlePress: () => void;
}

export const ActionSheetItem: React.FC<Props> = ({
  text,
  destructive = false,
  handlePress,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container]}>
        <Text
          style={[
            styles.text,
            destructive ? { color: "red" } : { color: PrimaryColor },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

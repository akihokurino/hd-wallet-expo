import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PrimaryColor } from "../Colors";

interface Props {}

export const SelectItem: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <View style={[styles.itemContainer]}>
          <Text style={styles.itemText}>{"Item1"}</Text>
          <AntDesign name="checkcircleo" size={24} color={PrimaryColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={[styles.itemContainer]}>
          <Text style={styles.itemText}>{"Item2"}</Text>
          <AntDesign name="checkcircleo" size={24} color={PrimaryColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 0,
  },
  itemContainer: {
    height: 50,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
});

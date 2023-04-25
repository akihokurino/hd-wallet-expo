import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PrimaryColor } from "../Colors";

export interface SelectItemData {
  id: string;
  name: string;
}

interface Props {
  current: string;
  items: SelectItemData[];
  onSelect: (id: string) => void;
}

export const SelectItem: React.FC<Props> = ({ current, items, onSelect }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            onSelect(item.id);
          }}
        >
          <View style={[styles.itemContainer]}>
            <Text style={styles.itemText}>{item.name}</Text>
            <AntDesign
              name="checkcircleo"
              size={24}
              color={item.id === current ? PrimaryColor : "gray"}
            />
          </View>
        </TouchableOpacity>
      ))}
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

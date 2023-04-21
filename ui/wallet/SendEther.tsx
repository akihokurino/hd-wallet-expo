import { Text, View } from "react-native";
import { SendEtherNavigationProp } from "./Navigation";

interface Props {
  navigation: SendEtherNavigationProp;
}

export const SendEtherScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>First Details Screen</Text>
    </View>
  );
};

import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

interface Props {
  width: number;
  keyboard: KeyboardTypeOptions;
  placeholder: any;
  onChangeText: (text: string) => void;
}

export const TextField: React.FC<Props> = ({
  width,
  keyboard,
  placeholder,
  onChangeText,
}) => {
  return (
    <TextInput
      style={[styles.input, { width }]}
      keyboardType={keyboard}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
  },
});

import { Text, TouchableOpacity } from "react-native";
import Colors from "./../../assets/constant/Colors";

export default function Button({ text, type = "fill", onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontFamily: "inter",
          color: type == "fill" ? Colors.WHITE : Colors.PRIMARY,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

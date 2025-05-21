import { Text, View } from "react-native";
import Colors from "./../../assets/constant/Colors";

export default function Journal() {
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "inter-bold",
          fontSize: 30,
        }}
      >
        Create New Journal
      </Text>
      <Text
        style={{
          fontFamily: "inter",
          fontSize: 30,
        }}
      >
        How are you feeling today?
      </Text>
      <Text
        style={{
          fontFamily: "inter",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        Exactly let us know what mood you are in today. (You can be happy and at
        the same time sad and we understand)
      </Text>
    </View>
  );
}

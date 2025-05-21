import { Image, Text, View } from "react-native";

export default function NoJournals() {
  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/start_writing.png")}
        style={{ height: 200, width: 200 }}
      />
      <Text
        style={{
          fontFamily: "inter-bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        Start Writing...
      </Text>
    </View>
  );
}

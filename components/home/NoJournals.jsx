import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import Button from "../shared/Button";

export default function NoJournals() {
  const router = useRouter();
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
        style={{ marginTop: 16, height: 200, width: 200 }}
      />
      <Text
        style={{
          marginTop: 16,
          fontFamily: "inter-bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        Start Journaling...
      </Text>
      <Button
        text={"+ Add a Journal Entry"}
        onPress={() => router.push("/journal")}
      />
      <Button
        text={"My Journals"}
        type="outline"
      />
    </View>
  );
}

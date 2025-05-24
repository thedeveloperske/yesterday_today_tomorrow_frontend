import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { ThemeContext } from "../../app/_layout";
import Button from "../shared/Button";

export default function NoJournals() {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: darkMode ? "#222" : "transparent",
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
          color: darkMode ? "#fff" : "#000",
        }}
      >
        Start Journaling...
      </Text>
      <Button
        text={"+ Add a Journal Entry"}
        onPress={() => router.push("/journal")}
        style={{ width: "100%" }}
      />
      <Button
        text={"My Journals"}
        onPress={() => router.push("/search")}
        type="outline"
        style={{ width: "100%", marginTop: 10 }}
      />
    </View>
  );
}

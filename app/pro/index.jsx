import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProOffers() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 16,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text>Upgrade Journal</Text>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import SearchBar from "../../components/home/searchbar";

export default function SearchJournals() {
  const router = useRouter();
  return (
    <View
      style={{
        padding: 16,
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
      <SearchBar />
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SearchBar from "../../components/home/searchbar";

export default function SearchJournals() {
  const router = useRouter();
  const { darkMode } = useContext(require("../_layout").ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#f2f2f2" },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={[
          styles.backButton,
          { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
        ]}
        activeOpacity={0.8}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={darkMode ? "#fff" : "#385A64"}
        />
      </TouchableOpacity>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10, // reduced for better mobile spacing
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
    borderRadius: 20,
    padding: 8,
  },
});

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/home/searchbar";

export default function SearchJournals() {
  const router = useRouter();
  const { darkMode } = useContext(require("../_layout").ThemeContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const CATEGORIES = ["All", "Personal", "Business", "Travel"];

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/items");
        setEntries(resp.data);
      } catch (e) {
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

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
      <SearchBar
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 8,
          justifyContent: "center",
        }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={{
              backgroundColor:
                categoryFilter === cat
                  ? darkMode
                    ? "#385A64"
                    : "#385A64"
                  : darkMode
                  ? "#333"
                  : "#f2f2f2",
              borderRadius: 16,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginRight: 8,
              borderWidth: 2,
              borderColor: categoryFilter === cat ? "#385A64" : "transparent",
            }}
            onPress={() => setCategoryFilter(cat)}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color:
                  categoryFilter === cat
                    ? "#fff"
                    : darkMode
                    ? "#fff"
                    : "#385A64",
                fontFamily: "inter-bold",
                fontSize: 15,
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <Text
          style={{
            color: darkMode ? "#fff" : "#385A64",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Loading journal entries...
        </Text>
      ) : error ? (
        <Text style={{ color: "red", marginTop: 24, textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={(categoryFilter === "All"
            ? entries
            : entries.filter((e) => e.category === categoryFilter)
          ).filter(
            (e) =>
              !searchText.trim() ||
              (e.title &&
                e.title.toLowerCase().includes(searchText.trim().toLowerCase()))
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/search/view",
                  params: { id: item.id },
                })
              }
              activeOpacity={0.85}
            >
              <View
                style={{
                  backgroundColor: darkMode ? "#333" : "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    color: darkMode ? "#F9D923" : "#385A64",
                    fontFamily: "inter-bold",
                    fontSize: 18,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: darkMode ? "#fff" : "#385A64",
                    fontSize: 15,
                    marginTop: 2,
                  }}
                >
                  {item.content && item.content.length > 100
                    ? item.content.slice(0, 50) + "..."
                    : item.content}
                </Text>
                <Text
                  style={{
                    color: darkMode ? "#aaa" : "#888",
                    fontSize: 13,
                    marginTop: 6,
                  }}
                >
                  Mood: {item.mood} | Category: {item.category}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text
              style={{
                color: darkMode ? "#aaa" : "#888",
                textAlign: "center",
                marginTop: 32,
              }}
            >
              No journal entries found.
            </Text>
          }
          style={{ marginTop: 18 }}
        />
      )}
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

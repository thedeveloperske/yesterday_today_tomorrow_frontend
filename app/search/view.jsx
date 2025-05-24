import { useRouter, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { ThemeContext } from "../_layout";

export default function JournalView() {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchEntry = async () => {
      try {
        const resp = await axios.get(`http://localhost:8000/items/${id}`);
        setEntry(resp.data);
      } catch (e) {
        setError("Failed to load entry");
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
  }, [id]);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#222" : "#fff" }]}> 
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backButton, { backgroundColor: darkMode ? "#333" : "#f2f2f2" }]}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color={darkMode ? "#fff" : "#385A64"} />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color={darkMode ? "#F9D923" : "#385A64"} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={{ color: "red", marginTop: 40, textAlign: "center" }}>{error}</Text>
      ) : entry ? (
        <View style={styles.entryBox}>
          <Text style={[styles.title, { color: darkMode ? "#F9D923" : "#385A64" }]}>{entry.title}</Text>
          <Text style={[styles.meta, { color: darkMode ? "#aaa" : "#888" }]}>Mood: {entry.mood} | Category: {entry.category}</Text>
          <Text style={[styles.content, { color: darkMode ? "#fff" : "#385A64" }]}>{entry.content}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
    borderRadius: 20,
    padding: 8,
  },
  entryBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontFamily: "inter-bold",
    fontSize: 24,
    marginBottom: 8,
  },
  meta: {
    fontFamily: "inter",
    fontSize: 14,
    marginBottom: 12,
  },
  content: {
    fontFamily: "inter",
    fontSize: 17,
    lineHeight: 24,
  },
});

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Journal() {
  const { darkMode } = useContext(require("../_layout").ThemeContext);
  const router = require("expo-router").useRouter();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get("http://localhost:8000/items");
        // Only keep name and description fields for each entry
        const trimmed = (resp.data || []).map((e) => ({
          name: e.name,
          description: e.description,
          id: e.id, // keep id for key/edit/delete
        }));
        setEntries(trimmed);
      } catch (e) {
        setError("Failed to load entries");
      }
      setLoading(false);
    };
    fetchEntries();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={{
          alignSelf: "flex-start",
          marginBottom: 12,
          backgroundColor: darkMode ? "#333" : "#f2f2f2",
          borderRadius: 20,
          padding: 8,
        }}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={darkMode ? "#fff" : "#385A64"}
        />
      </TouchableOpacity>
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#385A64" }]}>
        Journal
      </Text>
      <Text style={[styles.subtitle, { color: darkMode ? "#fff" : "#385A64" }]}>
        How are you feeling today?
      </Text>
      <Text
        style={[styles.description, { color: darkMode ? "#aaa" : "#858585" }]}
      >
        Remember that your yesterday counts, today is aleady here and tomorrow
        might be untold
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.journalBtn,
            { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
          ]}
          onPress={() => router.push("/journal/entry?day=yesterday")}
        >
          <MaterialCommunityIcons
            name="calendar-minus"
            size={28}
            color={darkMode ? "#fff" : "#385A64"}
          />
          <Text
            style={[
              styles.journalBtnText,
              { color: darkMode ? "#fff" : "#385A64" },
            ]}
          >
            Yesterday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.journalBtn,
            { backgroundColor: darkMode ? "#385A64" : "#385A64" },
          ]}
          onPress={() => router.push("/journal/entry?day=today")}
        >
          <MaterialCommunityIcons
            name="calendar-today"
            size={28}
            color="#fff"
          />
          <Text style={[styles.journalBtnText, { color: "#fff" }]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.journalBtn,
            { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
          ]}
          onPress={() => router.push("/journal/entry?day=tomorrow")}
        >
          <MaterialCommunityIcons
            name="calendar-plus"
            size={28}
            color={darkMode ? "#fff" : "#385A64"}
          />
          <Text
            style={[
              styles.journalBtnText,
              { color: darkMode ? "#fff" : "#385A64" },
            ]}
          >
            Tomorrow
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 16,
    color: "#385A64",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "inter",
    marginBottom: 12,
    color: "#385A64",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "inter",
    color: "#858585",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
    gap: 12,
  },
  journalBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 14,
    marginHorizontal: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  journalBtnText: {
    fontSize: 16,
    fontFamily: "inter-bold",
    marginTop: 8,
  },
});

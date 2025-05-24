import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { ThemeContext } from "../_layout";

export default function JournalView() {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  const { id } = useLocalSearchParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: darkMode ? "#385A64" : "#385A64",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 18,
            marginRight: 4,
          }}
          onPress={() =>
            router.push({ pathname: "/journal/entry", params: { id } })
          }
          activeOpacity={0.85}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "inter-bold",
              fontSize: 15,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: darkMode ? "#D7263D" : "#D7263D",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 18,
          }}
          onPress={() => setShowDeleteAlert(true)}
          activeOpacity={0.85}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "inter-bold",
              fontSize: 15,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={darkMode ? "#F9D923" : "#385A64"}
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={{ color: "red", marginTop: 40, textAlign: "center" }}>
          {error}
        </Text>
      ) : entry ? (
        <View style={styles.entryBox}>
          <Text
            style={[styles.title, { color: darkMode ? "#F9D923" : "#385A64" }]}
          >
            {entry.title}
          </Text>
          <Text style={[styles.meta, { color: darkMode ? "#aaa" : "#888" }]}>
            Mood: {entry.mood} | Category: {entry.category}
          </Text>
          <Text
            style={[styles.content, { color: darkMode ? "#fff" : "#385A64" }]}
          >
            {entry.content}
          </Text>
        </View>
      ) : null}
      <AwesomeAlert
        show={showDeleteAlert}
        showProgress={deleting}
        title="Delete Journal Entry"
        message="Are you sure you want to delete this journal entry? This action cannot be undone."
        closeOnTouchOutside={!deleting}
        closeOnHardwareBackPress={!deleting}
        showCancelButton={!deleting}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText={deleting ? "Deleting..." : "Delete"}
        confirmButtonColor="#D7263D"
        cancelButtonColor={darkMode ? "#385A64" : "#385A64"}
        onCancelPressed={() => setShowDeleteAlert(false)}
        onConfirmPressed={async () => {
          setDeleting(true);
          try {
            await axios.delete(`http://localhost:8000/items/${id}`);
            setShowDeleteAlert(false);
            router.replace("/search");
          } catch (e) {
            setShowDeleteAlert(false);
            alert("Failed to delete entry.");
          } finally {
            setDeleting(false);
          }
        }}
        contentContainerStyle={{
          borderRadius: 22,
          backgroundColor: darkMode ? "#232B2B" : "#fff",
          paddingHorizontal: 28,
          paddingVertical: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 10,
        }}
        titleStyle={{
          color: darkMode ? "#F9D923" : "#D7263D",
          fontFamily: "inter-bold",
          fontSize: 22,
          textAlign: "center",
          marginBottom: 6,
        }}
        messageStyle={{
          color: darkMode ? "#fff" : "#385A64",
          fontFamily: "inter",
          fontSize: 16,
          textAlign: "center",
        }}
        confirmButtonStyle={{
          borderRadius: 12,
          paddingHorizontal: 24,
          paddingVertical: 8,
        }}
        confirmButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 16,
        }}
        cancelButtonStyle={{
          borderRadius: 12,
          paddingHorizontal: 24,
          paddingVertical: 8,
        }}
        cancelButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 16,
        }}
      />
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

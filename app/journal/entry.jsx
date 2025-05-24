import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../_layout";

const EMOJIS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😍",
  "🥰",
  "😘",
  "😜",
  "🤔",
  "😎",
  "😭",
  "😡",
  "😱",
  "🥳",
  "😴",
  "🤒",
  "😤",
  "😢",
  "😬",
  "😇",
  "🤩",
  "😏",
];

const CATEGORIES = ["Personal", "Business", "Travel"];

export default function JournalEntry() {
  const { darkMode } = useContext(ThemeContext);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSave = async () => {
    const entry = {
      title: title,
      category: category,
      mood: mood,
      content: content,
      owner_id: 1,
    };
    console.log("[JournalEntry] Entry to be posted:", entry);
    try {
      await axios.post("http://localhost:8000/items", entry);
      Alert.alert("Saved!", "Your journal entry has been saved.");
      router.back(); // Optionally go back to the journal list
    } catch (e) {
      Alert.alert("Error", "Failed to save entry.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.iconBtn,
            { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
          ]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={darkMode ? "#fff" : "#385A64"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconBtn,
            { backgroundColor: darkMode ? "#385A64" : "#385A64" },
          ]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name="content-save"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.label,
          { color: darkMode ? "#fff" : "#385A64", marginTop: 10 },
        ]}
      >
        Title
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#333" : "#f2f2f2",
            color: darkMode ? "#fff" : "#000",
          },
        ]}
        placeholder="Enter a title..."
        placeholderTextColor={darkMode ? "#aaa" : "#858585"}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={[styles.label, { color: darkMode ? "#fff" : "#385A64" }]}>
        Mood
      </Text>
      <TouchableOpacity
        style={[
          styles.emojiPickerBtn,
          { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
        ]}
        onPress={() => setEmojiPickerVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={{ fontSize: 32 }}>{mood || "😊"}</Text>
        <Text
          style={{
            color: darkMode ? "#fff" : "#385A64",
            fontFamily: "inter",
            marginLeft: 12,
            fontSize: 16,
          }}
        >
          {mood ? "Change Mood" : "Pick a Mood"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={emojiPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEmojiPickerVisible(false)}
      >
        <View style={styles.emojiModalOverlay}>
          <View
            style={[
              styles.emojiModal,
              { backgroundColor: darkMode ? "#222" : "#fff" },
            ]}
          >
            <Text
              style={{
                fontFamily: "inter-bold",
                fontSize: 18,
                color: darkMode ? "#fff" : "#385A64",
                marginBottom: 12,
              }}
            >
              Select your mood
            </Text>
            <FlatList
              data={EMOJIS}
              numColumns={6}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emojiItem}
                  onPress={() => {
                    setMood(item);
                    setEmojiPickerVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 32 }}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ alignItems: "center" }}
            />
            <TouchableOpacity
              style={[
                styles.emojiCloseBtn,
                { backgroundColor: darkMode ? "#385A64" : "#385A64" },
              ]}
              onPress={() => setEmojiPickerVisible(false)}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "inter-bold",
                  fontSize: 16,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text
        style={[
          styles.label,
          { color: darkMode ? "#fff" : "#385A64", marginTop: 10 },
        ]}
      >
        Category
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              {
                backgroundColor:
                  category === cat
                    ? darkMode
                      ? "#385A64"
                      : "#385A64"
                    : darkMode
                    ? "#333"
                    : "#f2f2f2",
                borderColor: category === cat ? "#385A64" : "transparent",
              },
            ]}
            onPress={() => setCategory(cat)}
            activeOpacity={0.85}
          >
            <Text
              style={{
                color:
                  category === cat ? "#fff" : darkMode ? "#fff" : "#385A64",
                fontFamily: "inter-bold",
                fontSize: 15,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.label, { color: darkMode ? "#fff" : "#385A64" }]}>
        Journal Content
      </Text>
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: darkMode ? "#333" : "#f2f2f2",
            color: darkMode ? "#fff" : "#000",
          },
        ]}
        placeholder="Write your thoughts here..."
        placeholderTextColor={darkMode ? "#aaa" : "#858585"}
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: "stretch",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 4,
  },
  iconBtn: {
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    minHeight: 44,
  },
  label: {
    fontSize: 16,
    fontFamily: "inter-bold",
    marginBottom: 6,
    marginTop: 18,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 4,
  },
  textArea: {
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 16,
    minHeight: 120,
    maxHeight: 200,
  },
  emojiPickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 14,
    marginBottom: 4,
    marginTop: 2,
  },
  emojiModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiModal: {
    width: 320,
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    elevation: 8,
  },
  emojiItem: {
    margin: 8,
    borderRadius: 10,
    padding: 6,
  },
  emojiCloseBtn: {
    marginTop: 18,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  categoryBtn: {
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    marginBottom: 2,
  },
});

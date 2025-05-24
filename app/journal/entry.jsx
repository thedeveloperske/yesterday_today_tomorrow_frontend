import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
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
import AwesomeAlert from "react-native-awesome-alerts";
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
  const { id } = require("expo-router").useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch entry details if editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`http://localhost:8000/items/${id}`)
      .then((resp) => {
        setTitle(resp.data.title || "");
        setMood(resp.data.mood || "");
        setContent(resp.data.content || "");
        setCategory(resp.data.category || CATEGORIES[0]);
      })
      .catch(() => setError("Failed to load entry details."))
      .finally(() => setLoading(false));
  }, [id]);

  const validateAndAlert = (field, label) => {
    setValidationMsg(`Please enter: ${label}`);
    setShowValidation(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      validateAndAlert("title", "Title");
      return;
    }
    if (!mood.trim()) {
      validateAndAlert("mood", "Mood");
      return;
    }
    if (!content.trim()) {
      validateAndAlert("content", "Journal Content");
      return;
    }
    const entry = {
      title: title,
      category: category,
      mood: mood,
      content: content,
      owner_id: 1,
    };
    try {
      if (id) {
        await axios.put(`http://localhost:8000/items/${id}`, entry);
      } else {
        await axios.post("http://localhost:8000/items", entry);
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.replace("/(tabs)/home");
      }, 1500);
    } catch (e) {
      Alert.alert(
        "Error",
        id ? "Failed to update entry." : "Failed to save entry."
      );
    }
  };

  const handleBack = () => {
    // If you want to always go to the home screen, use:
    router.replace("/(tabs)/home");
    // If you want to go to the main journal list, use:
    // router.replace('/journal');
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkMode ? "#222" : "#fff",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: darkMode ? "#fff" : "#385A64", fontSize: 18 }}>
          Loading...
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkMode ? "#222" : "#fff",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={handleBack}
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
      <AwesomeAlert
        show={showSuccess}
        showProgress={false}
        title="Success!"
        message="Your journal entry has been saved."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={false}
        contentContainerStyle={{
          borderRadius: 28,
          backgroundColor: darkMode ? "#232B2B" : "#fff",
          paddingHorizontal: 36,
          paddingVertical: 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.22,
          shadowRadius: 16,
          elevation: 16,
        }}
        titleStyle={{
          color: darkMode ? "#F9D923" : "#385A64",
          fontSize: 28,
          fontFamily: "inter-bold",
          textAlign: "center",
          marginBottom: 10,
          letterSpacing: 0.5,
        }}
        messageStyle={{
          color: darkMode ? "#fff" : "#385A64",
          fontSize: 20,
          fontFamily: "inter",
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
        confirmButtonStyle={{
          borderRadius: 20,
          paddingHorizontal: 36,
          paddingVertical: 14,
          backgroundColor: darkMode ? "#F9D923" : "#385A64",
          marginTop: 12,
        }}
        confirmButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 20,
          color: darkMode ? "#232B2B" : "#fff",
          letterSpacing: 0.5,
        }}
      />
      <AwesomeAlert
        show={showValidation}
        showProgress={false}
        title="Missing Information"
        message={validationMsg}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={darkMode ? "#F9D923" : "#385A64"}
        onConfirmPressed={() => setShowValidation(false)}
        contentContainerStyle={{
          borderRadius: 28,
          backgroundColor: darkMode ? "#232B2B" : "#fff",
          paddingHorizontal: 36,
          paddingVertical: 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.22,
          shadowRadius: 16,
          elevation: 16,
        }}
        titleStyle={{
          color: darkMode ? "#F9D923" : "#D7263D",
          fontSize: 26,
          fontFamily: "inter-bold",
          textAlign: "center",
          marginBottom: 10,
          letterSpacing: 0.5,
        }}
        messageStyle={{
          color: darkMode ? "#fff" : "#385A64",
          fontSize: 18,
          fontFamily: "inter",
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
        confirmButtonStyle={{
          borderRadius: 20,
          paddingHorizontal: 36,
          paddingVertical: 14,
          backgroundColor: darkMode ? "#F9D923" : "#385A64",
          marginTop: 12,
        }}
        confirmButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 18,
          color: darkMode ? "#232B2B" : "#fff",
          letterSpacing: 0.5,
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

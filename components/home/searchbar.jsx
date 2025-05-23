import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-web";
import { ThemeContext } from "../../app/_layout";
import Colors from "./../../assets/constant/Colors";

export default function SearchBar() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "#333" : styles.container.backgroundColor,
        },
      ]}
    >
      <Ionicons
        style={{ marginRight: 10 }}
        name="search"
        size={24}
        color={darkMode ? "#fff" : Colors.PRIMARY}
      />
      <TextInput
        placeholder="Search"
        style={[styles.textInput, { color: darkMode ? "#fff" : "#000" }]}
        placeholderTextColor={darkMode ? "#aaa" : Colors.PRIMARY}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 10,
    fontSize: 18,
  },
});

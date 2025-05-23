import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../_layout";

export default function Analytics() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#385A64" }]}>
        Analytics
      </Text>
      {/* Add analytics charts or stats here as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24, // reduced for better mobile spacing
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 32,
    textAlign: "center",
  },
});

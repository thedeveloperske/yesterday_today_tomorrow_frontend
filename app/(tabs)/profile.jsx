import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserDetailContext } from "../../context/UserDetailContext";
import { ThemeContext } from "../_layout";

export default function Profile() {
  const { darkMode } = useContext(ThemeContext);
  const { userDetail } = useContext(UserDetailContext);
  const name = userDetail?.name || userDetail?.email?.split("@")[0] || "";
  const email = userDetail?.email || "";
  // Placeholder for journal count, to be implemented later
  // const journalCount = ...

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#385A64" }]}>
        Profile
      </Text>
      <View style={styles.infoBox}>
        <Text style={[styles.label, { color: darkMode ? "#aaa" : "#858585" }]}>
          Name
        </Text>
        <Text style={[styles.value, { color: darkMode ? "#fff" : "#385A64" }]}>
          {name}
        </Text>
        <Text style={[styles.label, { color: darkMode ? "#aaa" : "#858585" }]}>
          Email
        </Text>
        <Text style={[styles.value, { color: darkMode ? "#fff" : "#385A64" }]}>
          {email}
        </Text>
        {/* <Text style={[styles.label, { color: darkMode ? "#aaa" : "#858585" }]}>Journal Entries</Text>
        <Text style={[styles.value, { color: darkMode ? "#fff" : "#385A64" }]}>{journalCount}</Text> */}
      </View>
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
  infoBox: {
    width: "100%",
    backgroundColor: "rgba(56,90,100,0.05)",
    borderRadius: 14,
    padding: 24,
    alignItems: "flex-start",
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "inter",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontFamily: "inter-bold",
    marginBottom: 4,
  },
});

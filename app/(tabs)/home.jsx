import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/home/header";
import NoJournals from "../../components/home/nojournals";
import { UserDetailContext } from "../../context/UserDetailContext";
import { ThemeContext } from "../_layout";

export default function Home() {
  const { userDetail } = useContext(UserDetailContext);
  const { darkMode } = useContext(ThemeContext);
  const name = userDetail?.name || userDetail?.email?.split("@")[0] || "";
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Header />
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#385A64" }]}>
        {name ? `Welcome ${name}` : "Welcome"}
      </Text>
      <NoJournals />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24, // reduced for better mobile spacing
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 16,
  },
});

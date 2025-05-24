import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../../assets/constant/Colors";
import { useUser } from "../../context/UserDetailProvider";
import { ThemeContext } from "../_layout";

export default function Settings() {
  const router = useRouter();
  const { setUser, logout } = useUser();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showAbout, setShowAbout] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwt");
    setUser(undefined);
    router.replace("/auth/signin");
  };

  // Reverse color scheme for the app
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Text
        style={[styles.title, { color: darkMode ? "#fff" : Colors.PRIMARY }]}
      >
        Settings
      </Text>
      <TouchableOpacity style={styles.option}>
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={darkMode ? "#fff" : Colors.PRIMARY}
        />
        <Text
          style={[
            styles.optionText,
            { color: darkMode ? "#fff" : Colors.PRIMARY },
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <MaterialCommunityIcons
          name="bell-outline"
          size={24}
          color={darkMode ? "#fff" : Colors.PRIMARY}
        />
        <Text
          style={[
            styles.optionText,
            { color: darkMode ? "#fff" : Colors.PRIMARY },
          ]}
        >
          Notifications
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setShowAbout(true)}
      >
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={darkMode ? "#fff" : Colors.PRIMARY}
        />
        <Text
          style={[
            styles.optionText,
            { color: darkMode ? "#fff" : Colors.PRIMARY },
          ]}
        >
          About Developer
        </Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Ionicons
          name="color-palette-outline"
          size={24}
          color={darkMode ? "#fff" : Colors.PRIMARY}
        />
        <Text
          style={[
            styles.optionText,
            { color: darkMode ? "#fff" : Colors.PRIMARY },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={handleToggleTheme}
          thumbColor={darkMode ? Colors.PRIMARY : "#ccc"}
          trackColor={{ false: "#ccc", true: Colors.PRIMARY }}
        />
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        activeOpacity={0.8}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#fff"
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAbout}
        showProgress={false}
        title="About the Developer"
        message={
          "This app was crafted with ❤️ by [Your Name].\n\nContact: your.email@example.com\nGitHub: github.com/yourusername\n\nThank you for using Yesterday, Today, Tomorrow!"
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor={darkMode ? "#F9D923" : "#385A64"}
        onConfirmPressed={() => setShowAbout(false)}
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
          color: darkMode ? "#F9D923" : "#385A64",
          fontFamily: "inter-bold",
          fontSize: 26,
          textAlign: "center",
          marginBottom: 6,
        }}
        messageStyle={{
          color: darkMode ? "#fff" : "#385A64",
          fontFamily: "inter",
          fontSize: 18,
          textAlign: "center",
        }}
        confirmButtonStyle={{
          borderRadius: 16,
          paddingHorizontal: 32,
          paddingVertical: 12,
          backgroundColor: darkMode ? "#F9D923" : "#385A64",
        }}
        confirmButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 18,
          color: darkMode ? "#232B2B" : "#fff",
        }}
      />
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
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 16,
  },
  optionText: {
    fontSize: 18,
    fontFamily: "inter",
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontFamily: "inter",
    fontSize: 18,
    textAlign: "center",
  },
});

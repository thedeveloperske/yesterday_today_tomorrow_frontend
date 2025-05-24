import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../assets/constant/Colors";
import { useUser } from "../../context/UserDetailProvider";
import { ThemeContext } from "../_layout";

export default function Settings() {
  const router = useRouter();
  const { setUser, logout } = useUser();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

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
        onPress={() =>
          alert(
            "Developed by Hanson Williams. Contact: williamshanson.hanson@gmail.com"
          )
        }
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

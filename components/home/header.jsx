import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../../app/_layout";
import Colors from "../../assets/constant/Colors";
import { useUser } from "../../context/UserDetailProvider";

export default function Header() {
  const router = useRouter();
  const { user, setUser, login, logout, loading } = useUser();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <TouchableOpacity onPress={() => setDrawerVisible(true)}>
        <Ionicons
          name="menu-outline"
          size={32}
          color={darkMode ? "#fff" : "black"}
        />
      </TouchableOpacity>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => router.push("/pro")}>
          <MaterialCommunityIcons
            name="crown"
            size={32}
            color={darkMode ? "#fff" : Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons
            name="search-outline"
            size={32}
            color={darkMode ? "#fff" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="filter-outline"
            size={24}
            color={darkMode ? "#fff" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDrawerVisible(false)}
        presentationStyle="overFullScreen"
      >
        <Pressable
          style={styles.drawerOverlay}
          onPress={() => setDrawerVisible(false)}
        />
        <View
          style={[
            styles.drawer,
            { backgroundColor: darkMode ? "#222" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.drawerTitle,
              { color: darkMode ? "#fff" : Colors.PRIMARY },
            ]}
          >
            Menu
          </Text>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerVisible(false);
              router.push("/pro");
            }}
          >
            <MaterialCommunityIcons
              name="crown"
              size={32}
              color={darkMode ? "#fff" : Colors.PRIMARY}
            />
            <Text
              style={[
                styles.drawerText,
                { color: darkMode ? "#fff" : Colors.PRIMARY },
              ]}
            >
              Upgrade
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerVisible(false);
              router.push("/(tabs)/profile");
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={darkMode ? "#fff" : Colors.PRIMARY}
            />
            <Text
              style={[
                styles.drawerText,
                { color: darkMode ? "#fff" : Colors.PRIMARY },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              setDrawerVisible(false);
              router.push("/(tabs)/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={darkMode ? "#fff" : Colors.PRIMARY}
            />
            <Text
              style={[
                styles.drawerText,
                { color: darkMode ? "#fff" : Colors.PRIMARY },
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => setDrawerVisible(false)}
          >
            <Ionicons
              name="close-outline"
              size={24}
              color={darkMode ? "#fff" : Colors.PRIMARY}
            />
            <Text
              style={[
                styles.drawerText,
                { color: darkMode ? "#fff" : Colors.PRIMARY },
              ]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 240,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 0 },
  },
  drawerTitle: {
    fontSize: 22,
    fontFamily: "inter-bold",
    marginBottom: 24,
    color: Colors.PRIMARY,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  drawerText: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontFamily: "inter",
  },
});

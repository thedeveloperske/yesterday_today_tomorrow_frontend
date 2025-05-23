import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import Colors from "../../assets/constant/Colors";
import { ThemeContext } from "../_layout";

export default function TabLayout() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? "#222" : "#fff",
          borderTopColor: darkMode ? "#333" : "#eee",
        },
        tabBarActiveTintColor: darkMode ? Colors.PRIMARY : Colors.PRIMARY,
        tabBarInactiveTintColor: darkMode ? "#fff" : Colors.PRIMARY,
      }}
      style={{
        position: "absolute",
        bottom: 25,
        left: 25,
        right: 25,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={28}
              color={color}
            />
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: darkMode ? "#fff" : Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              size={28}
              color={color}
            />
          ),
          tabBarLabel: "Analytics",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: darkMode ? "#fff" : Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: darkMode ? "#fff" : Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="cog"
              size={28}
              color={color}
            />
          ),
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: darkMode ? "#fff" : Colors.PRIMARY,
          },
        }}
      />
    </Tabs>
  );
}

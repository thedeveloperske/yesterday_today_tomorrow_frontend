import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import Colors from "../../assets/constant/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="list"
              size={size}
              color={Colors.PRIMARY}
            />
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
              color={Colors.PRIMARY}
            />
          ),
          tabBarLabel: "Analytics",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={Colors.PRIMARY}
            />
          ),
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: Colors.PRIMARY,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={Colors.PRIMARY}
            />
          ),
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            fontFamily: "inter",
            color: Colors.PRIMARY,
          },
        }}
      />
    </Tabs>
  );
}

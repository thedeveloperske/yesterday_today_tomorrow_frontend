import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Analytics",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}

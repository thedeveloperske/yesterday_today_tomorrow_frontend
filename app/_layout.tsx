import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { UserDetailProvider } from "../context/UserDetailProvider";

export const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (_: boolean) => {},
});

export default function RootLayout() {
  useFonts({
    inter: require("./../assets/fonts/Inter-Regular.ttf"),
    "inter-bold": require("./../assets/fonts/Inter-Bold.ttf"),
  });

  const [darkMode, setDarkModeState] = useState(false);

  // Load dark mode preference from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem("darkMode");
      if (stored !== null) setDarkModeState(stored === "true");
    };
    loadTheme();
  }, []);

  // Persist dark mode preference
  const setDarkMode = async (value: boolean) => {
    setDarkModeState(value);
    await AsyncStorage.setItem("darkMode", value ? "true" : "false");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <UserDetailProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserDetailProvider>
    </ThemeContext.Provider>
  );
}

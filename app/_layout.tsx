import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { createContext, useState } from "react";
import { UserDetailContext } from "./../context/UserDetailContext";

export const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (_: boolean) => {},
});

export default function RootLayout() {
  useFonts({
    inter: require("./../assets/fonts/Inter-Regular.ttf"),
    "inter-bold": require("./../assets/fonts/Inter-Bold.ttf"),
  });

  const [userDetail, setUserDetail] = useState();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <Stack screenOptions={{ headerShown: false }} />
      </UserDetailContext.Provider>
    </ThemeContext.Provider>
  );
}

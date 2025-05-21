import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import { UserDetailContext } from "./../context/UserDetailContext";

export default function RootLayout() {
  useFonts({
    inter: require("./../assets/fonts/Inter-Regular.ttf"),
    "inter-bold": require("./../assets/fonts/Inter-Bold.ttf"),
  });

  const [userDetail, setUserDetail] = useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </UserDetailContext.Provider>
  );
}

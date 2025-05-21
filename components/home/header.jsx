import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { UserDetailContext } from "./../../context/UserDetailContext";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View
      style={{
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "inter-bold",
            fontSize: 25,
          }}
        >
          Hello, {userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 17,
          }}
        >
          Let's Get Started
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons
          name="settings-outline"
          size={32}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

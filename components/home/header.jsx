import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Colors from "../../assets/constant/Colors";
import { UserDetailContext } from "./../../context/UserDetailContext";

export default function Header() {
  const router = useRouter();
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name="menu-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/pro")}>
          <MaterialCommunityIcons
            name="crown"
            size={32}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons
            name="search-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="filter-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

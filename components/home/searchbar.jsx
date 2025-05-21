import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-web";
import Colors from "./../../assets/constant/Colors";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons
        style={{ marginRight: 10 }}
        name="search"
        size={24}
        color={Colors.PRIMARY}
      />
      <TextInput
        placeholder="Search"
        style={styles.textInput}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 10,
    fontSize: 18,
  },
});

import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../assets/constant/Colors";

export default function Signin() {
  const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        flex: 1,
        padding: 25,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/signin.png")}
        style={{ height: 180, width: 180 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "inter-bold",
        }}
      >
        Welcome Back
      </Text>
      <TextInput
        placeholder="Email Address"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "inter",
          }}
        >
          Don't have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signup")}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "inter-bold",
            }}
          >
            Sign Up Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});

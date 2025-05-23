import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../assets/constant/Colors";
import { loginUser } from "../../config/api";
import { UserDetailContext } from "../../context/UserDetailContext";
import { ThemeContext } from "../_layout";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const payload = { email, password };
      console.log("Login payload:", payload);
      const resp = await loginUser(payload);
      if (resp.access_token) {
        await AsyncStorage.setItem("jwt", resp.access_token);
      }
      setUserDetail(resp.user || { email });
      setLoading(false);
      router.replace("/(tabs)/home");
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : Colors.WHITE },
      ]}
    >
      <Image
        source={require("./../../assets/images/signin.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[styles.title, { color: darkMode ? "#fff" : Colors.PRIMARY }]}
      >
        Welcome Back
      </Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="Email Address"
        style={[
          styles.textInput,
          {
            backgroundColor: darkMode ? "#333" : Colors.BG_GRAY || "#f2f2f2",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#555" : Colors.PRIMARY,
          },
        ]}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholderTextColor={darkMode ? "#aaa" : Colors.GRAY}
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        style={[
          styles.textInput,
          {
            backgroundColor: darkMode ? "#333" : Colors.BG_GRAY || "#f2f2f2",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#555" : Colors.PRIMARY,
          },
        ]}
        textContentType="password"
        placeholderTextColor={darkMode ? "#aaa" : Colors.GRAY}
      />
      <TouchableOpacity
        onPress={handleSignIn}
        disabled={loading}
        style={[
          styles.button,
          loading && styles.buttonDisabled,
          { backgroundColor: darkMode ? "#444" : Colors.PRIMARY },
        ]}
        activeOpacity={0.8}
      >
        {!loading ? (
          <Text
            style={[
              styles.buttonText,
              { color: darkMode ? Colors.PRIMARY : Colors.WHITE },
            ]}
          >
            Sign In
          </Text>
        ) : (
          <ActivityIndicator
            size={"large"}
            color={darkMode ? Colors.PRIMARY : Colors.WHITE}
          />
        )}
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <Text
          style={[
            styles.bottomText,
            { color: darkMode ? "#aaa" : Colors.GRAY },
          ]}
        >
          Don't have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signup")}>
          <Text
            style={[
              styles.linkText,
              { color: darkMode ? Colors.PRIMARY : Colors.PRIMARY },
            ]}
          >
            Sign Up Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 24, // reduced for better mobile spacing
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 24,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 16,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontFamily: "inter",
    fontSize: 18,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bottomText: {
    fontFamily: "inter",
    fontSize: 15,
  },
  linkText: {
    fontFamily: "inter-bold",
    marginLeft: 6,
    fontSize: 15,
  },
});

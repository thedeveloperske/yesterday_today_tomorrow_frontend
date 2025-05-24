import { useRouter } from "expo-router";
import { useContext, useState } from "react";
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
import { registerUser } from "../../config/api";
import { useUser } from "../../context/UserDetailProvider";
import { ThemeContext } from "../_layout";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser, login, logout, loading } = useUser();
  const { darkMode } = useContext(ThemeContext);

  const handleSignup = async () => {
    try {
      const payload = { name, email, hashed_password: password };
      const resp = await registerUser(payload);
      if (resp.access_token && resp.user) {
        await login(resp.user, resp.access_token); // persist user and token
      }
      router.replace("/(tabs)/home");
    } catch (e) {
      console.log(e.message);
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
        source={require("./../../assets/images/signup.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[styles.title, { color: darkMode ? "#fff" : Colors.PRIMARY }]}
      >
        Create New Account
      </Text>
      <TextInput
        onChangeText={setName}
        placeholder="Full Name"
        style={[
          styles.textInput,
          {
            backgroundColor: darkMode ? "#333" : Colors.BG_GRAY || "#f2f2f2",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#555" : Colors.PRIMARY,
          },
        ]}
        autoCapitalize="words"
        textContentType="name"
        placeholderTextColor={darkMode ? "#aaa" : Colors.GRAY}
      />
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
        onPress={handleSignup}
        style={[
          styles.button,
          { backgroundColor: darkMode ? "#444" : Colors.PRIMARY },
        ]}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.buttonText,
            { color: darkMode ? Colors.PRIMARY : Colors.WHITE },
          ]}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <Text
          style={[
            styles.bottomText,
            { color: darkMode ? "#aaa" : Colors.GRAY },
          ]}
        >
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signin")}>
          <Text
            style={[
              styles.linkText,
              { color: darkMode ? Colors.PRIMARY : Colors.PRIMARY },
            ]}
          >
            Sign In Here
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
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: Colors.WHITE,
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

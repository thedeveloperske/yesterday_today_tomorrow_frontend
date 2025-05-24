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
import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../../assets/constant/Colors";
import { loginUser } from "../../config/api";
import { useUser } from "../../context/UserDetailProvider";
import { ThemeContext } from "../_layout";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser, login, logout, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const [showError, setShowError] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const payload = { email, password };
      const resp = await loginUser(payload);
      if (resp.access_token && resp.user) {
        await login(resp.user, resp.access_token); // persist user and token
      }
      setIsLoading(false);
      router.replace("/(tabs)/home");
    } catch (e) {
      setIsLoading(false);
      setShowError(true);
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
        disabled={isLoading}
        style={[
          styles.button,
          isLoading && styles.buttonDisabled,
          { backgroundColor: darkMode ? "#444" : Colors.PRIMARY },
        ]}
        activeOpacity={0.8}
      >
        {!isLoading ? (
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
      <AwesomeAlert
        show={showError}
        showProgress={false}
        title="Login Failed"
        message="Incorrect email or password. Please try again."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor={darkMode ? "#F9D923" : "#385A64"}
        onConfirmPressed={() => setShowError(false)}
        contentContainerStyle={{
          borderRadius: 22,
          backgroundColor: darkMode ? "#232B2B" : "#fff",
          paddingHorizontal: 28,
          paddingVertical: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 10,
        }}
        titleStyle={{
          color: darkMode ? "#F9D923" : "#D7263D",
          fontSize: 26,
          fontFamily: "inter-bold",
          textAlign: "center",
          marginBottom: 6,
        }}
        messageStyle={{
          color: darkMode ? "#fff" : "#385A64",
          fontSize: 18,
          fontFamily: "inter",
          textAlign: "center",
        }}
        confirmButtonStyle={{
          borderRadius: 16,
          paddingHorizontal: 32,
          paddingVertical: 12,
          backgroundColor: darkMode ? "#F9D923" : "#385A64",
        }}
        confirmButtonTextStyle={{
          fontFamily: "inter-bold",
          fontSize: 18,
          color: darkMode ? "#232B2B" : "#fff",
        }}
      />
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

import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
import { auth, db } from "../../config/FirebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        // toast
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", email));
    console.log(result.data);
    setUserDetail(result, data());
  };
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
        onChangeText={(value) => setEmail(value)}
        placeholder="Email Address"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={handleSignIn}
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        {!loading ? (
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
        ) : (
          <ActivityIndicator
            size={"large"}
            color={Colors.WHITE}
          />
        )}
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

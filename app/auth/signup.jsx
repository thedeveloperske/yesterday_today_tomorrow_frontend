import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { auth, db } from "../../config/FirebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await saveUser(user);
        // save user to db
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const saveUser = async (user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user.uid,
    };
    await setDoc(doc(db, "users", email), data);

    setUserDetail(data);

    // Navigate to new page
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
        source={require("./../../assets/images/signup.png")}
        style={{ height: 180, width: 180 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "inter-bold",
        }}
      >
        Create New Account
      </Text>
      <TextInput
        onChangeText={(value) => setFullName(value)}
        placeholder="Full Name"
        onChange={(value) => setFullName(value)}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setEmail(value)}
        placeholder="Email Address"
        onChange={(value) => setEmail(value)}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        onChange={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={handleSignup}
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
          Create Account
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
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push("/auth/signin")}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "inter-bold",
            }}
          >
            Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});

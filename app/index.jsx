import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../assets/constant/Colors";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../assets/images/myjournal.png")}
        style={{
          width: "100%",
          height: "50%",
        }}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "inter-bold",
          }}
        >
          Welcome to Yesterday Today and Tomorrow
        </Text>
        <Text
          style={{
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: "center",
            fontFamily: "inter",
          }}
        >
          Your yesterday counts, today is already here and your tomorrow is in
          hope
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signup")}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signin")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
  },
});

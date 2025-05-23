import { StyleSheet, Text, View } from "react-native";

export default function Journal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <Text style={styles.subtitle}>How are you feeling today?</Text>
      <Text style={styles.description}>
        Exactly let us know what mood you are in today. (You can be happy and at
        the same time sad and we understand)
      </Text>
      {/* Add journal entry form or UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 24, // reduced for better mobile spacing
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 16,
    color: "#385A64",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "inter",
    marginBottom: 12,
    color: "#385A64",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "inter",
    color: "#858585",
    textAlign: "center",
    marginBottom: 24,
  },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../_layout";

const packages = [
  {
    name: "Pro Monthly",
    price: "Ksh. 499.99/mo",
    features: [
      "Unlimited journal entries",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Pro Yearly",
    price: "Ksh. 4,999.99/yr",
    features: [
      "All Pro Monthly features",
      "2 months free",
      "Early access to new features",
    ],
  },
  {
    name: "Family Plan",
    price: "Kesh. 9,999.99/mo",
    features: [
      "Up to 5 users",
      "Shared analytics dashboard",
      "Family reminders",
    ],
  },
];

export default function ProOffers() {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: darkMode ? "#222" : "#fff" }}
    >
      <View style={styles.innerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.backButton,
              { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={darkMode ? "#fff" : "#385A64"}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: darkMode ? "#fff" : "#385A64" }]}>
          Upgrade Yesterday Today and Tomorrow
        </Text>
        <View style={styles.packagesContainer}>
          {packages.map((pkg, idx) => (
            <View
              key={pkg.name}
              style={[
                styles.packageBox,
                { backgroundColor: darkMode ? "#333" : "#f2f2f2" },
              ]}
            >
              <Text
                style={[
                  styles.packageName,
                  { color: darkMode ? "#fff" : "#385A64" },
                ]}
              >
                {pkg.name}
              </Text>
              <Text
                style={[
                  styles.packagePrice,
                  { color: darkMode ? "#aaa" : "#858585" },
                ]}
              >
                {pkg.price}
              </Text>
              {pkg.features.map((f, i) => (
                <Text
                  key={i}
                  style={[
                    styles.feature,
                    { color: darkMode ? "#fff" : "#385A64" },
                  ]}
                >
                  • {f}
                </Text>
              ))}
              <TouchableOpacity
                style={[
                  styles.upgradeBtn,
                  {
                    backgroundColor: darkMode ? "#385A64" : "#385A64",
                    width: "100%",
                    borderRadius: 12,
                    paddingVertical: 16,
                    marginTop: 14,
                  },
                ]}
                activeOpacity={0.85}
              >
                <Text style={styles.upgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  backButton: {
    borderRadius: 20,
    padding: 8,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontFamily: "inter-bold",
    marginBottom: 24,
    textAlign: "center",
  },
  packagesContainer: {
    width: "100%",
    gap: 18,
  },
  packageBox: {
    borderRadius: 14,
    padding: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  packageName: {
    fontSize: 20,
    fontFamily: "inter-bold",
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 8,
  },
  feature: {
    fontSize: 15,
    fontFamily: "inter",
    marginBottom: 2,
  },
  upgradeBtn: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  upgradeBtnText: {
    color: "#fff",
    fontFamily: "inter-bold",
    fontSize: 16,
  },
});

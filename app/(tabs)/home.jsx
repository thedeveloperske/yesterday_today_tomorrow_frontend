import { Platform, View } from "react-native";
import Header from "../../components/home/header";
import NoJournals from "../../components/home/NoJournals";
import Button from "../../components/shared/Button";
import Colors from "./../../assets/constant/Colors";

export default function Home() {
  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS == "ios" && 10,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />
      <NoJournals />
      <Button text={"+ Add a Journal Entry"} />
      <Button
        text={"My Journals"}
        type="outline"
      />
    </View>
  );
}

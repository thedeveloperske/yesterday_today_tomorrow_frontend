import { BarChart, LineChart } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ThemeContext } from "../_layout";

export default function Analytics() {
  const { darkMode } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;
  // Responsive chart width
  const chartWidth = isDesktop
    ? 600
    : isTablet
    ? 480
    : Math.min(width - 40, 340);
  // Responsive chart height
  const chartHeight = isDesktop ? 320 : isTablet ? 260 : 220;
  const [categoryData, setCategoryData] = useState([]);
  const [moodTrend, setMoodTrend] = useState([]);
  const [entriesPerDay, setEntriesPerDay] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // Fetch summary counts
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: darkMode ? "#222" : "#fff" }}
      contentContainerStyle={{ minHeight: height, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.container,
          {
            minHeight: height,
            alignItems: "flex-start",
            paddingHorizontal: 20,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: darkMode ? "#fff" : "#385A64",
              fontSize: isDesktop ? 38 : isTablet ? 32 : 24,
              textAlign: "left",
              alignSelf: "flex-start",
              marginBottom: 20,
            },
          ]}
        >
          Analytics
        </Text>
        {/* Summary Section */}
        {summary && (
          <View
            style={{
              backgroundColor: darkMode ? "#333" : "#F9F9F9",
              borderRadius: 16,
              padding: 18,
              marginBottom: 32,
              width: Math.max(width - 72, 320),
              alignSelf: "flex-start",
              shadowColor: darkMode ? "#000" : "#aaa",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: darkMode ? "#F9D923" : "#385A64",
                fontFamily: "inter-bold",
                fontSize: isTablet ? 18 : 15,
                marginBottom: 8,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Journal Summary
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  color: darkMode ? "#fff" : "#385A64",
                  fontFamily: "inter",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                Total Entries:
              </Text>
              <Text
                style={{
                  color: darkMode ? "#F9D923" : "#385A64",
                  fontFamily: "inter-bold",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                {summary.totalEntries ?? "-"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  color: darkMode ? "#fff" : "#385A64",
                  fontFamily: "inter",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                Unique Days:
              </Text>
              <Text
                style={{
                  color: darkMode ? "#F9D923" : "#385A64",
                  fontFamily: "inter-bold",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                {summary.entriesPerDay
                  ? Object.keys(summary.entriesPerDay).length
                  : "-"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: darkMode ? "#fff" : "#385A64",
                  fontFamily: "inter",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                Most Common Mood:
              </Text>
              <Text
                style={{
                  color: darkMode ? "#F9D923" : "#385A64",
                  fontFamily: "inter-bold",
                  fontSize: isTablet ? 16 : 13,
                }}
              >
                {summary.moodCounts &&
                Object.keys(summary.moodCounts).length > 0
                  ? (() => {
                      const entries = Object.entries(summary.moodCounts);
                      const max = entries.reduce((a, b) =>
                        b[1] > a[1] ? b : a
                      );
                      return max[0];
                    })()
                  : "-"}
              </Text>
            </View>
          </View>
        )}
        {/* Category Breakdown Bar Chart */}
        <Text
          style={{
            color: darkMode ? "#F9D923" : "#385A64",
            fontSize: isTablet ? 18 : 14,
            fontFamily: "inter-bold",
            marginTop: 8,
            marginBottom: 12,
            textAlign: "left",
            alignSelf: "flex-start",
          }}
        >
          Entries by Category
        </Text>
        <BarChart
          xAxis={[
            { data: categoryData.map((d) => d.category), label: "Category" },
          ]}
          series={[
            { data: categoryData.map((d) => d.count), label: "Entries" },
          ]}
          width={Math.max(width - 32, 320)}
          height={220}
          colors={[darkMode ? "#F9D923" : "#385A64"]}
          style={{ alignSelf: "flex-start", marginBottom: 28 }}
        />
        {/* Mood Trend Line Chart */}
        <Text
          style={{
            color: darkMode ? "#F9D923" : "#385A64",
            fontSize: isTablet ? 18 : 14,
            fontFamily: "inter-bold",
            marginTop: 8,
            marginBottom: 12,
            textAlign: "left",
            alignSelf: "flex-start",
          }}
        >
          Mood Trend
        </Text>
        <LineChart
          xAxis={[{ data: moodTrend.map((d) => d.date), label: "Date" }]}
          series={[
            { data: moodTrend.map((d) => d.mood_score), label: "Mood Score" },
          ]}
          width={Math.max(width - 32, 320)}
          height={220}
          colors={[darkMode ? "#F9D923" : "#385A64"]}
          style={{ alignSelf: "flex-start", marginBottom: 28 }}
        />
        {/* Entries Per Day Bar Chart */}
        <Text
          style={{
            color: darkMode ? "#F9D923" : "#385A64",
            fontSize: isTablet ? 18 : 14,
            fontFamily: "inter-bold",
            marginTop: 8,
            marginBottom: 12,
            textAlign: "left",
            alignSelf: "flex-start",
          }}
        >
          Entries Per Day
        </Text>
        <BarChart
          xAxis={[{ data: entriesPerDay.map((d) => d.date), label: "Date" }]}
          series={[
            { data: entriesPerDay.map((d) => d.count), label: "Entries" },
          ]}
          width={Math.max(width - 32, 320)}
          height={220}
          colors={[darkMode ? "#F9D923" : "#385A64"]}
          style={{ alignSelf: "flex-start", marginBottom: 28 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontFamily: "inter-bold",
    marginBottom: 16,
    color: "#385A64",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "inter",
    marginBottom: 12,
    color: "#385A64",
    textAlign: "center",
  },
});

import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
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
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryBreakdown = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get(
          "http://localhost:8000/items/category-breakdown"
        );
        setCategoryData(resp.data || {});
      } catch (e) {
        setError("Failed to load category breakdown");
      }
      setLoading(false);
    };
    fetchCategoryBreakdown();
  }, []);

  const categories = Object.keys(categoryData);
  const counts = categories.map((cat) => categoryData[cat]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff", minHeight: height },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: darkMode ? "#fff" : "#385A64",
            fontSize: isDesktop ? 38 : isTablet ? 32 : 24,
          },
        ]}
      >
        Analytics
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: darkMode ? "#fff" : "#385A64",
            fontSize: isDesktop ? 28 : isTablet ? 24 : 18,
          },
        ]}
      >
        Entries by Category
      </Text>
      {loading && (
        <Text
          style={{
            color: darkMode ? "#fff" : "#385A64",
            fontSize: isTablet ? 18 : 14,
          }}
        >
          Loading...
        </Text>
      )}
      {error && (
        <Text style={{ color: "red", fontSize: isTablet ? 18 : 14 }}>
          {error}
        </Text>
      )}
      {!loading && !error && categories.length > 0 && (
        <View style={{ width: chartWidth, marginVertical: isTablet ? 32 : 24 }}>
          <BarChart
            xAxis={[{ scaleType: "band", data: categories }]}
            series={[{ data: counts }]}
            width={chartWidth}
            height={chartHeight}
            colors={[darkMode ? "#fff" : "#385A64"]}
          />
        </View>
      )}
      {!loading && !error && categories.length === 0 && (
        <Text
          style={{
            color: darkMode ? "#fff" : "#385A64",
            fontSize: isTablet ? 18 : 14,
          }}
        >
          No data to display.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 24,
    alignItems: "center",
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

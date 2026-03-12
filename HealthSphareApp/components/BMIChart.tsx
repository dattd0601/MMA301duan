import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";

interface BMIChartProps {
  bmiValue: number;
}

const BMIChart: React.FC<BMIChartProps> = ({ bmiValue }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Calculate position on the chart (0-100%)
  const position = Math.min(100, Math.max(0, ((bmiValue - 15) / 15) * 100));
  
  // Determine category color
  let categoryColor = "";
  let categoryText = "";
  
  if (bmiValue < 18.5) {
    categoryColor = "#64D2FF"; // Light blue for underweight
    categoryText = "Thiếu cân";
  } else if (bmiValue >= 18.5 && bmiValue < 23) {
    categoryColor = "#34C759"; // Green for normal
    categoryText = "Bình thường";
  } else if (bmiValue >= 23 && bmiValue < 25) {
    categoryColor = "#FFCC00"; // Yellow for overweight
    categoryText = "Thừa cân";
  } else {
    categoryColor = "#FF3B30"; // Red for obese
    categoryText = "Béo phì";
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.categories}>
          <View style={[styles.category, { backgroundColor: "#64D2FF" }]} />
          <View style={[styles.category, { backgroundColor: "#34C759" }]} />
          <View style={[styles.category, { backgroundColor: "#FFCC00" }]} />
          <View style={[styles.category, { backgroundColor: "#FF3B30" }]} />
        </View>
        
        <View style={styles.labels}>
          <Text style={[styles.label, { color: colors.text }]}>15</Text>
          <Text style={[styles.label, { color: colors.text }]}>18.5</Text>
          <Text style={[styles.label, { color: colors.text }]}>23</Text>
          <Text style={[styles.label, { color: colors.text }]}>25</Text>
          <Text style={[styles.label, { color: colors.text }]}>30</Text>
        </View>
        
        <View style={styles.markerContainer}>
          <View 
            style={[
              styles.marker, 
              { 
                left: `${position}%`,
                backgroundColor: categoryColor
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.resultContainer}>
        <Text style={[styles.bmiValue, { color: colors.text }]}>
          {bmiValue.toFixed(1)}
        </Text>
        <Text style={[styles.bmiCategory, { color: categoryColor }]}>
          {categoryText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  chartContainer: {
    height: 60,
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  category: {
    flex: 1,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  label: {
    fontSize: 12,
  },
  markerContainer: {
    position: "relative",
    height: 0,
  },
  marker: {
    position: "absolute",
    top: -25,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: "white",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
});

export default BMIChart;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";

interface BMIChartProps {
  bmiValue: number;
}

/**
 * Thành phần hiển thị biểu đồ chỉ số BMI trực quan
 * Giúp người dùng dễ dàng nhận biết trạng thái cân nặng của mình
 */
const BMIChart: React.FC<BMIChartProps> = ({ bmiValue }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Tính toán vị trí của điểm đánh dấu trên biểu đồ (từ 0% đến 100%)
  // Giả định dải chỉ số BMI từ 15 đến 30 để hiển thị trực quan
  const position = Math.min(100, Math.max(0, ((bmiValue - 15) / 15) * 100));
  
  // Xác định màu sắc và nội dung phân loại dựa trên chỉ số BMI
  const bmiCategories = [
    { max: 18.5, color: "#64D2FF", text: "Thiếu cân" },
    { max: 23, color: "#34C759", text: "Bình thường" },
    { max: 25, color: "#FFCC00", text: "Thừa cân" },
    { max: Infinity, color: "#FF3B30", text: "Béo phì" },
  ];

  const category = bmiCategories.find(c => bmiValue < c.max) || bmiCategories[3];
  const categoryColor = category.color;
  const categoryText = category.text;
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Phần thân biểu đồ với 4 phân đoạn màu sắc */}
        <View style={styles.categories}>
          <View style={[styles.category, { backgroundColor: "#64D2FF" }]} />
          <View style={[styles.category, { backgroundColor: "#34C759" }]} />
          <View style={[styles.category, { backgroundColor: "#FFCC00" }]} />
          <View style={[styles.category, { backgroundColor: "#FF3B30" }]} />
        </View>
        
        {/* Các nhãn chỉ số BMI tương ứng bên dưới biểu đồ */}
        <View style={styles.labels}>
          <Text style={[styles.label, { color: colors.text }]}>15</Text>
          <Text style={[styles.label, { color: colors.text }]}>18.5</Text>
          <Text style={[styles.label, { color: colors.text }]}>23</Text>
          <Text style={[styles.label, { color: colors.text }]}>25</Text>
          <Text style={[styles.label, { color: colors.text }]}>30</Text>
        </View>
        
        {/* Điểm đánh dấu (marker) hiển thị vị trí BMI hiện tại */}
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
      
      {/* Hiển thị giá trị số và văn bản phân loại */}
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
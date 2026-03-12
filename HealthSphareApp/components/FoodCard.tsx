import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { Flame } from "lucide-react-native";
import { FoodItem } from "../mocks/vietnameseFoods";

interface FoodCardProps {
  food: FoodItem;
  onPress?: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Ảnh được bọc trong wrapper để cố định kích thước */}
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: food.imageUrl }} 
          style={styles.image} 
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {food.name}
        </Text>
        
        <View style={styles.calorieContainer}>
          <Flame size={16} color={colors.food} />
          <Text style={[styles.calories, { color: colors.text }]}>
            {food.calories} kcal
          </Text>
        </View>
        
        <View style={styles.macros}>
          <Text style={[styles.macro, { color: colors.muted }]}>
            P: {food.protein}g
          </Text>
          <Text style={[styles.macro, { color: colors.muted }]}>
            C: {food.carbs}g
          </Text>
          <Text style={[styles.macro, { color: colors.muted }]}>
            F: {food.fat}g
          </Text>
        </View>
        
        <Text style={[styles.serving, { color: colors.muted }]}>
          {food.servingSize}
        </Text>
      </View>
      
      {(food.isForWeightGain || food.isForWeightLoss) && (
        <View 
          style={[
            styles.tag, 
            { 
              backgroundColor: food.isForWeightGain 
                ? colors.success 
                : colors.primary 
            }
          ]}
        >
          <Text style={styles.tagText}>
            {food.isForWeightGain ? "Tăng cân" : "Giảm cân"}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
  width: "48%", // Nếu đang hiển thị 2 cột
  height: 270, // Cố định chiều cao tổng thể
  borderRadius: 16,
  overflow: 'hidden',
  marginVertical: 8,
  marginHorizontal: 4,
  elevation: 2,
  backgroundColor: 'white',
  position: 'relative',
}
,

  imageWrapper: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  calories: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  macros: {
    flexDirection: "row",
    marginBottom: 4,
  },
  macro: {
    fontSize: 12,
    marginRight: 8,
  },
  serving: {
    fontSize: 12,
  },
  tag: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  tagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default FoodCard;

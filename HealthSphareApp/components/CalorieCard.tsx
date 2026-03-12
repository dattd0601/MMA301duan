import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { Flame } from "lucide-react-native";
import { useUserStore } from "../store/userStore";

const CalorieCard: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const { calculateCalories, profile } = useUserStore();
  const calories = calculateCalories();
  
  if (!calories || !profile) return null;
  
  const { dailyCalories, proteinGrams, carbsGrams, fatGrams } = calories;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Flame size={24} color={colors.food} />
          <Text style={[styles.title, { color: colors.text }]}>Calo hàng ngày</Text>
        </View>
      </View>
      
      <View style={styles.calorieContainer}>
        <Text style={[styles.calorieValue, { color: colors.text }]}>
          {dailyCalories}
        </Text>
        <Text style={[styles.calorieUnit, { color: colors.muted }]}>
          kcal
        </Text>
      </View>
      
      <Text style={[styles.goalText, { color: colors.muted }]}>
        {profile.goal === "lose" 
          ? "Mục tiêu giảm cân" 
          : profile.goal === "gain" 
            ? "Mục tiêu tăng cân" 
            : "Mục tiêu duy trì cân nặng"}
      </Text>
      
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, { backgroundColor: colors.primary }]} />
          <Text style={[styles.macroValue, { color: colors.text }]}>{proteinGrams}g</Text>
          <Text style={[styles.macroLabel, { color: colors.muted }]}>Protein</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, { backgroundColor: colors.warning }]} />
          <Text style={[styles.macroValue, { color: colors.text }]}>{carbsGrams}g</Text>
          <Text style={[styles.macroLabel, { color: colors.muted }]}>Carbs</Text>
        </View>
        
        <View style={styles.macroItem}>
          <View style={[styles.macroIndicator, { backgroundColor: colors.danger }]} />
          <Text style={[styles.macroValue, { color: colors.text }]}>{fatGrams}g</Text>
          <Text style={[styles.macroLabel, { color: colors.muted }]}>Chất béo</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: "bold",
  },
  calorieUnit: {
    fontSize: 16,
    marginLeft: 4,
  },
  goalText: {
    fontSize: 14,
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
  },
  macroIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  macroLabel: {
    fontSize: 12,
  },
});

export default CalorieCard;
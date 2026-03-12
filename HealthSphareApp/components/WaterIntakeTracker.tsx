import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { Droplets, Plus } from "lucide-react-native";
import { useUserStore } from "../store/userStore";

const WATER_AMOUNTS = [100, 200, 300];

const WaterIntakeTracker: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const { addWaterIntake, calculateWaterGoal } = useUserStore();
  const waterGoal = calculateWaterGoal();
  
  if (!waterGoal) return null;
  
  const { amount, consumed, percentage } = waterGoal;
  
  const handleAddWater = (ml: number) => {
    if (Platform.OS !== "web") {
      // Add haptic feedback here if needed
    }
    addWaterIntake(ml);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Droplets size={24} color={colors.water} />
          <Text style={[styles.title, { color: colors.text }]}>Nước uống</Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          {consumed} / {amount} ml
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBackground, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: colors.water 
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        {WATER_AMOUNTS.map((ml) => (
          <TouchableOpacity
            key={ml}
            style={[
              styles.button,
              { backgroundColor: colors.water }
            ]}
            onPress={() => handleAddWater(ml)}
          >
            <Plus size={16} color="white" />
            <Text style={styles.buttonText}>{ml} ml</Text>
          </TouchableOpacity>
        ))}
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
  subtitle: {
    fontSize: 14,
  },
  progressContainer: {
    marginVertical: 8,
  },
  progressBackground: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default WaterIntakeTracker;
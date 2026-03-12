import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  RefreshControl
} from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import Colors from "../../constants/colors";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "expo-router";
import BMIChart from "../../components/BMIChart";
import WaterIntakeTracker from "../../components/WaterIntakeTracker";
import CalorieCard from "../../components/CalorieCard";
import PremiumBanner from "../../components/PremiumBanner";
import { Bell, Info } from "lucide-react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const { profile, calculateBMI, resetWaterIntakeForNewDay } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(true);
  
  const bmiResult = calculateBMI();
  
  useEffect(() => {
    // Check if we need to reset water intake (new day)
    const now = new Date();
    const lastMidnight = new Date(now);
    lastMidnight.setHours(0, 0, 0, 0);
    
    const lastWaterIntake = profile?.waterIntake?.[profile.waterIntake.length - 1];
    if (lastWaterIntake && new Date(lastWaterIntake).getTime() < lastMidnight.getTime()) {
      resetWaterIntakeForNewDay();
    }
  }, []);
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  // if (!profile) {
  //   router.replace("/onboarding");
  //   return null;
  // }
  
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Xin chào!
            </Text>
            <Text style={[styles.date, { color: colors.muted }]}>
              {new Date().toLocaleDateString("vi-VN", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        {showPremiumBanner && (
          <PremiumBanner onClose={() => setShowPremiumBanner(false)} />
        )}
        
        <View style={[styles.bmiCard, { backgroundColor: colors.card }]}>
          <View style={styles.bmiHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Chỉ số BMI
            </Text>
            <TouchableOpacity>
              <Info size={20} color={colors.muted} />
            </TouchableOpacity>
          </View>
          
          {bmiResult && <BMIChart bmiValue={bmiResult.value} />}
          
          <Text style={[styles.bmiDescription, { color: colors.muted }]}>
            {bmiResult?.description}
          </Text>
        </View>
        
        <CalorieCard />
        
        <WaterIntakeTracker />
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: colors.food }]}
            onPress={() => router.push("/(tabs)/food")}
          >
            <Text style={styles.quickActionText}>Xem thực đơn</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickAction, { backgroundColor: colors.exercise }]}
            onPress={() => router.push("/(tabs)/exercise")}
          >
            <Text style={styles.quickActionText}>Bài tập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bmiCard: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  bmiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  bmiDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  quickActionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
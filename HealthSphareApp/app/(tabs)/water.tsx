import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAppStore } from '../../store/appStore';
import { Stack } from 'expo-router';
import Colors from '../../constants/colors';
import { getCurrentDate, formatTime, formatLogDate } from '../../utils/date';
import WaterProgressCircle from '../../components/WaterProgressCircle';
import WaterLogItem from '../../components/WaterLogItem';
import { Plus, Droplets } from 'lucide-react-native';
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // Import ngôn ngữ tiếng Việt
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('vi')

// const formatLogDate = (timestamp) => {
//   return dayjs(timestamp).format('HH:mm [ngày] DD/MM/YYYY') 
//   // ví dụ: "14:35 ngày 03/07/2025"
// }


const WATER_AMOUNTS = [100, 200, 300, 500];

export default function WaterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { profile, addWaterIntake, calculateWaterGoal, waterIntakeLogs } = useAppStore();
  
  const waterGoal = calculateWaterGoal();
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  
  // Cập nhật ngày vào nửa đêm
  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = getCurrentDate();
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
      }
    }, 60000); // Kiểm tra mỗi phút
    
    return () => clearInterval(interval);
  }, [currentDate]);
  
  // đăng ký nước premium
  if (!profile || !waterGoal || !profile.isPremium) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Cung Cấp Nước" }} />
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.text }]}>
            Vui lòng đăng ký gói Premium để trải nghiệm tính tăng này
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleAddWater = (amount: number) => {
    addWaterIntake(amount);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ 
        title: "Cung Cấp Nước",
        headerStyle: { backgroundColor: colors.water },
        headerTintColor: "#fff"
      }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.date, { color: colors.text }]}>{currentDate}</Text>
        
        {waterGoal && (
          <WaterProgressCircle 
            percentage={waterGoal.percentage} 
            consumed={waterGoal.consumed} 
            goal={waterGoal.amount} 
          />
        )}
        
        <View style={styles.buttonsContainer}>
          {WATER_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.button, { backgroundColor: colors.water }]}
              onPress={() => handleAddWater(amount)}
            >
              <Plus size={16} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{amount} ml</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.logsContainer}>
          <Text style={[styles.logsTitle, { color: colors.text }]}>Nhật ký hôm nay</Text>
          
          {waterIntakeLogs.length > 0 ? (
            waterIntakeLogs.map((log, index) => (
              <WaterLogItem 
                key={index}
                amount={log.amount}
                timestamp={formatLogDate(log.timestamp)}
              />
            ))
          ) : (
            <View style={[styles.emptyLog, { backgroundColor: colors.card }]}>
              <Droplets size={24} color={colors.muted} />
              <Text style={[styles.emptyLogText, { color: colors.muted }]}>
                Chưa có nhật ký cung cấp nước hôm nay
              </Text>
            </View>
          )}
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
    padding: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  logsContainer: {
    marginTop: 10,
  },
  logsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyLog: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLogText: {
    marginTop: 8,
    fontSize: 14,
  },
});

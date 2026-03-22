import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ActivityIndicator } from 'react-native';
import { authStore } from '../store/authStore';

export default function Index() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Kiểm tra trạng thái đăng nhập
        const user = await authStore.checkAuthStatus();
        
        // Kiểm tra dữ liệu Profile từ UserStore (lưu trong AsyncStorage)
        const storageData = await AsyncStorage.getItem('health-app-storage');
        let hasOnboarding = false;
        
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          hasOnboarding = parsedData.state?.hasCompletedOnboarding || false;
        }

        // Delay ngắn để splash screen hiển thị mượt mà
        setTimeout(() => {
          if (!user) {
            // Chưa đăng nhập -> Đi tới màn Auth
            router.replace('/auth');
          } else if (!hasOnboarding) {
            // Đã đăng nhập nhưng chưa Onboarding -> Đi tới Onboarding
            router.replace('/onboarding');
          } else {
            // Đã xong hết -> Vào Main App
            router.replace('/(tabs)');
          }
          setChecking(false);
        }, 500);
      } catch (error) {
        console.error('Check status error:', error);
        router.replace('/auth');
      }
    };

    checkStatus();
  }, []);

  //   if (checking) {
  //     return (
  //       <View className="flex-1 justify-center items-center bg-white">
  //         <ActivityIndicator size="large" />
  //         <Text className="mt-4 text-lg">Đang kiểm tra trạng thái...</Text>
  //       </View>
  //     );
  //   }

  return null;
}

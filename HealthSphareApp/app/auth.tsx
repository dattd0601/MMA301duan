import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { authStore } from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'expo-router';


export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const profile = await AsyncStorage.getItem('health-app-storage');
    try {
      const user = await authStore.checkAuthStatus();
      if (user) {
        setIsAuthenticated(true);
        const hasCompletedOnboarding = useUserStore.getState().hasCompletedOnboarding;
        
        if (!hasCompletedOnboarding) {
          router.replace('/onboarding');
        } else {
          // router.replace('/(tabs)');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const handleAuthSuccess = async () => {
    setIsAuthenticated(true);
    
    // Give Zustand a tick to sync state if persist is slow, but getState is sync
    const hasCompletedOnboarding = useUserStore.getState().hasCompletedOnboarding;
    
    
    if (!hasCompletedOnboarding) {
      router.replace('/onboarding');
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleLogout = async () => {
    try {
      await authStore.logout();
      setIsAuthenticated(false);
      router.replace('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated) {
    const currentUser = authStore.getCurrentUser();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authenticatedContainer}>
          <Text style={styles.welcomeText}>
            Bạn có chắc muốn đăng xuất không, {currentUser?.fullName || 'User'}!
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isLogin ? (
            <LoginForm
              onLoginSuccess={handleAuthSuccess}
              onSwitchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              onRegisterSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

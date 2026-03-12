import React, { useState,useEffect, } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch,
  Platform
} from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import Colors from "../../constants/colors";
import { useUserStore } from "../../store/userStore";
import { useRouter } from "expo-router";
import { authStore } from '../../store/authStore';
import { 
  User, 
  Settings, 
  Crown, 
  Bell, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun
} from "lucide-react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { profile, setProfile, setHasCompletedOnboarding } = useUserStore();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === "dark");
  
 useEffect(() => {
  if (!profile) {
    setTimeout(() => {
      router.replace("/onboarding");
    }, 100); // delay để tránh lỗi "navigate before mount"
  }
}, [profile]);

if (!profile) {
  return null; // chờ redirect xong thì thôi
}

  

   const handleLogout = async () => {
     try {
      //  await authStore.logout();
      //  setIsAuthenticated(false);
       router.replace('/auth');
     } catch (error) {
       console.error('Logout error:', error);
     }
   };
  
  const handlePremiumPress = () => {
    router.push("/premium");
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Here you would handle actual notification permissions
  };
  
  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    // Here you would handle actual theme change
    // Note: In a real app, this would be handled by a theme provider
  };
   const currentUser = authStore.getCurrentUser();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <User size={40} color="white" />
          </View>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              Chào mừng, {currentUser?.fullName || 'User'}!
            </Text>
            <Text style={[styles.userDetails, { color: colors.muted }]}>
              {profile.gender === "male" ? "Nam" : "Nữ"}, {profile.age} tuổi
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.editButton, { borderColor: colors.border }]}
            onPress={() => router.push("/onboarding")}
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.height} cm
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Chiều cao
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.weight} kg
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Cân nặng
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {profile.goal === "lose" 
                ? "Giảm cân" 
                : profile.goal === "gain" 
                  ? "Tăng cân" 
                  : "Duy trì"}
            </Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>
              Mục tiêu
            </Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tài khoản
          </Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={handlePremiumPress}
          >
            <View style={styles.menuItemLeft}>
              <Crown size={20} color={colors.premium} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Nâng cấp Premium
              </Text>
            </View>
            <ChevronRight size={20} color={colors.muted} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={colors.muted} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Cài đặt tài khoản
              </Text>
            </View>
            <ChevronRight size={20} color={colors.muted} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Cài đặt
          </Text>
          
          <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
            <View style={styles.menuItemLeft}>
              <Bell size={20} color={colors.muted} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Thông báo
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={Platform.OS === "ios" ? undefined : "white"}
            />
          </View>
          
          <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
            <View style={styles.menuItemLeft}>
              {darkModeEnabled ? (
                <Moon size={20} color={colors.muted} />
              ) : (
                <Sun size={20} color={colors.muted} />
              )}
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Chế độ tối
              </Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={Platform.OS === "ios" ? undefined : "white"}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: colors.border }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.danger} />
          <Text style={[styles.logoutText, { color: colors.danger }]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});
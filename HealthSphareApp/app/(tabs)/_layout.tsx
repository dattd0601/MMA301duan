import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "../../hooks/useColorScheme";
import Colors from "../../constants/colors";
import { Home, Utensils, Dumbbell, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,  // Màu cho tab khi active
        tabBarInactiveTintColor: colors.tabIconDefault,  // Màu cho tab khi không active
        tabBarStyle: {
          backgroundColor: colors.background,  // Màu nền tab
          borderTopColor: colors.border,  // Màu viền trên của tab
        },
        headerStyle: {
          backgroundColor: colors.background,  // Màu nền header
        },
        headerTintColor: colors.text,  // Màu chữ trong header
        tabBarLabelStyle: {
          fontSize: 12,  // Kích thước chữ cho nhãn tab
        },
      }}
    >
      {/* Tab đầu tiên - Tổng quan */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang Chủ",  // Tiêu đề của tab
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,  // Biểu tượng của tab
        }}
      />

      {/* Tab thứ hai - Thực phẩm */}
      <Tabs.Screen
        name="food"
        options={{
          title: "Thực phẩm",
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
        }}
      />
  
      {/* Tab thứ ba - Bài tập */}
      <Tabs.Screen
        name="exercise"
        options={{
          title: "Bài tập",
          tabBarIcon: ({ color, size }) => <Dumbbell size={size} color={color} />,
        }}
      />

      {/* Tab thứ tư - Hồ sơ */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

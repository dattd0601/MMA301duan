import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { useUserStore } from "../store/userStore";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { hasCompletedOnboarding } = useUserStore();

  if (!hasCompletedOnboarding) {
    return (
      <>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="food" options={{ headerShown: false }} />
        </Stack>
      </>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: "modal",
            headerStyle: {
              backgroundColor: Colors[colorScheme].tint,
            },
            headerTintColor: "#fff",
          }} 
        />
        <Stack.Screen 
          name="premium" 
          options={{ 
            presentation: "modal",
            title: "Premium Plan",
            headerStyle: {
              backgroundColor: Colors[colorScheme].tint,
            },
            headerTintColor: "#fff",
          }} 
        />
      </Stack>
    </>
  );
}

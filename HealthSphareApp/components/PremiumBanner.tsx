import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { Crown, X } from "lucide-react-native";
import { useUserStore } from "../store/userStore";
import { useRouter } from "expo-router";

interface PremiumBannerProps {
  onClose?: () => void;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ onClose }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const { profile } = useUserStore();
  
  // Don't show for premium users
  if (profile?.isPremium) return null;
  
  const handlePress = () => {
    router.push("/premium");
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.premium }]}>
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={16} color="white" />
        </TouchableOpacity>
      )}
      
      <View style={styles.content}>
        <Crown size={24} color="white" style={styles.icon} />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Nâng cấp Premium</Text>
          <Text style={styles.description}>
            Loại bỏ quảng cáo và trải nghiệm ứng dụng tốt hơn
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: "white" }]}
          onPress={handlePress}
        >
          <Text style={[styles.buttonText, { color: colors.premium }]}>
            79.000đ/tháng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: 8,
    padding: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 12,
  },
});

export default PremiumBanner;
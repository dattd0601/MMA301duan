import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { useUserStore } from "../store/userStore";
import { useRouter } from "expo-router";
import { Crown, Check, X } from "lucide-react-native";

export default function PremiumScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const { setPremium } = useUserStore();
  
  const handleSubscribe = () => {
    // In a real app, this would handle payment processing
    // For demo purposes, we'll just set the user as premium
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    setPremium(true, oneMonthFromNow.toISOString());
    router.back();
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Crown size={40} color={colors.premium} />
          <Text style={[styles.title, { color: colors.text }]}>
            Nâng cấp lên Premium
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Trải nghiệm ứng dụng tốt hơn, không quảng cáo
          </Text>
        </View>
        
        <View style={[styles.priceCard, { backgroundColor: colors.card }]}>
          <View style={styles.priceHeader}>
            <Text style={[styles.planName, { color: colors.text }]}>
              Gói Premium
            </Text>
            <View style={[styles.badge, { backgroundColor: colors.premium }]}>
              <Text style={styles.badgeText}>Phổ biến</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.text }]}>79.000</Text>
            <Text style={[styles.currency, { color: colors.text }]}>đ</Text>
            <Text style={[styles.period, { color: colors.muted }]}>/tháng</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.subscribeButton, { backgroundColor: colors.premium }]}
            onPress={handleSubscribe}
          >
            <Text style={styles.subscribeButtonText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: colors.text }]}>
            Tính năng Premium
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIconContainer, { backgroundColor: colors.premium }]}>
                <Check size={16} color="white" />
              </View>
              <Text style={[styles.featureText, { color: colors.text }]}>
                Loại bỏ hoàn toàn quảng cáo
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIconContainer, { backgroundColor: colors.premium }]}>
                <Check size={16} color="white" />
              </View>
              <Text style={[styles.featureText, { color: colors.text }]}>
                Trải nghiệm mượt mà, không gián đoạn
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIconContainer, { backgroundColor: colors.premium }]}>
                <Check size={16} color="white" />
              </View>
              <Text style={[styles.featureText, { color: colors.text }]}>
                Hỗ trợ phát triển ứng dụng
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.testimonialsContainer}>
          <Text style={[styles.testimonialsTitle, { color: colors.text }]}>
            Người dùng nói gì
          </Text>
          
          <View style={[styles.testimonialCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.testimonialText, { color: colors.text }]}>
              "Tôi đã sử dụng ứng dụng này để giảm cân và rất hài lòng với kết quả. Phiên bản Premium giúp tôi tập trung hơn vào mục tiêu của mình."
            </Text>
            <View style={styles.testimonialAuthor}>
              <Text style={[styles.authorName, { color: colors.text }]}>
                Nguyễn Văn A
              </Text>
              <Text style={[styles.authorDetails, { color: colors.muted }]}>
                Đã giảm 5kg trong 2 tháng
              </Text>
            </View>
          </View>
          
          <View style={[styles.testimonialCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.testimonialText, { color: colors.text }]}>
              "Các món ăn Việt Nam được đề xuất rất phù hợp với khẩu vị của tôi. Tôi đã tăng cân khỏe mạnh nhờ ứng dụng này."
            </Text>
            <View style={styles.testimonialAuthor}>
              <Text style={[styles.authorName, { color: colors.text }]}>
                Trần Thị B
              </Text>
              <Text style={[styles.authorDetails, { color: colors.muted }]}>
                Đã tăng 3kg trong 1 tháng
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.cancelButton, { borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.cancelButtonText, { color: colors.muted }]}>
            Để sau
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
    alignItems: "center",
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  priceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 2,
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
  },
  subscribeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  featuresList: {
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
  },
  testimonialsContainer: {
    marginBottom: 24,
  },
  testimonialsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  testimonialCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
    marginBottom: 12,
  },
  testimonialAuthor: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
  },
  authorDetails: {
    fontSize: 12,
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
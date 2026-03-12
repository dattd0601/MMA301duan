import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useColorScheme } from "../hooks/useColorScheme";
import Colors from "../constants/colors";
import { useUserStore } from "../store/userStore";
import { activityLevels } from "../constants/activityLevels";
import { ChevronRight } from "lucide-react-native";

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  
  const { setProfile, setHasCompletedOnboarding, hasCompletedOnboarding } = useUserStore();
  
  const [step, setStep] = useState(hasCompletedOnboarding ? 0 : 1);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [goal, setGoal] = useState<"gain" | "lose" | "maintain" | "">("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  
  const isStepValid = () => {
    switch (step) {
      case 1:
        return height !== "" && weight !== "" && age !== "";
      case 2:
        return gender !== "";
      case 3:
        return goal !== "";
      case 4:
        return activityLevel !== "";
      default:
        return true;
    }
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save all data
      setProfile({
        height: parseFloat(height),
        weight: parseFloat(weight),
        age: parseInt(age),
        gender: gender as "male" | "female",
        goal: goal as "gain" | "lose" | "maintain",
        activityLevel: activityLevel as any,
        waterIntake: [],
        waterGoal: Math.round(parseFloat(weight) * 0.03 * 1000), // in ml
        isPremium: false,
      });
      
      setHasCompletedOnboarding(true);
      router.replace("/(tabs)");
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Thông tin cơ bản
            </Text>
            <Text style={[styles.stepDescription, { color: colors.muted }]}>
              Nhập thông tin cơ bản để tính toán chỉ số BMI và nhu cầu calo
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Chiều cao (cm)</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={height}
                onChangeText={setHeight}
                placeholder="Ví dụ: 170"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Cân nặng (kg)</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={weight}
                onChangeText={setWeight}
                placeholder="Ví dụ: 65"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Tuổi</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={age}
                onChangeText={setAge}
                placeholder="Ví dụ: 30"
                placeholderTextColor={colors.muted}
                keyboardType="numeric"
              />
            </View>
          </View>
        );
        
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Giới tính
            </Text>
            <Text style={[styles.stepDescription, { color: colors.muted }]}>
              Giới tính ảnh hưởng đến cách tính toán nhu cầu calo hàng ngày
            </Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: gender === "male" ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setGender("male")}
              >
                <Text 
                  style={[
                    styles.optionText, 
                    { color: gender === "male" ? "white" : colors.text }
                  ]}
                >
                  Nam
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: gender === "female" ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setGender("female")}
              >
                <Text 
                  style={[
                    styles.optionText, 
                    { color: gender === "female" ? "white" : colors.text }
                  ]}
                >
                  Nữ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Mục tiêu của bạn
            </Text>
            <Text style={[styles.stepDescription, { color: colors.muted }]}>
              Chọn mục tiêu để chúng tôi đề xuất kế hoạch phù hợp
            </Text>
            
            <View style={styles.goalOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.goalOption,
                  { 
                    backgroundColor: goal === "lose" ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setGoal("lose")}
              >
                <Text 
                  style={[
                    styles.goalTitle, 
                    { color: goal === "lose" ? "white" : colors.text }
                  ]}
                >
                  Giảm cân
                </Text>
                <Text 
                  style={[
                    styles.goalDescription, 
                    { color: goal === "lose" ? "rgba(255,255,255,0.8)" : colors.muted }
                  ]}
                >
                  Giảm mỡ thừa và cải thiện vóc dáng
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.goalOption,
                  { 
                    backgroundColor: goal === "maintain" ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setGoal("maintain")}
              >
                <Text 
                  style={[
                    styles.goalTitle, 
                    { color: goal === "maintain" ? "white" : colors.text }
                  ]}
                >
                  Duy trì cân nặng
                </Text>
                <Text 
                  style={[
                    styles.goalDescription, 
                    { color: goal === "maintain" ? "rgba(255,255,255,0.8)" : colors.muted }
                  ]}
                >
                  Giữ cân nặng hiện tại và cải thiện sức khỏe
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.goalOption,
                  { 
                    backgroundColor: goal === "gain" ? colors.primary : colors.card,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setGoal("gain")}
              >
                <Text 
                  style={[
                    styles.goalTitle, 
                    { color: goal === "gain" ? "white" : colors.text }
                  ]}
                >
                  Tăng cân
                </Text>
                <Text 
                  style={[
                    styles.goalDescription, 
                    { color: goal === "gain" ? "rgba(255,255,255,0.8)" : colors.muted }
                  ]}
                >
                  Tăng cân và phát triển cơ bắp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Mức độ hoạt động
            </Text>
            <Text style={[styles.stepDescription, { color: colors.muted }]}>
              Chọn mức độ hoạt động thể chất hàng ngày của bạn
            </Text>
            
            <ScrollView style={styles.activityContainer}>
              {activityLevels.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  style={[
                    styles.activityOption,
                    { 
                      backgroundColor: activityLevel === activity.id ? colors.primary : colors.card,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setActivityLevel(activity.id)}
                >
                  <View style={styles.activityContent}>
                    <Text 
                      style={[
                        styles.activityTitle, 
                        { color: activityLevel === activity.id ? "white" : colors.text }
                      ]}
                    >
                      {activity.label}
                    </Text>
                    <Text 
                      style={[
                        styles.activityDescription, 
                        { color: activityLevel === activity.id ? "rgba(255,255,255,0.8)" : colors.muted }
                      ]}
                    >
                      {activity.description}
                    </Text>
                  </View>
                  
                  {activityLevel === activity.id && (
                    <ChevronRight size={20} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.appName, { color: colors.primary }]}>
              Health Tracker
            </Text>
            <Text style={[styles.appTagline, { color: colors.text }]}>
              Theo dõi sức khỏe, đạt mục tiêu
            </Text>
          </View>
          
          <View style={styles.stepsIndicator}>
            {[1, 2, 3, 4].map((i) => (
              <View 
                key={i}
                style={[
                  styles.stepDot,
                  { 
                    backgroundColor: i <= step ? colors.primary : colors.border,
                  }
                ]}
              />
            ))}
          </View>
          
          {renderStep()}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              { 
                backgroundColor: isStepValid() ? colors.primary : colors.border,
                opacity: isStepValid() ? 1 : 0.7,
              }
            ]}
            onPress={handleNext}
            disabled={!isStepValid()}
          >
            <Text style={styles.nextButtonText}>
              {step < 4 ? "Tiếp tục" : "Hoàn thành"}
            </Text>
            <ChevronRight size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
  },
  stepsIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  stepContainer: {
    flex: 1,
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
  },
  goalOptionsContainer: {
    marginTop: 10,
  },
  goalOption: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
  },
  activityContainer: {
    maxHeight: 350,
  },
  activityOption: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
});
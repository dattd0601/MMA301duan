/**
 * BMI Thresholds according to various health standards
 */
export const BMI_THRESHOLDS = {
  UNDERWEIGHT: 18.5,
  NORMAL_MAX: 23,
  OVERWEIGHT_MAX: 25,
};

/**
 * Tính toán chỉ số BMI dựa trên cân nặng và chiều cao
 * @param {number} weight - Cân nặng tính bằng kg
 * @param {number} height - Chiều cao tính bằng cm
 * @returns {number} Giá trị BMI
 */
export const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };
  
  /**
   * Phân loại chỉ số BMI theo các ngưỡng chuẩn
   * @param {number} bmi - Giá trị BMI cần phân loại
   * @returns {string} Phân loại BMI (thiếu cân, bình thường, thừa cân, béo phì)
   */
  export const getBMICategory = (bmi: number): string => {
    if (bmi < BMI_THRESHOLDS.UNDERWEIGHT) return "underweight";
    if (bmi >= BMI_THRESHOLDS.UNDERWEIGHT && bmi < BMI_THRESHOLDS.NORMAL_MAX) return "normal";
    if (bmi >= BMI_THRESHOLDS.NORMAL_MAX && bmi < BMI_THRESHOLDS.OVERWEIGHT_MAX) return "overweight";
    return "obese";
  };
  
  /**
   * Tính toán nhu cầu calo hàng ngày (TDEE)
   * Sử dụng phương trình Mifflin-St Jeor để tính BMR
   * @param {number} weight - Cân nặng tính bằng kg
   * @param {number} height - Chiều cao tính bằng cm
   * @param {number} age - Tuổi tính theo năm
   * @param {string} gender - Giới tính ("male" hoặc "female")
   * @param {string} activityLevel - Mức độ hoạt động (sedentary, light, moderate, active, very_active)
   * @param {string} goal - Mục tiêu cân nặng (lose, maintain, gain)
   * @returns {number} Nhu cầu calo hàng ngày đã làm tròn
   */
  export const calculateDailyCalories = (
    weight: number,
    height: number,
    age: number,
    gender: string,
    activityLevel: string,
    goal: string
  ): number => {
    // Tính toán Tỉ lệ trao đổi chất cơ bản (BMR)
    let bmr = 0;
    if (gender === "male") {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Áp dụng hệ số vận động
    let activityMultiplier = 1.2; // Ít vận động
    switch (activityLevel) {
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "very_active":
        activityMultiplier = 1.9;
        break;
    }
    
    let dailyCalories = bmr * activityMultiplier;
    
    // Điều chỉnh calo dựa trên mục tiêu
    if (goal === "lose") {
      dailyCalories -= 500; // Thâm hụt calo để giảm cân
    } else if (goal === "gain") {
      dailyCalories += 500; // Dư thừa calo để tăng cân
    }
    
    return Math.round(dailyCalories);
  };
  
  /**
   * Tính toán lượng nước khuyến nghị hàng ngày
   * @param {number} weight - Cân nặng tính bằng kg
   * @param {string} activityLevel - Mức độ hoạt động
   * @returns {number} Lượng nước khuyến nghị tính bằng ml
   */
  export const calculateWaterIntake = (weight: number, activityLevel: string): number => {
    // Công thức cơ bản: 30ml trên mỗi kg trọng lượng cơ thể
    let waterIntake = weight * 30;
    
    // Điều chỉnh dựa trên mức độ hoạt động thể chất
    if (activityLevel === "active" || activityLevel === "very_active") {
      waterIntake *= 1.2; // Tăng thêm 20% cho người năng động
    }
    
    return Math.round(waterIntake);
  };
  
  /**
   * Tính toán phân bổ các chất dinh dưỡng đa lượng (Macronutrients)
   * @param {number} calories - Tổng số calo hàng ngày
   * @param {string} goal - Mục tiêu cân nặng
   * @returns {Object} Phân bổ chất dinh dưỡng (Protein, Carbs, Fat) tính bằng gram
   */
  export const calculateMacros = (calories: number, goal: string) => {
    // Tỷ lệ phần trăm mặc định (Duy trì)
    let proteinPercentage = 0.3; // 30%
    let fatPercentage = 0.25; // 25%
    let carbsPercentage = 0.45; // 45%
    
    // Điều chỉnh tỷ lệ dựa trên mục tiêu
    if (goal === "gain") {
      proteinPercentage = 0.25;
      carbsPercentage = 0.5;
      fatPercentage = 0.25;
    } else if (goal === "lose") {
      proteinPercentage = 0.35;
      carbsPercentage = 0.4;
      fatPercentage = 0.25;
    }
    
    // Tính toán số gram (Protein/Carbs: 4 cal/g, Fat: 9 cal/g)
    const proteinGrams = Math.round((calories * proteinPercentage) / 4);
    const carbsGrams = Math.round((calories * carbsPercentage) / 4);
    const fatGrams = Math.round((calories * fatPercentage) / 9);
    
    return {
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
    };
  };

  /**
   * Tính toán cân nặng lý tưởng (Ideal Body Weight - IBW)
   * Sử dụng công thức Devine
   * @param {number} height - Chiều cao tính bằng cm
   * @param {string} gender - Giới tính ("male" hoặc "female")
   * @returns {number} Cân nặng lý tưởng tính bằng kg
   */
  export const calculateIdealBodyWeight = (height: number, gender: string): number => {
    const heightInInches = height / 2.54;
    const inchesOver5Feet = Math.max(0, heightInInches - 60);
    
    if (gender === "male") {
      return Math.round(50 + 2.3 * inchesOver5Feet);
    } else {
      return Math.round(45.5 + 2.3 * inchesOver5Feet);
    }
  };
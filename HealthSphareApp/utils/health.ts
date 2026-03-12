/**
 * Calculates BMI based on height and weight
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI value
 */
export const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };
  
  /**
   * Gets BMI category based on BMI value
   * @param {number} bmi - BMI value
   * @returns {string} BMI category
   */
  export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "underweight";
    if (bmi >= 18.5 && bmi < 23) return "normal";
    if (bmi >= 23 && bmi < 25) return "overweight";
    return "obese";
  };
  
  /**
   * Calculates daily calorie needs
   * @param {number} weight - Weight in kg
   * @param {number} height - Height in cm
   * @param {number} age - Age in years
   * @param {string} gender - "male" or "female"
   * @param {string} activityLevel - Activity level
   * @param {string} goal - Weight goal
   * @returns {number} Daily calorie needs
   */
  export const calculateDailyCalories = (
    weight: number,
    height: number,
    age: number,
    gender: string,
    activityLevel: string,
    goal: string
  ): number => {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Apply activity multiplier
    let activityMultiplier = 1.2; // sedentary
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
    
    // Adjust based on goal
    if (goal === "lose") {
      dailyCalories -= 500; // Deficit for weight loss
    } else if (goal === "gain") {
      dailyCalories += 500; // Surplus for weight gain
    }
    
    return Math.round(dailyCalories);
  };
  
  /**
   * Calculates recommended water intake
   * @param {number} weight - Weight in kg
   * @param {string} activityLevel - Activity level
   * @returns {number} Recommended water intake in ml
   */
  export const calculateWaterIntake = (weight: number, activityLevel: string): number => {
    // Base calculation: 30ml per kg of body weight
    let waterIntake = weight * 30;
    
    // Adjust based on activity level
    if (activityLevel === "active" || activityLevel === "very_active") {
      waterIntake *= 1.2; // 20% more for active individuals
    }
    
    return Math.round(waterIntake);
  };
  
  /**
   * Calculates macronutrient distribution
   * @param {number} calories - Total daily calories
   * @param {string} goal - Weight goal
   * @returns {Object} Macronutrient distribution in grams
   */
  export const calculateMacros = (calories: number, goal: string) => {
    let proteinPercentage = 0.3; // 30%
    let fatPercentage = 0.25; // 25%
    let carbsPercentage = 0.45; // 45%
    
    // Adjust macros based on goal
    if (goal === "gain") {
      proteinPercentage = 0.25; // 25%
      carbsPercentage = 0.5; // 50%
      fatPercentage = 0.25; // 25%
    } else if (goal === "lose") {
      proteinPercentage = 0.35; // 35%
      carbsPercentage = 0.4; // 40%
      fatPercentage = 0.25; // 25%
    }
    
    // Calculate grams
    const proteinGrams = Math.round((calories * proteinPercentage) / 4); // 4 calories per gram
    const carbsGrams = Math.round((calories * carbsPercentage) / 4); // 4 calories per gram
    const fatGrams = Math.round((calories * fatPercentage) / 9); // 9 calories per gram
    
    return {
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
    };
  };
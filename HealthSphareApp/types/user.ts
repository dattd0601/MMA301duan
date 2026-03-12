export interface UserProfile {
    height: number; // in cm
    weight: number; // in kg
    gender: "male" | "female";
    age: number;
    goal: "gain" | "lose" | "maintain";
    activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
    waterIntake: number[]; // Array of timestamps when water was consumed
    waterGoal: number; // Daily water goal in ml
    isPremium: boolean;
    premiumUntil?: string; // ISO date string
  }
  
  export interface BMIResult {
    value: number;
    category: "underweight" | "normal" | "overweight" | "obese";
    description: string;
  }
  
  export interface CalorieResult {
    bmr: number;
    dailyCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  }
  
  export interface WaterIntakeGoal {
    amount: number; // in ml
    consumed: number; // in ml
    percentage: number; // 0-100
  }

  export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

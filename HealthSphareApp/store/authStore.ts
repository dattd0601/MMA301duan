import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/user';
import { useUserStore } from './userStore';

const API_URL = 'http://192.168.3.250:5005/api/users';

class AuthStore {
  private currentUser: Omit<User, 'password'> | null = null;

  // Đăng ký tài khoản mới
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Mật khẩu xác nhận không khớp' };
      }

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          fullName: userData.fullName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Đã xảy ra lỗi khi đăng ký' };
      }

      const { password, ...userWithoutPassword } = data.user;
      this.currentUser = userWithoutPassword;
      await AsyncStorage.setItem('healthshare_current_user', JSON.stringify(userWithoutPassword));

      // Load profile data from the backend user object
      useUserStore.getState().loadProfile(data.user);

      return {
        success: true,
        message: 'Đăng ký thành công',
        user: userWithoutPassword
      };
    } catch (error) {
      return { success: false, message: 'Lỗi mạng khi đăng ký' };
    }
  }

  // Đăng nhập
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Email hoặc mật khẩu không đúng' };
      }

      const { password, ...userWithoutPassword } = data.user;
      this.currentUser = userWithoutPassword;
      await AsyncStorage.setItem('healthshare_current_user', JSON.stringify(userWithoutPassword));

      // Load profile data from the backend user object
      useUserStore.getState().loadProfile(data.user);

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword
      };
    } catch (error) {
      return { success: false, message: 'Lỗi mạng khi đăng nhập' };
    }
  }

  // Đăng xuất
  async logout(): Promise<void> {
    this.currentUser = null;
    await AsyncStorage.removeItem('healthshare_current_user');
    
    // Clear local profile storage so next login/registration starts fresh
    useUserStore.getState().clearProfile();
  }

  // Lấy user hiện tại
  getCurrentUser(): Omit<User, 'password'> | null {
    return this.currentUser;
  }

  // Kiểm tra đã đăng nhập
  async checkAuthStatus(): Promise<Omit<User, 'password'> | null> {
    try {
      const storedUser = await AsyncStorage.getItem('healthshare_current_user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export const authStore = new AuthStore();

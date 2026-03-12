import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/user';
import usersData from '../mocks/users.json';

class AuthStore {
  private users: User[] = usersData.users;
  private currentUser: Omit<User, 'password'> | null = null;

  // Load users từ AsyncStorage khi khởi động
  async loadUsers(): Promise<void> {
    try {
      const storedUsers = await AsyncStorage.getItem('healthshare_users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  // Save users vào AsyncStorage
  private async saveUsers(): Promise<void> {
    try {
      await AsyncStorage.setItem('healthshare_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  // Đăng ký tài khoản mới
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      // Kiểm tra email đã tồn tại
      const existingUser = this.users.find(user => user.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email đã được sử dụng'
        };
      }

      // Kiểm tra mật khẩu xác nhận
      if (userData.password !== userData.confirmPassword) {
        return {
          success: false,
          message: 'Mật khẩu xác nhận không khớp'
        };
      }

      // Tạo user mới
      const newUser: User = {
        id: this.users.length + 1,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        createdAt: new Date().toISOString()
      };

      this.users.push(newUser);
      await this.saveUsers();

      // Trả về thông tin user (không bao gồm password)
      const { password, ...userWithoutPassword } = newUser;
      this.currentUser = userWithoutPassword;

      return {
        success: true,
        message: 'Đăng ký thành công',
        user: userWithoutPassword
      };
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng ký'
      };
    }
  }

  // Đăng nhập
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      await this.loadUsers();
      
      const user = this.users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        return {
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        };
      }

      // Lưu thông tin đăng nhập
      const { password, ...userWithoutPassword } = user;
      this.currentUser = userWithoutPassword;
      await AsyncStorage.setItem('healthshare_current_user', JSON.stringify(userWithoutPassword));

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword
      };
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng nhập'
      };
    }
  }

  // Đăng xuất
  async logout(): Promise<void> {
    this.currentUser = null;
    await AsyncStorage.removeItem('healthshare_current_user');
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

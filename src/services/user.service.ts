import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/axios.config';

// Định nghĩa interface cho User
export interface User {
  id: number;
  name: string;
  email: string;
  // Thêm các trường khác nếu cần
}

// Định nghĩa interface cho request tạo/cập nhật user
export interface UserInput {
  name: string;
  email: string;
  // Thêm các trường khác nếu cần
}

class UserService {
  // Lấy danh sách users
  async getUsers(page: number = 1, limit: number = 10) {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.BASE, {
      params: { page, limit }
    });
    return response.data;
  }

  // Lấy thông tin user theo ID
  async getUserById(id: number | string) {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  }

  // Tạo user mới
  async createUser(userData: UserInput) {
    const response = await axiosInstance.post(API_ENDPOINTS.USERS.BASE, userData);
    return response.data;
  }

  // Cập nhật thông tin user
  async updateUser(id: number | string, userData: Partial<UserInput>) {
    const response = await axiosInstance.put(API_ENDPOINTS.USERS.BY_ID(id), userData);
    return response.data;
  }

  // Xóa user
  async deleteUser(id: number | string) {
    const response = await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  }
}

export const userService = new UserService();
export default userService;
import axiosInstance from '../../../config/axios.config';
import { API_ENDPOINTS } from '../../../config/axios.config';
import { User } from '../type';

export const getUsers = async (page: number = 1, limit: number = 10): Promise<User[]> => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.USERS.BASE, {
            params: { page, limit }
        });
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export default { getUsers };
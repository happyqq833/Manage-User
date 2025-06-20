import { z } from 'zod';

export const userSchema = z.object({
    id: z.string().optional(),
    username: z.string().min(1, 'Username không được để trống'),
    fullName: z.string().min(1, 'Tên không được để trống'),
    dob: z.string().min(1, 'Ngày sinh không được để trống'),
    phone: z.string().min(1, 'Số điện thoại không được để trống'),
    address: z.string().min(1, 'Địa chỉ không được để trống'),
    department: z.string().min(1, 'Phòng ban không được để trống'),
    position: z.string().min(1, 'Chức vụ không được để trống'),
    role: z.enum(['hr', 'employee'], { required_error: 'Vai trò không hợp lệ' }),
    avatar: z.string().optional()
});

export type UserForm = z.infer<typeof userSchema>; 
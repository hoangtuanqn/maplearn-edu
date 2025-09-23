import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("Vui lòng nhập tên tài khoản"),
    password: z.string().nonempty("Vui lòng nhập mật khẩu"),
});
export type FormLoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        full_name: z
            .string()
            .min(5, "Họ và tên phải có ít nhất 5 ký tự")
            .max(50, "Họ và tên không được vượt quá 50 ký tự")
            .nonempty("Vui lòng không bỏ trống họ và tên"),
        email: z
            .string()
            .nonempty("Vui lòng nhập email")
            .min(10, "Email phải có ít nhất 10 kí tự")
            .max(70, "Chỉ được nhập tối đa 70 kí tự")
            .email("Email không hợp lệ"),
        username: z
            .string()
            .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
            .max(30, "Chỉ được nhập tối đa 30 kí tự")
            .nonempty("Vui lòng nhập tên đăng nhập"),
        password: z
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .max(255, "Chỉ được nhập tối đa 255 kí tự")
            .nonempty("Vui lòng nhập mật khẩu"),
        confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"], // hiển thị lỗi ở confirmPassword
    });
export type FormRegisterType = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .nonempty("Vui lòng nhập email")
        .min(10, "Email phải có ít nhất 10 kí tự")
        .max(70, "Chỉ được nhập tối đa 70 kí tự")
        .email("Email không hợp lệ"),
});
export type FormForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        email: z
            .string()
            .nonempty("Vui lòng nhập email")
            .min(10, "Email phải có ít nhất 10 kí tự")
            .max(70, "Chỉ được nhập tối đa 70 kí tự")
            .email("Email không hợp lệ"),
        password: z
            .string()
            .min(6, "Mật khẩu tối thiểu 6 kí tự")
            .max(70, "Chỉ được nhập tối đa 70 kí tự")
            .nonempty("Vui lòng nhập mật khẩu"),
        confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"], // hiển thị lỗi ở confirmPassword
    });
export type FormResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const passwordStrengthSchema = z.object({
    score: z.number().min(0).max(4),
    strengthPercent: z.number().min(0).max(100),
    label: z.string(), // bạn có thể dùng .enum nếu muốn giới hạn
    suggestions: z.array(z.string()),
});

// Type tương ứng (nếu cần):
export type PasswordStrengthType = z.infer<typeof passwordStrengthSchema>;
export type ResetPasswordPageProps = {
    success: boolean;
    message: string;
    data?: {
        email: string;
    };
};

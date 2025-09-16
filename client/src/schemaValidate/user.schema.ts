import { z } from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

export const userSchema = z.object({
    id: z.number().int().positive(),
    username: z.string(),
    full_name: z.string(),
    email: z.string(),
    phone_number: z.string().nullable(),
    gender: z.enum(["male", "female", "other"]),
    avatar: z.string(),
    birth_year: z.number().optional(),
    facebook_link: z.string(),
    school: z.string().nullable(),
    city: z.string().nullable(),
    bio: z.string().nullable(),
    degree: z.string().nullable(),
    role: z.enum(["student", "teacher", "admin"]),
    banned: z.boolean().default(false),
    google2fa_enabled: z.boolean().default(false),
    email_verified_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type UserType = z.infer<typeof userSchema>;

const _studentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userSchema,
});
export type StudentDetailResponseType = z.infer<typeof _studentResponseSchema>;

const _studentListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(userSchema),
});
export type StudentListResponseType = z.infer<typeof _studentListResponseSchema>;

export const changePasswordSchema = z
    .object({
        password_old: z.string().nonempty("Vui lòng nhập mật khẩu cũ"),
        password_new: z
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .max(255, "Chỉ được nhập tối đa 255 kí tự")
            .nonempty("Vui lòng nhập mật khẩu"),
        confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    })
    .refine((data) => data.password_new !== data.password_old, {
        message: "Mật khẩu mới và cũ phải khác nhau",
        path: ["password_new"], // hiển thị lỗi ở confirmPassword
    })
    .refine((data) => data.password_new === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"], // hiển thị lỗi ở confirmPassword
    });
export type FormChangePasswordType = z.infer<typeof changePasswordSchema>;

export const profileSchema = z.object({
    full_name: z
        .string()
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(50, "Họ và tên không được vượt quá 50 ký tự")
        .nonempty("Vui lòng không bỏ trống họ và tên"),
    birth_year: z
        .number()
        .min(1995, "Yêu cầu năm sinh từ 1995 trở đi")
        .max(2013, "Yêu cầu năm sinh không quá 2013")
        .max(new Date().getFullYear(), "Năm sinh không hợp lệ")
        .optional()
        .nullable(),
    gender: z.enum(["male", "female", "other"], "Vui lòng chọn giới tính"),
    school: z
        .string()
        .min(2, "Tên trường phải có ít nhất 2 ký tự")
        .max(100, "Tên trường không được vượt quá 100 ký tự")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    city: z
        .string()
        .min(2, "Tên thành phố phải có ít nhất 2 ký tự")
        .max(100, "Tên thành phố không được vượt quá 100 ký tự")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    facebook_link: z
        .string()
        .url("URL Facebook không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    phone_number: z
        .string()
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(15, "Số điện thoại không hợp lệ")
        .regex(/^[0-9+() -]+$/, "Số điện thoại không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    avatar: z
        .string()
        .url("URL ảnh không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
});
export type ProfileType = z.infer<typeof profileSchema>;

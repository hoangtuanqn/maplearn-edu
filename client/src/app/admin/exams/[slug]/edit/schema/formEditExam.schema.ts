import z from "zod";

const formSchema = z
    .object({
        title: z
            .string()
            .min(15, { message: "Tên đề thi phải có ít nhất 15 ký tự." })
            .max(255, { message: "Tên đề thi không được vượt quá 255 ký tự." }),
        exam_category: z.string().min(1, { message: "Vui lòng chọn loại đề thi." }),
        subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
        grade_level: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
        province: z.string().min(1, { message: "Vui lòng chọn tỉnh thành." }),
        difficulty: z.enum(["easy", "normal", "hard", "very_hard"], {
            message: "Vui lòng chọn độ khó.",
        }),
        max_score: z
            .number()
            .min(10, { message: "Điểm thiểu phải từ 10 trở lên." })
            .max(100, { message: "Điểm tối đa không được vượt quá 100." }),
        pass_score: z.number().min(0, { message: "Điểm qua môn phải lớn hơn hoặc bằng 0." }),
        duration_minutes: z
            .number()
            .min(15, { message: "Thời gian làm bài phải lớn hơn 15 phút." })
            .max(300, { message: "Thời gian làm bài không được vượt quá 300 phút." }),
        is_active: z.boolean(),
        max_attempts: z.number().min(0, { message: "Số lần làm bài tối đa phải lớn hơn 0." }).optional(),
        is_password_protected: z.boolean().optional(),
        anti_cheat_enabled: z.boolean().optional(),
    })
    .refine(
        (data) => {
            // pass_score không được vượt quá 70% max_score
            return data.pass_score <= data.max_score * 0.7;
        },
        {
            message: "Điểm qua môn không được vượt quá 70% điểm tối đa.",
            path: ["pass_score"],
        },
    )
    .refine(
        (data) => {
            // pass_score phải nhỏ hơn max_score
            return data.pass_score < data.max_score;
        },
        {
            message: "Điểm qua môn phải nhỏ hơn điểm tối đa.",
            path: ["pass_score"],
        },
    );
export default formSchema;

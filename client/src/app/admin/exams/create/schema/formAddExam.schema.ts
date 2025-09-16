import z from "zod";

const formSchema = z
    .object({
        title: z.string().min(2, { message: "Tên đề thi phải có ít nhất 2 ký tự." }),
        exam_category: z.string().min(1, { message: "Vui lòng chọn loại đề thi." }),
        subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
        grade_level: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
        province: z.string().min(1, { message: "Vui lòng chọn tỉnh thành." }),
        difficulty: z.enum(["easy", "normal", "hard", "very_hard"], {
            message: "Vui lòng chọn độ khó.",
        }),
        max_score: z.number().min(1, { message: "Điểm tối đa phải lớn hơn 0." }),
        pass_score: z.number().min(0, { message: "Điểm qua môn phải lớn hơn hoặc bằng 0." }),
        duration_minutes: z.number().min(1, { message: "Thời gian làm bài phải lớn hơn 0 phút." }),
        start_time: z.string().min(1, { message: "Vui lòng chọn thời gian bắt đầu." }),
        end_time: z.string(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        is_active: z.boolean(),
        is_shuffle_questions: z.boolean(),
        is_shuffle_answers: z.boolean(),
        is_show_result: z.boolean(),
        is_retakeable: z.boolean(),
        max_attempts: z.number().min(1, { message: "Số lần làm bài tối đa phải lớn hơn 0." }).optional(),
    })
    .refine(
        (data) => {
            // Kiểm tra pass_score không vượt quá max_score
            return data.pass_score <= data.max_score;
        },
        {
            message: "Điểm qua môn không được vượt quá điểm tối đa.",
            path: ["pass_score"],
        },
    )
    .refine(
        (data) => {
            // Nếu end_time không có giá trị, bỏ qua kiểm tra
            if (!data.end_time) return true;
            const startTime = new Date(data.start_time);
            const endTime = new Date(data.end_time);
            return endTime > startTime;
        },
        {
            message: "Thời gian kết thúc phải sau thời gian bắt đầu.",
            path: ["end_time"],
        },
    )
    .refine(
        (data) => {
            const startTime = new Date(data.start_time);
            const now = new Date();
            return startTime >= now;
        },
        {
            message: "Thời gian bắt đầu không được nhỏ hơn thời gian hiện tại.",
            path: ["start_time"],
        },
    )
    .refine(
        (data) => {
            const startTime = new Date(data.start_time);
            const now = new Date();
            // 1 tháng = 30 ngày
            const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return startTime <= oneMonthLater;
        },
        {
            message: "Thời gian bắt đầu không được lớn hơn hiện tại quá 1 tháng.",
            path: ["start_time"],
        },
    );
export default formSchema;

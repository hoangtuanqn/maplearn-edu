import z from "zod";

const formSchema = z.object({
    name: z.string().min(2, { message: "Tên khóa học phải có ít nhất 2 ký tự." }),
    subject: z.string().min(1, { message: "Vui lòng chọn môn học." }),
    category: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
    grade_level: z.string().min(1, { message: "Vui lòng chọn cấp bậc." }),
    user_id: z.string().min(1, { message: "Vui lòng chọn giáo viên giảng dạy." }),
    price: z.number().min(0, { message: "Giá khóa học phải lớn hơn hoặc bằng 0." }),
    prerequisite_course_id: z.string(),
    thumbnail: z.string().url("Vui lòng nhập URL hợp lệ."),
    intro_video: z.string().url("Vui lòng nhập URL hợp lệ."),
    description: z.string().min(10, { message: "Mô tả khóa học phải có ít nhất 10 ký tự." }),
});

export default formSchema;

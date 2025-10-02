import z from "zod";

const courseSchema = z.object({
    name: z.string(),
    students_count: z.number(),
    slug: z.string(),
    revenue: z.number(),
});

const studentSchema = z.object({
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    paid_at: z.string(),
});

const feedbackSchema = z.object({
    course_id: z.number(),
    course_name: z.string(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    rating: z.number(),
    comment: z.string(),
    created_at: z.string(),
});

const studentsPerCourseSchema = z.object({
    course_name: z.string(),
    students_count: z.number(),
});

const recentExamSubmissionSchema = z.object({
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    exam_title: z.string().nullable(),
    score: z.number(),
    submitted_at: z.string(),
});

const dashboardSchema = z.object({
    // số khóa học đang giảng dạy
    total_courses: z.number(),
    // số học viên đang theo học
    total_students: z.number(),
    // số đề thi đã tạo
    total_exams: z.number(),
    // thu thập tháng này
    total_in_this_month: z.number(),
    // top 4 khóa học phổ biến (nhiều sinh viên đăng ký)
    top_courses: z.array(courseSchema),
    // top 4 khóa học ít phổ biến
    least_popular_courses: z.array(courseSchema),
    // học sinh mới đăng ký khóa học
    top_4_new_students: z.array(studentSchema),
    // 4 feedback mới nhất
    new_feedbacks: z.array(feedbackSchema),
    // Thống kê phân bố học viên theo khóa học
    students_per_course: z.array(studentsPerCourseSchema),
    // 4 lượt nộp bài thi gần nhất
    recent_exam_submissions: z.array(recentExamSubmissionSchema),
});

const _dashboardResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: dashboardSchema,
});

export type DashboardResponse = z.infer<typeof _dashboardResponseSchema>;

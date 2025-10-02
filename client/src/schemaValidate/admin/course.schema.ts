import { z } from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

// Keep the old schema for backward compatibility

const studentEnrollment = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    phone_number: z.string().nullable(),
    enrolled_at: z.string(),
    is_completed: z.boolean(),
    completion_date: z.string().nullable(),
    certificate_code: z.string().nullable(),
    completed_lessons: z.number(),
    total_lessons: z.number(),
    completion_percentage: z.number(),
    all_lessons_completed: z.boolean(),
    exam_required: z.boolean(),
    exam_passed: z.boolean(),
    exam_score: z.number(),
    lessons_in_week: z.number(),
    hours_in_week: z.number(),
    status: z.enum(["Đang học", "Đã hoàn thành", "Chưa đạt bài thi", "Chờ cấp chứng chỉ"]),
});

const _studentEnrollmentResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(studentEnrollment),
});
export type StudentEnrollmentResponse = z.infer<typeof _studentEnrollmentResponse>;

// get thông tin bài giảng đã học
export const historyLearning = z.object({
    id: z.number(),
    user_id: z.number(),
    lesson_id: z.number(),
    progress: z.number(),
    is_completed: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    lesson: z.object({
        id: z.number(),
        chapter_id: z.number(),
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        video_url: z.string(),
        position: z.number(),
        duration: z.number(),
        is_free: z.boolean(),
        created_at: z.string(),
        updated_at: z.string(),
    }),
});
const _historyLearningResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(historyLearning),
});
export type HistoryLearningResponse = z.infer<typeof _historyLearningResponse>;

// get danh sách học sinh trong hệ thống (dùng để so sánh)
export const studentList = z.object({
    id: z.number(),
    username: z.string(),
    full_name: z.string(),
    email: z.string().email(),
});
const _studentListResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(studentList),
});
export type StudentListResponse = z.infer<typeof _studentListResponse>;

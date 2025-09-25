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

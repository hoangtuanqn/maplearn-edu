import z from "zod";
import { profileSchema } from "../user.schema";
import { paginationMetaSchemaFn } from "../common.schema";
export const updateProfileSchema = profileSchema.extend({
    banned: z.boolean(),
    email: z.string().email().min(5).max(100).optional(),
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

// Lịch sử hoạt động

const activitySchema = z.object({
    id: z.number(),
    user_id: z.number(),
    action: z.string(),
    description: z.string(),
    ip_address: z.string(),
    user_agent: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _activityHistorySchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(activitySchema),
});
export type ActivityHistorySchema = z.infer<typeof _activityHistorySchema>;

// Import handling (success và error)
// error
const _importStudentErrorSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(z.string()),
});
export type ImportStudentErrorSchema = z.infer<typeof _importStudentErrorSchema>;
// success or error partial
const importResultItemSchema = z.object({
    data: profileSchema.extend({
        email: z.string(),
        username: z.string(),
    }),
    error: z.string(),
});

const _importStudentSuccessSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        success: z.array(importResultItemSchema),
        errors: z.array(importResultItemSchema),
    }),
});
export type ImportStudentSuccessSchema = z.infer<typeof _importStudentSuccessSchema>;

// quá trình học tập trong 7 ngày gần nhất
const last7DaysItemSchema = z.object({
    date: z.string(),
    lessons_completed: z.number(),
    total_duration: z.number(),
});
export type Last7DaysItemSchema = z.infer<typeof last7DaysItemSchema>;

const examAttemptSchema = z.object({
    id: z.number(),
    slug_exam: z.string(),
    date: z.string(),
    title: z.string(),
    score: z.number(),
    max_score: z.number(),
    pass_score: z.number(),
    created_at: z.string(),
});
export type ExamAttemptSchema = z.infer<typeof examAttemptSchema>;

const chapterProgressItemSchema = z.object({
    chapter_id: z.number(),
    chapter_title: z.string(),
    completion_rate: z.number(),
});
const studyProgress7DaysSchema = z.object({
    full_name: z.string(),
    avatar: z.string().url(),
    email: z.string().email(),
    enrolled_at: z.string(),
    total_lessons: z.number(),
    total_duration: z.number(),
    total_attempt_exam: z.number(),
    max_streak: z.number(),
    last_7_days: z.array(last7DaysItemSchema),
    exam_attempts: z.array(examAttemptSchema),
    last_learned_at: z.string().nullable(),
    highest_score: z.number().nullable(),
    completion_rate: z.number(),
    no_violation_count: z.number(),
    violation_count: z.number(),
    chapter_progress: z.array(chapterProgressItemSchema),
    max_score_exam_paper: z.number().nullable(),
});
export type StudyProgress7DaysSchema = z.infer<typeof studyProgress7DaysSchema>;

const _studyProgress7DaysResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: studyProgress7DaysSchema,
});
export type StudyProgress7DaysResponse = z.infer<typeof _studyProgress7DaysResponseSchema>;

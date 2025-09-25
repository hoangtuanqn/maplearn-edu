import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";
import { userSchema } from "./user.schema";

const examCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _examCategoriesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(examCategorySchema),
});
export type ExamCategoriesResponse = z.infer<typeof _examCategoriesResponseSchema>;

const examSchema = z.object({
    id: z.number(),
    exam_category_id: z.number(),
    subject_id: z.number(),
    grade_level: z.string(),
    title: z.string(),
    slug: z.string(),
    province: z.string(),
    difficulty: z.enum(["easy", "normal", "hard", "very_hard"]),
    exam_type: z.enum(["HSA", "V-ACT", "TSA", "THPT", "OTHER"]),
    max_score: z.number(),
    duration_minutes: z.number(),
    anti_cheat_enabled: z.boolean(),
    max_violation_attempts: z.number(),
    max_attempts: z.number().nullable(),
    pass_score: z.number(),
    attempt_count: z.number(), // số lượt thi của người dùng đang gửi request
    total_attempt_count: z.number(), // tổng số lượt thi của đề thi
    question_count: z.number(),
    is_in_progress: z.boolean(),
    status: z.boolean(),
    start_time: z.string(),
    end_time: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

const _examListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examSchema),
});
export type ExamListResponse = z.infer<typeof _examListResponseSchema>;

// Get detail
const _examDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema,
});
export type ExamDetailResponse = z.infer<typeof _examDetailResponseSchema>;

const answersSchema = z.object({
    content: z.string(),
    is_correct: z.boolean(),
});
export type Answers = z.infer<typeof answersSchema>;
const questionSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "DRAG_DROP", "TRUE_FALSE", "NUMERIC_INPUT"]),
    content: z.string(),
    explanation: z.string().nullable(),
    images: z.array(z.string()).nullable(),
    marks: z.number(),
    options: z.array(answersSchema),
});
export type Question = z.infer<typeof questionSchema>;

const _questionsExamSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema.extend({
        questions: z.array(questionSchema),
    }),
});

export type QuestionsExamResponse = z.infer<typeof _questionsExamSchema>;

const attemptExamSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    user_id: z.number(),
    score: z.number(),
    violation_count: z.number(),
    time_spent: z.number(),
    details: z.string(),
    started_at: z.string(),
    submitted_at: z.string().nullable(),
    note: z.string().nullable(),
    status: z.enum(["in_progress", "submitted", "detected", "canceled"]),
    created_at: z.string(),
    updated_at: z.string(),
});
export type AttemptExam = z.infer<typeof attemptExamSchema>;

const _attemptExamResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: attemptExamSchema,
});
export type AttemptExamResponse = z.infer<typeof _attemptExamResponseSchema>;

// Lịch sử làm bài thi
const _attemptExamHistoryResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(attemptExamSchema),
});
export type AttemptExamHistoryResponse = z.infer<typeof _attemptExamHistoryResponseSchema>;

const detailAnswerSchema = z.object({
    start: z.number(),
    answers: z.record(
        z.string(),
        z.object({
            value: z.string(),
            is_correct: z.boolean(),
        }),
    ),
});
const resultExamSchema = z.object({
    id: z.number(),
    exam_paper_id: z.number(),
    user_id: z.number(),
    score: z.number(),
    violation_count: z.number(),
    time_spent: z.number(),
    details: detailAnswerSchema,
    started_at: z.string(),
    submitted_at: z.string().nullable(),
    note: z.string().nullable(),
    status: z.enum(["in_progress", "submitted", "detected", "canceled"]),
    created_at: z.string(),
    updated_at: z.string(),
});
export type ResultExam = z.infer<typeof resultExamSchema>;
const _resultExamResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: examSchema.extend({
        results: resultExamSchema,
    }),
});
export type ResultExamResponse = z.infer<typeof _resultExamResponseSchema>;

// Get ranking đề thi
const _rankingPaperSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(
        attemptExamSchema.extend({
            user: z.object(userSchema.pick({ id: true, avatar: true, full_name: true })),
        }),
    ),
});
export type RankingPaper = z.infer<typeof _rankingPaperSchema>;

// Get result detail paper exam
const resultDetailSchema = questionSchema.extend({
    is_correct: z.boolean(), // bạn trả lời đúng hay sai
    your_choice: z.object({
        value: z.array(z.string()), // câu trả lời của bạn
        is_correct: z.boolean(),
    }), // câu trả lời của bạn
    correct_answer: z.array(z.string()), // đáp án đúng
});
const _resultDetailExamResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(resultDetailSchema),
});
export type ResultDetailExamResponse = z.infer<typeof _resultDetailExamResponseSchema>;

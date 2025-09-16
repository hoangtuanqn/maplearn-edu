import z from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

const examSchema = z.object({
    id: z.number(),
    exam_category: z.string(),
    subject: z.string(),
    grade_level: z.string(),
    user_id: z.number(),
    title: z.string(),
    slug: z.string(),
    province: z.string(),
    difficulty: z.string(),
    exam_type: z.enum(["HSA", "V-ACT", "TSA", "THPT", "OTHER"]),
    max_score: z.number(),
    pass_score: z.number(),
    duration_minutes: z.number(),
    anti_cheat_enabled: z.boolean(),
    max_violation_attempts: z.number(),
    max_attempts: z.number().nullable(),
    status: z.boolean(),
    start_time: z.string(),
    end_time: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    registered_count: z.number(),
});

const _examSchemaResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(examSchema),
});
export type ExamListResponse = z.infer<typeof _examSchemaResponse>;

import z from "zod";

const lessonHistorySchema = z.object({
    id: z.number(),
    user_id: z.number(),
    lesson_id: z.number(),
    watched_at: z.string().nullable(),
    progress: z.number(),
    is_completed: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _lessonHistoryResponseSchema = z.object({
    message: z.string(),
    status: z.string(),
    data: lessonHistorySchema,
});
export type LessonHistoryResponse = z.infer<typeof _lessonHistoryResponseSchema>;

import z from "zod";
import { CourseDetailSchema } from "./course.schema";
const lessonSchema = z.object({
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
    successed: z.boolean(),
    viewed: z.boolean(),
    progress: z.number(),
});
const chapterLessonSchema = z.object({
    id: z.number(),
    course_id: z.number(),
    title: z.string(),
    position: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});
const _courseDetailSchemaResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: CourseDetailSchema.extend({
        code_certificate: z.string().nullable(),
        completed_lessons: z.number(),
        percent_completed: z.number(),
        chapters: z.array(
            chapterLessonSchema.extend({
                completed_lessons: z.number(),
                duration: z.number(),
                lessons: z.array(lessonSchema),
            }),
        ),
        exam: z
            .object({
                id: z.number(),
                slug: z.string(),
                title: z.string(),
                pass_score: z.number(),
                max_score: z.number(),
                max_attempts: z.number().nullable(),
                duration_minutes: z.number(),
                user_highest_exam_score: z.number().nullable(),
                is_in_progress: z.boolean(),
                question_count: z.number(),
                total_attempt_count: z.number(),
                attempt_count: z.number(),
            })
            .nullable(),
    }),
});
export type CourseDetailResponse = z.infer<typeof _courseDetailSchemaResponse>;

const lessonDetailSchema = lessonSchema.extend({
    next_video: lessonSchema.nullable(),
    prev_video: lessonSchema.nullable(),
    current_time: z.number(),
    chapter: chapterLessonSchema,
});
const _lessonDetailSchemaResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: lessonDetailSchema,
});
export type LessonDetailResponse = z.infer<typeof _lessonDetailSchemaResponse>;

const _lessonSchemaResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: lessonSchema,
});
export type LessonResponse = z.infer<typeof _lessonSchemaResponse>;

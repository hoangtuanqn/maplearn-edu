
import z from "zod";
const lessonSchema = z.object({
    id: z.number(),
    chapter_id: z.number(),
    title: z.string(),
    slug: z.string(),
    position: z.number(),
    duration: z.number(),
    is_free: z.boolean(),
    video_url: z.string(), // chỉ tồn tại nếu is_free = true
});
const chapterSchema = z.object({
    id: z.number(),
    course_id: z.number(),
    title: z.string(),
    position: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    lessons: z.array(lessonSchema),
});
const _chapterLessonListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(chapterSchema),
});
export type ChapterLessonList = z.infer<typeof _chapterLessonListSchema>;

const _chapterLessonSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: chapterSchema,
});
export type ChapterLesson = z.infer<typeof _chapterLessonSchema>;
import z from "zod";
import { courseSchema } from "./course.schema";

const gradeLevelSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SubjectListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(gradeLevelSchema),
});
export type GradeLevelListResponse = z.infer<typeof SubjectListResponseSchema>;

const gradeLevelWithCourseSchema = z.object({
    slug: z.string(),

    courses: z.array(courseSchema),
});

export const GradeLevelWithCoursesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(gradeLevelWithCourseSchema),
});
export type GradeLevelWithCoursesResponse = z.infer<typeof GradeLevelWithCoursesResponseSchema>;

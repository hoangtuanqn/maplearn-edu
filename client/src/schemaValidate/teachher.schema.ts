import z from "zod";
import { userSchema } from "./user.schema";
import { courseSchema } from "./course.schema";

export const teacherListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(userSchema),
});
export type TeacherListType = z.infer<typeof teacherListResponseSchema>;

export const teacherDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userSchema.extend({
        courses: z.array(courseSchema),
    }),
});
export type TeacherDetailType = z.infer<typeof teacherDetailResponseSchema>;

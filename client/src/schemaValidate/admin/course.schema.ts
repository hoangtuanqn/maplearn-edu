import { z } from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

const studentCompleted = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    phone: z.string().nullable(),
    completion_date: z.string(), // You can add a regex for date format if needed
    completed_lessons: z.number(),
    total_lessons: z.number(),
});
const _studentCompletedResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(studentCompleted),
});
export type StudentCompletedResponse = z.infer<typeof _studentCompletedResponse>;
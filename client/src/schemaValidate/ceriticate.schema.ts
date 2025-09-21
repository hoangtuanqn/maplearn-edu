import z from "zod";

const certificateSchema = z.object({
    course_title: z.string(),
    lesson_count: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    lecturer_name: z.string(),
    completion_date: z.string(),
    duration_hours: z.number(),
});

const _certificateResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: certificateSchema,
});
export type CertificateResponse = z.infer<typeof _certificateResponseSchema>;

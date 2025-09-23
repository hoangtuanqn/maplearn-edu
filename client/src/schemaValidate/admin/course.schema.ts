import { z } from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

const studentEnrolled = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string().nullable(),
    phone_number: z.string().nullable(),
    enrolled_at: z.string(), // Date when student enrolled
    is_completed: z.boolean(),
    completion_date: z.string().nullable(), // Date when completed (if completed)
    completed_lessons: z.number(),
    total_lessons: z.number(),
    completion_percentage: z.number(),
    status: z.string(), // enrolled, completed, in_progress, etc.
    gender: z.string().nullable(), // male, female, other
    birth_year: z.number().nullable(),
    location: z.string().nullable(), // Student's location
});

const _studentEnrolledResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(studentEnrolled),
});

export type StudentEnrolledResponse = z.infer<typeof _studentEnrolledResponse>;

// Keep the old schema for backward compatibility
const studentEnrollment = z.object({
    id: z.number(),
    full_name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    phone_number: z.string().nullable(),
    enrolled_at: z.string(), // Consider adding a regex for date-time format if needed
    is_completed: z.boolean(),
    completion_date: z.string().nullable(),
    completed_lessons: z.number(),
    total_lessons: z.number(),
    completion_percentage: z.number(),
    status: z.string(),
});
const _studentEnrollmentResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(studentEnrollment),
});
export type StudentEnrollmentResponse = z.infer<typeof _studentEnrollmentResponse>;

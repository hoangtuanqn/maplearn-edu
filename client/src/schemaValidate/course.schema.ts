import z from "zod";
import { paginationMetaSchemaFn } from "./common.schema";

// * Category Course
const CategoryCourseSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    status: z.number(),
    created_at: z.string(),
    count_courses: z.number(),
    // creator: z.array(CreatorSchema),
});

// Schema Category
export const CategoriesCoursesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(CategoryCourseSchema),
});
export type CategoriesCoursesResponse = z.infer<typeof CategoriesCoursesResponseSchema>;

// * Course
export const departmentSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const teacherSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    avatar: z.string().url(),
    bio: z.string().nullable().default(""),
    degree: z.string().nullable().default(""),
});
export const courseSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    thumbnail: z.string().url(),
    price: z.number().default(0),
    grade_level: z.string(),
    subject: z.string(),
    category: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    status: z.boolean().default(true), // true: hoạt động, false: tạm ngưng
    is_best_seller: z.boolean().default(false), // sản phẩm bán chạy
    teacher: teacherSchema,
    is_enrolled: z.boolean().default(false),
    duration: z.number().default(0),
    lesson_count: z.number().default(0),
    lesson_successed: z.number().default(0),
    updated_at: z.string(),
    current_lesson: z.object({
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
    }),
    rating: z.object({
        average_rating: z.number(),
        total_reviews: z.number(),
    }),
    enrollments_count: z.number().default(0),
});
export type CourseType = z.infer<typeof courseSchema>;
export const CourseListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(courseSchema),
});
export type CourseListResponse = z.infer<typeof CourseListResponseSchema>;

export const CourseListRecommendedResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(courseSchema),
});
export type CourseListRecommendedResponse = z.infer<typeof CourseListRecommendedResponseSchema>;
// * Course Detail

export const CourseDetailSchema = courseSchema.extend({
    intro_video: z.string().url(),
    prerequisite_course: courseSchema.nullable().default(null),
    // teachers: teacherSchema,
});

export type CourseDetail = z.infer<typeof CourseDetailSchema>;
export const CourseDetailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: CourseDetailSchema,
});
export type CourseGetDetailResponse = z.infer<typeof CourseDetailResponseSchema>;

const _courseStats = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(
        z.object({
            date: z.string(),
            student_count: z.number(),
            revenue: z.number(),
        }),
    ),
});
export type CourseStats = z.infer<typeof _courseStats>;

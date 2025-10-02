import z from "zod";

const dashboardSchema = z.object({
    total_in_this_year: z.record(z.string(), z.number()),
    total_courses: z.number(),
    total_exams: z.number(),
    total_users: z.number(),
    payment_methods: z.record(
        z.string(),
        z.object({
            count: z.number(),
            total: z.number(),
        }),
    ),
    courses_by_category: z.record(z.string(), z.number()),
    new_users: z.array(
        z.object({
            id: z.number(),
            full_name: z.string(),
            email: z.string().email(),
        }),
    ),
    new_payments: z.array(
        z.object({
            full_name: z.string(),
            course_name: z.string(),
            amount: z.number(),
            slug: z.string(),
            avatar: z.string().url(),
        }),
    ),
    top_courses: z.array(
        z.object({
            name: z.string(),
            students_count: z.number(),
            slug: z.string(),
            revenue: z.string(),
        }),
    ),
    activity_in_12_months: z.array(
        z.object({
            month: z.string(),
            new_courses: z.number(),
            new_users: z.number(),
            new_exams: z.number(),
        }),
    ),
    recent_activity: z.object({
        new_courses: z.number(),
        new_users: z.number(),
        new_exams: z.number(),
    }),
});
const _dashboardResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: dashboardSchema,
});

export type DashboardResponse = z.infer<typeof _dashboardResponseSchema>;

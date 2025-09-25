import z from "zod";

const dashboardSchema = z.object({
    total: z.number(),
    total_in_12_months: z.number(),
    total_last_month: z.number(),
    total_in_this_year: z.array(z.number()).length(12),
    total_courses: z.number(),
    total_exams: z.number(),
    total_users: z.number(),
    payment_methods: z.object({
        zalopay: z.number(),
        momo: z.number(),
        transfer: z.number(),
        vnpay: z.number(),
    }),
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
    activity_in_4_weeks: z.array(
        z.object({
            week: z.string(),
            new_courses: z.number(),
            new_users: z.number(),
            new_exams: z.number(),
        }),
    ),
});
const _dashboardResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: dashboardSchema,
});

export type DashboardResponse = z.infer<typeof _dashboardResponseSchema>;

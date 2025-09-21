import z from "zod";
import { paginationMetaSchemaFn } from "../common.schema";

const paymentSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    course_id: z.number(),
    transaction_code: z.string(),
    amount: z.number(),
    payment_method: z.enum(["transfer", "vnpay", "momo", "zalopay"]),
    status: z.enum(["pending", "paid", "canceled"]),
    paid_at: z.string().datetime(),
    user: z.object({
        id: z.number(),
        full_name: z.string(),
        username: z.string(),
    }),
    course: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
    }),
});
const _paymentWithCourseSchema = paymentSchema.extend({
    status: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(paymentSchema),
});
export type PaymentWithCourse = z.infer<typeof _paymentWithCourseSchema>;

const paymentStatsSchema = z.object({
    total_payments: z.number(),
    total_revenue: z.number(),
    total_students: z.number(),
    average_order_value: z.number(),
    total_courses_sold: z.number(),
    date_from: z.string().date(),
    date_to: z.string().date(),
});
const _paymentStatsResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentStatsSchema,
});

export type PaymentStats = z.infer<typeof _paymentStatsResponseSchema>;

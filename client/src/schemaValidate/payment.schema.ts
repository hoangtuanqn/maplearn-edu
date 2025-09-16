import z from "zod";
import { courseSchema } from "./course.schema";
import { paginationMetaSchemaFn } from "./common.schema";

const paymentSchema = z.object({
    id: z.number(),
    user_id: z.number().min(1),
    transaction_code: z.string(),
    amount: z.number().min(0),
    payment_method: z.enum(["transfer", "vnpay", "momo", "zalopay"]),
    status: z.enum(["pending", "paid", "failed", "expired"]),
    url_payment: z.string().optional(),
    course_id: z.number(),
    paid_at: z.string().nullable(),
});
const _paymentResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentSchema,
});
export type PaymentResponse = z.infer<typeof _paymentResponseSchema>;

const _paymentDetailSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paymentSchema.extend({
        course: courseSchema,
    }),
});
export type PaymentDetailResponse = z.infer<typeof _paymentDetailSchema>;

const summaryPaymentSchma = z.object({
    total_pending: z.number(),
    total_price_pending: z.number(),
});
export const PaymentDetailResponseListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        payments: paginationMetaSchemaFn(paymentSchema),
        summary: summaryPaymentSchma,
    }),
});
export type PaymentListResponse = z.infer<typeof PaymentDetailResponseListResponseSchema>;

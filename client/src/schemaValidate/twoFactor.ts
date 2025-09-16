import z from "zod";

const _generate2FAResponse = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        secret: z.string(),
        qr_base64: z.string(),
    }),
});
export type Generate2FAType = z.infer<typeof _generate2FAResponse>;

const _active2faResponse = z.object({
    success: z.boolean(),
    message: z.string(),
});
export type Active2FAResponse = z.infer<typeof _active2faResponse>;

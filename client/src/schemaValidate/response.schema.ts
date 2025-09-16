import z from "zod";

const _responseSchemaBasic = z.object({
    success: z.boolean(),
    message: z.string(),
});
export type ResponseSchemaBasic = z.infer<typeof _responseSchemaBasic>;

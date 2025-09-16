import { z } from "zod";
import { CreatorSchema, paginationMetaSchemaFn } from "./common.schema";

// Post Schema
const PostSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    thumbnail: z.string().url(),
    content: z.string().optional(),
    views: z.number(),
    status: z.boolean().optional(),
    created_at: z.string(),
    creator: CreatorSchema,
});
export type PostType = z.infer<typeof PostSchema>;

// Final API Response Schema
export const PostListResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(PostSchema),
});
export type PostListResponse = z.infer<typeof PostListResponseSchema>;

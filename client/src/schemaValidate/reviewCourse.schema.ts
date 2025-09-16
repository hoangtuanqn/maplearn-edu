import z from "zod";
import { userSchema } from "./user.schema";
import { paginationMetaSchemaFn } from "./common.schema";

const reviewCourseSchema = z.object({
    id: z.number(),
    course_id: z.number(),
    user_id: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    created_at: z.string(),
    likes_count: z.number().default(0),
    dislikes_count: z.number().default(0),
    is_liked: z.boolean().nullable().optional().default(null),
    user: userSchema.pick({
        id: true,
        full_name: true,
        avatar: true,
    }),
});
export type ReviewCourse = z.infer<typeof reviewCourseSchema>;
const _reviewCourseListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: paginationMetaSchemaFn(reviewCourseSchema),
});
export type ReviewCourseListResponse = z.infer<typeof _reviewCourseListSchema>;

const ratingDistributionSchema = z.object({
    star: z.number(),
    count: z.number(),
    percentage: z.number(),
    user_has_voted: z.boolean().default(false),
});
// export type RatingDistribution = z.infer<typeof ratingDistributionSchema>;
const _ratingDistributionListSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(ratingDistributionSchema),
});
export type RatingDistributionList = z.infer<typeof _ratingDistributionListSchema>;

const _ratingVoteSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: reviewCourseSchema,
});
export type RatingVoteResponse = z.infer<typeof _ratingVoteSchema>;

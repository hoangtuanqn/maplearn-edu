import publicApi from "~/libs/apis/publicApi";
import { PostListResponse } from "~/schemaValidate/post.schema";
export const POSTS_PER_PAGE = 16;
const postApi = {
    getPosts: (
        page: number = 1,
        limit: number = POSTS_PER_PAGE,
        search: string = "",
        sort: string = "",
        queryOther: string = "",
    ) => {
        let query = `/posts?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (sort) {
            query += `&sort=${sort}`;
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }

        return publicApi.get<PostListResponse>(query);
    },
    getDetail: (slug: string) => publicApi.get(`/posts/${slug}`),

    incrementView: (slug: string) => publicApi.post(`/posts/${slug}/view`),
};
export default postApi;

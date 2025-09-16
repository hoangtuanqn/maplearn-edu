"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SearchPosts from "./SearchPosts";
import PostIItem from "./PostIItem";
import PostSkeleton from "../../../_components/SidebarRight/PostSkeleton";
import { PaginationNav } from "../../../_components/Pagination";
import postApi, { POSTS_PER_PAGE } from "~/apiRequest/post";
import { buildLaravelFilterQuery } from "~/libs/hepler";

async function fetchPosts(page: number, limit: number, search: string, sort: string, queryOther: string) {
    const res = await postApi.getPosts(page, limit, search, sort, queryOther);
    const allPosts = res.data;
    return {
        posts: allPosts.data.data,
        total: allPosts.data.total,
    };
}
const PostList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "";
    const courses = searchParams.get("courses") || "";

    const { data, isLoading } = useQuery({
        queryKey: ["user", "posts", { page, search, sort, courses }],
        queryFn: () => fetchPosts(page, POSTS_PER_PAGE, search, sort, buildLaravelFilterQuery({ courses })),
    });

    const posts = data?.posts || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);
    return (
        <>
            <SearchPosts />
            {posts.length == 0 && !isLoading && (
                <p className="text-center text-xl font-bold">Không tìm thấy bài viết phù hợp</p>
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {isLoading
                    ? Array.from({ length: POSTS_PER_PAGE }).map((_, i) => <PostSkeleton key={i} />)
                    : posts.map((post) => (
                          <PostIItem
                              key={post.id}
                              title={post.title}
                              url={`/posts/${post.slug}`}
                              image={post.thumbnail}
                              createdAt={post.created_at}
                          />
                      ))}
            </div>
            {!isLoading && <PaginationNav totalPages={totalPages} basePath="/posts" />}
        </>
    );
};

export default PostList;

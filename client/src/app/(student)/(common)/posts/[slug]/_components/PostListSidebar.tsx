"use client";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import postApi from "~/apiRequest/post";
import NewLink from "~/app/(student)/_components/SidebarRight/NewLink";
import PostSkeleton from "~/app/(student)/_components/SidebarRight/PostSkeleton";
import { PostType } from "~/schemaValidate/post.schema";

const PostListSidebar = ({ slugCurrent }: { slugCurrent: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["user", "posts", "sidebar"],
        queryFn: async () => {
            const res = await postApi.getPosts(1, 10);
            return res.data.data.data || [];
        },
        staleTime: 1000 * 60 * 5,
    });
    return (
        <div className="sticky top-[54px] right-0 h-fit shrink-0 rounded-xl bg-white p-8 shadow-sm 2xl:flex-1/4">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-primary text-base font-medium">Các tin tức khác</p>
                <Link className="cursor-pointer" href="/posts">
                    <p className="t1-flex-center justify-between gap-1 text-gray-500 italic">
                        <span>Xem tất cả</span>
                        <TrendingUp />
                    </p>
                </Link>
            </div>
            {isLoading && Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}

            {!isLoading &&
                data?.map(({ id, title, slug, thumbnail, created_at }: PostType) => {
                    if (slug != slugCurrent)
                        return (
                            <NewLink
                                key={id}
                                title={title}
                                url={`/posts/${slug}`}
                                image={thumbnail}
                                createdAt={created_at}
                            />
                        );
                })}
        </div>
    );
};

export default PostListSidebar;

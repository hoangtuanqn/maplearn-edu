"use client";

import React from "react";
import { CalendarRange, Eye } from "lucide-react";


import { formatter } from "~/libs/format";
import { PostType } from "~/schemaValidate/post.schema";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";
// import { Report } from "./Report";

const PostContent = ({ post }: { post: { posts: PostType } }) => {
    return (
        <>
            <div className="h-fit shrink-0 rounded-xl bg-white p-8 shadow-sm 2xl:flex-3/4">
                {/* Header */}
                <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="flex gap-1">
                            <CalendarRange /> <span>{post.posts.created_at}</span>
                        </span>
                        <span className="flex gap-1">
                            <Eye />
                            <span>{formatter.number(Number(post.posts.views))} lượt xem</span>
                        </span>
                    </div>
                    <div className="flex gap-2 max-lg:mt-2">
                        <ShareButton />
                        {/* <Report id={1} /> */}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-10 mb-20">
                    <div className="post-detail mt-5">
                        <h1>{post.posts.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: post.posts?.content ?? "" }}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostContent;

import { Metadata } from "next";
import React, { cache } from "react";
import "~/styles/custom-post.scss";
import PostListSidebar from "./_components/PostListSidebar";
import UpdateViewClient from "./_components/UpdateViewClient";
import PostContent from "./_components/PostContent";
import postApi from "~/apiRequest/post";
import { redirect } from "next/navigation";

const getPost = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await postApi.getDetail(slug);
    return post;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    return {
        title: post.posts.title,
        description: post.posts.description || "Chi tiết bài viết",
        openGraph: {
            title: post.posts.title,
            images: [post.posts.thumbnail],
        },
    };
}

const DetailPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let post;
    try {
        post = await getPost(slug); // Dùng lại, không gọi API thêm
    } catch (error) {
        console.error("Error fetching post details:", error);
        redirect("/404");
    }

    return (
        <div className="flex min-h-screen gap-5 max-2xl:flex-col">
            <UpdateViewClient slug={slug} />
            <PostContent post={post} />
            <PostListSidebar slugCurrent={slug} />
        </div>
    );
};

export default DetailPostPage;

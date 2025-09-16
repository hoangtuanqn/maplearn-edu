import { Metadata } from "next";
import PostList from "./_components/PostList";
import { Suspense } from "react";
import Loading from "~/app/(student)/_components/Loading";
export const metadata: Metadata = {
    title: "Danh sách các bài viết mới nhất",
};

const PostsPage = () => {
    return (
        <section className="min-h-screen px-4 pb-10">
            <Suspense fallback={<Loading />}>
                <PostList />
            </Suspense>
        </section>
    );
};

export default PostsPage;

import { cache } from "react";
import ExamPage from "./_components/ExamPage";
import examApiServer from "~/apiRequest/server/exam";
import { Metadata } from "next";
import { redirect } from "next/navigation";
const getQuestions = cache(async (slug: string) => {
    const {
        data: { data: questions },
    } = await examApiServer.getQuestions(slug);
    return questions;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const exam = await getQuestions(slug);
    return {
        title: exam.title,
        description: exam.title || "Chi tiết bài thi",
    };
}
const DoingExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let questionsRes;
    try {
        questionsRes = await getQuestions(slug); // Dùng lại, không gọi API thêm
    } catch (error) {
        console.error("Error fetching exam details:", error);
        redirect(`/exams/${slug}`);
    }

    return <ExamPage slug={slug} questionsRes={questionsRes} />;
};

export default DoingExamPage;

import React, { cache } from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import examApiServer from "~/apiRequest/server/admin/exams";
import { redirect } from "next/navigation";
import ExamDetailView from "./_components/ExamDetailView";
import type { Metadata } from "next";
const getExam = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await examApiServer.getExamDetail(slug);
    return post;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const exam = await getExam(slug);
    return {
        title: exam.title,
        description: exam.title || "Chi tiết bài thi",
    };
}

const Exam = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/teacher" },
        { label: "Đề thi", href: "/teacher/exams" },
        { label: "Chi tiết đề thi", href: `/teacher/exams/${slug}` },
    ];
    let paper;
    try {
        paper = await getExam(slug); // Dùng lại, không gọi API thêm
    } catch {
        redirect(`/teacher/exams`);
    }
    return (
        <>
            <div className="my-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <ExamDetailView exam={paper} />
        </>
    );
};

export default Exam;

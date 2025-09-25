import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import examApiServer from "~/apiRequest/server/exam";

import DetailResultPage from "./_components/DetailResultPage";
export const metadata: Metadata = {
    title: "Chi tiết kết quả bài thi",
};
const DetailResultExam = async ({ params }: { params: Promise<{ slug: string; id: string }> }) => {
    const { slug, id } = await params;

    // Lấy chi tiết bài thi và bài làm song song
    const [examRes, resultRes] = await Promise.allSettled([
        examApiServer.getExamDetail(slug),
        examApiServer.getResultDetail(slug, id),
    ]);

    if (examRes.status !== "fulfilled" || resultRes.status !== "fulfilled") {
        redirect(`/exams/${slug}/results/${id}`);
    }

    const exam = examRes.status === "fulfilled" ? examRes.value.data.data : null;
    const result = resultRes.status === "fulfilled" ? resultRes.value.data.data : null;

    if (!exam || !result) {
        redirect(`/exams/${slug}/results/${id}`);
    }

    return (
        <section className="mt-10 min-h-screen px-4 pb-10">
            <DetailResultPage exam={exam} resultRes={result} />
        </section>
    );
};

export default DetailResultExam;

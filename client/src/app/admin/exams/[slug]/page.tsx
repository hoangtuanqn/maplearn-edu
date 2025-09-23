import React from "react";
import ExamPage from "./_components/ExamPage";

const Exam = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return <ExamPage slug={slug} />;
};

export default Exam;

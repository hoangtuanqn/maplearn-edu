import React from "react";
import ExamPage from "./_components/ExamPage";
import Breadcrumb from "../../_components/Breadcrumb";
const Exam = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Đề thi", href: "/admin/exams" },
        { label: "Chi tiết đề thi", href: `/admin/exams/${slug}` },
    ];
    return (
        <>
            <div className="my-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <ExamPage slug={slug} />
        </>
    );
};

export default Exam;

import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import FormEditExam from "./_components/FormEditExam";
import examApiServer from "~/apiRequest/server/admin/exams";
import Breadcrumb from "~/app/admin/_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Chỉnh sửa thông tin đề thi",
};
const EditExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let paper;
    try {
        const res = await examApiServer.getExamDetail(slug);
        paper = res.data.data;
    } catch {
        redirect(`/admin/exams`);
    }
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Đề thi", href: "/admin/exams" },
        { label: "Chi tiết đề thi", href: `/admin/exams/${slug}` },
        { label: "Chỉnh sửa đề thi", href: `/admin/exams/${slug}/edit` },
    ];

    return (
        <div className="mt-6 flex flex-col gap-5">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-primary text-xl font-bold">Chỉnh sửa đề thi</h3>
                        <p className="mb-4 text-sm text-slate-500">Chỉnh sửa thông tin đề thi tại đây.</p>
                    </div>
                </div>
                <FormEditExam exam={paper} />
            </div>
        </div>
    );
};

export default EditExamPage;

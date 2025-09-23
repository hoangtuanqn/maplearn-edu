"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import examApi from "~/apiRequest/admin/exam";
import ExamDetailView from "./ExamDetailView";

const ExamPage = ({ slug }: { slug: string }) => {
    const { data: paper, isLoading } = useQuery({
        queryKey: ["exam", "detail", slug],
        queryFn: async () => {
            const res = await examApi.getExamDetail(slug);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-lg">Đang tải...</div>
            </div>
        );
    }

    if (!paper) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="text-lg text-red-500">Không tìm thấy đề thi</div>
            </div>
        );
    }

    return <ExamDetailView exam={paper} />;
};

export default ExamPage;

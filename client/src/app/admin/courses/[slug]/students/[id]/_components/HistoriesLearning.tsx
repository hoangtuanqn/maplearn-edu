"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Badge } from "~/components/ui/badge";

const HistoriesLearning = ({ slug, id }: { slug: string; id: string }) => {
    const { data: histories } = useQuery({
        queryKey: ["histories-learning", slug, id],
        queryFn: async () => {
            const res = await courseAdminApi.getHistoriesLearning(slug, id);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    const total = histories?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    return (
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Lịch sử bài giảng đã học</h2>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tên bài giảng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Ngày học</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tiến độ (%)</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Hoàn thành</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {(!histories?.data || histories.data.length === 0) && (
                            <tr>
                                <td colSpan={5} className="py-6">
                                    <DisplayNoData title="Chưa có dữ liệu học bài của người dùng" />
                                </td>
                            </tr>
                        )}
                        {histories?.data?.map((his, idx) => (
                            <tr
                                key={his.id}
                                className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                            >
                                <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                <td className="px-4 py-3 text-zinc-500">{his.lesson.title}</td>
                                <td className="px-4 py-3 text-zinc-500">{new Date(his.created_at).toLocaleString()}</td>
                                <td className="px-4 py-3 text-zinc-500">
                                    {his.is_completed ? 100 : Math.ceil((his.progress / his.lesson.duration) * 100)}%
                                </td>
                                <td className="px-4 py-3">
                                    <Badge variant={his.is_completed ? "success" : "warning"}>
                                        {his.is_completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="mt-6 flex w-full">
                    <div className="ml-auto">
                        <Suspense>
                            <PaginationNav totalPages={totalPages} basePath={`/admin/courses/${slug}`} />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoriesLearning;

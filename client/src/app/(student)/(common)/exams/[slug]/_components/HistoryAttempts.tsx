"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import examApi from "~/apiRequest/exam";
import { Button } from "~/components/ui/button";
import { formatter } from "~/libs/format";
import { getStatusBadge } from "~/libs/statusBadge";
import ItemTableSkeleton from "../../../profile/_components/ItemTableSkeleton";
import Link from "next/link";

const HistoryAttempts = ({ slug, pass_score }: { slug: string; pass_score: number }) => {
    const { data: histories, isLoading } = useQuery({
        queryKey: ["user", "historyAttempts", slug],
        queryFn: async () => {
            const res = await examApi.getAttempts(slug);
            return res.data.data;
        },
    });
    return (
        <section className="mt-5 min-h-40 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-primary mb-4 text-base font-bold">Lịch sử làm bài ({histories?.length || 0})</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase"
                            >
                                Ngày làm
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase sm:table-cell"
                            >
                                Thời gian làm
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase sm:table-cell"
                            >
                                Trạng thái
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-start text-xs font-semibold text-gray-600 uppercase md:table-cell"
                            >
                                Kết quả
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-end text-xs font-semibold text-gray-600 uppercase"
                            >
                                Chi tiết
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {isLoading ? (
                            <ItemTableSkeleton cols={5} rows={10} />
                        ) : (
                            <>
                                {histories?.map((item) => (
                                    <tr key={item.id} className="transition hover:bg-gray-50">
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-800 sm:table-cell">
                                            {formatter.date(item.started_at, true)}
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-800 sm:table-cell">
                                            {item.status == "in_progress"
                                                ? "...."
                                                : formatter.duration(item.time_spent)}
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-800 sm:table-cell">
                                            {item.status == "submitted"
                                                ? getStatusBadge(
                                                      "exam_result",
                                                      item.score < pass_score ? "not_pass" : "pass",
                                                  )
                                                : getStatusBadge("exam", item.status)}
                                            <p className="mt-2 text-xs break-words text-gray-500">{item.note}</p>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-800 md:table-cell">
                                            {item.status == "in_progress" ? (
                                                "...."
                                            ) : (
                                                <span
                                                    className={`font-bold ${item.score < pass_score ? "text-red-500" : "text-green-500"}`}
                                                >
                                                    {item.score} điểm
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-end whitespace-nowrap">
                                            {item.status === "in_progress"
                                                ? "..."
                                                : item.status !== "canceled" && (
                                                      <Link target="_blank" href={`/exams/${slug}/results/${item.id}`}>
                                                          <Button className="" variant={"outline"}>
                                                              Xem kết quả
                                                          </Button>
                                                      </Link>
                                                  )}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default HistoryAttempts;

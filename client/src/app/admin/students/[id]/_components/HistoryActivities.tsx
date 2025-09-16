"use client";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import studentApi, { USERS_PER_PAGE } from "~/apiRequest/admin/student";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { ActionActivity, ActionActivityLabel } from "~/contants/user/actionActivity";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import ExportHistoryActivities from "./ExportHistoryActivities";

const HistoryActivities = ({ id }: { id: string }) => {
    const { page } = useGetSearchQuery(["page"] as const);
    const { data: histories, isLoading } = useQuery({
        queryKey: ["admin", "students", "history", page],
        queryFn: async () => {
            const res = await studentApi.getActivityHistory(id, +page, USERS_PER_PAGE);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });
    const total = histories?.total ?? 0;
    const totalPages = Math.ceil(total / USERS_PER_PAGE);
    return (
        <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold">Lịch sử hoạt động</h3>
                    <p className="text-sm text-slate-500">Lịch sử hoạt động của người dùng này.</p>
                </div>
                <ExportHistoryActivities id={id} />
            </div>
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Hành động</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Mô tả</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">IP</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">User Agent</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thời gian</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {isLoading
                            ? [...Array(USERS_PER_PAGE)].map((_, index) => <TableSkeleton key={index} col={6} />)
                            : histories?.data.map((history, idx) => (
                                  <tr
                                      key={history.id}
                                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                  >
                                      <td className="px-4 py-3 text-zinc-500">
                                          {(Number(page || 1) - 1) * USERS_PER_PAGE + idx + 1}
                                      </td>
                                      <td className="px-4 py-3 text-zinc-500">
                                          {ActionActivityLabel[history.action as ActionActivity]}
                                      </td>
                                      <td className="px-4 py-3 text-zinc-500">{history.description}</td>
                                      <td className="px-4 py-3 text-zinc-500">{history.ip_address}</td>
                                      <td className="px-4 py-3 text-zinc-500">{history.user_agent}</td>
                                      <td className="px-4 py-3 text-right text-zinc-500">
                                          {formatter.date(history.created_at, true)}
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
            <div className="ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath={`/admin/students/${id}`} />
                </Suspense>
            </div>
        </div>
    );
};

export default HistoryActivities;

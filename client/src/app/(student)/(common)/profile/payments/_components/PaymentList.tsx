"use client";
import { useQuery } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getStatusBadge } from "~/libs/statusBadge";
import { formatter } from "~/libs/format";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import profileApi, { PAYMENT_PER_PAGE } from "~/apiRequest/profile";
import TableSkeleton from "../../_components/TableSkeleton";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import { PaginationNav } from "~/app/(student)/_components/Pagination";

const InvoiceList = () => {
    const { page, sort, status, date } = useGetSearchQuery(["page", "sort", "status", "date"] as const);
    const { data, isLoading } = useQuery({
        queryKey: ["user", "invoices", { page, sort, status, date }],
        queryFn: async () => {
            const res = await profileApi.getPayments(
                Number(page ?? 1),
                PAYMENT_PER_PAGE,
                "",
                sort,
                buildLaravelFilterQuery({ status, date }),
            );
            return res.data.data;
        },
    });

    const totalPages = Math.ceil((data?.payments?.total ?? 0) / PAYMENT_PER_PAGE);
    const router = useRouter();
    const [payments, setPayments] = useState(data?.payments?.data || []);

    useEffect(() => {
        if (data?.payments?.data) {
            setPayments(data.payments.data);
        }
    }, [data]);
    return (
        <div className="flex flex-col gap-4 px-2 font-medium sm:px-0">
            <div className="flex flex-col">
                <div className="mb-5 flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-2 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col justify-center gap-1">
                        <p className="text-sm font-semibold text-neutral-900 sm:text-base">Đã tìm thấy</p>
                        <ul className="ml-4 list-inside list-disc text-xs text-neutral-700 sm:text-sm">
                            <li>
                                <span className="text-primary-600 font-bold">{data?.payments?.total ?? 0}</span> kết quả
                            </li>
                            <li>
                                Có <span className="font-bold text-yellow-600">{data?.summary.total_pending ?? 0}</span>{" "}
                                hóa đơn chưa thanh toán
                            </li>
                            <li>
                                Tổng{"  "}
                                <span className="font-bold text-yellow-600">
                                    {formatter.number(data?.summary.total_price_pending ?? 0)}đ {"  "}
                                </span>
                                cần phải thanh toán
                            </li>
                        </ul>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-1 sm:gap-2 md:mt-0">
                        {/* <ExportInvoices payload={{ sort, status, date, totalPages }} /> */}
                        {/* <FilterInvoice /> */}
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            # Hóa đơn
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Số tiền
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase sm:px-6"
                                        >
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading && (payments?.length ?? 0) == 0 && (
                                        <tr className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                                            <td
                                                className="px-2 py-4 text-xs font-medium whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm"
                                                colSpan={8}
                                            >
                                                <DisplayNoData title="Bạn hiện không có hóa đơn nào" />
                                            </td>
                                        </tr>
                                    )}

                                    {isLoading ? (
                                        [...Array(PAYMENT_PER_PAGE)].map((_, index) => (
                                            <TableSkeleton key={index} col={6} />
                                        ))
                                    ) : (
                                        <>
                                            {payments.map((payment) => (
                                                <tr
                                                    onClick={() => router.push(`/payments/${payment.transaction_code}`)}
                                                    key={payment.id}
                                                    className="cursor-pointer odd:bg-white even:bg-gray-100 hover:bg-gray-100"
                                                >
                                                    <td className="px-2 py-4 text-xs font-medium whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="max-w-[80px] sm:max-w-none">
                                                            #{payment.transaction_code}
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-4 text-xs whitespace-nowrap text-gray-800 sm:px-6 sm:text-sm">
                                                        <div className="font-medium">
                                                            {formatter.number(payment.amount)} VNĐ
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 text-end text-xs font-medium whitespace-nowrap sm:px-6 sm:text-sm">
                                                        {getStatusBadge("payment", payment.status)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-between lg:flex-col">
                <div className="ml-auto">
                    {!isLoading && totalPages > 1 && (payments?.length ?? 0) > 0 && (
                        <PaginationNav totalPages={totalPages} basePath="/profile/payments" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(InvoiceList);

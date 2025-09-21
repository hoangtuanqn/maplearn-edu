"use client";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, User, Calendar } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import paymentApi, { PAYMENT_PER_PAGE } from "~/apiRequest/admin/payment";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import { buildLaravelFilterQuery } from "~/libs/hepler";

const allowedFields = [
    "search",
    "page",
    "payment_method",
    "status",
    "sort",
    "amount_min",
    "amount_max",
    "date_from",
    "date_to",
] as const;

const PaymentList = () => {
    const { page, search, payment_method, sort, amount_min, amount_max, date_from, date_to } =
        useGetSearchQuery(allowedFields);

    const { data: payments, isLoading } = useQuery({
        queryKey: [
            "payment",
            "list",
            { page, search, payment_method, sort, amount_min, amount_max, date_from, date_to },
        ],
        queryFn: async () => {
            const res = await paymentApi.getPayments(
                +page,
                PAYMENT_PER_PAGE,
                sort,
                buildLaravelFilterQuery({
                    page,
                    search,
                    payment_method,
                    amount_min,
                    amount_max,
                    date_from,
                    date_to,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = payments?.total ?? 0;
    const totalPages = Math.ceil(total / PAYMENT_PER_PAGE);

    const getPaymentMethodBadge = (method: string) => {
        const configs = {
            transfer: { label: "Chuyển khoản", className: "bg-blue-100 text-blue-800" },
            vnpay: { label: "VNPay", className: "bg-red-100 text-red-800" },
            momo: { label: "MoMo", className: "bg-pink-100 text-pink-800" },
            zalopay: { label: "ZaloPay", className: "bg-purple-100 text-purple-800" },
        };
        const config = configs[method as keyof typeof configs] || {
            label: method,
            className: "bg-gray-100 text-gray-800",
        };
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    const getPaymentStatusBadge = (status: string) => {
        const configs = {
            pending: { label: "Đang chờ", className: "bg-yellow-100 text-yellow-800" },
            paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-800" },
            canceled: { label: "Đã hủy", className: "bg-red-100 text-red-800" },
        };
        const config = configs[status as keyof typeof configs] || {
            label: status,
            className: "bg-gray-100 text-gray-800",
        };
        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin thanh toán
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Phương thức</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Số tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Ngày thanh toán</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {isLoading
                            ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={7} />)
                            : payments?.data.map((payment, idx) => (
                                  <tr
                                      key={payment.id}
                                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                  >
                                      <td className="px-4 py-3 text-zinc-500">
                                          {Math.max(0, +page - 1) * PAYMENT_PER_PAGE + idx + 1}
                                      </td>

                                      <td className="px-4 py-3 align-top text-zinc-500">
                                          <div className="space-y-1">
                                              <div className="flex items-center gap-1">
                                                  <CreditCard className="h-3 w-3 text-blue-500" />
                                                  <p className="font-semibold text-gray-900">
                                                      {payment.transaction_code}
                                                  </p>
                                              </div>
                                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                                  <User className="h-3 w-3 text-gray-400" />
                                                  <span className="font-medium">Người dùng:</span>
                                                  <span>
                                                      <Link href={`/admin/students/${payment.user.id}`}>
                                                          {payment.user.full_name}
                                                      </Link>
                                                  </span>
                                              </div>
                                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                                  <span className="font-medium">Khóa học:</span>
                                                  <span>
                                                      <Link href={`/courses/${payment.course.slug}`}>
                                                          {payment.course.name}
                                                      </Link>
                                                  </span>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-3 text-zinc-500">
                                          {getPaymentMethodBadge(payment.payment_method)}
                                      </td>

                                      <td className="px-4 py-3 text-zinc-500">
                                          <div className="space-y-1">
                                              <p className="font-semibold text-gray-900">
                                                  {formatter.number(payment.amount)}
                                              </p>
                                          </div>
                                      </td>

                                      <td className="px-4 py-3 text-zinc-500">
                                          <div className="space-y-1">
                                              <div className="flex items-center gap-1">
                                                  <Calendar className="h-3 w-3 text-gray-400" />
                                                  <span className="text-xs">
                                                      {formatter.date(payment.paid_at, true)}
                                                  </span>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-3 text-right">{getPaymentStatusBadge(payment.status)}</td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>

            <div className="ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/payments" />
                </Suspense>
            </div>
        </>
    );
};

export default PaymentList;

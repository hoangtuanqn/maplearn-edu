"use client";

import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { DollarSign, CreditCard, Users, ShoppingCart } from "lucide-react";
import { FilterPayments } from "./FilterPayments";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { useQuery } from "@tanstack/react-query";
import paymentApi from "~/apiRequest/admin/payment";
import { formatter } from "~/libs/format";

const allowedFields = ["date_from", "date_to"] as const;

const StatsPayment = () => {
    let { date_from, date_to } = useGetSearchQuery(allowedFields);
    // Nếu 1 trong 2 không tồn tại, mặc định là từ 7 ngày trước đến hôm nay
    if (!date_from || !date_to) {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        date_from = sevenDaysAgo.toISOString().split("T")[0];
        date_to = today.toISOString().split("T")[0];
    } else {
        date_from = new Date(date_from).toISOString().split("T")[0];
        date_to = new Date(date_to).toISOString().split("T")[0];
    }
    const {
        data: stats,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["payment", "stats", { date_from, date_to }],
        queryFn: async () => {
            const res = await paymentApi.getStats(date_from, date_to);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full space-y-6 rounded-lg bg-white p-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Thống Kê Thanh Toán</h2>
                        <p className="mt-1 text-gray-600">Phân tích chi tiết và hiệu suất thanh toán.</p>
                    </div>
                    <Suspense>
                        <FilterPayments />
                    </Suspense>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="border-gray-200">
                            <CardHeader className="pb-2">
                                <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full space-y-6 rounded-lg bg-white p-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Thống Kê Thanh Toán</h2>
                        <p className="mt-1 text-gray-600">Có lỗi xảy ra khi tải dữ liệu</p>
                    </div>
                    <Suspense>
                        <FilterPayments />
                    </Suspense>
                </div>
                <div className="py-8 text-center">
                    <p className="text-red-600">Không thể tải dữ liệu thống kê. Vui lòng thử lại.</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!stats) {
        return (
            <div className="w-full space-y-6 rounded-lg bg-white p-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Thống Kê Thanh Toán</h2>
                        <p className="mt-1 text-gray-600">Không có dữ liệu trong khoảng thời gian này</p>
                    </div>
                    <Suspense>
                        <FilterPayments />
                    </Suspense>
                </div>
                <div className="py-8 text-center">
                    <p className="text-gray-600">Chưa có dữ liệu thanh toán trong khoảng thời gian được chọn.</p>
                </div>
            </div>
        );
    }

    // Format date range text
    const getDateRangeText = () => {
        if (date_from && date_to) {
            const from = new Date(date_from).toLocaleDateString("vi-VN");
            const to = new Date(date_to).toLocaleDateString("vi-VN");
            return `${from} - ${to}`;
        }
        return "Khoảng thời gian được chọn";
    };

    return (
        <div className="w-full space-y-6 rounded-lg bg-white p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Thống Kê Thanh Toán</h2>
                    <p className="mt-1 text-gray-600">
                        Phân tích chi tiết và hiệu suất thanh toán từ {getDateRangeText()}.
                    </p>
                </div>
                <Suspense>
                    <FilterPayments />
                </Suspense>
            </div>

            {/* Dynamic KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng Doanh Thu */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-blue-700">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Tổng Doanh Thu
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">{formatter.number(stats.total_revenue)}</div>
                        <div className="mt-1 text-xs text-gray-600">{getDateRangeText()}</div>
                    </CardContent>
                </Card>

                {/* Tổng Thanh Toán */}
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-purple-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Tổng Thanh Toán
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">
                            {stats.total_payments.toLocaleString("vi-VN")}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">Giao dịch thành công</div>
                    </CardContent>
                </Card>

                {/* Tổng Học Viên */}
                <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-green-700">
                            <Users className="mr-2 h-4 w-4" />
                            Tổng Học Viên
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900">
                            {stats.total_students.toLocaleString("vi-VN")}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">Học viên đã mua khóa học</div>
                    </CardContent>
                </Card>

                {/* Giá Trị Đơn Trung Bình */}
                <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-orange-700">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Giá Trị Đơn TB
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">
                            {formatter.number(stats.average_order_value)}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">Trung bình mỗi giao dịch</div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Khóa Học Đã Bán */}
                <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-indigo-700">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Tổng Khóa Học Đã Bán
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-indigo-900">
                            {stats.total_courses_sold.toLocaleString("vi-VN")}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">Khóa học đã được mua</div>
                    </CardContent>
                </Card>

                {/* Khoảng Thời Gian */}
                <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Khoảng Thời Gian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-gray-900">
                            {new Date(stats.date_from).toLocaleDateString("vi-VN")}
                        </div>
                        <div className="text-sm text-gray-600">đến</div>
                        <div className="text-lg font-bold text-gray-900">
                            {new Date(stats.date_to).toLocaleDateString("vi-VN")}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StatsPayment;

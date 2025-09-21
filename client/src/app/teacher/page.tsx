"use client";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, FileText, CreditCard, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Link from "next/link";
import { formatter } from "~/libs/format";
import DisplayAvatar from "../(student)/_components/DisplayAvatar";
import dashboardTeacherApi from "~/apiRequest/teacher/dashboard";
import { useAuth } from "~/hooks/useAuth";

const TeacherPage = () => {
    const { user } = useAuth();
    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["teacher", "dashboard"],
        queryFn: async () => {
            const res = await dashboardTeacherApi.getDashboard();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Tính phần trăm tăng trưởng
    const calculateGrowth = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return Math.round(((current - previous) / previous) * 100);
    };

    const lastMonthRevenue = dashboard?.total_last_month || 0;
    const currentMonthRevenue = dashboard?.total_in_this_year[new Date().getMonth()] || 0;
    const revenueGrowth = calculateGrowth(currentMonthRevenue, lastMonthRevenue);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white p-6">
                <div className="animate-pulse">
                    <div className="mb-8">
                        <div className="mb-2 h-8 w-64 rounded bg-gray-200"></div>
                        <div className="h-4 w-96 rounded bg-gray-200"></div>
                    </div>
                    <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 rounded-lg bg-gray-200"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!dashboard || !user) return null;

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Xin chào giáo viên <span className="text-primary">{user.full_name}</span>
                </h1>
                <p className="text-gray-600">Thống kê tổng quan</p>
            </div>

            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng Học sinh */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng học sinh của bạn</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_students}</p>
                            <div className="mt-2 flex items-center">
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.new_students.length}</span>
                                <span className="ml-1 text-sm text-gray-500">Học sinh mới</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Khóa Học</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_courses}</p>
                            <div className="mt-2 flex items-center">
                                <BookOpen className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">
                                    +{dashboard.activity_in_4_weeks.reduce((acc, week) => acc + week.new_courses, 0)}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">khóa học mới</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-50 p-3">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng đề thi */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Đề Thi</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_exams}</p>
                            <div className="mt-2 flex items-center">
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">
                                    +{dashboard.activity_in_4_weeks.reduce((acc, week) => acc + week.new_exams, 0)}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">đề thi mới</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3">
                            <FileText className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* Tổng doanh thu tháng này */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Doanh Thu tháng này</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatter.number(dashboard.total_in_this_year[new Date().getMonth()])}
                            </p>
                            <div className="mt-2 flex items-center">
                                {revenueGrowth >= 0 ? (
                                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                                )}
                                <span className={`text-sm ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {revenueGrowth >= 0 ? "+" : ""}
                                    {revenueGrowth}%
                                </span>
                                <span className="ml-1 text-sm text-gray-500">so với tháng trước</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách hoạt động gần đây */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Học sinh mới */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Học sinh mới</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_students?.slice(0, 5).map((user: any) => (
                                <div key={user.id} className="flex items-center space-x-3">
                                    <DisplayAvatar fullName={user.full_name} avatar={user.avatar} ratio={"10"} />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{user.full_name}</p>
                                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">Mới</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khóa học phổ biến */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Khóa học phổ biến của bạn</h3>
                            <Link
                                href="/teacher/courses"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.top_courses?.slice(0, 5).map((course: any, index: number) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                            <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            target="_blank"
                                            className="line-clamp-1 truncate text-sm font-medium text-gray-900"
                                        >
                                            {course.name}
                                        </Link>
                                        <div className="mt-1 flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <Users className="mr-1 h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {course.students_count} học viên
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-xs text-gray-500">
                                                    {formatter.number(parseInt(course.revenue))}đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Thanh toán gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Lượt mua gần Đây</h3>
                            <Link
                                href="/teacher/payments"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_payments?.slice(0, 5).map((payment: any, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <DisplayAvatar
                                            fullName={payment.full_name}
                                            avatar={payment.avatar}
                                            ratio={"8"}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.full_name}</p>
                                            <p className="text-xs text-gray-500">{payment.course_name}</p>
                                        </div>
                                    </div>
                                    <div className="ml-2 text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatter.number(payment.amount)}đ
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Thao Tác Nhanh</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/teacher/courses/create"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-blue-50 p-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Xem khóa Học</p>
                            <p className="text-sm text-gray-500">Xem danh sách khóa học</p>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/exams/create"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-orange-50 p-2">
                            <FileText className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Tạo Đề Thi</p>
                            <p className="text-sm text-gray-500">Thêm đề thi mới</p>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/students"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-green-50 p-2">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Quản Lý học sinh</p>
                            <p className="text-sm text-gray-500">Xem danh sách học sinh</p>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/payments"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-yellow-50 p-2">
                            <CreditCard className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Thanh Toán</p>
                            <p className="text-sm text-gray-500">Xem giao dịch</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeacherPage;

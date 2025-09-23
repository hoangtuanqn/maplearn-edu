"use client";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, FileText, CreditCard, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Link from "next/link";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import dashboardAdminApi from "~/apiRequest/admin/dashboard";
import { formatter } from "~/libs/format";
import DisplayAvatar from "../(student)/_components/DisplayAvatar";
import { Suspense } from "react";
import TutorialButtonAdmin from "./_components/TutorialButtonAdmin";

const AdminPage = () => {
    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["admin", "dashboard"],
        queryFn: async () => {
            const res = await dashboardAdminApi.getDashboard();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Tính toán data cho charts từ API data
    const chartData = dashboard
        ? {
              // Dữ liệu doanh thu theo tháng từ total_in_this_year
              revenueData: dashboard.total_in_this_year.map((revenue, index) => ({
                  month: `T${index + 1}`,
                  revenue: revenue,
              })),

              // Phân bố khóa học theo danh mục từ courses_by_category
              courseCategoryData: Object.entries(dashboard.courses_by_category).map(([category, count], index) => {
                  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];
                  return {
                      category: category.replace(/-/g, " ").toUpperCase(),
                      count: count,
                      color: colors[index % colors.length],
                  };
              }),

              // Hoạt động 4 tuần từ activity_in_4_weeks
              weeklyEnrollmentData: dashboard.activity_in_4_weeks,

              // Phương thức thanh toán từ payment_methods
              paymentMethodData: Object.entries(dashboard.payment_methods).map(([method, count]) => {
                  const total = Object.values(dashboard.payment_methods).reduce((a, b) => a + b, 0);
                  const methodNames = {
                      vnpay: "VNPay",
                      momo: "MoMo",
                      zalopay: "ZaloPay",
                      transfer: "Chuyển khoản",
                  };
                  const colors = {
                      vnpay: "#3b82f6",
                      momo: "#ec4899",
                      zalopay: "#06b6d4",
                      transfer: "#10b981",
                  };
                  return {
                      method: methodNames[method as keyof typeof methodNames] || method,
                      count: count,
                      percentage: Math.round((count / total) * 100),
                      color: colors[method as keyof typeof colors] || "#6b7280",
                  };
              }),
          }
        : null;

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

    if (!dashboard) return null;
    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Quản trị hệ thống MapLearn</h1>
                    <p className="text-gray-600">Tổng quan về hệ thống MapLearn Platform</p>
                </div>
                <div>
                    <Suspense>
                        <TutorialButtonAdmin />
                    </Suspense>
                </div>
            </div>

            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng người dùng */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng Người Dùng</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_users.toLocaleString()}</p>
                            <div className="mt-2 flex items-center">
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.new_users.length}</span>
                                <span className="ml-1 text-sm text-gray-500">người dùng mới</span>
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

            {/* Biểu đồ chính - Row 1: Doanh thu và Danh mục khóa học */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                {/* Biểu đồ doanh thu theo tháng */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Doanh Thu 12 Tháng</h3>
                        <div className="text-sm text-gray-500">VNĐ</div>
                    </div>
                    <div className="h-80">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData.revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [`${formatter.number(value)} VNĐ`, "Doanh thu"]}
                                        labelStyle={{ color: "#1f2937" }}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Biểu đồ phân bố danh mục khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Phân Bố Khóa Học</h3>
                        <div className="text-sm text-gray-500">Theo danh mục</div>
                    </div>
                    <div className="h-80">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData.courseCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label={(entry: any) => `${entry.category.substring(0, 10)}...`}
                                        labelLine={false}
                                    >
                                        {chartData.courseCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number, name: string, props: any) => [
                                            `${value} khóa học`,
                                            props.payload.category,
                                        ]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Biểu đồ và thống kê - Row 2 */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Biểu đồ hoạt động hàng tuần */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Hoạt Động 4 Tuần Gần Đây</h3>
                        <div className="text-sm text-gray-500">Khóa học, Đề thi, Người dùng mới</div>
                    </div>
                    <div className="h-80">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.weeklyEnrollmentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="week"
                                        tick={{ fontSize: 12, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                    />
                                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} tickLine={{ stroke: "#e2e8f0" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="new_courses"
                                        fill="#3b82f6"
                                        name="Khóa học mới"
                                        radius={[2, 2, 0, 0]}
                                    />
                                    <Bar dataKey="new_exams" fill="#10b981" name="Đề thi mới" radius={[2, 2, 0, 0]} />
                                    <Bar
                                        dataKey="new_users"
                                        fill="#f59e0b"
                                        name="Người dùng mới"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Thống kê phương thức thanh toán */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Thanh Toán</h3>
                        <div className="text-sm text-gray-500">Phương thức</div>
                    </div>
                    <div className="space-y-4">
                        {chartData?.paymentMethodData.map((method, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: method.color }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-900">{method.method}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">{method.count}</div>
                                    <div className="text-xs text-gray-500">{method.percentage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mini chart for payment methods */}
                    <div className="mt-4 h-32">
                        {chartData && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData.paymentMethodData}
                                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="method"
                                        tick={{ fontSize: 10, fill: "#64748b" }}
                                        tickLine={{ stroke: "#e2e8f0" }}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        height={50}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        formatter={(value: number) => [`${value} giao dịch`, "Số lượng"]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[2, 2, 0, 0]} fill="#3b82f6">
                                        {chartData &&
                                            chartData.paymentMethodData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Danh sách hoạt động gần đây */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Người dùng mới */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Người Dùng Mới</h3>
                            <Link
                                href="/admin/students"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_users?.slice(0, 5).map((user: any) => (
                                <Link
                                    key={user.id}
                                    href={`/admin/students/${user.id}`}
                                    target="_blank"
                                    className="flex items-center space-x-3"
                                >
                                    <DisplayAvatar fullName={user.full_name} avatar={user.avatar} ratio={"10"} />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">{user.full_name}</p>
                                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="text-xs text-gray-400">Mới</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Khóa học phổ biến */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Khóa Học Phổ Biến</h3>
                            <Link
                                href="/admin/courses"
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
                                            className="truncate text-sm font-medium text-gray-900"
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
                                                    {course.revenue === 0
                                                        ? "Miễn phí"
                                                        : `${formatter.number(course.revenue)}đ`}
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
                            <h3 className="text-base font-semibold text-gray-900">Thanh Toán Gần Đây</h3>
                            <Link
                                href="/admin/payments"
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
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{payment.full_name}</p>
                                            <p className="text-xs text-gray-500">{payment.course_name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
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
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm" id="quick-actions">
                <h3 className="mb-4 text-base font-semibold text-gray-900">Thao Tác Nhanh</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Link
                        href="/admin/courses/create"
                        className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                        <div className="mr-3 rounded-lg bg-blue-50 p-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Tạo Khóa Học</p>
                            <p className="text-sm text-gray-500">Thêm khóa học mới</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/exams/create"
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
                        href="/admin/students"
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
                        href="/admin/payments"
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

export default AdminPage;

"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Users, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import courseAdminApi from "~/apiRequest/admin/course";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Custom colors for bars based on values
const getBarColor = (value: number) => {
    if (value >= 10) return "#10b981"; // Green for high values
    if (value >= 7) return "#3b82f6"; // Blue for medium values
    return "#f59e0b"; // Orange for low values
};

// Calculate growth compared to previous day
const calculateGrowth = (data: Array<{ date: string; student_count: number }>) => {
    return data.map((item, index) => {
        if (index === 0) {
            return { ...item, growth: 0 };
        }
        const previousCount = data[index - 1].student_count;
        const growth = item.student_count - previousCount;
        return { ...item, growth };
    });
};

// Format date for display
const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return format(date, "dd/MM", { locale: vi });
    } catch {
        return dateString;
    }
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const growth = data.growth || 0;
        const growthText = growth > 0 ? `+${growth}` : growth === 0 ? "0" : `${growth}`;
        const growthColor = growth > 0 ? "text-green-600" : growth === 0 ? "text-gray-600" : "text-red-600";

        return (
            <div className="rounded-lg border bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    <Calendar className="mr-1 inline h-4 w-4" />
                    Ngày {label}
                </p>
                <p className="text-blue-600 dark:text-blue-400">
                    <Users className="mr-1 inline h-4 w-4" />
                    Học sinh: {payload[0].value}
                </p>

                <p className={`text-xs ${growthColor}`}>
                    <TrendingUp className="mr-1 inline h-4 w-4" />
                    So với hôm trước: {growthText}
                </p>
            </div>
        );
    }
    return null;
};

export default function CourseStudentChart({ slug }: { slug: string }) {
    const {
        data: rawData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["course-student-stats", slug],
        queryFn: async () => {
            const res = await courseAdminApi.getCourseStudentStats(slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Process data for chart
    const chartData = rawData
        ? calculateGrowth(rawData).map((item) => ({
              date: formatDate(item.date),
              students: item.student_count,
              growth: item.growth,
              originalDate: item.date,
          }))
        : [];

    const totalStudents = chartData.reduce((sum, item) => sum + item.students, 0);
    const averageStudents = chartData.length > 0 ? Math.round(totalStudents / chartData.length) : 0;
    const maxStudents = chartData.length > 0 ? Math.max(...chartData.map((item) => item.students)) : 0;

    if (isLoading) {
        return (
            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50 p-6">
                <div className="animate-pulse">
                    <div className="mb-6">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="h-6 w-48 rounded bg-gray-200"></div>
                            <div className="h-4 w-32 rounded bg-gray-200"></div>
                        </div>
                        <div className="mb-4 grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
                                    <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
                                    <div className="h-8 w-16 rounded bg-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-80 w-full rounded bg-gray-200"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50 p-6">
                <div className="py-8 text-center">
                    <p className="text-red-600">Không thể tải dữ liệu thống kê</p>
                    <p className="mt-2 text-xs text-gray-500">Vui lòng thử lại sau</p>
                </div>
            </div>
        );
    }

    if (!chartData || chartData.length === 0) {
        return (
            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50 p-6">
                <div className="py-8 text-center">
                    <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">Chưa có dữ liệu thống kê</p>
                    <p className="mt-2 text-xs text-gray-500">Dữ liệu sẽ xuất hiện khi có học sinh đăng ký</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg">
            {/* Header with stats */}
            <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-primary flex items-center text-base font-bold dark:text-gray-100">
                        <Users className="mr-2 h-6 w-6" />
                        Số học sinh đăng ký trong 7 ngày
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        {chartData.length} ngày gần nhất
                    </div>
                </div>

                {/* Stats cards */}
                <div className="mb-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <div className="text-xs text-gray-600">Tổng cộng</div>
                        <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <div className="text-xs text-gray-600">Trung bình/ngày</div>
                        <div className="text-2xl font-bold text-green-600">{averageStudents}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                        <div className="text-xs text-gray-600">Cao nhất</div>
                        <div className="text-2xl font-bold text-purple-600">{maxStudents}</div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barCategoryGap="20%"
                    >
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            dx={-10}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
                        <Bar dataKey="students" radius={[8, 8, 0, 0]} stroke="#2563eb" strokeWidth={1}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.students)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded bg-green-500"></div>
                    <span className="text-gray-600">Cao (≥10)</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded bg-blue-500"></div>
                    <span className="text-gray-600">Trung bình (7-9)</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded bg-orange-500"></div>
                    <span className="text-gray-600">Thấp (&lt;7)</span>
                </div>
            </div>
        </div>
    );
}

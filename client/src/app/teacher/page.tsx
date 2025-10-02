"use client";
import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, FileText, CreditCard, DollarSign, User, Book, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatter } from "~/libs/format";

import { Suspense, useState, useEffect } from "react";
import TutorialButtonAdmin from "./_components/TutorialButtonAdmin";
import { FilterDashboard } from "./_components/FilterDashboard";
// import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import DashboardSkeleton from "./_components/DashboardSkeleton";
import dashboardTeacherApi from "~/apiRequest/teacher/dashboard";
const AdminDashboard = () => {
    const [revenueCurrentPage, setRevenueCurrentPage] = useState(0);
    const [activityCurrentPage, setActivityCurrentPage] = useState(0);
    const itemsPerPage = 12; // Hiển thị 12 tháng mỗi lần

    // Reset pages khi filter thay đổi
    // useEffect(() => {
    //     setRevenueCurrentPage(0);
    //     setActivityCurrentPage(0);
    // }, [start_date, end_date]);

    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["teacher", "dashboard"],
        queryFn: async () => {
            const res = await dashboardTeacherApi.getDashboard();
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    // Tính toán data cho charts từ API data - phù hợp với teacher schema
    const chartData = dashboard
        ? {
              // Top courses data cho PieChart
              topCoursesData: dashboard.top_courses.map((course, index) => {
                  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
                  return {
                      name: course.name,
                      students: course.students_count,
                      revenue: course.revenue,
                      color: colors[index % colors.length],
                  };
              }),

              // Students per course cho BarChart
              studentsPerCourseData: dashboard.students_per_course.map((course) => ({
                  courseName:
                      course.course_name.length > 20 ? course.course_name.substring(0, 20) + "..." : course.course_name,
                  fullName: course.course_name,
                  students: course.students_count,
              })),

              // Exam submissions data
              examSubmissionsData: dashboard.recent_exam_submissions.map((submission) => ({
                  name: submission.full_name,
                  score: submission.score,
                  exam: submission.exam_title || "Không có tiêu đề",
                  submittedAt: submission.submitted_at,
              })),
          }
        : null;

    // Tính toán dữ liệu phân trang cho top courses
    const topCoursesDataForChart = chartData
        ? (() => {
              const startIndex = (revenueCurrentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              return chartData.topCoursesData.slice(startIndex, endIndex);
          })()
        : [];

    const topCoursesTotalPages = chartData ? Math.ceil(chartData.topCoursesData.length / itemsPerPage) : 0;
    const showTopCoursesPagination = chartData ? chartData.topCoursesData.length > itemsPerPage : false;

    // Tính toán dữ liệu phân trang cho students per course
    const studentsPerCourseDataForChart = chartData
        ? (() => {
              const startIndex = (activityCurrentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              return chartData.studentsPerCourseData.slice(startIndex, endIndex);
          })()
        : [];

    const studentsPerCoursesTotalPages = chartData
        ? Math.ceil(chartData.studentsPerCourseData.length / itemsPerPage)
        : 0;
    const showStudentsPerCoursePagination = chartData ? chartData.studentsPerCourseData.length > itemsPerPage : false;
    useEffect(() => {
        if (topCoursesTotalPages > 0) {
            setRevenueCurrentPage(1);
        }
        if (studentsPerCoursesTotalPages > 0) {
            setActivityCurrentPage(1);
        }
    }, [topCoursesTotalPages, studentsPerCoursesTotalPages]);
    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!dashboard) return null;

    return (
        <div className="min-h-screen bg-white p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Quản trị hệ thống MapLearn</h1>
                    <p className="text-gray-600">
                        Tổng quan về hệ thống MapLearn Platform <b className="font-bold">trong 12 tháng qua</b>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Suspense>
                        <TutorialButtonAdmin />
                    </Suspense>
                    <FilterDashboard />
                </div>
            </div>

            {/* Thống kê tổng quan - 4 Cards chính */}
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {/* Tổng số học sinh */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Tổng học sinh</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboard.total_students.toLocaleString()}
                            </p>
                            <div className="mt-2 flex items-center">
                                <User className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">+{dashboard.top_4_new_students.length}</span>
                                <span className="ml-1 text-sm text-gray-500">học sinh mới</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Số khóa học */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Số khóa học</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_courses}</p>
                            <div className="mt-2 flex items-center">
                                <BookOpen className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">
                                    +{dashboard.top_courses.filter((c) => c.students_count > 10).length}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">phổ biến</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-50 p-3">
                            <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Số đề thi */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Số đề thi</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboard.total_exams}</p>
                            <div className="mt-2 flex items-center">
                                <Book className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">
                                    +{dashboard.recent_exam_submissions.length}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">bài nộp gần đây</span>
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
                            <p className="text-sm font-medium text-gray-600">Doanh Thu Tháng</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboard.total_in_this_month.toLocaleString("vi-VN")} VNĐ
                            </p>
                            <div className="mt-2 flex items-center">
                                <DollarSign className="mr-1 h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-600">
                                    {dashboard.top_courses
                                        .reduce((sum, course) => sum + course.revenue, 0)
                                        .toLocaleString("vi-VN")}{" "}
                                    VNĐ
                                </span>
                                <span className="ml-1 text-sm text-gray-500">từ top courses</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Biểu đồ chính - Row 1: Top Courses và Students per Course */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Top Courses với Card Layout */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Top Courses</h3>
                            <p className="text-sm text-gray-500">Khóa học phổ biến nhất</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {showTopCoursesPagination && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setRevenueCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={revenueCurrentPage === 1}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Trang trước"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="px-2 text-sm text-gray-600">
                                        {revenueCurrentPage}/{topCoursesTotalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setRevenueCurrentPage((prev) => Math.min(topCoursesTotalPages, prev + 1))
                                        }
                                        disabled={revenueCurrentPage === topCoursesTotalPages}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Trang sau"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid max-h-80 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
                        {topCoursesDataForChart.map((course, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                                #{index + 1}
                                            </div>
                                            <h4 className="text-sm leading-tight font-semibold text-gray-900">
                                                {course.name}
                                            </h4>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-blue-600" />
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {course.students} học sinh
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-bold text-green-700">
                                                    {course.revenue.toLocaleString("vi-VN")} VNĐ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-xs font-bold text-white">
                                            TOP
                                        </div>
                                    </div>
                                </div>
                                {/* Progress bar cho revenue relative */}
                                <div className="mt-3">
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                                            style={{
                                                width: `${Math.min(100, (course.revenue / Math.max(...topCoursesDataForChart.map((c) => c.revenue))) * 100)}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Biểu đồ phân bố học sinh mới */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Học sinh mới</h3>
                        <div className="text-sm text-gray-500">Top 4 gần đây</div>
                    </div>
                    <div className="h-80">
                        {dashboard && (
                            <div className="space-y-4">
                                {dashboard.top_4_new_students.map((student, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                                                {student.full_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{student.full_name}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-green-600">Mới</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Biểu đồ chính - Row 2: Students per Course và Recent Submissions */}
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                {/* Students per Course với Card Layout */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Học sinh theo khóa học</h3>
                            <p className="text-sm text-gray-500">Phân bố học sinh trong các khóa học</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {showStudentsPerCoursePagination && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setActivityCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={activityCurrentPage === 1}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Trang trước"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="px-2 text-sm text-gray-600">
                                        {activityCurrentPage}/{studentsPerCoursesTotalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setActivityCurrentPage((prev) =>
                                                Math.min(studentsPerCoursesTotalPages, prev + 1),
                                            )
                                        }
                                        disabled={activityCurrentPage === studentsPerCoursesTotalPages}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Trang sau"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid max-h-80 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
                        {studentsPerCourseDataForChart.map((course, index) => {
                            const maxStudents = Math.max(...studentsPerCourseDataForChart.map((c) => c.students));
                            const percentage = maxStudents > 0 ? (course.students / maxStudents) * 100 : 0;

                            return (
                                <div
                                    key={index}
                                    className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-3 transition-all hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                                            {course.students}
                                        </div>
                                        <div
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                percentage >= 80
                                                    ? "bg-green-100 text-green-700"
                                                    : percentage >= 50
                                                      ? "bg-yellow-100 text-yellow-700"
                                                      : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {percentage >= 80 ? "Cao" : percentage >= 50 ? "Trung bình" : "Thấp"}
                                        </div>
                                    </div>
                                    <h4
                                        className="mb-2 line-clamp-2 text-sm font-medium text-gray-900"
                                        title={course.fullName}
                                    >
                                        {course.fullName}
                                    </h4>
                                    <div className="mb-2 flex items-center gap-1 text-purple-600">
                                        <Users className="h-3 w-3" />
                                        <span className="text-xs font-medium">{course.students} học sinh</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-purple-100">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-1 text-right">
                                        <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Exam Submissions */}
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-900">Bài thi gần đây</h3>
                        <div className="text-sm text-gray-500">Điểm số</div>
                    </div>
                    <div className="h-80 overflow-y-auto">
                        {dashboard && (
                            <div className="space-y-3">
                                {dashboard.recent_exam_submissions.map((submission, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-medium text-white">
                                                {submission.full_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{submission.full_name}</p>
                                                <p className="max-w-40 truncate text-sm text-gray-500">
                                                    {submission.exam_title || "Không có tiêu đề"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`text-lg font-bold ${submission.score >= 8 ? "text-green-600" : submission.score >= 5 ? "text-yellow-600" : "text-red-600"}`}
                                            >
                                                {submission.score}/10
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(submission.submitted_at).toLocaleDateString("vi-VN")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                href="/teacher/students"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.top_4_new_students?.slice(0, 5).map((user: any) => (
                                <div key={user.id} className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                                        {user.full_name.charAt(0).toUpperCase()}
                                    </div>
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
                            <h3 className="text-base font-semibold text-gray-900">Khóa Học Phổ Biến</h3>
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
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-500">Tổng doanh thu: </span>
                                                <span
                                                    className={`text-xs ${course.revenue === 0 ? "text-gray-500" : "font-bold text-green-600"}`}
                                                >
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

                {/* Phản hồi gần đây */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">Phản Hồi Gần Đây</h3>
                            <Link
                                href="/teacher/feedbacks"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {dashboard?.new_feedbacks?.slice(0, 5).map((feedback: any, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            <CreditCard className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{feedback.student_name}</p>
                                            <p className="max-w-32 truncate text-xs text-gray-500">
                                                {feedback.feedback_text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-sm ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
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
                        href="/teacher/courses/create"
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

export default AdminDashboard;

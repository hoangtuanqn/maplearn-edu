"use client";
import { Users, BookOpen, FileText, CreditCard } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import TutorialButtonAdmin from "./_components/TutorialButtonAdmin";
import { FilterDashboard } from "./_components/FilterDashboard";
import AdminDashboard from "./_components/AdminDashboard";
const AdminPage = () => {
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
                        <FilterDashboard />
                    </Suspense>
                </div>
            </div>
            <Suspense>
                <AdminDashboard />
            </Suspense>

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

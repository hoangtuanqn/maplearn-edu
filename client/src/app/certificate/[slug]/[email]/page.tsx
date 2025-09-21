import React from "react";
import { Award, Calendar, BookOpen, CheckCircle, Trophy, Star, User } from "lucide-react";
import { Metadata } from "next";
import CertificateDisplay from "./_components/CertificateDisplay";
import { redirect } from "next/navigation";
import certificateApi from "~/apiRequest/certificate";

// Mock data - bạn sẽ thay thế bằng dữ liệu thật từ API
const skills = [
    "Tư duy logic",
    "Giải quyết vấn đề",
    "Phân tích và tổng hợp",
    "Làm việc độc lập",
    "Quản lý thời gian",
    "Tự học hiệu quả",
];

export const metadata: Metadata = {
    title: "Chứng chỉ hoàn thành khóa học | MapLearn",
    description: "Chứng chỉ hoàn thành khóa học được cấp bởi nền tảng học tập MapLearn",
};
const CertificatePage = async ({ params }: { params: Promise<{ slug: string; email: string }> }) => {
    const { slug, email } = await params;
    let certificate;
    try {
        const res = await certificateApi.getCertificate(slug, email);
        certificate = res.data.data;
    } catch {
        redirect("/");
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="text-center">
                        {/* Hero Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                            <Trophy className="h-4 w-4" />
                            <span>Chứng chỉ hoàn thành</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Giấy Chứng Nhận!</h1>
                        <p className="mb-4 text-gray-600">{certificate.full_name} đã hoàn thành xuất sắc khóa học.</p>

                        {/* Certificate ID */}
                        <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1">
                            <span className="text-xs text-gray-500">Mã chứng chỉ:</span>
                            <span className="font-mono text-sm font-semibold text-blue-600">MAPLEAN-C5-F7-F2</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Certificate Display - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <CertificateDisplay
                            fullName={certificate.full_name}
                            dateCompleted={certificate.completion_date}
                            courseTitle={certificate.course_title}
                            slugCourse={slug}
                            email={email}
                        />
                    </div>

                    {/* Sidebar - Takes 1 column */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="text-2xl font-bold text-emerald-600">10</div>
                                <div className="text-xs text-gray-500">Điểm đánh giá</div>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-600">{certificate.lesson_count}</div>
                                <div className="text-xs text-gray-500">Bài học</div>
                            </div>
                        </div>

                        {/* Course Summary */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <BookOpen className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Thông tin khóa học</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-1 line-clamp-2 font-semibold text-gray-900">
                                        {certificate.course_title}
                                    </h4>
                                    <p className="text-sm text-gray-600">Giảng viên: {certificate.lecturer_name}</p>
                                </div>

                                {/* Course Metadata */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{certificate.completion_date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Trophy className="h-4 w-4" />
                                        <span>THPT</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-gray-600">Tiến độ hoàn thành</span>
                                        <span className="font-semibold text-emerald-600">100%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div className="h-2 w-full rounded-full bg-emerald-500"></div>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                        {certificate.lesson_count} bài học • {certificate.duration_hours} giờ học tập
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Earned */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                    <Star className="h-5 w-5 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Năng lực phát triển</h3>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm text-gray-600">
                                    Các kỹ năng {certificate.full_name} đã rèn luyện qua khóa học:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Achievement Banner */}
                        <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 p-6 text-white shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-white">Thành tích xuất sắc</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Tỷ lệ hoàn thành</span>
                                    <span className="font-bold text-white">100%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Xếp loại</span>
                                    <span className="font-bold text-white">Xuất sắc</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white/90">Thời gian học</span>
                                    <span className="font-bold text-white">{certificate.duration_hours} giờ</span>
                                </div>
                            </div>

                            {/* Success Badge */}
                            <div className="mt-4 flex justify-center border-t border-white/20 pt-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                                    <Trophy className="h-4 w-4" />
                                    <span>Chứng chỉ được MapLearn xác thực</span>
                                </div>
                            </div>
                        </div>

                        {/* Student Info */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                    <User className="h-5 w-5 text-orange-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Thông tin học sinh</h3>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                                        Họ và tên
                                    </label>
                                    <p className="font-semibold text-gray-900">{certificate.full_name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                                        Email
                                    </label>
                                    <p className="text-gray-700">{certificate.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificatePage;

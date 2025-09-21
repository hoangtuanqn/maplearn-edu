"use client";
import React, { useState } from "react";
import {
    MessageCircle,
    Download,
    BookOpen,
    FileText,
    Eye,
    PenTool,
    HelpCircle,
    Target,
    Calculator,
    ExternalLink,
    Clock,
    ThumbsUp,
    MoreVertical,
} from "lucide-react";
import { Button } from "~/components/ui/button";

const VideoLessonTab = () => {
    const [activeVideoTab, setActiveVideoTab] = useState("overview");

    return (
        <div className="bg-white shadow-sm">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setActiveVideoTab("overview")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "overview"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <Eye className="mr-2 inline h-4 w-4" />
                    Tổng quan bài học
                </button>
                <button
                    onClick={() => setActiveVideoTab("discussion")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "discussion"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <MessageCircle className="mr-2 inline h-4 w-4" />
                    Thảo luận
                </button>
                <button
                    onClick={() => setActiveVideoTab("notes")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "notes"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <PenTool className="mr-2 inline h-4 w-4" />
                    Ghi chú
                </button>
                <button
                    onClick={() => setActiveVideoTab("resources")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "resources"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <Download className="mr-2 inline h-4 w-4" />
                    Tài nguyên
                </button>
                <button
                    onClick={() => setActiveVideoTab("quiz")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "quiz"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <HelpCircle className="mr-2 inline h-4 w-4" />
                    Bài tập & Quiz
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-8 max-lg:p-6">
                {activeVideoTab === "overview" && (
                    <div className="space-y-8">
                        {/* Lesson Description */}
                        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                                    <Eye className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">Mô tả bài học</h3>
                                    <p className="text-base leading-relaxed text-gray-700">
                                        Trong bài học này, chúng ta sẽ tìm hiểu về dao động điều hòa của con lắc đơn.
                                        Bài học bao gồm các khái niệm cơ bản về chu kỳ, tần số, và các yếu tố ảnh hưởng
                                        đến dao động của con lắc đơn.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Learning Objectives */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex-shrink-0 rounded-lg bg-emerald-100 p-3">
                                    <Target className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Mục tiêu học tập</h3>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        Hiểu được định nghĩa và đặc điểm của con lắc đơn
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        Tính toán chu kỳ và tần số dao động
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        Phân tích các yếu tố ảnh hưởng đến dao động
                                    </span>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        Giải được các bài tập cơ bản về con lắc đơn
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Knowledge Achievement */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <BookOpen className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h4 className="font-bold text-blue-900">Lý thuyết</h4>
                                </div>
                                <ul className="space-y-2 text-sm leading-relaxed text-blue-800">
                                    <li>• Định nghĩa con lắc đơn</li>
                                    <li>• Công thức chu kỳ dao động</li>
                                    <li>• Điều kiện dao động điều hòa</li>
                                </ul>
                            </div>
                            <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-lg bg-emerald-100 p-2">
                                        <Calculator className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <h4 className="font-bold text-emerald-900">Thực hành</h4>
                                </div>
                                <ul className="space-y-2 text-sm leading-relaxed text-emerald-800">
                                    <li>• Bài tập tính chu kỳ, tần số</li>
                                    <li>• Phân tích dao động thực tế</li>
                                    <li>• Ứng dụng vào bài thi</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "discussion" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Thảo luận bài học</h3>
                            <Button className="bg-primary hover:bg-primary/90">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Đặt câu hỏi
                            </Button>
                        </div>

                        {/* Mock Comments */}
                        <div className="space-y-4">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                                        H
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h4 className="font-semibold text-gray-900">Hoàng Minh</h4>
                                            <span className="text-xs text-gray-500">2 giờ trước</span>
                                        </div>
                                        <p className="mb-3 text-gray-700">
                                            Thầy ơi, em có thể hỏi về điều kiện để con lắc dao động điều hòa không ạ? Em
                                            vẫn chưa hiểu rõ lắm về góc nhỏ hơn 5 độ.
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <button className="hover:text-primary flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />5 thích
                                            </button>
                                            <button className="hover:text-primary">Trả lời</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Reply */}
                                <div className="mt-4 ml-14 rounded-lg border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white">
                                            GV
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h4 className="text-sm font-semibold text-gray-900">Giảng viên</h4>
                                                <span className="text-xs text-gray-500">1 giờ trước</span>
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                Chào em! Điều kiện góc nhỏ hơn 5 độ (0.087 rad) đảm bảo sin(θ) ≈ θ, giúp
                                                dao động trở thành điều hòa đơn giản. Em có thể xem lại phần giải thích
                                                trong video từ phút 12:30 nhé!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-white">
                                        L
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h4 className="font-semibold text-gray-900">Linh Nguyen</h4>
                                            <span className="text-xs text-gray-500">5 giờ trước</span>
                                        </div>
                                        <p className="mb-3 text-gray-700">
                                            Bài học rất hay và dễ hiểu! Em đã nắm được công thức tính chu kỳ T =
                                            2π√(l/g). Cảm ơn thầy nhiều ạ!
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <button className="hover:text-primary flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                12 thích
                                            </button>
                                            <button className="hover:text-primary">Trả lời</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "notes" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Ghi chú cá nhân</h3>
                            <Button className="bg-primary hover:bg-primary/90">
                                <PenTool className="mr-2 h-4 w-4" />
                                Thêm ghi chú
                            </Button>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <textarea
                                placeholder="Viết ghi chú của bạn về bài học này..."
                                className="focus:border-primary focus:ring-primary/20 h-40 w-full resize-none rounded-lg border border-gray-300 p-4 transition-colors outline-none focus:ring-2"
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    Ghi chú sẽ được lưu tự động
                                </span>
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                    Lưu ghi chú
                                </Button>
                            </div>
                        </div>

                        {/* Saved Notes */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900">Ghi chú đã lưu</h4>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-lg bg-yellow-100 p-2">
                                        <PenTool className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-900">Phút 08:30</span>
                                            <span className="text-xs text-gray-500">Hôm qua</span>
                                        </div>
                                        <p className="text-gray-700">
                                            Công thức chu kỳ: T = 2π√(l/g) - chỉ áp dụng khi góc dao động nhỏ (&lt; 5°)
                                        </p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-lg bg-green-100 p-2">
                                        <PenTool className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-900">Phút 15:20</span>
                                            <span className="text-xs text-gray-500">Hôm qua</span>
                                        </div>
                                        <p className="text-gray-700">
                                            Cần nhớ: Chu kỳ không phụ thuộc vào khối lượng và biên độ dao động
                                        </p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "resources" && (
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-gray-900">Tài nguyên bài học</h3>

                        {/* Download Files */}
                        <div>
                            <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                <Download className="text-primary h-5 w-5" />
                                File tải xuống
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-red-100 p-3">
                                            <FileText className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-gray-900">Slide bài giảng</h5>
                                            <p className="text-sm text-gray-600">Dao động điều hòa - Con lắc đơn</p>
                                            <span className="text-xs text-gray-500">PDF • 2.4 MB</span>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Tải về
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-green-100 p-3">
                                            <Calculator className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-gray-900">Bài tập thực hành</h5>
                                            <p className="text-sm text-gray-600">50 câu hỏi trắc nghiệm + tự luận</p>
                                            <span className="text-xs text-gray-500">DOCX • 1.8 MB</span>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Tải về
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Reference Links */}
                        <div>
                            <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                <ExternalLink className="text-primary h-5 w-5" />
                                Link tham khảo
                            </h4>
                            <div className="space-y-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-blue-100 p-3">
                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="mb-2 font-semibold text-gray-900">
                                                Simulateur de pendule simple (PhET)
                                            </h5>
                                            <p className="mb-3 text-sm text-gray-600">
                                                Mô phỏng tương tác giúp hiểu rõ hơn về dao động con lắc đơn
                                            </p>
                                            <a
                                                href="#"
                                                className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium"
                                            >
                                                Truy cập website
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-purple-100 p-3">
                                            <Calculator className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="mb-2 font-semibold text-gray-900">
                                                Wolfram Alpha - Pendulum Calculator
                                            </h5>
                                            <p className="mb-3 text-sm text-gray-600">
                                                Công cụ tính toán chu kỳ và tần số dao động của con lắc với độ chính xác
                                                cao
                                            </p>
                                            <a
                                                href="#"
                                                className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium"
                                            >
                                                Sử dụng công cụ
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "quiz" && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Bài tập & Quiz</h3>
                            <Button className="bg-primary hover:bg-primary/90">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Làm bài kiểm tra
                            </Button>
                        </div>

                        {/* Quiz Summary */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
                                <div className="mx-auto mb-4 w-fit rounded-lg bg-blue-100 p-3">
                                    <HelpCircle className="h-8 w-8 text-blue-600" />
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-blue-900">15</h4>
                                <p className="font-medium text-blue-800">Câu hỏi trắc nghiệm</p>
                            </div>
                            <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center">
                                <div className="mx-auto mb-4 w-fit rounded-lg bg-emerald-100 p-3">
                                    <Calculator className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-emerald-900">5</h4>
                                <p className="font-medium text-emerald-800">Bài tập tự luận</p>
                            </div>
                            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center">
                                <div className="mx-auto mb-4 w-fit rounded-lg bg-purple-100 p-3">
                                    <Clock className="h-8 w-8 text-purple-600" />
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-purple-900">30</h4>
                                <p className="font-medium text-purple-800">Phút hoàn thành</p>
                            </div>
                        </div>

                        {/* Sample Questions */}
                        <div>
                            <h4 className="mb-6 font-semibold text-gray-900">Câu hỏi mẫu</h4>
                            <div className="space-y-6">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 rounded-lg bg-orange-100 p-2 text-sm font-bold text-orange-600">
                                            01
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="mb-3 font-semibold text-gray-900">
                                                Chu kỳ dao động của con lắc đơn phụ thuộc vào yếu tố nào?
                                            </h5>
                                            <div className="space-y-2">
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q1" className="text-primary" />
                                                    <span className="text-gray-700">Khối lượng của vật nặng</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q1" className="text-primary" />
                                                    <span className="text-gray-700">Chiều dài dây treo</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q1" className="text-primary" />
                                                    <span className="text-gray-700">Biên độ dao động</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q1" className="text-primary" />
                                                    <span className="text-gray-700">Màu sắc của dây treo</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 rounded-lg bg-green-100 p-2 text-sm font-bold text-green-600">
                                            02
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="mb-3 font-semibold text-gray-900">
                                                Một con lắc đơn có chiều dài 1m dao động ở nơi có g = 10 m/s². Tính chu
                                                kỳ dao động?
                                            </h5>
                                            <div className="space-y-2">
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q2" className="text-primary" />
                                                    <span className="text-gray-700">T = π s</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q2" className="text-primary" />
                                                    <span className="text-gray-700">T = 2π s</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q2" className="text-primary" />
                                                    <span className="text-gray-700">T = π/2 s</span>
                                                </label>
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input type="radio" name="q2" className="text-primary" />
                                                    <span className="text-gray-700">T = 2 s</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoLessonTab;

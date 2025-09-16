"use client";
import React, { useState } from "react";
import { MessageCircle, Download, Share, BookOpen, FileText, Eye, PenTool, HelpCircle, Target } from "lucide-react";
import { Button } from "~/components/ui/button";
const VideoLessonTab = () => {
    const [activeVideoTab, setActiveVideoTab] = useState("overview"); // "overview" | "comments" | "notes" | "resources" | "quiz"
    return (
        <div className="border-b border-gray-200 bg-white">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveVideoTab("overview")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeVideoTab === "overview"
                            ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Eye className="mr-2 inline h-4 w-4" />
                    Tổng quan bài học
                </button>
                <button
                    onClick={() => setActiveVideoTab("discussion")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeVideoTab === "discussion"
                            ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <MessageCircle className="mr-2 inline h-4 w-4" />
                    Thảo luận
                </button>
                <button
                    onClick={() => setActiveVideoTab("notes")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeVideoTab === "notes"
                            ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <PenTool className="mr-2 inline h-4 w-4" />
                    Ghi chú
                </button>
                <button
                    onClick={() => setActiveVideoTab("resources")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeVideoTab === "resources"
                            ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Download className="mr-2 inline h-4 w-4" />
                    Tài nguyên
                </button>
                <button
                    onClick={() => setActiveVideoTab("quiz")}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeVideoTab === "quiz"
                            ? "border-b-2 border-blue-600 bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <HelpCircle className="mr-2 inline h-4 w-4" />
                    Bài tập & Quiz
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 max-lg:p-4">
                {activeVideoTab === "overview" && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Mô tả bài học</h3>
                            <p className="leading-relaxed text-gray-700">
                                Trong bài học này, chúng ta sẽ tìm hiểu về dao động điều hòa của con lắc đơn. Bài học
                                bao gồm các khái niệm cơ bản về chu kỳ, tần số, và các yếu tố ảnh hưởng đến dao động của
                                con lắc đơn.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Mục tiêu học tập</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">
                                        Hiểu được định nghĩa và đặc điểm của con lắc đơn
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">Nắm vững công thức tính chu kỳ dao động</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">Phân tích các yếu tố ảnh hưởng đến dao động</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                    <span className="text-gray-700">Giải được các bài tập cơ bản về con lắc đơn</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Kiến thức đạt được</h3>
                            <div className="grid gap-3 lg:grid-cols-2">
                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <h4 className="mb-2 font-medium text-blue-900">Lý thuyết</h4>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• Định nghĩa con lắc đơn</li>
                                        <li>• Công thức chu kỳ dao động</li>
                                        <li>• Điều kiện dao động điều hòa</li>
                                    </ul>
                                </div>
                                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                    <h4 className="mb-2 font-medium text-green-900">Thực hành</h4>
                                    <ul className="space-y-1 text-sm text-green-800">
                                        <li>• Bài tập tính chu kỳ</li>
                                        <li>• Phân tích dao động</li>
                                        <li>• Ứng dụng thực tế</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "discussion" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Thảo luận bài học</h3>
                            <Button size="sm">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Đặt câu hỏi
                            </Button>
                        </div>

                        {/* Mock Comments */}
                        <div className="space-y-4">
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                                        N
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="font-medium text-gray-900">Nguyễn Văn A</span>
                                            <span className="text-xs text-gray-500">2 giờ trước</span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Em muốn hỏi tại sao khi tăng chiều dài dây thì chu kỳ dao động lại tăng ạ?
                                        </p>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                            <button className="hover:text-blue-600">Trả lời</button>
                                            <button className="hover:text-blue-600">Thích (3)</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Reply */}
                                <div className="mt-3 ml-11 rounded-lg border border-gray-200 bg-white p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-medium text-white">
                                            GV
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="font-medium text-gray-900">Thầy Vũ Ngọc Anh</span>
                                                <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                    Giảng viên
                                                </span>
                                                <span className="text-xs text-gray-500">1 giờ trước</span>
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                Theo công thức T = 2π√(l/g), chu kỳ T tỉ lệ thuận với căn bậc hai của
                                                chiều dài l. Vì vậy khi l tăng thì T cũng tăng theo em nhé.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-medium text-white">
                                        T
                                    </div>
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="font-medium text-gray-900">Trần Thị B</span>
                                            <span className="text-xs text-gray-500">4 giờ trước</span>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Bài giảng rất hay và dễ hiểu. Em đã nắm được phần lý thuyết. Cảm ơn thầy!
                                        </p>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                            <button className="hover:text-blue-600">Trả lời</button>
                                            <button className="hover:text-blue-600">Thích (8)</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "notes" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Ghi chú cá nhân</h3>
                            <Button size="sm">
                                <PenTool className="mr-2 h-4 w-4" />
                                Thêm ghi chú
                            </Button>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4">
                            <textarea
                                placeholder="Viết ghi chú của bạn về bài học này..."
                                className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-gray-500">Ghi chú sẽ được lưu tự động</span>
                                <Button size="sm">Lưu ghi chú</Button>
                            </div>
                        </div>

                        {/* Saved Notes */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Ghi chú đã lưu</h4>
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-medium text-blue-600">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <p className="mb-1 text-sm text-gray-700">
                                            Công thức chu kỳ: T = 2π√(l/g) - l là chiều dài dây, g là gia tốc trọng
                                            trường
                                        </p>
                                        <span className="text-xs text-gray-500">Đã lưu lúc 14:30</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-600">
                                        <FileText className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-xs font-medium text-blue-600">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <p className="mb-1 text-sm text-gray-700">
                                            Điều kiện dao động điều hòa: góc lệch nhỏ (&alpha; &lt; 10°)
                                        </p>
                                        <span className="text-xs text-gray-500">Đã lưu lúc 14:25</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-600">
                                        <FileText className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "resources" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Tài nguyên bài học</h3>

                        {/* Download Files */}
                        <div>
                            <h4 className="mb-3 font-medium text-gray-900">File tải xuống</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                            <FileText className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Lý thuyết Con lắc đơn.pdf</p>
                                            <p className="text-sm text-gray-500">2.5 MB • PDF</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Tải xuống
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                            <FileText className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Bài tập Con lắc đơn.docx</p>
                                            <p className="text-sm text-gray-500">1.8 MB • DOCX</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Tải xuống
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Reference Links */}
                        <div>
                            <h4 className="mb-3 font-medium text-gray-900">Link tham khảo</h4>
                            <div className="space-y-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                            <Share className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">Video thí nghiệm con lắc đơn</h5>
                                            <p className="mb-2 text-sm text-gray-600">
                                                Video minh họa thí nghiệm con lắc đơn thực tế
                                            </p>
                                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                                https://youtube.com/watch?v=example
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                                            <BookOpen className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">
                                                Bài viết chuyên sâu về dao động
                                            </h5>
                                            <p className="mb-2 text-sm text-gray-600">
                                                Tài liệu tham khảo thêm về dao động cơ học
                                            </p>
                                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                                https://physicsworld.com/pendulum-motion
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeVideoTab === "quiz" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Bài tập & Quiz</h3>
                            <Button size="sm">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Làm bài kiểm tra
                            </Button>
                        </div>

                        {/* Quiz Summary */}
                        <div className="grid gap-4 lg:grid-cols-3">
                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">5</div>
                                <div className="text-sm text-blue-800">Câu hỏi trắc nghiệm</div>
                            </div>
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">3</div>
                                <div className="text-sm text-green-800">Bài tập tự luận</div>
                            </div>
                            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">15</div>
                                <div className="text-sm text-purple-800">Phút hoàn thành</div>
                            </div>
                        </div>

                        {/* Sample Questions */}
                        <div>
                            <h4 className="mb-4 font-medium text-gray-900">Câu hỏi mẫu</h4>
                            <div className="space-y-4">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <h5 className="mb-3 font-medium text-gray-900">
                                        Câu 1: Công thức tính chu kỳ dao động của con lắc đơn là:
                                    </h5>
                                    <div className="space-y-2">
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="radio" name="q1" className="text-blue-600" />
                                            <span className="text-gray-700">A. T = 2π√(g/l)</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="radio" name="q1" className="text-blue-600" />
                                            <span className="text-gray-700">B. T = 2π√(l/g)</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="radio" name="q1" className="text-blue-600" />
                                            <span className="text-gray-700">C. T = π√(l/g)</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="radio" name="q1" className="text-blue-600" />
                                            <span className="text-gray-700">D. T = √(l/g)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <h5 className="mb-3 font-medium text-gray-900">
                                        Câu 2: Yếu tố nào ảnh hưởng đến chu kỳ dao động của con lắc đơn?
                                    </h5>
                                    <div className="space-y-2">
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="checkbox" className="text-blue-600" />
                                            <span className="text-gray-700">Chiều dài dây treo</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="checkbox" className="text-blue-600" />
                                            <span className="text-gray-700">Khối lượng vật nặng</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="checkbox" className="text-blue-600" />
                                            <span className="text-gray-700">Gia tốc trọng trường</span>
                                        </label>
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input type="checkbox" className="text-blue-600" />
                                            <span className="text-gray-700">Biên độ dao động</span>
                                        </label>
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

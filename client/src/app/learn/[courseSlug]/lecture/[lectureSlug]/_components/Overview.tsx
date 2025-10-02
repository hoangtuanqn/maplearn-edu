import { BookOpen, Calculator, Eye, Target } from "lucide-react";
import React from "react";

const Overview = () => {
    return (
        <div className="space-y-8">
            {/* Lesson Description */}
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                        <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-3 text-base font-bold text-gray-900">Mô tả bài học</h3>
                        <p className="text-sm leading-relaxed text-gray-700">
                            Trong bài học này, chúng ta sẽ tìm hiểu về dao động điều hòa của con lắc đơn. Bài học bao
                            gồm các khái niệm cơ bản về chu kỳ, tần số, và các yếu tố ảnh hưởng đến dao động của con lắc
                            đơn.
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
                        <span className="font-medium text-gray-700">Tính toán chu kỳ và tần số dao động</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="mt-1 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="font-medium text-gray-700">Phân tích các yếu tố ảnh hưởng đến dao động</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <div className="mt-1 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="font-medium text-gray-700">Giải được các bài tập cơ bản về con lắc đơn</span>
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
    );
};

export default Overview;

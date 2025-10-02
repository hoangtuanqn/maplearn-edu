import { Calculator, Clock, HelpCircle } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const Quiz = () => {
    return (
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
                                    Một con lắc đơn có chiều dài 1m dao động ở nơi có g = 10 m/s². Tính chu kỳ dao động?
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
    );
};

export default Quiz;

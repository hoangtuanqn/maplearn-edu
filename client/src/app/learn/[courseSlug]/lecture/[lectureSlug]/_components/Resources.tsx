import { BookOpen, Calculator, Download, ExternalLink, FileText } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const Resources = () => {
    return (
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
                                    Công cụ tính toán chu kỳ và tần số dao động của con lắc với độ chính xác cao
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
    );
};

export default Resources;

"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { ExternalLink, Trophy, AlertCircle, Mail } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";

const CertificateButton = () => {
    const { user } = useAuth();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl">
                    <Trophy className="h-4 w-4" />
                    <span>Chứng chỉ của bạn</span>
                    <ExternalLink className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Chứng chỉ hoàn thành khóa học
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-6">
                        {/* Header với icon cảnh báo */}
                        <div className="space-y-3 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                                <AlertCircle className="h-8 w-8 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-base font-semibold text-gray-900">Cần xác minh email</h3>
                                <p className="text-gray-600">
                                    Vui lòng xác minh địa chỉ email của bạn để nhận chứng chỉ hoàn thành khóa học
                                </p>
                            </div>
                        </div>

                        {/* Hiển thị email */}
                        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-blue-800">Email của bạn</span>
                            </div>
                            <p className="text-center text-base font-semibold text-blue-900">{user?.email}</p>
                        </div>

                        {/* Nút xác minh */}
                        <div className="text-center">
                            <Button
                                asChild
                                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                            >
                                <a href={"/profile"} target="_blank" rel="noopener noreferrer">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Xác minh email ngay
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>

                        {/* Hướng dẫn */}
                        <div className="rounded-xl bg-gray-50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <span className="text-sm font-bold text-blue-600">i</span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <p className="mb-1 font-medium">Sau khi xác minh thành công:</p>
                                    <p>Quay lại trang này để tải xuống chứng chỉ hoàn thành khóa học của bạn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CertificateButton;

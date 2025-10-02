"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { ExternalLink, Info, Mail } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";

const VerifyEmail = () => {
    const { user } = useAuth();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`w-full`} variant={"outline"}>
                    <span>Mua ngay</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        Xác minh email để mua khóa học
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-6">
                        {/* Header với icon nhắc nhở */}
                        <div className="space-y-3 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <Info className="h-8 w-8 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-base font-semibold text-gray-900">
                                    Vui lòng xác minh email trước khi mua khóa học
                                </h3>
                                <p className="text-gray-600">
                                    Để đảm bảo an toàn và bảo mật, bạn nên xác minh địa chỉ email trước khi thanh toán
                                    hoặc đăng ký khóa học.
                                </p>
                            </div>
                        </div>

                        {/* Hiển thị email */}
                        <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
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
                                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
                            >
                                <a href={"/profile"} target="_blank" rel="noopener noreferrer">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Xác minh email ngay
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>

                        {/* Hướng dẫn */}
                        <div className="rounded-xl bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <span className="text-sm font-bold text-blue-600">i</span>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <p className="mb-1 font-medium">Sau khi xác minh thành công:</p>
                                    <p>Quay lại trang này để tiếp tục mua hoặc đăng ký khóa học bạn muốn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VerifyEmail;

"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Ban, Info, Printer, CreditCard } from "lucide-react";
import { Button } from "~/components/ui/button";

import { formatter } from "~/libs/format";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { DangerConfirm } from "~/components/DangerConfirm";
import paymentApi from "~/apiRequest/payment";
import { PaymentDetailResponse } from "~/schemaValidate/payment.schema";

const PaymentPanel = ({ payment }: { payment: PaymentDetailResponse["data"] }) => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState(payment.payment_method);
    const paymentMutation = useMutation({
        mutationFn: async (method: string) => {
            const res = await paymentApi.createPayment(payment.course_id, method);
            return res.data.data;
            // Handle other payment methods if needed
        },
        onSuccess: (data, method: string) => {
            if (data.url_payment) {
                toast.success(`Đang chuyển hướng đến ${method.toUpperCase()}...`);
                router.push(data.url_payment);
            }
        },
        onError: notificationErrorApi,
    });
    const cancelMutation = useMutation({
        mutationFn: async () => {
            await paymentApi.cancelPayment(payment.transaction_code);
        },
        onSuccess: () => {
            toast.success("Hóa đơn đã được hủy.");
            router.push("/profile/payments");
        },
        onError: notificationErrorApi,
    });
    const handlePayment = () => {
        if (["momo", "vnpay", "zalopay"].includes(paymentMethod)) {
            paymentMutation.mutate(paymentMethod);
        } else {
            toast.error("Chức năng này chưa được hỗ trợ.");
        }
    };

    return (
        <>
            {(paymentMutation.isPending || cancelMutation.isPending) && <Loading />}
            <div className="sticky top-20 space-y-4">
                {/* Payment Amount Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <CreditCard className="text-primary h-5 w-5" />
                        <h2 className="text-lg font-semibold text-gray-900">Thanh toán</h2>
                    </div>

                    <div className="text-center">
                        <p className="text-primary text-3xl font-bold">
                            {payment.status === "pending" ? formatter.number(payment.course.price) : 0}đ
                        </p>
                    </div>

                    {payment.status === "pending" && (
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phương thức thanh toán
                                </label>
                                <Select
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod as (value: string) => void}
                                >
                                    <SelectTrigger className="focus:border-primary focus:ring-primary/20 w-full border-gray-200">
                                        <SelectValue placeholder="Chọn phương thức thanh toán" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="transfer">Chuyển khoản ngân hàng</SelectItem>
                                            <SelectItem value="vnpay">Ví VNPay</SelectItem>
                                            <SelectItem value="momo">Ví MOMO</SelectItem>
                                            <SelectItem value="zalopay">Ví ZaloPay</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {["zalopay", "momo", "vnpay"].includes(paymentMethod) && (
                                <Button
                                    className="bg-primary hover:bg-primary/90 w-full text-white"
                                    onClick={handlePayment}
                                >
                                    Đi đến {paymentMethod.toUpperCase()}
                                </Button>
                            )}

                            {paymentMethod === "transfer" && (
                                <div className="space-y-4">
                                    <div className="flex justify-center">
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                            <Image
                                                src={`https://qr.sepay.vn/img?bank=MBBank&acc=259876543210&template=qronly&amount=${payment.course.price}&des=${payment.transaction_code}`}
                                                width={200}
                                                height={200}
                                                alt="QR Code"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Ngân hàng:</span>
                                            <span className="font-medium text-gray-900">MBBank</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Số tài khoản:</span>
                                            <span className="font-medium text-gray-900">259876543210</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Chủ tài khoản:</span>
                                            <span className="font-medium text-gray-900">Phạm Hoàng Tuấn</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Chi nhánh:</span>
                                            <span className="font-medium text-gray-900">Quảng Ngãi</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                                        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                                        <p className="text-sm text-amber-700">
                                            Hệ thống tự động xác nhận sau khi quý khách thanh toán thành công.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 font-semibold text-gray-900">Thao tác</h3>
                    <div className="space-y-3">
                        {["pending", "paid"].includes(payment.status) && (
                            <Button
                                className="w-full gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                                onClick={() => window?.print()}
                                variant="outline"
                            >
                                <Printer className="h-4 w-4" />
                                In hóa đơn
                            </Button>
                        )}
                        {payment.status === "pending" && (
                            <DangerConfirm
                                message="Bạn có chắc chắn muốn hủy hóa đơn này không?"
                                action={() => cancelMutation.mutate()}
                            >
                                <Button
                                    className="w-full gap-2 border-red-200 text-red-600 hover:bg-red-50"
                                    variant="outline"
                                >
                                    <Ban className="h-4 w-4" />
                                    Hủy hóa đơn
                                </Button>
                            </DangerConfirm>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPanel;

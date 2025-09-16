"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Ban, Info, Printer } from "lucide-react";
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
            <div className="sticky top-[70px] mx-auto h-fit w-full max-w-md flex-3/12 shrink-0 md:mx-0 md:w-auto md:max-w-none md:flex-3/12 md:shrink-0">
                <div className="h-fit flex-3/12 shrink-0 rounded-xl border border-slate-100 bg-white p-4 shadow-xs md:p-8">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-slate-700">Số tiền cần thanh toán</h2>
                        <p className="text-primary mt-2 text-3xl font-extrabold tracking-wide drop-shadow-sm md:text-4xl">
                            {payment.status == "pending" ? formatter.number(payment.course.price) : 0} đ
                        </p>
                        {payment.status == "pending" && (
                            <>
                                <Select
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod as (value: string) => void}
                                >
                                    <SelectTrigger className="focus:ring-primary/30 mt-5 w-full rounded-lg border-slate-200 shadow-sm focus:ring-2">
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
                                <p className="mt-2 text-center text-xs font-semibold text-slate-400">
                                    Dễ dàng thay đổi phương thức thanh toán
                                </p>
                                <div className="mt-4 flex flex-col items-center gap-4">
                                    {["zalopay", "momo", "vnpay"].includes(paymentMethod) && (
                                        <Button className="w-full text-white md:w-auto" onClick={handlePayment}>
                                            Đi đến {paymentMethod.toUpperCase()}
                                        </Button>
                                    )}

                                    {paymentMethod === "transfer" && (
                                        <>
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 md:p-3">
                                                <Image
                                                    src={`https://qr.sepay.vn/img?bank=MBBank&acc=259876543210&template=qronly&amount=${payment.course.price}&des=${payment.transaction_code}`}
                                                    width={180}
                                                    height={180}
                                                    alt="QR Code"
                                                    className="h-[180px] w-[180px] rounded-lg md:h-[220px] md:w-[220px]"
                                                />
                                            </div>

                                            <div className="flex w-full flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3 text-base md:p-4">
                                                <span className="font-medium text-slate-600">
                                                    Ngân hàng:{" "}
                                                    <span className="font-semibold text-slate-800">MBBank</span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Số tài khoản:{" "}
                                                    <span className="font-semibold text-slate-800">259876543210</span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Chủ tài khoản:{" "}
                                                    <span className="font-semibold text-slate-800">
                                                        Phạm Hoàng Tuấn
                                                    </span>
                                                </span>
                                                <span className="font-medium text-slate-600">
                                                    Chi nhánh:{" "}
                                                    <span className="font-semibold text-slate-800">Quảng Ngãi</span>
                                                </span>
                                            </div>
                                            <div className="mt-2 flex w-full items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 md:px-4">
                                                <Info className="h-5 w-5 flex-shrink-0 text-amber-400" />
                                                <span className="text-[13.125px] font-medium text-amber-500">
                                                    Hệ thống tự động xác nhận sau khi quý khách thanh toán thành công.
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-6 px-0 md:px-2">
                    <p className="mb-2 text-base font-bold text-slate-700">Thao tác</p>
                    <div className="mt-2 flex gap-2">
                        {["pending", "paid"].includes(payment.status) && (
                            <Button
                                className="text-primary flex-3/4 gap-2"
                                onClick={() => window?.print()}
                                variant={"outline"}
                            >
                                <Printer className="h-5 w-5" /> <span>In hóa đơn</span>
                            </Button>
                        )}
                        {payment.status === "pending" && (
                            <DangerConfirm
                                message="Bạn có chắc chắn muốn hủy hóa đơn này không?"
                                action={() => cancelMutation.mutate()}
                            >
                                <Button
                                    className="flex-1/4 gap-2 border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    variant="outline"
                                >
                                    <Ban /> <span>Hủy hóa đơn</span>
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

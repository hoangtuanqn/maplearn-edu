"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import { BadgeRussianRuble } from "lucide-react";
const MethodPayment = ({
    paymentMethod,
    setPaymentMethod,
}: {
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
}) => {
    return (
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div
                className="relative flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 max-lg:py-2"
                style={{
                    borderColor: paymentMethod === "transfer" ? "#2563eb" : "#e5e7eb",
                    background: paymentMethod === "transfer" ? "#eff6ff" : "#fff",
                }}
                onClick={() => setPaymentMethod("transfer")}
            >
                {/* "Khuyên dùng" badge */}
                <span
                    className="absolute -top-3 left-4 z-10 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white shadow"
                    style={{ letterSpacing: 0.5 }}
                >
                    Khuyên dùng
                </span>
                <RadioGroupItem
                    value="transfer"
                    id="transfer"
                    className="border-2 border-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/bank-transfer.png"
                        alt="Chuyển khoản"
                        width={40}
                        height={40}
                        className="rounded max-lg:w-8"
                    />
                    <div>
                        <Label
                            htmlFor="transfer"
                            className="text-[15.125px] font-semibold text-blue-700 max-lg:text-sm"
                        >
                            Chuyển khoản ngân hàng
                        </Label>
                        <div className="text-xs text-gray-500">Thanh toán qua chuyển khoản ngân hàng</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-pink-500 hover:bg-pink-50 max-lg:py-2"
                style={{
                    borderColor: paymentMethod === "momo" ? "#ec4899" : "#e5e7eb",
                    background: paymentMethod === "momo" ? "#fdf2f8" : "#fff",
                }}
                onClick={() => setPaymentMethod("momo")}
            >
                <RadioGroupItem value="momo" id="momo" className="border-2 border-pink-500 focus:ring-pink-500" />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/momo.webp"
                        alt="MOMO"
                        width={40}
                        height={40}
                        className="rounded max-lg:w-8"
                    />
                    <div>
                        <Label htmlFor="momo" className="text-[15.125px] font-semibold text-pink-700 max-lg:text-sm">
                            Ví MOMO
                        </Label>
                        <div className="text-xs text-gray-500">Thanh toán bằng ví điện tử MOMO</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-cyan-500 hover:bg-cyan-50 max-lg:py-2"
                style={{
                    borderColor: paymentMethod === "vnpay" ? "#06b6d4" : "#e5e7eb",
                    background: paymentMethod === "vnpay" ? "#ecfeff" : "#fff",
                }}
                onClick={() => setPaymentMethod("vnpay")}
            >
                <RadioGroupItem value="vnpay" id="vnpay" className="border-2 border-cyan-500 focus:ring-cyan-500" />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/vnpay.webp"
                        alt="VNPAY"
                        width={40}
                        height={40}
                        className="rounded max-lg:w-8"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="vnpay"
                                className="text-[15.125px] font-semibold text-cyan-700 max-lg:text-sm"
                            >
                                Ví VNPAY
                            </Label>
                            {/* Discount badge */}
                            <span className="hidden items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 lg:flex">
                                <BadgeRussianRuble />
                                Giảm 10k
                            </span>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">Thanh toán bằng ví điện tử VNPAY</div>
                    </div>
                </div>
            </div>
            <div
                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:border-[#008fe5] hover:bg-[#e6f6ff] max-lg:py-2"
                style={{
                    borderColor: paymentMethod === "zalopay" ? "#008fe5" : "#e5e7eb",
                    background: paymentMethod === "zalopay" ? "#e6f6ff" : "#fff",
                }}
                onClick={() => setPaymentMethod("zalopay")}
            >
                <RadioGroupItem
                    value="zalopay"
                    id="zalopay"
                    className="border-2 border-[#008fe5] focus:ring-[#008fe5]"
                />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/zalopay.webp"
                        alt="ZaloPay"
                        width={40}
                        height={40}
                        className="rounded max-lg:w-8"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="zalopay"
                                className="text-[15.125px] font-semibold max-lg:text-sm"
                                style={{ color: "#008fe5" }}
                            >
                                Ví ZaloPay
                            </Label>
                            {/* Discount badge */}
                            <span
                                className="hidden items-center gap-1 rounded bg-[#e6f6ff] px-2 py-0.5 text-xs font-semibold lg:flex"
                                style={{ color: "#008fe5" }}
                            >
                                <BadgeRussianRuble />
                                Giảm 10k
                            </span>
                        </div>
                        <div className="mt-1.5 text-xs text-gray-500">Thanh toán bằng ví điện tử ZaloPay</div>
                    </div>
                </div>
            </div>
            <div
                className="relative flex cursor-not-allowed items-center gap-3 rounded-lg border-2 p-4 opacity-60 max-lg:py-2"
                style={{
                    borderColor: "#e5e7eb",
                    background: "#f9fafb",
                }}
            >
                {/* "Đang phát triển" badge */}
                <span className="absolute -top-3 left-4 z-10 rounded-full bg-orange-500 px-3 py-0.5 text-xs font-semibold text-white shadow">
                    Đang phát triển
                </span>
                <RadioGroupItem
                    value="card"
                    id="card"
                    className="border-2 border-gray-300 focus:ring-gray-300"
                    disabled
                />
                <div className="flex items-center gap-3">
                    <Image
                        src="/assets/icons/scratch-card.png"
                        alt="Thẻ cào"
                        width={40}
                        height={40}
                        className="rounded opacity-50 max-lg:w-8"
                    />
                    <div>
                        <Label htmlFor="card" className="text-[15.125px] font-semibold text-gray-500 max-lg:text-sm">
                            Thanh toán bằng thẻ cào
                        </Label>
                        <div className="text-xs text-gray-400">Tính năng đang được phát triển</div>
                    </div>
                </div>
            </div>
        </RadioGroup>
    );
};

export default MethodPayment;

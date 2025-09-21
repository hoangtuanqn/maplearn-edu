"use client";
import React from "react";
import { formatter } from "~/libs/format";
import { PaymentDetailResponse } from "~/schemaValidate/payment.schema";
import { Calculator } from "lucide-react";

const PaymentSummary = ({ payment }: { payment: PaymentDetailResponse["data"] }) => {
    return (
        <div className="mt-6 flex justify-end">
            <div className="w-80 rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                    <Calculator className="text-primary h-4 w-4" />
                    <span className="font-medium text-gray-900">Tóm tắt thanh toán</span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-700">
                        <span>Tổng phụ</span>
                        <span className="font-medium">{formatter.number(payment.course.price)}đ</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-700">
                        <span>VAT</span>
                        <span className="font-medium">0đ</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                        <div className="text-primary flex justify-between text-lg font-semibold">
                            <span>Tổng cộng</span>
                            <span>{formatter.number(payment.course.price)}đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;

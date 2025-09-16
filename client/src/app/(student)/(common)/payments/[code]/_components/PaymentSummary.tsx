"use client";
import React from "react";
import { formatter } from "~/libs/format";
import { PaymentDetailResponse } from "~/schemaValidate/payment.schema";

const PaymentSummary = ({ payment }: { payment: PaymentDetailResponse["data"] }) => {
    return (
        <div className="mt-6 flex justify-end max-md:mt-3 max-md:justify-center">
            <div className="w-72 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow max-md:w-full max-md:rounded-lg max-md:p-3">
                <div className="flex justify-between py-2 text-slate-700 max-md:py-1 max-md:text-xs">
                    <span>Tổng phụ</span>
                    <span className="font-semibold">{formatter.number(payment.course.price)} đ</span>
                </div>

                <div className="flex justify-between py-2 max-md:py-1 max-md:text-xs">
                    <span>VAT: </span>
                    <span className="font-semibold">0 đ</span>
                </div>

                <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold text-blue-800 max-md:pt-2 max-md:text-sm">
                    <span>Tổng cộng</span>
                    <span>{formatter.number(payment.course.price)} đ</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;

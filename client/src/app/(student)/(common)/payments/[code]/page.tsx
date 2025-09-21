import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { formatter } from "~/libs/format";
import Link from "next/link";
import Image from "next/image";

import PusherNotification from "../../../_components/PusherNotification";
import InfoUser from "./_components/InfoUser";
import { getStatusBadge } from "~/libs/statusBadge";
import PaymentPanel from "./_components/PaymentPanel";
import PaymentSummary from "./_components/PaymentSummary";
import paymentApiServer from "~/apiRequest/server/payment";
import { Building2, Phone, Mail, FileText } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
    const { code } = await params;
    return {
        title: `Hóa đơn #${code}`,
    };
}
const PaymentPage = async ({ params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;

    let payment;
    try {
        const res = await paymentApiServer.getPaymentDetail(code);
        payment = res.data.data;
    } catch {
        redirect("/profile/payments");
    }

    if (!payment) {
        redirect("/profile/payments");
    }
    return (
        <div className="min-h-screen">
            <div className="mx-auto px-4 py-6">
                <div className="flex gap-6 max-lg:flex-col">
                    {/* Main Content */}
                    <div className="flex-1" id="action-to-print">
                        <div className="space-y-6">
                            <PusherNotification />

                            {/* Invoice Header */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
                                    <div className="flex items-center gap-3 max-md:flex-wrap">
                                        <h1 className="text-2xl font-bold text-gray-900 max-md:text-xl">
                                            Hóa đơn #{code}
                                        </h1>
                                        {getStatusBadge("payment", payment.status)}
                                    </div>
                                </div>
                            </div>

                            {/* Company & User Info */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* Company Info */}
                                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Building2 className="text-primary h-5 w-5" />
                                        <h3 className="text-lg font-semibold text-gray-900">Thanh toán cho</h3>
                                    </div>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <p className="font-medium text-gray-900">Công ty cổ phần MapLearn</p>
                                        <p>Địa chỉ: Quận Thủ Đức, TP HCM</p>
                                        <div className="flex items-center gap-2">
                                            <Phone className="text-primary h-4 w-4" />
                                            <span>Hotline:</span>
                                            <a
                                                href="tel:0812665001"
                                                className="text-primary font-medium hover:underline"
                                            >
                                                0812.665.001
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="text-primary h-4 w-4" />
                                            <span>Email:</span>
                                            <a
                                                className="text-primary font-medium hover:underline"
                                                href="mailto:maplearn@fpt.edu.vn"
                                            >
                                                maplearn@fpt.edu.vn
                                            </a>
                                        </div>
                                        <div className="border-t border-gray-100 pt-3">
                                            <p>
                                                Khiếu nại/Góp ý:{" "}
                                                <span className="text-primary font-semibold">0812.665.001</span>
                                            </p>
                                            <p>
                                                Mã Số Thuế: <span className="font-semibold">0313755538</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                                    <InfoUser />
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center gap-2">
                                    <FileText className="text-primary h-5 w-5" />
                                    <h3 className="text-lg font-semibold text-gray-900">Các mục trong hóa đơn</h3>
                                </div>

                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                                    Mô tả
                                                </th>
                                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                                    Số tiền
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            <tr className="transition-colors hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Link href={`/courses/${payment.course.slug}`}>
                                                            <Image
                                                                src={payment.course.thumbnail}
                                                                alt={payment.course.name}
                                                                width={48}
                                                                height={48}
                                                                className="rounded-lg border border-gray-200"
                                                            />
                                                        </Link>
                                                        <div>
                                                            <Link
                                                                href={`/courses/${payment.course.slug}`}
                                                                className={`hover:text-primary font-medium transition-colors ${
                                                                    payment.course.is_enrolled
                                                                        ? "text-gray-400"
                                                                        : "text-gray-900"
                                                                }`}
                                                            >
                                                                {payment.course.name}
                                                            </Link>
                                                            {payment.course.is_enrolled && (
                                                                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                                                                    Đã mua
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                                    {formatter.number(payment.course.price)}đ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <PaymentSummary payment={payment} />
                            </div>
                        </div>
                    </div>

                    {/* Payment Panel */}
                    <div className="w-full max-w-sm">
                        <PaymentPanel payment={payment} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PaymentPage;

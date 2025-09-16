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
        <section className="flex min-h-screen gap-6 rounded-2xl bg-gradient-to-br p-8 max-lg:flex-col max-lg:gap-3 max-lg:pt-6 max-md:gap-2 max-md:rounded-none max-md:p-2">
            <div className="spacing-y-6 mb-8 h-fit flex-9/12" id="action-to-print">
                <div className="rounded-2xl bg-white p-12 shadow-sm max-lg:mb-3 max-lg:p-5 max-md:rounded-lg max-md:p-2">
                    <PusherNotification />
                    <div className="mb-8">
                        <div className="flex items-center justify-between border-b-2 border-blue-100 pb-5 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pb-3">
                            <div>
                                <div className="flex items-center gap-3 max-md:flex-wrap max-md:gap-2">
                                    <h1 className="text-3xl font-extrabold max-md:text-xl">Hóa đơn #{code}</h1>
                                    {getStatusBadge("payment", payment.status)}
                                </div>
                                {/* {invoice.note && <p className="text-red-400 max-md:text-xs">{invoice.note}</p>} */}
                            </div>
                            <div className="mb-2 space-y-1 text-right max-md:space-y-0 max-md:text-left">
                                {/* <p className="text-sm text-slate-500 max-md:text-xs">
                                    Ngày tạo hóa đơn:{" "}
                                    <span className="font-semibold text-slate-700">
                                        {formatter.date(invoice.created_at)}
                                    </span>
                                </p> */}
                                {/* <p className="text-sm text-slate-500 max-md:text-xs">
                                    Ngày đến hạn:{" "}
                                    <span className="font-semibold text-slate-700">
                                        {formatter.date(invoice.due_date, true)}
                                    </span>
                                </p> */}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-md:gap-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow max-md:p-3">
                            <h3 className="mb-3 text-lg font-semibold text-blue-700 max-md:text-base">
                                Thanh toán cho:
                            </h3>
                            <div className="space-y-1 text-sm text-slate-700 max-md:text-xs">
                                <p className="font-medium">Công ty cổ phần MapLearn</p>
                                <p>Địa chỉ: Quận Thủ Đức, TP HCM.</p>
                                <p>
                                    Hotline thanh toán/kế toán:{" "}
                                    <a href="tel:0812665001" className="text-primary">
                                        0812.665.001
                                    </a>
                                </p>
                                <p>
                                    Email:{" "}
                                    <a className="text-primary" href="mailto:maplearn@fpt.edu.vn">
                                        maplearn@fpt.edu.vn
                                    </a>
                                </p>
                                <p className="pt-2">
                                    Khiếu nại/Góp ý: <span className="font-semibold text-blue-700">0812.665.001</span>
                                </p>
                                <p>
                                    Mã Số Thuế: <span className="font-semibold">0313755538</span>
                                </p>
                            </div>
                        </div>

                        <div className="max-md:p-0">
                            <InfoUser />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="mb-5 text-lg font-semibold max-md:text-base">Các mục trong hóa đơn</h3>
                        <div className="overflow-x-auto rounded-xl border-2 border-blue-100 bg-white shadow max-md:rounded-lg">
                            <table className="w-full min-w-[350px] border-collapse">
                                <thead>
                                    <tr className="border-b bg-slate-100">
                                        <th className="p-4 text-left font-bold text-slate-700 max-md:p-2 max-md:text-xs">
                                            Mô tả
                                        </th>
                                        <th className="p-4 text-right font-bold text-slate-700 max-md:p-2 max-md:text-xs">
                                            Số tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr className="border-b transition hover:bg-blue-50">
                                        <td className="flex items-center gap-2 p-4 max-md:gap-1 max-md:p-2">
                                            <Link href={`/courses/${payment.course.slug}`}>
                                                <Image
                                                    src={payment.course.thumbnail}
                                                    alt={payment.course.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-md max-md:h-8 max-md:w-8"
                                                />
                                            </Link>
                                            <Link
                                                href={`/courses/${payment.course.slug}`}
                                                className={`${payment.course.is_enrolled ? "text-primary/30" : "text-primary"} font-bold max-md:text-xs`}
                                            >
                                                <span>{payment.course.name}</span>
                                                {payment.course.is_enrolled && (
                                                    <span className="text-xs text-green-500"> (Đã mua)</span>
                                                )}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-right font-semibold max-md:p-2 max-md:text-xs">
                                            {formatter.number(payment.course.price)} đ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <PaymentSummary payment={payment} />
                    </div>
                </div>
            </div>
            <PaymentPanel payment={payment} />
        </section>
    );
};
export default PaymentPage;

import React, { Suspense } from "react";
import { Metadata } from "next";
import PaymentList from "./_components/PaymentList";
import StatsPayment from "./_components/StatsPayment";
import Breadcrumb from "../_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Danh sách hóa đơn",
};
const breadcrumbData = [
    { label: "Dashboard", href: "/admin" },
    { label: "Thanh toán", href: "/admin/payments" },
];
const ExamPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="mb-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            {/* Thống kê */}
            <Suspense>
                <StatsPayment />
            </Suspense>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Hóa đơn đã thanh toán</h3>
                            <p className="text-sm text-slate-500">Quản lý và theo dõi các hóa đơn trong hệ thống.</p>
                        </div>
                    </div>
                </div>

                <Suspense>
                    <PaymentList />
                </Suspense>
            </div>
        </section>
    );
};

export default ExamPage;

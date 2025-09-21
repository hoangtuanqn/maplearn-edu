import { useMutation } from "@tanstack/react-query";
import { FileDown } from "lucide-react";
import React from "react";
import paymentApi from "~/apiRequest/admin/payment";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { exportExcel } from "~/libs/exportExcel";
import { buildLaravelFilterQuery } from "~/libs/hepler";
const allowedFields = [
    "search",
    "page",
    "payment_method",
    "status",
    "sort",
    "amount_min",
    "amount_max",
    "date_from",
    "date_to",
] as const;

const ExportDataInvoices = () => {
    const { search, payment_method, sort, amount_min, amount_max, date_from, date_to } =
        useGetSearchQuery(allowedFields);

    const headerMap = {
        transaction_code: "Mã giao dịch",
        payment_method: "Phương thức thanh toán",
        amount: "Số tiền",
        status: "Trạng thái",
        paid_at: "Ngày thanh toán",
        "user.full_name": "Tên người dùng",
        "course.name": "Tên khóa học",
    };

    const exportMutation = useMutation({
        mutationFn: async () => {
            // Lấy tất cả dữ liệu với limit cao để export
            const res = await paymentApi.getPayments(
                1, // page 1
                100000, // limit cao để lấy tất cả
                sort,
                buildLaravelFilterQuery({
                    search,
                    payment_method,
                    amount_min,
                    amount_max,
                    date_from,
                    date_to,
                }),
            );
            return res.data.data;
        },
        onSuccess: (data) => {
            // Chuyển đổi dữ liệu để phù hợp với export
            const exportData = data.data.map((payment) => ({
                transaction_code: payment.transaction_code,
                payment_method: payment.payment_method,
                amount: payment.amount,
                status: payment.status,
                paid_at: payment.paid_at,
                "user.full_name": payment.user.full_name,
                "course.name": payment.course.name,
            }));

            exportExcel(exportData, "Payments_Report.xlsx", headerMap);
        },
    });

    return (
        <>
            {exportMutation.isPending && <Loading />}
            <Button
                disabled={exportMutation.isPending}
                className="text-xs"
                variant={"outline"}
                onClick={() => {
                    exportMutation.mutate();
                }}
            >
                <FileDown />
                <span>Xuất dữ liệu</span>
            </Button>
        </>
    );
};

export default ExportDataInvoices;

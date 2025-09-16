import { useMutation } from "@tanstack/react-query";
import { FileDown } from "lucide-react";
import React from "react";
import studentApi from "~/apiRequest/admin/student";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { ActionActivity, ActionActivityLabel } from "~/contants/user/actionActivity";
import { exportExcel } from "~/libs/exportExcel";
import { formatter } from "~/libs/format";

const ExportHistoryActivities = ({ id }: { id: string }) => {
    const headerMap = {
        action: "Hành động",
        description: "Mô tả",
        ip_address: "Địa chỉ IP",
        user_agent: "Trình duyệt",
        created_at: "Thời gian",
    };

    const exportMuation = useMutation({
        mutationFn: async (id: string) => {
            const res = await studentApi.getActivityHistory(id, 1, 100);
            return res.data;
        },
        onSuccess: (data) => {
            const value = data.data.data.map((item) => {
                return {
                    action: ActionActivityLabel[item.action as ActionActivity],
                    description: item.description,
                    ip_address: item.ip_address,
                    user_agent: item.user_agent,
                    created_at: formatter.date(item.created_at, true),
                };
            });
            exportExcel(value, "Lịch sử hoạt động.xlsx", headerMap);
        },
    });
    return (
        <>
            {exportMuation.isPending && <Loading />}
            <Button
                className="text-xs"
                variant={"outline"}
                onClick={() => {
                    exportMuation.mutate(id);
                }}
            >
                <FileDown />
                <span>Xuất dữ liệu</span>
            </Button>
        </>
    );
};

export default ExportHistoryActivities;

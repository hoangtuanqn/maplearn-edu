import { useMutation } from "@tanstack/react-query";
import { FileUp } from "lucide-react";
import React from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { exportExcel } from "~/libs/exportExcel";
import { formatter } from "~/libs/format";
import { buildLaravelFilterQuery } from "~/libs/helper";

const ExportDataCourses = () => {
    const { page, search, sort, completion_status, progress_range } = useGetSearchQuery([
        "page",
        "search",
        "sort",
        "completion_status",
        "progress_range",
    ] as const);

    // Map enrolled student fields to Vietnamese headers
    const headerMap = {
        id: "STT",
        full_name: "Họ và tên",
        email: "Email",
        phone_number: "Số điện thoại",
        completed_lessons: "Bài học đã hoàn thành",
        total_lessons: "Tổng số bài học",
        exam_score: "Điểm bài thi",
        certificate_code: "Mã chứng chỉ",
        status: "Trạng thái",
        enrolled_at: "Ngày đăng ký khóa",
        completion_date: "Ngày hoàn thành",
    };

    const exportMutation = useMutation({
        mutationFn: async () => {
            // Lấy slug từ URL
            const slug = window.location.pathname.split("/").find((v, i, arr) => arr[i - 1] === "courses") ?? "";
            const res = await courseAdminApi.getStudentEnrolled(
                slug,
                +page || 1,
                100000,
                search ?? "",
                sort ?? "",
                buildLaravelFilterQuery({
                    completion_status,
                    progress_range,
                }),
            );
            return res.data.data;
        },
        onSuccess: (data) => {
            // Chuyển đổi dữ liệu để phù hợp với export
            const exportData = data.data.map((student, index) => ({
                id: index + 1,
                full_name: student.full_name,
                email: student.email,
                phone_number: student.phone_number ?? "",
                completed_lessons: student.completed_lessons,
                total_lessons: student.total_lessons,
                exam_score: student.exam_score ?? "",
                certificate_code: student.certificate_code ?? "",
                status: student.status,
                enrolled_at: formatter.date(student.enrolled_at, true),
                completion_date: student.completion_date ? formatter.date(student.completion_date, true) : "",
            }));

            exportExcel(exportData, `Students_Enrolled_Report.xlsx`, headerMap);
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
                <FileUp />
                <span>Xuất dữ liệu</span>
            </Button>
        </>
    );
};

export default ExportDataCourses;

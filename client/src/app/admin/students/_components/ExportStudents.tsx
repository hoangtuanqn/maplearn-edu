"use client";
import { useMutation } from "@tanstack/react-query";
import { FileDown } from "lucide-react";
import React from "react";
import studentApi from "~/apiRequest/admin/student";
import Loading from "~/app/(student)/_components/Loading";
import { Button } from "~/components/ui/button";
import { exportExcel } from "~/libs/exportExcel";
import { formatter } from "~/libs/format";

const ExportStudentList = () => {
    const headerMap = {
        username: "Tên tài khoản",
        full_name: "Họ và Tên",
        email: "Email",
        phone_number: "Số điện thoại",
        gender: "Giới tính",
        birth_year: "Năm sinh",
        city: "Thành phố",
        school: "Trường học",
        facebook_link: "Link Facebook",
    };

    const exportMuation = useMutation({
        mutationFn: async () => {
            const res = await studentApi.getStudents();
            return res.data;
        },
        onSuccess: (data) => {
            const value = data.data.data.map((item) => {
                return {
                    username: item.username,
                    full_name: item.full_name,
                    email: item.email,
                    phone_number: item.phone_number,
                    gender: item.gender === "male" ? "Nam" : "Nữ",
                    avatar: item.avatar,
                    birth_year: item.birth_year,
                    facebook_link: item.facebook_link,
                    school: item.school,
                    city: item.city,
                    created_at: formatter.date(item.created_at, true),
                };
            });
            exportExcel(value, "Danh sách học sinh.xlsx", headerMap);
        },
    });
    return (
        <>
            {exportMuation.isPending && <Loading />}
            <Button
                className="text-xs"
                variant={"outline"}
                onClick={() => {
                    exportMuation.mutate();
                }}
            >
                <FileDown />
                <span>Xuất dữ liệu</span>
            </Button>
        </>
    );
};

export default ExportStudentList;

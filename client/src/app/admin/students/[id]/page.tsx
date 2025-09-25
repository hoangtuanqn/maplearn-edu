import React from "react";

import { Metadata } from "next";
import FormEditStudent from "./_components/FormEditStudent";
import { redirect } from "next/navigation";
import studentApiServer from "~/apiRequest/server/admin/student";
import Breadcrumb from "../../_components/Breadcrumb";
export const metadata: Metadata = {
    title: "Chỉnh sửa người dùng",
};
const EditStudentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/admin" },
        { label: "Học sinh", href: `/admin/students/` },
        { label: "Chỉnh sửa học sinh", href: `/admin/students/${id}` },
    ];
    let student;
    try {
        const res = await studentApiServer.getDetailStudent(id);
        student = res.data.data;
    } catch {
        redirect("/admin/students");
    }
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <Breadcrumb breadcrumbData={breadcrumbData} />
            <div className="mt-8">
                <FormEditStudent studentData={student} />
            </div>

            {/* <HistoryActivities id={id} /> */}
        </section>
    );
};

export default EditStudentPage;

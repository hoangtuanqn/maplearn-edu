import React from "react";
import { Metadata } from "next";
import FormEditCourse from "./_components/FormEditCourse";
import { redirect } from "next/navigation";
import courseApi from "~/apiRequest/course";

export const metadata: Metadata = {
    title: "Chỉnh sửa khóa học",
};
const EditCoursePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let course;
    try {
        const res = await courseApi.getDetailCourse(slug);
        course = res.data.data;
    } catch {
        redirect("/admin/courses");
    }
    return (
        <>
            <div className="mt-6 flex gap-5">
                <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Chỉnh sửa khóa học</h3>
                            <p className="mb-4 text-sm text-slate-500">Cập nhật thông tin khóa học tại đây.</p>
                        </div>
                    </div>

                    <FormEditCourse course={course} />
                </div>
            </div>
        </>
    );
};

export default EditCoursePage;

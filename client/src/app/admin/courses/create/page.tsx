import React from "react";
import FormAddCourse from "./_components/FormAddCourse";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Thêm khóa học mới",
};
const CreateCoursePage = () => {
    return (
        <>
            <div className="mt-6 flex gap-5">
                <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Thêm khóa học</h3>
                            <p className="mb-4 text-sm text-slate-500">Thêm thông tin khóa học tại đây.</p>
                        </div>
                    </div>
                    <FormAddCourse />
                </div>
            </div>
        </>
    );
};

export default CreateCoursePage;

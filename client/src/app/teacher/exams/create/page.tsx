import React from "react";
import { Metadata } from "next";
import FormAddExam from "./_components/FormAddExam";
export const metadata: Metadata = {
    title: "Thêm đề thi mới",
};
const CreateExamPage = () => {
    return (
        <>
            <div className="mt-6 flex gap-5">
                <div className="flex-1 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Thêm đề thi</h3>
                            <p className="mb-4 text-sm text-slate-500">Thêm thông tin đề thi tại đây.</p>
                        </div>
                    </div>
                    <FormAddExam />
                </div>
            </div>
        </>
    );
};

export default CreateExamPage;

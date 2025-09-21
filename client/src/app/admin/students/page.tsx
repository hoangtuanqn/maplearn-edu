import React, { Suspense } from "react";

import StudentList from "./_components/StudentList";
import { Metadata } from "next";
import { FilterStudents } from "./[id]/_components/FilterStudents";
export const metadata: Metadata = {
    title: "Danh sách học sinh",
};
const StudentPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            {/* <div className="item-center mt-5 flex justify-end">
                <ImportStudent />
            </div> */}
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-primary text-xl font-bold">Danh sách học sinh</h3>
                        <p className="text-sm text-slate-500">Danh sách học sinh sẽ được hiển thị ở đây.</p>
                    </div>
                    <Suspense>
                        <FilterStudents />
                    </Suspense>
                </div>
                <StudentList />
            </div>
        </section>
    );
};

export default StudentPage;

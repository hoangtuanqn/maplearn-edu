import React from "react";

import StudentList from "./_components/StudentList";
import { Metadata } from "next";
import { ImportStudent } from "./[id]/_components/ImportStudent";
export const metadata: Metadata = {
    title: "Danh sách học sinh",
};
const StudentPage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end">
                <ImportStudent />
            </div>

            <StudentList />
        </section>
    );
};

export default StudentPage;

import React, { Suspense } from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";

import { FilterCourses } from "./_components/FilterCourses";

export const metadata: Metadata = {
    title: "Danh sách các khóa học",
};
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="item-center mt-5 flex justify-end"></div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Danh sách khóa học</h3>
                            <p className="text-sm text-slate-500">Danh sách khóa học sẽ được hiển thị ở đây.</p>
                        </div>
                        <Suspense>
                            <FilterCourses />
                        </Suspense>
                    </div>
                </div>
                <Suspense>
                    <CourseList />
                </Suspense>
            </div>
        </section>
    );
};

export default CoursePage;

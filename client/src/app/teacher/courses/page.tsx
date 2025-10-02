import React, { Suspense } from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";
import { FilterCourses } from "./_components/FilterCourses";
import SearchCourse from "~/app/(student)/(common)/courses/_components/SearchCourse";
import Breadcrumb from "../_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Danh sách các khóa học",
};
const breadcrumbData = [
    { label: "Dashboard", href: "/teacher" },
    { label: "Khóa học", href: "/teacher/courses" },
];
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5]">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
            <div className="mt-3 rounded-lg bg-white p-4 pb-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div>
                            <h3 className="text-primary text-xl font-bold">Danh sách khóa học</h3>
                            <p className="text-sm text-slate-500">Danh sách khóa học sẽ được hiển thị ở đây.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Suspense>
                                <SearchCourse url="/teacher/courses" />
                                <FilterCourses />
                            </Suspense>
                        </div>
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

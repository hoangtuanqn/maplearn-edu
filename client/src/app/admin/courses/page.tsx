import React, { Suspense } from "react";
import { Metadata } from "next";
import CourseList from "./_components/CourseList";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FilterCourses } from "./_components/FilterCourses";
import SearchCourse from "~/app/(student)/(common)/courses/_components/SearchCourse";
import Breadcrumb from "../_components/Breadcrumb";

export const metadata: Metadata = {
    title: "Danh sách các khóa học",
};
const breadcrumbData = [
    { label: "Dashboard", href: "/admin" },
    { label: "Khóa học", href: "/admin/courses" },
];
const CoursePage = () => {
    return (
        <section className="mt-5 bg-[#F5F5F5] p-2">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
                <Breadcrumb breadcrumbData={breadcrumbData} />
                <div className="item-center mt-5 flex justify-end">
                    <Link href="/admin/courses/create">
                        <Button variant="primary">Thêm khóa học</Button>
                    </Link>
                </div>
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
                                <SearchCourse url="/admin/courses" />
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

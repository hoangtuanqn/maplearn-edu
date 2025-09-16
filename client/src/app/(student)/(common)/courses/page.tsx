import React, { Suspense } from "react";

import Skeleton from "react-loading-skeleton";
import { Metadata } from "next";
import SelectCategory from "./_components/SelectCategory";
import CourseList from "./_components/CourseList";
import { FilterCourses } from "./_components/FilterCourses";
import SelectCourse from "./_components/SelectCourse";
import SelectObject from "./_components/SelectObject";
import SearchCourse from "./_components/SearchCourse";
export const metadata: Metadata = {
    title: "Tất cả khóa học",
};
const CoursePage = () => {
    return (
        <div className="flex min-h-screen gap-2 rounded-xl bg-white shadow-sm max-lg:flex-col">
            <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                <SelectCategory url="/courses" />
            </Suspense>

            <div className="w-full rounded-xl bg-white px-5 py-8">
                <h1 className="text-primary text-xl font-bold uppercase">Khóa học</h1>
                <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                    <SelectObject url="/courses" />
                </Suspense>
                <div className="flex w-full flex-col items-end gap-8 xl:flex-row">
                    <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                        <SelectCourse url="/courses" />
                    </Suspense>
                    <div className="flex w-full flex-1 gap-2 max-lg:mt-6 lg:min-w-[400px]">
                        <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                            <SearchCourse url="/courses" />
                            <FilterCourses />
                        </Suspense>
                    </div>
                </div>

                <Suspense fallback={<Skeleton height={44} className="!w-full !rounded-xl" />}>
                    <CourseList />
                </Suspense>
            </div>
        </div>
    );
};

export default CoursePage;

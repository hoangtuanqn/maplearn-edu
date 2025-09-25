import React, { Suspense } from "react";
import { Metadata } from "next";

import ListMyCourses from "./_components/ListMyCourses";
import Loading from "~/app/(student)/_components/Loading";
import { FilterCourses } from "./_components/FilterCourse";

export const metadata: Metadata = {
    title: "Khóa học của tôi",
};
const MyCoursesPage = () => {
    return (
        <>
            <div className="flex items-start justify-between">
                <h3 className="block-heading mb-6 uppercase">Khóa học của tôi</h3>
                <FilterCourses />
            </div>
            <div className="flex flex-col gap-4 font-medium">
                <Suspense fallback={<Loading />}>
                    <ListMyCourses />
                </Suspense>
            </div>
        </>
    );
};

export default MyCoursesPage;

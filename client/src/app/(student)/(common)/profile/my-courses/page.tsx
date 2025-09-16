import React, { Suspense } from "react";
import { Metadata } from "next";

import ListMyCourses from "./_components/ListMyCourses";
import Loading from "~/app/(student)/_components/Loading";
export const metadata: Metadata = {
    title: "Khóa học của tôi",
};
const MyCoursesPage = () => {
    return (
        <>
            <h3 className="block-heading mb-6">Khóa học của tôi</h3>
            <div className="flex flex-col gap-4 font-medium">
                <Suspense fallback={<Loading />}>
                    <ListMyCourses />
                </Suspense>
            </div>
        </>
    );
};

export default MyCoursesPage;

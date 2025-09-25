"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import courseApi from "~/apiRequest/course";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import CourseSkeleton from "../../_components/CourseSkeleton";

const RelatedCourses = ({ category }: { category: string }) => {
    const { data: courses, isLoading } = useQuery({
        queryKey: ["courses", "related", category],
        queryFn: async () => {
            const res = await courseApi.getCourses(1, 5, "", "", "filter[category]=" + category);
            return res.data.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });


    return (
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm sm:p-8">
            <h2 className="text-secondary-typo mb-3 text-lg font-bold">Những khóa học bạn có thể thích</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {isLoading && [...Array(5)].map((_, index) => <CourseSkeleton key={index} />)}
                {courses?.map((course) => {
                    if (course.is_enrolled) return null;
                    return <DisplayCourse key={course.id} course={course} />;
                })}
            </div>
        </div>
    );
};

export default RelatedCourses;

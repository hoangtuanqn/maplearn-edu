"use client";
import React from "react";
import DisplayCourse from "../../../_components/Courses/DisplayCourse";
import CourseSkeleton from "./CourseSkeleton";
import courseApi, { COURSE_PER_PAGE } from "~/apiRequest/course";
import { useQuery } from "@tanstack/react-query";
import { buildLaravelFilterQuery } from "~/libs/helper";
import { PaginationNav } from "../../../_components/Pagination";
import { formatter } from "~/libs/format";
import DisplayNoData from "../../../_components/Courses/DisplayNoData";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
const allowedFields = ["page", "search", "sort", "rating", "price_range", "duration", "teachers", "is_active"] as const;
const CourseList = () => {
    const { search, page, sort, rating, price_range, duration, teachers, is_active } = useGetSearchQuery(allowedFields);
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "courses", { page, search, sort, rating, price_range, duration, teachers, is_active }],
        queryFn: async () => {
            const res = await courseApi.getCourses(
                +page || 1,
                COURSE_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({ rating, price_range, duration, teachers, is_active }),
            );
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const total = courses?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    return (
        <>
            <h2 className="mt-5 text-right text-base font-bold text-black">{formatter.number(total)} kết quả</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {courses?.data?.map((course) => {
                    return <DisplayCourse key={course.id} course={course} keyword={search ?? null} />;
                })}
            </div>
            {!isLoading && Number(courses?.data?.length) == 0 && <DisplayNoData title="Không tìm thấy khóa học nào!" />}
            {!isLoading && Number(courses?.data?.length) > 0 && (
                <PaginationNav totalPages={totalPages} basePath="/courses" />
            )}
        </>
    );
};

export default CourseList;

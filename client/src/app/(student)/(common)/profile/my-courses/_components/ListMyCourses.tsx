"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import CourseSkeleton from "~/app/(student)/(common)/courses/_components/CourseSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import profileApi from "~/apiRequest/profile";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/libs/helper";
import { formatter } from "~/libs/format";
const allowedFields = ["page", "search", "sort", "completion_status", "progress_range"] as const;
const ListMyCourses = () => {
    const { page, search, sort, completion_status, progress_range } = useGetSearchQuery(allowedFields);
    const { data: coursesFavorite, isLoading } = useQuery({
        queryKey: ["user", "my-courses", { page, sort, search, completion_status, progress_range }],
        queryFn: async () => {
            // Giả sử bạn có một API để lấy danh sách khóa học đã lưu
            const res = await profileApi.getCourseMe(
                +page || 1,
                COURSE_PER_PAGE,
                search || "",
                sort,
                buildLaravelFilterQuery({
                    completion_status,
                    progress_range,
                }),
            );
            return res.data.data;
        },
    });
    const total = coursesFavorite?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);
    return (
        <>
            <h2 className="text-right text-base font-bold text-black">{formatter.number(total)} kết quả</h2>
            {!isLoading && (coursesFavorite?.data?.length ?? 0) == 0 && (
                <DisplayNoData title="Bạn chưa có khóa học nào" />
            )}

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {coursesFavorite?.data?.map((course) => (
                    // Ch có data thật
                    <DisplayCourse key={course.id} course={course} keyword={search ?? null} />
                ))}
            </div>
            {!isLoading && totalPages > 1 && (coursesFavorite?.data?.length ?? 0) > 0 && (
                <PaginationNav totalPages={totalPages} basePath="/profile/saved-courses" />
            )}
        </>
    );
};

export default ListMyCourses;

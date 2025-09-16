"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import CourseSkeleton from "~/app/(student)/(common)/courses/_components/CourseSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { useSearchParams } from "next/navigation";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
import profileApi from "~/apiRequest/profile";
const ListMyCourses = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const { data: coursesFavorite, isLoading } = useQuery({
        queryKey: ["user", "my-courses", page],
        queryFn: async () => {
            // Giả sử bạn có một API để lấy danh sách khóa học đã lưu
            const res = await profileApi.getCourseMe();
            return res.data.data;
        },
    });
    const total = coursesFavorite?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);
    return (
        <>
            {!isLoading && (coursesFavorite?.data?.length ?? 0) == 0 && (
                <DisplayNoData title="Bạn chưa có khóa học nào" />
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {coursesFavorite?.data?.map((course) => (
                    // Ch có data thật
                    <DisplayCourse key={course.id} course={course} />
                ))}
            </div>
            {!isLoading && totalPages > 1 && (coursesFavorite?.data?.length ?? 0) > 0 && (
                <PaginationNav totalPages={totalPages} basePath="/profile/saved-courses" />
            )}
        </>
    );
};

export default ListMyCourses;

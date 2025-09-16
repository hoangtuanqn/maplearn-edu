"use client";
import React, { useEffect, useState } from "react";
import DisplayCourse from "../../../_components/Courses/DisplayCourse";
import CourseSkeleton from "./CourseSkeleton";
import courseApi, { COURSE_PER_PAGE } from "~/apiRequest/course";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import { PaginationNav } from "../../../_components/Pagination";
import { formatter } from "~/libs/format";
import DisplayNoData from "../../../_components/Courses/DisplayNoData";

const CourseList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState<Record<string, string>>({});
    const { data: courses, isLoading } = useQuery({
        queryKey: ["user", "courses", { page, ...searchQuery, search, sort }],
        queryFn: async () => {
            const res = await courseApi.getCourses(
                page,
                COURSE_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({ ...searchQuery }),
            );
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const total = courses?.total || 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    useEffect(() => {
        // loại bỏ key là sort, search, page
        const searchParamsObj: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (value && !["sort", "search", "page"].includes(key)) {
                searchParamsObj[key] = value;
            }
        });
        setSearchQuery(searchParamsObj);
    }, [searchParams]);
    return (
        <>
            <h2 className="mt-5 text-right text-base font-bold text-black">{formatter.number(total)} kết quả</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-5">
                {isLoading && [...Array(COURSE_PER_PAGE)].map((_, index) => <CourseSkeleton key={index} />)}
                {courses?.data?.map((course) => {
                    return <DisplayCourse key={course.id} course={course} />;
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

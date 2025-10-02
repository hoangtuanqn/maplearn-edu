"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { Suspense } from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import { getStatusBadge } from "~/libs/statusBadge";
import { subjectsMock } from "~/mockdata/subject.data";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import { buildLaravelFilterQuery, highlightKeyword } from "~/libs/helper";
const CourseList = () => {
    const { page, search, sort, rating, price_range, duration, teachers, is_active } = useGetSearchQuery([
        "page",
        "search",
        "sort",
        "rating",
        "price_range",
        "duration",
        "teachers",
        "is_active",
    ] as const);
    const { data: courses, isLoading } = useQuery({
        queryKey: ["teacher", "courses", { page, search, sort, rating, price_range, duration, teachers, is_active }],
        queryFn: async () => {
            const res = await courseAdminApi.getCourses(
                +page,
                COURSE_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({ rating, price_range, duration, teachers, is_active }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = courses?.total ?? 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    return (
        <>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thông tin chung</th>

                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Giá tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Số học sinh đã đăng ký
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {isLoading
                            ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={7} />)
                            : courses?.data.map((course, idx) => {
                                  return (
                                      <tr
                                          key={course.id}
                                          className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                      >
                                          <td className="px-4 py-3 text-zinc-500">
                                              {Math.max(0, +page - 1) * COURSE_PER_PAGE + idx + 1}
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              <p
                                                  className="text-base font-semibold text-gray-900"
                                                  dangerouslySetInnerHTML={{
                                                      __html: highlightKeyword(course.name, search),
                                                  }}
                                              />
                                              <p>
                                                  <span className="font-bold">Môn học:</span>{" "}
                                                  {subjectsMock.find((s) => s.slug === course.subject)?.name}
                                              </p>
                                              <p>
                                                  <span className="font-bold">Bài giảng đang có:</span>{" "}
                                                  {course.lesson_count}
                                              </p>
                                              <p>
                                                  <span className="font-bold">Dự kiến bắt đầu:</span>{" "}
                                                  {formatter.date(course.start_date)}
                                              </p>
                                              <p>
                                                  <span className="font-bold">Dự kiến kết thúc:</span>{" "}
                                                  {course.end_date ? formatter.date(course.end_date) : "Không kết thúc"}
                                              </p>
                                          </td>
                                          <td
                                              className={`px-4 py-3 font-semibold ${course.price === 0 ? "text-green-600" : ""}`}
                                          >
                                              {course.price === 0 ? "Miễn phí" : formatter.number(course.price) + "đ"}
                                          </td>
                                          <td className="px-4 py-3 text-zinc-500">
                                              <span
                                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                      course.enrollments_count === 0
                                                          ? "bg-gray-100 text-gray-600"
                                                          : "bg-blue-100 text-blue-800"
                                                  }`}
                                              >
                                                  {course.enrollments_count === 0
                                                      ? "Chưa có học sinh"
                                                      : `${course.enrollments_count} học sinh`}
                                              </span>
                                          </td>

                                          <td className="px-4 py-3">
                                              {getStatusBadge(
                                                  "activity_status",
                                                  new Date(course.start_date) > new Date()
                                                      ? "2"
                                                      : String(course.status),
                                              )}
                                          </td>
                                          <td className="px-4 py-3">
                                              <div className="flex items-center justify-end gap-2">
                                                  <Link href={`/teacher/courses/${course.slug}`}>
                                                      <Button variant="outlineBlack" size="sm">
                                                          Xem
                                                      </Button>
                                                  </Link>
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })}
                    </tbody>
                </table>
            </div>
            <div className="ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/teacher/courses" />
                </Suspense>
            </div>
        </>
    );
};

export default CourseList;

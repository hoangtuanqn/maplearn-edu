"use client";
import { useQuery } from "@tanstack/react-query";
import { Users, CheckCircle, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import courseAdminApi from "~/apiRequest/admin/course";
import { COURSE_PER_PAGE } from "~/apiRequest/course";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import { FilterStudentCourse } from "./FilterStudentCourse";
import { buildLaravelFilterQuery } from "~/libs/hepler";

const StudentEnrolledList = ({ slug }: { slug: string }) => {
    const { page, search, sort, completion_status, progress_range } = useGetSearchQuery([
        "page",
        "search",
        "sort",
        "completion_status",
        "progress_range",
    ] as const);
    const { data: studentsData, isLoading } = useQuery({
        queryKey: [
            "admin",
            "students-enrolled",
            {
                slug,
                page,
                search,
                sort,
                completion_status,
                progress_range,
            },
        ],
        queryFn: async () => {
            // Tạm thời sử dụng API getStudentsCompletedCourse, cần cập nhật API sau
            const res = await courseAdminApi.getStudentEnrolled(
                slug,
                +page || 1,
                COURSE_PER_PAGE,
                search ?? "",
                sort ?? "",
                buildLaravelFilterQuery({
                    completion_status,
                    progress_range,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = studentsData?.total ?? 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    // Helper function to get status badge based on new schema
    const getStatusBadge = (student: any) => {
        const statusColors = {
            "Đang học": { bg: "bg-blue-100", text: "text-blue-800", icon: Clock },
            "Đã hoàn thành": { bg: "bg-emerald-100", text: "text-emerald-800", icon: CheckCircle },
            "Chưa đạt bài thi": { bg: "bg-red-100", text: "text-red-800", icon: Clock },
            "Chờ cấp chứng chỉ": { bg: "bg-amber-100", text: "text-amber-800", icon: Clock },
        };

        const statusConfig = statusColors[student.status as keyof typeof statusColors] || statusColors["Đang học"];
        const IconComponent = statusConfig.icon;

        return (
            <div
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
            >
                <IconComponent className="h-3 w-3" />
                {student.status}
            </div>
        );
    };

    return (
        <>
            <div className="mb-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Học viên đăng ký khóa học</h3>
                    </div>
                    <FilterStudentCourse />
                </div>
                <p className="text-gray-600">Danh sách tất cả học viên đã đăng ký khóa học này</p>
            </div>

            <div className="overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                STT
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Thông tin học viên
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Tiến độ học tập
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Bài thi & Chứng chỉ
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Thống kê tuần
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Trạng thái
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading
                            ? [...Array(5)].map((_, index) => <TableSkeleton key={index} col={8} />)
                            : studentsData?.data.map((student, idx) => (
                                  <tr key={student.id} className="transition-colors hover:bg-gray-50">
                                      <td className="px-4 py-4 text-sm text-gray-500">
                                          {Math.max(0, +page - 1) * COURSE_PER_PAGE + idx + 1}
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="flex items-center space-x-3">
                                              <div className="flex-shrink-0">
                                                  {student.avatar ? (
                                                      <Image
                                                          className="h-10 w-10 rounded-full object-cover"
                                                          src={student.avatar}
                                                          alt={student.full_name}
                                                          width={40}
                                                          height={40}
                                                      />
                                                  ) : (
                                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                                                          <User className="h-5 w-5 text-gray-500" />
                                                      </div>
                                                  )}
                                              </div>
                                              <div className="min-w-0 flex-1">
                                                  <p className="truncate text-sm font-semibold text-gray-900">
                                                      {student.full_name}
                                                  </p>
                                                  <div className="text-xs text-gray-500">
                                                      <span>ID: {student.id}</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-2 text-center">
                                              <div className="text-base font-bold text-emerald-600">
                                                  {Math.round(
                                                      (student.completed_lessons / student.total_lessons) * 100,
                                                  )}
                                                  %
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                  {student.completed_lessons}/{student.total_lessons} bài học
                                              </div>
                                              <div className="h-2 w-full rounded-full bg-gray-200">
                                                  <div
                                                      className="h-2 rounded-full bg-emerald-500"
                                                      style={{
                                                          width: `${(student.completed_lessons / student.total_lessons) * 100}%`,
                                                      }}
                                                  ></div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-2 text-center">
                                              <div className="grid grid-cols-1 gap-2 text-xs">
                                                  {/* Exam Status */}
                                                  <div className="rounded bg-gray-50 px-2 py-1">
                                                      <div className="font-medium text-gray-700">
                                                          {student.exam_required
                                                              ? "Bài thi bắt buộc"
                                                              : "Không có bài thi"}
                                                      </div>
                                                      {student.exam_required && (
                                                          <div
                                                              className={`${student.exam_passed ? "text-green-600" : "text-red-600"}`}
                                                          >
                                                              {student.exam_score ? (
                                                                  <>
                                                                      {student.exam_passed
                                                                          ? `✓ Đạt (${student.exam_score}/10)`
                                                                          : `✗ Chưa đạt (${student.exam_score}/10)`}
                                                                  </>
                                                              ) : (
                                                                  "Chưa tham gia bài thi"
                                                              )}
                                                          </div>
                                                      )}
                                                  </div>

                                                  {/* Certificate Status */}
                                                  <div className="rounded bg-amber-50 px-2 py-1">
                                                      <div className="font-medium text-amber-700">
                                                          {student.certificate_code
                                                              ? "Có chứng chỉ"
                                                              : "Chưa có chứng chỉ"}
                                                      </div>
                                                      {student.certificate_code && (
                                                          <div className="text-xs text-amber-600">
                                                              Mã: {student.certificate_code}
                                                          </div>
                                                      )}
                                                  </div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-2 text-center">
                                              <div className="grid grid-cols-1 gap-2 text-xs">
                                                  <div className="rounded bg-green-50 px-2 py-1">
                                                      <div className="font-medium text-green-700">
                                                          {student.lessons_in_week} bài học
                                                      </div>
                                                      <div className="text-green-500">tuần này</div>
                                                  </div>

                                                  <div className="rounded bg-purple-50 px-2 py-1">
                                                      <div className="font-medium text-purple-700">
                                                          {student.hours_in_week}h
                                                      </div>
                                                      <div className="text-purple-500">học tuần này</div>
                                                  </div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-2 text-center">
                                              {getStatusBadge(student)}
                                              {student.completion_date && (
                                                  <p className="text-xs text-gray-500">
                                                      Hoàn thành: {formatter.date(student.completion_date)}
                                                  </p>
                                              )}
                                          </div>
                                      </td>

                                      <td className="px-4 py-4 text-right">
                                          <div className="flex flex-col items-end gap-2">
                                              {student.certificate_code ? (
                                                  <Link
                                                      href={`/certificate/${student.certificate_code}`}
                                                      target="_blank"
                                                  >
                                                      <Button variant="primary" size="sm">
                                                          Xem chứng chỉ
                                                      </Button>
                                                  </Link>
                                              ) : student.status === "Chờ cấp chứng chỉ" ? (
                                                  <Button
                                                      variant="outline"
                                                      size="sm"
                                                      className="border-amber-200 text-amber-600 hover:bg-amber-50"
                                                      disabled
                                                  >
                                                      Đang xử lý
                                                  </Button>
                                              ) : (
                                                  <span className="text-xs text-gray-400">Chưa có</span>
                                              )}
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>

                {!isLoading && studentsData?.data.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 h-24 w-24 text-gray-400">
                            <Users className="h-full w-full" />
                        </div>
                        <h3 className="mb-2 text-base font-medium text-gray-900">Chưa có học viên đăng ký</h3>
                        <p className="text-xs text-gray-500">Chưa có học viên nào đăng ký khóa học này.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-6 flex w-full">
                    <div className="ml-auto">
                        <Suspense>
                            <PaginationNav totalPages={totalPages} basePath={`/admin/courses/${slug}`} />
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentEnrolledList;

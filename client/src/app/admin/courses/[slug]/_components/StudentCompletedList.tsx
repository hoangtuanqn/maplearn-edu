"use client";
import { useQuery } from "@tanstack/react-query";
import { Award, CheckCircle, Mail, User } from "lucide-react";
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

const StudentCompletedList = ({ slug }: { slug: string }) => {
    const { page } = useGetSearchQuery(["page"] as const);
    const { data: studentsData, isLoading } = useQuery({
        queryKey: ["admin", "students-completed", slug, page],
        queryFn: async () => {
            const res = await courseAdminApi.getStudentsCompletedCourse(slug);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = studentsData?.total ?? 0;
    const totalPages = Math.ceil(total / COURSE_PER_PAGE);

    return (
        <>
            <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-100 p-2">
                        <Award className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Học sinh đã hoàn thành khóa học</h3>
                </div>
                <p className="text-gray-600">Danh sách học sinh đã hoàn thành 100% bài học trong khóa học này</p>
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
                                Thông tin học sinh
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Liên hệ
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Tiến độ
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Hoàn thành
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading
                            ? [...Array(5)].map((_, index) => <TableSkeleton key={index} col={6} />)
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
                                                  <p className="text-xs text-gray-500">ID: {student.id}</p>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-1">
                                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                                  <Mail className="h-4 w-4" />
                                                  <span className="truncate">{student.email}</span>
                                              </div>
                                              {student.phone && (
                                                  <p className="text-xs text-gray-500">📞 {student.phone}</p>
                                              )}
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                  <span className="text-gray-600">Tiến độ:</span>
                                                  <span className="font-semibold text-emerald-600">
                                                      {student.completed_lessons}/{student.total_lessons}
                                                  </span>
                                              </div>
                                              <div className="h-2 w-full rounded-full bg-gray-200">
                                                  <div
                                                      className="h-2 rounded-full bg-emerald-500"
                                                      style={{
                                                          width: `${(student.completed_lessons / student.total_lessons) * 100}%`,
                                                      }}
                                                  ></div>
                                              </div>
                                              <div className="text-center text-xs text-gray-500">
                                                  {Math.round(
                                                      (student.completed_lessons / student.total_lessons) * 100,
                                                  )}
                                                  %
                                              </div>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4">
                                          <div className="text-center">
                                              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                                                  <CheckCircle className="h-3 w-3" />
                                                  Hoàn thành
                                              </div>
                                              <p className="mt-1 text-xs text-gray-500">
                                                  {formatter.date(student.completion_date)}
                                              </p>
                                          </div>
                                      </td>

                                      <td className="px-4 py-4 text-right">
                                          <div className="flex items-center justify-end gap-2">
                                              <Link href={`/certificate/${slug}/${student.email}`} target="_blank">
                                                  <Button
                                                      variant="outline"
                                                      size="sm"
                                                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                                  >
                                                      Xem chứng chỉ
                                                  </Button>
                                              </Link>
                                              <Link href={`/admin/students/${student.id}`}>
                                                  <Button variant="outline" size="sm">
                                                      Chi tiết
                                                  </Button>
                                              </Link>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>

                {!isLoading && studentsData?.data.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="mx-auto mb-4 h-24 w-24 text-gray-400">
                            <Award className="h-full w-full" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">Chưa có học sinh hoàn thành</h3>
                        <p className="text-gray-500">Chưa có học sinh nào hoàn thành 100% khóa học này.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Suspense>
                        <PaginationNav totalPages={totalPages} basePath={`/admin/courses/${slug}`} />
                    </Suspense>
                </div>
            )}
        </>
    );
};

export default StudentCompletedList;

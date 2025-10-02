"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { Suspense } from "react";

import studentApi, { USERS_PER_PAGE } from "~/apiRequest/admin/student";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import { Button } from "~/components/ui/button";
import { buildLaravelFilterQuery, getGender } from "~/libs/helper";
import { getStatusBadge } from "~/libs/statusBadge";
import DisplayTotalResult from "../../_components/DisplayTotalResult";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
const allowedFields = [
    "sort",
    "page",
    "search",
    "full_name",
    "email",
    "city",
    "school",
    "gender",
    "birth_year",
    "banned",
    "email_verified",
    "created_at",
    "phone_number",
] as const;

const StudentList = () => {
    const {
        page,
        search,
        full_name,
        email,
        city,
        school,
        gender,
        birth_year,
        banned,
        email_verified,
        created_at,
        phone_number,
        sort,
    } = useGetSearchQuery(allowedFields);
    const { data: students, isLoading } = useQuery({
        queryKey: [
            "admin",
            "students",
            {
                page,
                sort,
                search,
                full_name,
                email,
                city,
                school,
                gender,
                birth_year,
                banned,
                email_verified,
                created_at,
                phone_number,
            },
        ],
        queryFn: async () => {
            const res = await studentApi.getStudents(
                +page || 1,
                USERS_PER_PAGE,
                search || "",
                sort,
                buildLaravelFilterQuery({
                    full_name,
                    email,
                    city,
                    school,
                    gender,
                    birth_year,
                    banned,
                    email_verified,
                    created_at,
                    phone_number,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });
    const total = students?.total ?? 0;
    const totalPages = Math.ceil(total / USERS_PER_PAGE);
    return (
        <>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Tài khoản</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin cơ bản
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin học tập
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {isLoading
                            ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                            : students?.data.map((student, idx) => (
                                  <tr
                                      key={student.id}
                                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                  >
                                      <td className="px-4 py-3 text-zinc-500">{idx + 1}</td>
                                      <td className="px-4 py-3 text-zinc-500">{student.username}</td>
                                      <td className="px-4 py-3 text-zinc-500">
                                          {student.full_name && (
                                              <p>
                                                  <span className="font-bold">Họ tên:</span> {student.full_name}
                                              </p>
                                          )}
                                          {student.city && (
                                              <p>
                                                  <span className="font-bold">Thành phố:</span> {student.city}
                                              </p>
                                          )}
                                          {student.school && (
                                              <p>
                                                  <span className="font-bold">Trường học:</span> {student.school}
                                              </p>
                                          )}
                                          {student.birth_year && (
                                              <p>
                                                  <span className="font-bold">Năm sinh:</span> {student.birth_year}
                                              </p>
                                          )}
                                          {student.gender && (
                                              <p>
                                                  <span className="font-bold">Giới tính:</span>{" "}
                                                  {getGender(student.gender)}
                                              </p>
                                          )}
                                          {student.email && (
                                              <p>
                                                  <span className="font-bold">Email:</span> {student.email}
                                              </p>
                                          )}
                                          {student.phone_number && (
                                              <p>
                                                  <span className="font-bold">Số điện thoại:</span>{" "}
                                                  {student.phone_number}
                                              </p>
                                          )}
                                          <p>
                                              <span className="font-bold">Tham gia:</span>{" "}
                                              {formatter.date(student.created_at)}
                                          </p>
                                      </td>
                                      <td className="px-4 py-3 text-zinc-500">
                                          <p>
                                              <span className="font-bold text-blue-700">Bài đã học trong tuần:</span>{" "}
                                              <span className="font-semibold text-blue-600">
                                                  {student.learning_info.lessons}
                                              </span>
                                          </p>
                                          <p>
                                              <span className="font-bold text-green-700">
                                                  Tổng số giờ học trong tuần:
                                              </span>{" "}
                                              <span className="font-semibold text-green-600">
                                                  {student.learning_info.hours}
                                              </span>
                                          </p>
                                          <p>
                                              <span className="font-bold text-purple-700">Số khóa học đã mua:</span>{" "}
                                              <span className="font-semibold text-purple-600">
                                                  {student.learning_info.enrollments_count}
                                              </span>
                                          </p>
                                          <p>
                                              <span className="font-bold text-orange-700">
                                                  Số khóa học đã hoàn thành:
                                              </span>{" "}
                                              <span className="font-semibold text-orange-600">
                                                  {student.learning_info.completed_courses_count}
                                              </span>
                                          </p>
                                      </td>

                                      <td className="px-4 py-3">
                                          {getStatusBadge("activity_status", student.banned ? "0" : "1")}
                                      </td>
                                      <td className="px-4 py-3 text-right">
                                          <Link href={`/admin/students/${student.id}`}>
                                              <Button variant={"outlineBlack"}>Chỉnh sửa</Button>
                                          </Link>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
            <div className="ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/students" />
                </Suspense>
            </div>
        </>
    );
};

export default StudentList;

"use client";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/admin/exam";
import { difficulties } from "~/apiRequest/exam";
import TableSkeleton from "~/app/(student)/(common)/profile/_components/TableSkeleton";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import DisplayTotalResult from "~/app/admin/_components/DisplayTotalResult";
import { Button } from "~/components/ui/button";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { formatter } from "~/libs/format";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { subjectsMock } from "~/mockdata/subject.data";
const HistoryExamList = () => {
    const { page, search, min_score, max_score, status, violation_count, time_spent, full_name, sort } =
        useGetSearchQuery([
            "page",
            "search",
            "min_score",
            "max_score",
            "status",
            "violation_count",
            "time_spent",
            "full_name",
            "sort",
        ] as const);

    // Gọi API để lấy lịch sử làm bài thi
    const { data: examAttempts, isLoading } = useQuery({
        queryKey: [
            "admin",
            "exam-attempts",
            { page, search, min_score, max_score, status, violation_count, time_spent, full_name, sort },
        ],
        queryFn: async () => {
            const res = await examApi.getAllExamAttempts(
                +page,
                EXAM_PER_PAGE,
                search,
                sort,
                buildLaravelFilterQuery({
                    min_score,
                    max_score,
                    status,
                    violation_count,
                    time_spent,
                    full_name,
                }),
            );
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 phút
    });

    const total = examAttempts?.total ?? 0;
    const totalPages = Math.ceil(total / EXAM_PER_PAGE);

    // Hàm để lấy badge màu cho trạng thái
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "failed":
                return "bg-red-100 text-red-800";
            case "in_progress":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div className="mt-8 overflow-x-auto">
                <DisplayTotalResult total={total} />
                <table className="min-w-full rounded-xl bg-white shadow-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">STT</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin học sinh
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">
                                Thông tin đề thi
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Điểm số</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Thời gian</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Vi phạm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600">Trạng thái</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {isLoading
                            ? [...Array(10)].map((_, index) => <TableSkeleton key={index} col={8} />)
                            : examAttempts?.data.map((attempt, idx) => (
                                  <tr
                                      key={attempt.id}
                                      className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-blue-50"
                                  >
                                      {/* STT */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          {Math.max(0, +page - 1) * EXAM_PER_PAGE + idx + 1}
                                      </td>

                                      {/* Thông tin học sinh */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          <Link href={`/admin/students/${attempt.user.id}`}>
                                              <div className="flex cursor-pointer items-center space-x-3 rounded p-1 transition hover:bg-blue-50">
                                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                      <User className="h-5 w-5 text-blue-600" />
                                                  </div>
                                                  <div>
                                                      <p className="text-sm font-semibold text-gray-900">
                                                          {attempt.user.full_name}
                                                      </p>
                                                      <p className="text-xs text-gray-500">@{attempt.user.username}</p>
                                                      <p className="text-xs text-gray-500">ID: {attempt.user.id}</p>
                                                  </div>
                                              </div>
                                          </Link>
                                      </td>

                                      {/* Đề thi */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          <div className="flex items-start space-x-2">
                                              <FileText className="mt-0.5 h-4 w-4 text-gray-400" />
                                              <div className="space-y-1">
                                                  <Link
                                                      href={`/admin/exams/${attempt.paper.slug}`}
                                                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                                  >
                                                      {attempt.paper.title}
                                                  </Link>
                                                  <div className="space-y-0.5">
                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Môn:</span>{" "}
                                                          {subjectsMock.find(
                                                              (sub) => sub.slug === attempt.paper.subject,
                                                          )?.name || attempt.paper.subject}
                                                      </p>
                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Lớp:</span>{" "}
                                                          {gradeLevelsMock.find(
                                                              (grade) => grade.slug === attempt.paper.grade_level,
                                                          )?.name || attempt.paper.grade_level}
                                                      </p>
                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Loại:</span>{" "}
                                                          {difficulties.find(
                                                              (diff) => diff.slug === attempt.paper.exam_type,
                                                          )?.name || attempt.paper.exam_type}
                                                      </p>

                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Độ khó:</span>
                                                          <span
                                                              className={`ml-1 inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium ${
                                                                  attempt.paper.difficulty === "very_hard"
                                                                      ? "bg-red-100 text-red-800"
                                                                      : attempt.paper.difficulty === "hard"
                                                                        ? "bg-orange-100 text-orange-800"
                                                                        : attempt.paper.difficulty === "normal"
                                                                          ? "bg-yellow-100 text-yellow-800"
                                                                          : attempt.paper.difficulty === "easy"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-gray-100 text-gray-800"
                                                              }`}
                                                          >
                                                              {difficulties.find(
                                                                  (diff) => diff.slug === attempt.paper.difficulty,
                                                              )?.name || attempt.paper.difficulty}
                                                          </span>
                                                      </p>
                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Thời gian:</span>{" "}
                                                          {attempt.paper.duration_minutes} phút
                                                      </p>
                                                      <p className="text-xs text-gray-500">
                                                          <span className="font-medium">Điểm tối đa:</span>{" "}
                                                          {attempt.paper.max_score}
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      </td>

                                      {/* Điểm số */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          <div
                                              className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                                                  attempt.score >= Number(attempt.paper.pass_score)
                                                      ? "bg-green-100 text-green-800"
                                                      : "bg-red-100 text-red-800"
                                              }`}
                                          >
                                              {attempt.score}
                                          </div>
                                      </td>

                                      {/* Thời gian */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          <div className="space-y-1">
                                              <div className="flex items-center space-x-1">
                                                  <Clock className="h-3 w-3 text-gray-400" />
                                                  <span className="text-xs">
                                                      Đã làm: {formatter.duration(attempt.time_spent)}
                                                  </span>
                                              </div>
                                              <p className="text-xs text-gray-500">
                                                  Bắt đầu: {formatter.date(attempt.started_at, true)}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                  Nộp bài: {formatter.date(attempt.submitted_at, true)}
                                              </p>
                                          </div>
                                      </td>

                                      {/* Vi phạm */}
                                      <td className="px-4 py-3 text-zinc-500">
                                          <span
                                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                                  attempt.violation_count === 0
                                                      ? "bg-green-100 text-green-800"
                                                      : attempt.violation_count <= 2
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                              }`}
                                          >
                                              {attempt.violation_count}
                                          </span>
                                      </td>

                                      {/* Trạng thái */}
                                      <td className="px-4 py-3">
                                          <div className="flex items-center space-x-2">
                                              <span
                                                  className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${getStatusBadge(attempt.status)}`}
                                              >
                                                  {attempt.status === "completed"
                                                      ? "Hoàn thành"
                                                      : attempt.status === "failed"
                                                        ? "Thất bại"
                                                        : attempt.status === "in_progress"
                                                          ? "Đang làm"
                                                          : attempt.status === "submitted"
                                                            ? "Đã nộp"
                                                            : attempt.status === "detected"
                                                              ? "Phát hiện vi phạm"
                                                              : attempt.status === "canceled"
                                                                ? "Đã hủy"
                                                                : attempt.status}
                                              </span>
                                          </div>
                                      </td>

                                      {/* Thao tác */}
                                      <td className="px-4 py-3">
                                          <div className="flex items-center justify-end gap-2">
                                              <Link
                                                  href={`/exams/${attempt.paper.slug}/results/${attempt.id}`}
                                                  target="_blank"
                                              >
                                                  <Button variant="outlineBlack" size="sm">
                                                      Chi tiết
                                                  </Button>
                                              </Link>
                                              {attempt.note && (
                                                  <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="hover:bg-blue-50"
                                                      title={attempt.note}
                                                  >
                                                      <AlertCircle className="h-4 w-4 text-blue-500" />
                                                  </Button>
                                              )}
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>
            <div className="ml-auto w-fit">
                <Suspense>
                    <PaginationNav totalPages={totalPages} basePath="/admin/history/exams" />
                </Suspense>
            </div>
        </>
    );
};

export default HistoryExamList;

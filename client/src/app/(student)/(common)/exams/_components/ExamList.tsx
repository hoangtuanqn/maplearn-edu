"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/exam";
import Link from "next/link";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import ExamSkeleton from "./ExamSkeleton";
import { Calendar, Clock, Users, Filter, BookOpen } from "lucide-react";
import clsx from "clsx";
import { formatter } from "~/libs/format";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/libs/hepler";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
const allowedFields = ["search", "page", "categories", "provinces", "difficulties", "subject"] as const;
const ExamList = () => {
    // difficulty số nhiều là: difficulties
    const { page, search, provinces, categories, difficulties, subject } = useGetSearchQuery(allowedFields);
    const { data: examList, isLoading } = useQuery({
        queryKey: ["exam", "list", { page, search, provinces, categories, difficulties, subject }],
        queryFn: async () => {
            const res = await examApi.getExams(
                +page,
                EXAM_PER_PAGE,
                search,
                "",
                buildLaravelFilterQuery({
                    provinces,
                    categories,
                    difficulties,
                    subject,
                }),
            );
            return res.data.data;
        },
    });

    const totalPages = Math.ceil((examList?.total ?? 0) / EXAM_PER_PAGE);

    // Get active filters count
    const activeFiltersCount = Object.values({ search, provinces, categories, difficulties, subject }).filter(
        (v) => v && v !== "",
    ).length;

    return (
        <div className="space-y-6">
            {Number(examList?.total) === 0 ? (
                <div className="py-12">
                    <DisplayNoData title="Không có đề thi nào" />
                </div>
            ) : (
                <>
                    {/* Results Header */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="text-primary h-5 w-5" />
                                <span className="font-semibold text-gray-900">
                                    {formatter.number(examList?.total ?? 0)} đề thi
                                </span>
                                {(examList?.total ?? 0) > 0 && (
                                    <span className="text-sm text-gray-500">
                                        (Trang {page ? page : 1}/{totalPages})
                                    </span>
                                )}
                            </div>

                            {activeFiltersCount > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Filter className="text-primary h-4 w-4" />
                                    <span className="text-gray-600">{activeFiltersCount} bộ lọc đang áp dụng</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Exam Grid */}
                    <section className="grid gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <>
                                {[...Array(EXAM_PER_PAGE)].map((_, index) => (
                                    <ExamSkeleton key={index} />
                                ))}
                            </>
                        ) : (
                            <>
                                {examList?.data.map((exam) => (
                                    <Link
                                        key={exam.id}
                                        href={`/exams/${exam.slug}`}
                                        className="group hover:border-primary/20 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                                    >
                                        {/* Tags Row */}
                                        <div className="flex flex-wrap gap-2">
                                            <div
                                                className={clsx(
                                                    "flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-white",
                                                    {
                                                        "bg-emerald-500": exam.exam_type === "HSA",
                                                        "bg-blue-500": exam.exam_type === "V-ACT",
                                                        "bg-red-500": exam.exam_type === "TSA",
                                                        "bg-orange-500": exam.exam_type === "THPT",
                                                        "bg-gray-500": exam.exam_type === "OTHER",
                                                    },
                                                )}
                                            >
                                                {exam.exam_type !== "OTHER" ? exam.exam_type : "Khác"}
                                            </div>
                                            <div className="bg-primary/10 text-primary flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {exam.duration_minutes} phút
                                            </div>
                                            <div
                                                className={clsx(
                                                    "flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium",
                                                    {
                                                        "bg-emerald-50 text-emerald-600": exam.difficulty === "easy",
                                                        "bg-orange-50 text-orange-600": exam.difficulty === "normal",
                                                        "bg-red-50 text-red-600": exam.difficulty === "hard",
                                                        "bg-purple-50 text-purple-600": exam.difficulty === "very_hard",
                                                        "bg-gray-50 text-gray-600": ![
                                                            "easy",
                                                            "normal",
                                                            "hard",
                                                            "very_hard",
                                                        ].includes(exam.difficulty),
                                                    },
                                                )}
                                            >
                                                {exam.difficulty === "easy"
                                                    ? "Dễ"
                                                    : exam.difficulty === "normal"
                                                      ? "Trung bình"
                                                      : exam.difficulty === "hard"
                                                        ? "Khó"
                                                        : exam.difficulty === "very_hard"
                                                          ? "Rất khó"
                                                          : "Không xác định"}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div className="group-hover:text-primary mt-4 line-clamp-2 min-h-[48px] text-base font-semibold text-gray-900 transition-colors">
                                            {exam.title}
                                        </div>

                                        {/* Stats Row */}
                                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>
                                                    {exam.total_attempt_count > 0
                                                        ? `${formatter.number(exam.total_attempt_count)} lượt thi`
                                                        : "Chưa có lượt thi"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </section>

                    {/* Pagination */}
                    {!isLoading && totalPages > 1 && (examList?.data.length ?? 0) > 0 && (
                        <div className="flex justify-center pt-8">
                            <PaginationNav totalPages={totalPages} basePath="/exams" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExamList;

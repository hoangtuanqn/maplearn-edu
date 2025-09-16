"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import examApi, { EXAM_PER_PAGE } from "~/apiRequest/exam";
import Link from "next/link";
import { PaginationNav } from "~/app/(student)/_components/Pagination";
import ExamSkeleton from "./ExamSkeleton";
import { BookMinus, Calendar } from "lucide-react";
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

    return (
        <>
            {Number(examList?.total) == 0 ? (
                <div className="flex h-fit flex-1 items-center justify-center">
                    <DisplayNoData title="Không có đề thi nào" />
                </div>
            ) : (
                <>
                    <h3 className="text-primary mb-5 font-bold">Đã tìm thấy {examList?.total ?? 0} kết quả</h3>
                    <section className="grid h-fit flex-1 grid-cols-1 gap-4 rounded-xl lg:grid-cols-2">
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
                                        className="rounded-[8px] bg-white px-4.5 py-3.5"
                                        style={{ boxShadow: "0px 1px 4px 0px #0000000D" }}
                                    >
                                        <div className="flex gap-2">
                                            <div
                                                className={clsx(
                                                    "t1-flex-center h-[28px] rounded-[8px] px-3.5 font-medium text-white",
                                                    {
                                                        "bg-[#128b3d]": exam.exam_type === "HSA",
                                                        "bg-[#0F80CC]": exam.exam_type === "V-ACT",
                                                        "bg-[#C41D17]": exam.exam_type === "TSA",
                                                        "bg-[#FF8A00]": exam.exam_type === "THPT",
                                                        "bg-[#515051]": exam.exam_type === "OTHER",
                                                    },
                                                )}
                                            >
                                                {exam.exam_type != "OTHER" ? exam.exam_type : "Khác"}
                                            </div>
                                            <div className="t1-flex-center text-primary h-[28px] rounded-[8px] bg-[#F0F3F7] px-3.5 font-medium">
                                                {exam.duration_minutes} phút
                                            </div>
                                            <div
                                                className={clsx(
                                                    "t1-flex-center h-[28px] rounded-[8px] px-3.5 font-medium",
                                                    {
                                                        "bg-[#E6F4EA] text-[#128b3d]": exam.difficulty === "easy",
                                                        "bg-[#FFF7E6] text-[#FF8A00]": exam.difficulty === "normal",
                                                        "bg-[#FDEDED] text-[#C41D17]": exam.difficulty === "hard",
                                                        "bg-[#E3E6F6] text-[#3F51B5]": exam.difficulty === "very_hard",
                                                        "text-primary bg-[#F0F3F7]": ![
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
                                        <div className="mt-3.5 line-clamp-2 min-h-[48px] text-[16px] font-medium text-[#444444]">
                                            {exam.title}
                                        </div>
                                        <div className="text-primary mt-3.5 flex items-center gap-[4px] text-[13px]">
                                            <BookMinus />
                                            <div className="flex-1 text-[13px]">
                                                {exam.total_attempt_count > 0 ? (
                                                    <span>
                                                        Đã có {formatter.number(exam.total_attempt_count)} lượt thi
                                                    </span>
                                                ) : (
                                                    <span>Chưa có lượt thi nào</span>
                                                )}
                                            </div>
                                            <Calendar />
                                            <div>
                                                <span>Đóng đề: </span>
                                                {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </section>
                    <div className="ml-auto">
                        {!isLoading && totalPages > 1 && (examList?.data.length ?? 0) > 0 && (
                            <PaginationNav totalPages={totalPages} basePath="/exams" />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ExamList;

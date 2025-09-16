import { CirclePlay, Clock, Disc, OctagonMinus, PenTool, Play, User } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import React, { cache } from "react";
import examApiServer from "~/apiRequest/server/exam";
import { formatter } from "~/libs/format";
import HistoryAttempts from "./_components/HistoryAttempts";
import RankingExam from "../_components/RankingExam";
const getExam = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await examApiServer.getExamDetail(slug);
    return post;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const exam = await getExam(slug);
    return {
        title: exam.title,
        description: exam.title || "Chi tiết bài thi",
    };
}

const DetailExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let exam;
    try {
        exam = await getExam(slug); // Dùng lại, không gọi API thêm
    } catch (error) {
        console.error("Error fetching exam details:", error);
        redirect(`/exams`);
    }
    const isMaxAttempt: boolean = exam.max_attempts ? exam.attempt_count >= exam.max_attempts : false;
    return (
        <>
            {/* {isLoading && <Loading />} */}
            <section className="mt-10 flex min-h-screen flex-col gap-4 px-4 pb-10 lg:flex-row">
                <section className="flex-1">
                    <section className="space-y-4 rounded-lg bg-white px-6 py-4 shadow-sm">
                        <h1 className="text-primary text-xl font-bold">{exam.title}</h1>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-[13px] sm:grid-cols-2 md:text-[14px] lg:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <PenTool className="text-primary size-4" />
                                <span className="font-medium text-[#333]">Tổng số câu:</span>
                                <span className="ml-1 text-[#555]">{exam.question_count}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="text-primary size-4" />
                                <span className="font-medium text-[#333]">Thời gian làm bài:</span>
                                <span className="ml-1 text-[#555]">{exam.duration_minutes} phút</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Play className="text-primary size-4" />
                                <span className="font-medium text-[#333]">Thời gian mở đề:</span>
                                <span className="ml-1 text-[#555]">{formatter.date(exam.start_time, true)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <OctagonMinus className="text-primary size-4" />
                                <span className="font-medium text-[#333]">Thời gian đóng đề:</span>
                                <span className="ml-1 text-[#555]">
                                    {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                </span>
                            </div>
                            <div className="col-span-1 flex items-center gap-2 sm:col-span-2">
                                <User className="text-primary size-4" />
                                <span className="font-medium text-[#333]">Lượt làm tối đa:</span>
                                <span className="ml-1 text-[#555]">
                                    {exam.max_attempts ? exam.max_attempts : "Không giới hạn"}
                                </span>
                            </div>
                        </div>
                        <div className="text-md mt-8 flex justify-end gap-3">
                            {exam.is_in_progress && (
                                <Link
                                    className="t1-flex-center bg-primary col-start-3 h-[3.25rem] cursor-pointer gap-2 rounded-full px-10"
                                    href={`/exams/${slug}/doing`}
                                >
                                    <Disc className="size-5 text-white" />
                                    <span className="font-medium text-white">Tiếp tục làm bài</span>
                                </Link>
                            )}
                            {!exam.is_in_progress && (
                                <Link
                                    className={`t1-flex-center col-start-3 h-[3.25rem] gap-2 rounded-full bg-[#12AD50] px-10 ${isMaxAttempt ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                    href={`${isMaxAttempt ? "#" : `/exams/${slug}/start`}`}
                                    aria-disabled={isMaxAttempt ? "true" : "false"}
                                >
                                    <CirclePlay className="size-5 text-white" />
                                    <span className="font-medium text-white">Vào phòng thi</span>
                                </Link>
                            )}
                        </div>
                        {isMaxAttempt && (
                            <p className="text-right font-bold text-red-500">Bạn đã đạt giới hạn số lần thi</p>
                        )}
                    </section>

                    <HistoryAttempts slug={slug} pass_score={exam.pass_score} />
                </section>
                <RankingExam slug={slug} />
                {/* <ExamList /> */}
            </section>
        </>
    );
};

export default DetailExamPage;

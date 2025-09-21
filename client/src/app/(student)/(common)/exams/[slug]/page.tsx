import { CirclePlay, Clock, Disc, OctagonMinus, PenTool, Play, User, FileText, AlertCircle } from "lucide-react";
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
        <div className="min-h-screen">
            <div className="mx-auto px-4 py-6">
                <div className="flex gap-6 max-lg:flex-col lg:flex-row">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Exam Info Card */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <div className="mb-2 flex items-center gap-2">
                                    <FileText className="text-primary h-5 w-5" />
                                    <h1 className="text-primary text-xl font-bold">{exam.title}</h1>
                                </div>
                            </div>

                            {/* Exam Details Grid */}
                            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <PenTool className="text-primary h-4 w-4" />
                                    <div>
                                        <span className="text-sm text-gray-600">Tổng số câu</span>
                                        <p className="font-semibold text-gray-900">{exam.question_count}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <Clock className="text-primary h-4 w-4" />
                                    <div>
                                        <span className="text-sm text-gray-600">Thời gian</span>
                                        <p className="font-semibold text-gray-900">{exam.duration_minutes} phút</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <Play className="text-primary h-4 w-4" />
                                    <div>
                                        <span className="text-sm text-gray-600">Mở đề</span>
                                        <p className="font-semibold text-gray-900">
                                            {formatter.date(exam.start_time, true)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <OctagonMinus className="text-primary h-4 w-4" />
                                    <div>
                                        <span className="text-sm text-gray-600">Đóng đề</span>
                                        <p className="font-semibold text-gray-900">
                                            {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 sm:col-span-2 lg:col-span-1">
                                    <User className="text-primary h-4 w-4" />
                                    <div>
                                        <span className="text-sm text-gray-600">Lượt làm tối đa</span>
                                        <p className="font-semibold text-gray-900">
                                            {exam.max_attempts ? exam.max_attempts : "Không giới hạn"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3">
                                {exam.is_in_progress && (
                                    <Link
                                        className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-full px-6 py-3 text-white transition-colors"
                                        href={`/exams/${slug}/doing`}
                                    >
                                        <Disc className="h-5 w-5" />
                                        <span className="font-medium">Tiếp tục làm bài</span>
                                    </Link>
                                )}
                                {!exam.is_in_progress && (
                                    <Link
                                        className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors ${
                                            isMaxAttempt
                                                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                                : "bg-emerald-500 text-white hover:bg-emerald-600"
                                        }`}
                                        href={`${isMaxAttempt ? "#" : `/exams/${slug}/start`}`}
                                        aria-disabled={isMaxAttempt ? "true" : "false"}
                                    >
                                        <CirclePlay className="h-5 w-5" />
                                        <span>Vào phòng thi</span>
                                    </Link>
                                )}
                            </div>

                            {/* Max Attempt Warning */}
                            {isMaxAttempt && (
                                <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <p className="text-sm font-medium text-red-700">Bạn đã đạt giới hạn số lần thi</p>
                                </div>
                            )}
                        </div>

                        {/* History Section */}
                        <HistoryAttempts slug={slug} pass_score={exam.pass_score} />
                    </div>

                    {/* Ranking Sidebar */}
                    <div className="w-full max-w-sm">
                        <RankingExam slug={slug} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailExamPage;

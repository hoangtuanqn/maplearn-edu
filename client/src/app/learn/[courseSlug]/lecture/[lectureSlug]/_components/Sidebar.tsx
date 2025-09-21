"use client";
import React, { useState } from "react";
import {
    ChevronDown,
    Play,
    CheckCircle,
    Clock,
    MessageCircle,
    BookOpen,
    Award,
    FileText,
    PlayCircle,
    CircleCheckBig,
    Brain,
    Trophy,
    ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseDetailResponse, LessonDetailResponse } from "~/schemaValidate/courseDetail.schema";
import { formatter } from "~/libs/format";
import Link from "next/link";
import ChatBotAI from "./ChatBotAI";
import { useAuth } from "~/hooks/useAuth";
import CertificateButton from "./CertificateButton";

const Sidebar = ({
    course,
    lesson,
}: {
    course: CourseDetailResponse["data"];
    lesson: LessonDetailResponse["data"];
}) => {
    const { user } = useAuth();
    const [openChapter, setOpenChapter] = useState(lesson.chapter_id);
    const [activeTab, setActiveTab] = useState("lessons"); // "lessons" | "comments" | "resources"

    const handleChapterToggle = (chapterId: number) => {
        setOpenChapter((prev) => (prev === chapterId ? 0 : chapterId));
    };

    const getLessonIcon = (status: string) => {
        if (status === "successed") return <CheckCircle className="h-4 w-4 text-green-600" />;
        if (status === "watching") return <PlayCircle className="h-4 w-4 text-blue-600" />;
        return <Play className="h-4 w-4 text-gray-400" />;
    };

    const getLessonStatus = (status: string) => {
        if (status === "successed") return "Đã hoàn thành";
        if (status === "watching") return "Đang xem";
        return "Chưa hoàn thành";
    };
    return (
        <div className="border-l border-gray-200 bg-white shadow-sm max-lg:border-t max-lg:border-l-0 lg:w-[500px]">
            {/* Modern Tabs */}
            <div className="flex border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <button
                    onClick={() => setActiveTab("lessons")}
                    className={`relative flex-1 cursor-pointer px-4 py-4 text-sm font-semibold ${
                        activeTab === "lessons"
                            ? "text-primary bg-white"
                            : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Nội dung</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("comments")}
                    className={`relative flex-1 cursor-pointer px-4 py-4 text-sm font-semibold ${
                        activeTab === "comments"
                            ? "text-primary bg-white"
                            : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Bình luận</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("resources")}
                    className={`relative flex-1 cursor-pointer px-4 py-4 text-sm font-semibold ${
                        activeTab === "resources"
                            ? "text-primary bg-white"
                            : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Brain className="h-4 w-4" />
                        <span>Trợ lý AI</span>
                    </div>
                </button>
            </div>

            {/* Your Progress - Sidebar */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Tiến độ học tập</h3>
                    <span className="text-sm text-gray-600">
                        {course.completed_lessons}/{course.lesson_count}
                    </span>
                </div>

                <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2 rounded-full bg-green-500 transition-all duration-300"
                        style={{ width: `${course.percent_completed}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                    <span>{course.percent_completed}% hoàn thành</span>
                    <span>Còn {course.lesson_count - course.completed_lessons} bài</span>
                </div>

                {/* Certificate Button - Only show when course is 100% completed */}
                {course.percent_completed === 100 && user?.email_verified_at ? (
                    <div className="mt-4">
                        <Link
                            href={`/certificate/${course.slug}/${user?.email}`}
                            target="_blank"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl"
                        >
                            <Trophy className="h-4 w-4" />
                            <span>Chứng chỉ của bạn</span>
                            <ExternalLink className="h-3 w-3" />
                        </Link>
                        <p className="mt-2 text-center text-xs font-medium text-emerald-600">
                            🎉 Chúc mừng! Bạn đã hoàn thành khóa học
                        </p>
                    </div>
                ) : (
                    <CertificateButton />
                )}
            </div>

            {/* Tab Content */}
            <div className="sticky top-10">
                {activeTab === "lessons" && (
                    <div className="p-6">
                        {/* Chapters */}
                        <div className="space-y-2">
                            {course.chapters.map((chapter, chapterIndex) => (
                                <div key={chapter.id} className={`rounded-lg border border-gray-200`}>
                                    {/* Chapter Header */}
                                    <button
                                        onClick={() => handleChapterToggle(chapter.id)}
                                        className="w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-600">
                                                {chapterIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="mb-1 text-sm font-semibold text-gray-900">
                                                    {chapter.title}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <FileText className="h-3 w-3" />
                                                        {formatter.number(chapter.lessons.length)} bài học
                                                    </span>
                                                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatter.duration(chapter.duration)}
                                                    </span>
                                                    {chapter.completed_lessons > 0 && (
                                                        <>
                                                            <span className="h-1 w-1 rounded-full bg-gray-300" />
                                                            <span className="flex items-center gap-1 text-green-600">
                                                                <CircleCheckBig className="h-3 w-3" />
                                                                {chapter.completed_lessons}/{chapter.lessons.length}{" "}
                                                                hoàn thành
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronDown
                                                className={`h-5 w-5 text-gray-400 transition-transform ${
                                                    openChapter === chapter.id ? "rotate-180" : ""
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    {/* Lessons */}
                                    <AnimatePresence>
                                        {openChapter === chapter.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden bg-gray-50"
                                            >
                                                {chapter.lessons.map((less, lessonIndex) => (
                                                    <div
                                                        key={less.id}
                                                        className={`ml-4 border-l-2 transition-colors ${
                                                            lesson.slug === less.slug
                                                                ? "border-l-blue-600 bg-blue-50"
                                                                : less.successed
                                                                  ? "border-l-green-500 bg-green-50"
                                                                  : "border-l-gray-300 bg-gray-50"
                                                        }`}
                                                    >
                                                        <Link
                                                            href={`/learn/${course.slug}/lecture/${less.slug}`}
                                                            className="flex cursor-pointer items-center gap-3 p-3"
                                                        >
                                                            {/* Lesson Status Icon */}
                                                            <div className="flex-shrink-0">
                                                                {getLessonIcon(
                                                                    less.successed
                                                                        ? "successed"
                                                                        : lesson.slug === less.slug
                                                                          ? "watching"
                                                                          : "pending",
                                                                )}
                                                            </div>

                                                            {/* Lesson Info */}
                                                            <div className="min-w-0 flex-1">
                                                                <div className="mb-1 flex items-center gap-2">
                                                                    <span className="text-xs text-gray-500">
                                                                        {lessonIndex + 1}.
                                                                    </span>
                                                                    <h5
                                                                        className={`truncate text-sm font-medium ${
                                                                            lesson.slug === less.slug
                                                                                ? "text-blue-700"
                                                                                : less.successed
                                                                                  ? "text-green-700"
                                                                                  : "text-gray-900"
                                                                        }`}
                                                                    >
                                                                        {less.title}
                                                                    </h5>
                                                                </div>

                                                                <div className="flex items-center gap-2 text-xs">
                                                                    <span className="flex items-center gap-1 text-gray-600">
                                                                        <Clock className="h-3 w-3" />
                                                                        {formatter.duration(less.duration)}
                                                                    </span>
                                                                    <span
                                                                        className={`ml-2 text-xs font-medium ${
                                                                            less.successed
                                                                                ? "text-green-600"
                                                                                : lesson.slug === less.slug
                                                                                  ? "text-blue-600"
                                                                                  : "text-gray-500"
                                                                        }`}
                                                                    >
                                                                        {getLessonStatus(
                                                                            less.successed
                                                                                ? "successed"
                                                                                : lesson.slug === less.slug
                                                                                  ? "watching"
                                                                                  : "pending",
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                {/* Lesson Resources */}
                                                                <div className="mt-2 flex items-center gap-2">
                                                                    <span className="flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-600">
                                                                        <Award className="h-3 w-3" />
                                                                        Quiz
                                                                    </span>
                                                                    <span className="flex items-center gap-1 rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-600">
                                                                        <FileText className="h-3 w-3" />
                                                                        Tài liệu
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "comments" && (
                    <div className="p-4">
                        <div className="py-8 text-center">
                            <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                            <p className="text-gray-600">Chức năng bình luận đang được phát triển</p>
                        </div>
                    </div>
                )}

                {activeTab === "resources" && <ChatBotAI lesson={lesson} courseName={course.name} />}
            </div>
        </div>
    );
};

export default Sidebar;

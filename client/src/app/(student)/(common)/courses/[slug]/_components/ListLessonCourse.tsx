"use client";
import React, { useState } from "react";
import { ChevronDown, Clock, FileText, Lock, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { useParams } from "next/navigation";
import { formatter } from "~/libs/format";
import { Button } from "~/components/ui/button";
import TryLearning from "./TryLearning";

const ListLessonCourse = () => {
    const params = useParams<{ slug: string }>();
    const [open, setOpen] = useState(1);

    const {
        data: chapters,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["course", "chapters", params.slug],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(params.slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });

    const handleChapterToggle = (chapterId: number) => {
        setOpen((prev) => (prev === chapterId ? 0 : chapterId));
    };

    if (isLoading) {
        return (
            <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
                <p className="text-base font-bold">Nội dung khóa học</p>
                <div className="mt-4 animate-pulse space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 rounded-lg bg-gray-200"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
                <p className="text-base font-bold">Nội dung khóa học</p>
                <div className="mt-4 text-center text-red-500">Không thể tải nội dung khóa học</div>
            </div>
        );
    }
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
            <p className="text-base font-bold">Nội dung khóa học</p>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                {chapters?.map((chapter, chapterIndex) => (
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
                                    <h4 className="mb-1 text-sm font-semibold text-gray-900">{chapter.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            {chapter.lessons.length} bài học
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {formatter.duration(
                                                chapter.lessons.reduce((acc, lesson) => acc + lesson.duration, 0),
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`h-5 w-5 text-gray-400 transition-transform ${
                                        open === chapter.id ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </button>

                        {/* Lessons */}
                        <AnimatePresence>
                            {open === chapter.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-gray-50"
                                >
                                    {chapter.lessons.map((lesson, lessonIndex) => (
                                        <div
                                            key={lesson.id}
                                            className={`ml-4 flex cursor-pointer items-center gap-3 border-l-2 border-l-gray-200 p-3 transition-colors hover:bg-white ${
                                                lesson.is_free ? "bg-white" : ""
                                            }`}
                                        >
                                            {/* Lesson Status Icon */}
                                            <div className="flex-shrink-0">
                                                {lesson.is_free ? (
                                                    <Play className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Lock className="h-4 w-4 text-gray-400" />
                                                )}
                                            </div>

                                            {/* Lesson Info */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{lessonIndex + 1}.</span>
                                                    <h5
                                                        className={`truncate text-sm font-medium ${lesson.is_free ? "text-gray-900" : "text-gray-600"}`}
                                                    >
                                                        {lesson.title}
                                                    </h5>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <Clock className="h-3 w-3" />
                                                        {formatter.duration(lesson.duration)}
                                                    </span>

                                                    {lesson.is_free && (
                                                        <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700">
                                                            Miễn phí
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex-shrink-0">
                                                {lesson.is_free ? (
                                                    <TryLearning
                                                        title={`Bài học: ${lesson.title}`}
                                                        video={lesson.video_url}
                                                    />
                                                ) : (
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-2" disabled>
                                                        <Lock className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListLessonCourse;

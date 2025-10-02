"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { formatter } from "~/libs/format";
import { AddChapterDialog } from "./AddChapterDialog";
import { AddLessonDialog } from "./AddLessonDialog";
import DeleteLessonButton from "./DeleteLessonButton";
import DeleteChapterButton from "./DeleteChapterButton";
import Loading from "~/app/(student)/_components/Loading";
import { EditChapterButton } from "./EditChapterButton";
import { EditLessonDialog } from "./EditLessonDialog";

const ChaptersList = ({ slug }: { slug: string }) => {
    const { data: chapters } = useQuery({
        queryKey: ["course", "chapters", slug],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });

    // State để theo dõi các chapter đang mở
    const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

    // Hàm toggle chapter
    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(
            (prev) =>
                prev.includes(chapterId)
                    ? prev.filter((id) => id !== chapterId) // Đóng nếu đã mở
                    : [...prev, chapterId], // Mở nếu chưa mở
        );
    };

    if (!chapters) {
        return <Loading />;
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Nội dung khóa học</h2>
                <AddChapterDialog courseSlug={slug} maxPosition={chapters.length || 0} style={1} />
            </div>

            <div className="space-y-4">
                {chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="overflow-hidden rounded-lg border border-gray-200 shadow-xs">
                        {/* Chapter Header */}
                        <div className="bg-gray-80 flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-blue-50">
                            <div
                                className="w-full"
                                onClick={() => toggleChapter(chapter.id)} // Sửa lại sự kiện onClick cho logic toggle
                            >
                                <div className="flex items-center gap-3">
                                    {expandedChapters.includes(chapter.id) ? (
                                        <ChevronDown className="h-5 w-5 text-blue-600" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    )}
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            Chương {chapterIndex + 1}: {chapter.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{chapter.lessons.length} bài học</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <AddLessonDialog
                                    slugCourse={slug}
                                    chapterId={chapter.id}
                                    nameChapterCourse={chapter.title}
                                    maxPosition={chapter.lessons.length || 0}
                                    style={1}
                                />

                                <EditChapterButton
                                    chapterId={chapter.id}
                                    nameChapterCourse={chapter.title}
                                    currentPosition={chapter.position ?? 0}
                                />
                                <DeleteChapterButton slugCourse={slug} name={chapter.title} chapterId={chapter.id} />
                            </div>
                        </div>

                        {/* Chapter Content */}
                        {expandedChapters.includes(chapter.id) && (
                            <div className="border-t border-gray-200">
                                {chapter.lessons.map((lesson, lessonIndex) => (
                                    <div
                                        key={lesson.id}
                                        className={`flex items-center justify-between p-4 transition-colors hover:bg-gray-50 ${
                                            lessonIndex < chapter.lessons.length - 1 ? "border-b border-gray-100" : ""
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-1 items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                                                    {lessonIndex + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">
                                                        Bài {lessonIndex + 1}: {lesson.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {formatter.duration(lesson.duration)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <EditLessonDialog
                                                lesson={{
                                                    slug: lesson.slug,
                                                    title: lesson.title,
                                                    content: lesson.content,
                                                    position: lesson.position,
                                                    duration: lesson.duration,
                                                    is_free: lesson.is_free,
                                                    video_url: lesson.video_url,
                                                }}
                                            />
                                            <DeleteLessonButton
                                                slugCourse={slug}
                                                slugLesson={lesson.slug}
                                                name={lesson.title}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* Add lesson button in chapter */}
                                <div className="border-t border-gray-100 bg-gray-50 p-4">
                                    <AddLessonDialog
                                        slugCourse={slug}
                                        chapterId={chapter.id}
                                        nameChapterCourse={chapter.title}
                                        maxPosition={chapter.lessons.length || 0}
                                        style={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
                <AddChapterDialog courseSlug={slug} maxPosition={chapters.length || 0} style={2} />
            </div>
        </>
    );
};

export default ChaptersList;

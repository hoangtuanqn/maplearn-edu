"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import courseApi from "~/apiRequest/course";
import { formatter } from "~/libs/format";
import { AddChapterDialog } from "./AddChapterDialog";
import { AddLessonDialog } from "./AddLessonDialog";
import DeleteLessonButton from "./DeleteLessonButton";
import DeleteChapterButton from "./DeleteChapterButton";
import Loading from "~/app/(student)/_components/Loading";
const ChaptersList = ({ slug }: { slug: string }) => {
    const { data: chapters } = useQuery({
        queryKey: ["course", "chapters", slug],
        queryFn: async () => {
            const res = await courseApi.getChapterLessonList(slug);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 phút
    });
    const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);
    const toggleChapter = (chapterId: number) => {
        setExpandedChapters((prev) =>
            prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
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
                {chapters?.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="overflow-hidden rounded-lg border border-gray-200">
                        {/* Chapter Header */}
                        <div
                            className="flex cursor-pointer items-center justify-between bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    toggleChapter(chapter.id);
                                }
                            }}
                        >
                            <div className="flex items-center gap-3">
                                {expandedChapters.includes(chapter.id) ? (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                )}
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {" "}
                                        Chương {chapterIndex + 1}: {chapter.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">{chapter.lessons.length} bài học</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <AddLessonDialog
                                    slugCourse={slug}
                                    chapterId={chapter.id}
                                    nameChapterCourse={chapter.title}
                                    maxPosition={chapter.lessons.length}
                                    style={1}
                                />
                                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                    <Edit className="h-4 w-4" />
                                </Button>
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
                                                {/* {getLessonIcon("")} */}
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
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
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
                                        maxPosition={chapter.lessons.length + 1}
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

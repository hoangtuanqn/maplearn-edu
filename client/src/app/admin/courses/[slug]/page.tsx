import React from "react";
import { Edit, BookOpen, Users, Clock, BarChart3 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { formatter } from "~/libs/format";
import courseApi from "~/apiRequest/course";
import ChaptersList from "./_components/ChaptersList";
import Link from "next/link";
import CourseStudentChart from "./_components/CourseStudentChart";
import { Metadata } from "next";
import StudentCompletedList from "./_components/StudentCompletedList";
export const metadata: Metadata = {
    title: "Chi tiết khóa học",
};

const DetailCourse = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let course;
    try {
        const res = await courseApi.getDetailCourse(slug);
        course = res.data.data;
    } catch {
        redirect("/admin/courses");
    }
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            {/* Header */}
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <div className="flex flex-col items-start justify-between gap-2 2xl:flex-row">
                    <div className="flex-1">
                        <h1 className="text-primary mb-2 text-2xl font-bold">{course.name}</h1>
                        <p className="mb-4 text-justify text-gray-600">{course.description}</p>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{course.enrollments_count} học viên</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.lesson_count} bài học</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{formatter.duration(course.duration)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                <span className="font-medium text-green-600">{formatter.number(course.price)} đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href={`/admin/courses/edit/${course.slug}`}>
                            <Button className="flex items-center gap-2 text-white">
                                <Edit className="h-4 w-4" />
                                Chỉnh sửa khóa học
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <CourseStudentChart slug={slug} />
            </div>

            {/* Course Content */}
            <div className="mb-5 rounded-lg bg-white p-6 shadow-sm">
                {/* Chapters List */}
                <ChaptersList slug={slug} />
            </div>

            {/* Hiển thị những học sinh đã hoàn thành */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                {/* Chapters List */}
                <StudentCompletedList slug={slug} />
            </div>
        </div>
    );
};

export default DetailCourse;

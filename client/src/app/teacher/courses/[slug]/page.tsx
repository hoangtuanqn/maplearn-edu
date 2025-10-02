import React from "react";
import { BookOpen, Users, Clock, BarChart3 } from "lucide-react";

import { redirect } from "next/navigation";
import { formatter } from "~/libs/format";
import courseApi from "~/apiRequest/course";
import ChaptersList from "./_components/ChaptersList";
import CourseStudentChart from "./_components/CourseStudentChart";
import { Metadata } from "next";
import StudentPurchasedCourses from "./_components/StudentPurchasedCourses";
import Breadcrumb from "../../_components/Breadcrumb";
export const metadata: Metadata = {
    title: "Chi tiết khóa học",
};
const DetailCourse = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const breadcrumbData = [
        { label: "Dashboard", href: "/teacher" },
        { label: "Khóa học", href: "/teacher/courses" },
        { label: "Chi tiết khóa học", href: `/teacher/courses/${slug}` },
    ];
    let course;
    try {
        const res = await courseApi.getDetailCourse(slug);
        course = res.data.data;
    } catch {
        redirect("/teacher/courses");
    }
    return (
        <div className="mt-5 min-h-screen bg-[#F5F5F5]">
            <div className="mb-6 flex flex-col gap-5">
                <Breadcrumb breadcrumbData={breadcrumbData} />
            </div>
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
                <StudentPurchasedCourses slug={slug} />
            </div>
        </div>
    );
};

export default DetailCourse;

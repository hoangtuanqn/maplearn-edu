import React, { cache } from "react";
import "react-circular-progressbar/dist/styles.css";
import IntroCourse from "./IntroCourse";
import ListLessonCourse from "./_components/ListLessonCourse";
import ContentLesson from "./_components/ContentLesson";
import courseApi from "~/apiRequest/course";
import { CourseDetail } from "~/schemaValidate/course.schema";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { formatter } from "~/libs/format";
import ButtonAction from "./_components/ButtonAction";
import RelatedCourses from "./_components/RelatedCourses";
const getCourse = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await courseApi.getDetailCourse(slug);
    return post;
});
// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getCourse(slug);
    return {
        title: post.name,
        description: post.description || "Chi tiết khóa học",
        openGraph: {
            title: post.name,
            images: [post.thumbnail],
        },
    };
}

const CourseDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let res;
    try {
        res = await getCourse(slug);
    } catch (error) {
        console.log("Error fetching course details:", error);
        redirect("/courses");
    }
    const course: CourseDetail | null = res || null;
    // Ko tồn tại khóa học hoặc khóa học không tồn tại
    if (!course || !course.status) {
        redirect("/courses");
    }

    return (
        <div className="min-h-screen">
            <div className="flex max-lg:flex-col lg:gap-3.5">
                {/* Layout Bên trái */}
                <div className="w-full flex-9/12 max-lg:order-2">
                    <ContentLesson course={course as CourseDetail} />
                    <ListLessonCourse />

                    {/* Các khóa học cùng danh mục */}
                    <RelatedCourses category={course.category} />
                </div>
                {/* Layout Bên phải */}
                <div className="h-fit w-full flex-3/12 rounded-xl bg-white p-8 shadow-sm max-lg:order-1 lg:sticky lg:top-[70px]">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-center">
                            <IntroCourse thumbnail={course.thumbnail} video={course.intro_video} />
                        </div>
                        <div className="mt-2 flex flex-col gap-2 text-center text-base">
                            <h2 className="t1-gradient-text font-bold">Giáo viên: {course.teacher.full_name}</h2>
                            <div className="mt-1">
                                {/* Giá tiền cũ, dạng bị gạch bỏ */}
                                <span className="text-sm text-slate-500 line-through">
                                    {course.price < course.price && formatter.number(course.price) + "đ"}
                                </span>
                                <span className="block font-bold text-black">
                                    Học phí: {formatter.number(course.price) + "đ"}
                                </span>
                            </div>
                        </div>

                        <ButtonAction />

                        <div className="rounded-lg bg-gray-50 p-4">
                            <span className="mb-2 block text-sm font-semibold text-gray-700">Khóa này bao gồm</span>
                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                                <li>{formatter.durationToHours(course.duration)} tổng thời lượng học</li>
                                <li>{course.lesson_count} bài giảng</li>
                                <li>Tất cả tài nguyên có thể tải xuống</li>
                                <li>Truy cập trên thiết bị di động</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;

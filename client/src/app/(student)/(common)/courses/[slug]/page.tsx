import React, { cache } from "react";
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
import SaveLocalStorage from "./_components/SaveLocalStorage";
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
        <div className="min-h-scree">
            <div className="mx-auto px-4 py-6">
                <div className="flex gap-6 max-lg:flex-col">
                    {/* Layout Bên trái */}
                    <div className="flex-1 space-y-6 max-lg:order-2">
                        <ContentLesson course={course as CourseDetail} />
                        <ListLessonCourse />
                        <RelatedCourses category={course.category} />
                        <SaveLocalStorage courseId={String(course.id)} />
                    </div>

                    {/* Layout Bên phải */}
                    <div className="w-full max-w-sm max-lg:order-1">
                        <div className="sticky top-20 space-y-4">
                            {/* Course Info Card */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="space-y-4">
                                    {/* Video/Thumbnail */}
                                    <div className="flex justify-center">
                                        <IntroCourse thumbnail={course.thumbnail} video={course.intro_video} />
                                    </div>

                                    {/* Teacher Info */}
                                    <div className="text-center">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Giáo viên: {course.teacher.full_name}
                                        </h3>
                                    </div>

                                    {/* Pricing */}
                                    <div className="text-center">
                                        <div
                                            className={`text-2xl font-bold ${
                                                course.price === 0 ? "text-green-600" : "text-primary"
                                            }`}
                                        >
                                            {course.price === 0 ? "Miễn phí" : `${formatter.number(course.price)}đ`}
                                        </div>
                                        {/* {course.price < course.price && (
                                            <div className="text-sm text-gray-500 line-through">
                                                {formatter.number(course.price)}đ
                                            </div>
                                        )} */}
                                    </div>

                                    {/* Action Button */}
                                    <ButtonAction />
                                </div>
                            </div>

                            {/* Course Includes Card */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                    <div className="bg-primary h-2 w-2 rounded-full"></div>
                                    Khóa này bao gồm
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <div className="bg-primary/60 h-1.5 w-1.5 rounded-full"></div>
                                        {formatter.durationToHours(course.duration)} tổng thời lượng học
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-primary/60 h-1.5 w-1.5 rounded-full"></div>
                                        {course.lesson_count} bài giảng
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-primary/60 h-1.5 w-1.5 rounded-full"></div>
                                        Tất cả tài nguyên có thể tải xuống
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="bg-primary/60 h-1.5 w-1.5 rounded-full"></div>
                                        Truy cập trên thiết bị di động
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;

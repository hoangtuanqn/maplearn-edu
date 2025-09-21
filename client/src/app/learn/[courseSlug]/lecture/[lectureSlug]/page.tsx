import React from "react";
import {
    Play,
    CheckCircle,
    Users,
    Star,
    Download,
    Share,
    PlayCircle,
    ChevronLeft,
    ChevronRight,
    Bookmark,
    ThumbsUp,
} from "lucide-react";
import { formatter } from "~/libs/format";
import { Button } from "~/components/ui/button";
import Sidebar from "./_components/Sidebar";
import VideoLessonTab from "./_components/VideoLessonTab";
import { redirect } from "next/navigation";
import courseDetailServer from "~/apiRequest/server/courseDetail";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import Link from "next/link";
import HeaderVideo from "~/app/(student)/_components/Header/HeaderVideo";

import DisplayVideoLearn from "./_components/DisplayVideoLearn";
const VideoPage = async ({ params }: { params: Promise<{ courseSlug: string; lectureSlug: string }> }) => {
    const { courseSlug, lectureSlug } = await params;
    let course;
    let lesson;

    try {
        const corRes = await courseDetailServer.getDetailCourse(courseSlug);
        course = corRes.data.data;

        const lesRes = await courseDetailServer.getDetailLesson(courseSlug, lectureSlug);
        lesson = lesRes.data.data;
    } catch {
        redirect("/");
    }

    return (
        <>
            <HeaderVideo title={lesson.chapter.title} />
            <div className="min-h-screen bg-gray-50">
                <div className="flex h-full gap-0 max-lg:flex-col">
                    {/* Video Section */}
                    <div className="flex-12/15">
                        {/* Video Player */}
                        <div className="bg-black">
                            <DisplayVideoLearn course={course} lesson={lesson} />

                            {/* Simple Video Info Overlay */}
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/20">
                                        <PlayCircle className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-lg leading-tight font-semibold text-gray-900">
                                            Bài học: {lesson.title}
                                        </p>
                                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                                Bài {lesson.position}/{" "}
                                                {course.chapters[
                                                    course.chapters.findIndex((item) => item.id === lesson.chapter.id)
                                                ].lessons.length ?? 0}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span>Chương {lesson.chapter.title}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-blue-600">
                                        {formatter.duration(lesson.duration)}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">Thời lượng</div>
                                </div>
                            </div>
                        </div>

                        {/* Simple Video Controls */}
                        <div className="border-b border-gray-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {lesson.prev_video ? (
                                        <Link href={`/learn/${course.slug}/lecture/${lesson.prev_video?.slug}`}>
                                            <Button variant="outline" size="sm">
                                                <ChevronLeft className="mr-1 h-4 w-4" />
                                                Bài trước
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button variant="outline" size="sm" disabled>
                                            <ChevronLeft className="mr-1 h-4 w-4" />
                                            Bài trước
                                        </Button>
                                    )}

                                    <div className="h-4 w-px bg-gray-300"></div>
                                    {lesson.next_video ? (
                                        <Link href={`/learn/${course.slug}/lecture/${lesson.next_video?.slug}`}>
                                            <Button size="sm" className="bg-primary/90 text-white">
                                                Bài tiếp theo
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button size="sm" className="bg-gray-200 text-gray-600" disabled>
                                            Bài tiếp theo
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <ThumbsUp className="mr-1 h-4 w-4" />
                                        Thích (42)
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Bookmark className="mr-1 h-4 w-4" />
                                        Lưu
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share className="mr-1 h-4 w-4" />
                                        Chia sẻ
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Video Lesson Tabs */}
                        <VideoLessonTab />

                        {/* Course Info - Udemy/Coursera Style */}
                        <div className="bg-white">
                            <div className="p-6 max-lg:p-4">
                                {/* Course Title & Description */}
                                <div className="mb-6 border-b border-gray-100 pb-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                            Bestseller
                                        </span>
                                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                            Premium Course
                                        </span>
                                    </div>

                                    <h1 className="mb-3 text-2xl leading-tight font-bold text-gray-900 max-lg:text-xl">
                                        {lesson.title}
                                    </h1>

                                    <p className="leading-relaxed text-gray-700 max-lg:text-sm">{lesson.content}</p>
                                </div>
                                <div>
                                    {/* Instructor Section - Coursera Style */}
                                    <div className="mb-6 border-b border-gray-100 pb-6">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Giáo viên</h3>
                                        <div className="flex items-start gap-4">
                                            <div className="relative flex-shrink-0">
                                                <DisplayAvatar
                                                    fullName={course.teacher.full_name}
                                                    avatar={course.teacher.avatar}
                                                    ratio="14"
                                                />
                                                <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1 shadow-sm">
                                                    <CheckCircle className="h-4 w-4 text-blue-500" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="mb-1 cursor-pointer text-lg font-semibold text-blue-600 hover:text-blue-800">
                                                    <Link href={`/teachers/${course.teacher.id}`}>
                                                        {course.teacher.full_name}
                                                    </Link>
                                                </h4>
                                                <p className="mb-3 text-gray-600">{course.teacher.degree}</p>
                                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span>{20} đánh giá</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>
                                                            {formatter.number(course.enrollments_count)} học sinh đăng
                                                            ký
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Play className="h-4 w-4" />
                                                        <span>52 bài giảng</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Content Overview */}
                                    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                        <div className="text-center">
                                            <div className="mb-1 text-xl font-bold text-gray-900">
                                                {course.lesson_count}
                                            </div>
                                            <div className="text-sm text-gray-600">Bài giảng</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-1 text-xl font-bold text-gray-900">
                                                {formatter.durationToHours(course.duration)}
                                            </div>
                                            <div className="text-sm text-gray-600">Tổng thời gian</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-1 text-xl font-bold text-gray-900">8</div>
                                            <div className="text-sm text-gray-600">Bài tập</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="mb-1 text-xl font-bold text-gray-900">✓</div>
                                            <div className="text-sm text-gray-600">Chứng chỉ</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 space-y-6 bg-white">
                                    {/* Lợi ích sau khóa học */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Bạn sẽ nhận được
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                            <li>Nắm vững kiến thức trọng tâm của môn học.</li>
                                            <li>Phát triển kỹ năng giải nhanh các dạng bài tập.</li>
                                            <li>Tự tin tham gia các kỳ thi quan trọng.</li>
                                            <li>Nhận chứng chỉ hoàn thành khóa học.</li>
                                        </ul>
                                    </div>

                                    {/* Nội dung nổi bật */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Nội dung nổi bật
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                            <li>Sự điện li và ứng dụng trong thực tiễn.</li>
                                            <li>Este - Lipit: Cấu tạo, tính chất, bài tập vận dụng.</li>
                                            <li>Cacbonhidrat: Phân loại, phản ứng hóa học.</li>
                                            <li>Cân bằng hóa học và các dạng bài tập nâng cao.</li>
                                        </ul>
                                    </div>

                                    {/* Mô tả chi tiết */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Mô tả khóa học
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            - Bao phủ đầy đủ các chuyên đề Hóa 11 trọng tâm như: Sự điện li, Este -
                                            Lipit, Cacbonhidrat, Cân bằng hóa học,...
                                            <br />
                                            - Bài giảng dễ hiểu, kết hợp sơ đồ tư duy và hình ảnh trực quan.
                                            <br />- Có bài kiểm tra định kỳ giúp học sinh đánh giá tiến độ.
                                        </p>
                                    </div>

                                    {/* Đối tượng phù hợp */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Đối tượng phù hợp
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                            <li>Học sinh lớp 11 muốn học sớm, học chắc.</li>
                                            <li>Học sinh mất gốc cần học lại từ đầu.</li>
                                            <li>Học sinh muốn thi vào khối B, D.</li>
                                        </ul>
                                    </div>

                                    {/* Yêu cầu trước khi học */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Yêu cầu trước khi học
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                            <li>Kiến thức cơ bản môn Hóa học lớp 10.</li>
                                            <li>Có thiết bị (máy tính/điện thoại) có kết nối Internet.</li>
                                        </ul>
                                    </div>

                                    {/* Hình thức học */}
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                                            Hình thức học
                                        </h3>
                                        <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                                            <li>100% học online, chủ động thời gian.</li>
                                            <li>Có thể xem lại bài giảng bất cứ lúc nào.</li>
                                            <li>Hỗ trợ hỏi đáp trực tuyến với giảng viên.</li>
                                            <li>Tài liệu PDF tải về miễn phí.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Course Rating & Stats */}
                                <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        </div>
                                        <span className="font-semibold text-gray-900">{50}</span>
                                        <span className="cursor-pointer text-blue-600 underline hover:no-underline">
                                            ({formatter.number(50)} ratings)
                                        </span>
                                    </div>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600">
                                        {formatter.number(course.enrollments_count)} học sinh đăng ký
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600">
                                        Last updated {formatter.date(course.updated_at)}
                                    </span>
                                </div>

                                {/* What You'll Learn - Udemy Style Box */}
                                <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Bạn sẽ nhận được</h3>
                                    <div className="grid gap-3 lg:grid-cols-2">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                            <span className="text-sm text-gray-700">
                                                Nắm vững các khái niệm cơ bản về dao động cơ
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                            <span className="text-sm text-gray-700">
                                                Giải thành thạo các bài tập về sóng cơ
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                            <span className="text-sm text-gray-700">
                                                Hiểu rõ dòng điện xoay chiều và ứng dụng
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                            <span className="text-sm text-gray-700">
                                                Chuẩn bị tốt cho kỳ thi THPT Quốc gia
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download resources
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        Save course
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar course={course} lesson={lesson} />
                </div>
            </div>
        </>
    );
};

export default VideoPage;

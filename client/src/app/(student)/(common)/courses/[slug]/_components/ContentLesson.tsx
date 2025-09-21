import React from "react";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { CourseGetDetailResponse } from "~/schemaValidate/course.schema";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";
import { User, Star, Users, Award, BookOpen, Target, CheckCircle, GraduationCap, Monitor } from "lucide-react";

const ContentLesson = ({ course }: { course: CourseGetDetailResponse["data"] }) => {
    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                <div className="from-primary via-primary/90 to-primary/80 bg-gradient-to-r p-6 text-white sm:p-8">
                    <h1 className="text-2xl font-bold sm:text-2xl">{course.name}</h1>
                    <p className="text-primary-50 mt-3">{course.description}</p>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-yellow-300">
                                    {course.rating.average_rating}
                                </span>
                                <Rating style={{ maxWidth: 100 }} value={course.rating.average_rating} readOnly />
                                <span className="text-primary-100 text-sm">{course.rating.total_reviews} đánh giá</span>
                            </div>
                            {course.enrollments_count > 0 && (
                                <div className="text-primary-100 flex items-center gap-1 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>{course.enrollments_count} học viên</span>
                                </div>
                            )}
                        </div>
                        <ShareButton />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="space-y-8 p-6 sm:p-8">
                    {/* Teacher Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <User className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Giáo viên giảng dạy</h3>
                        </div>
                        <Link
                            href={`/teachers/${course.teacher.id}`}
                            className="group hover:border-primary/20 flex items-center gap-4 rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md"
                        >
                            <Image
                                width={80}
                                height={80}
                                src={course.teacher.avatar}
                                alt={course.teacher.full_name}
                                className="group-hover:border-primary/20 h-16 w-16 rounded-full border-2 border-gray-100 object-cover"
                            />
                            <div>
                                <div className="group-hover:text-primary font-semibold text-gray-900 transition-colors">
                                    {course.teacher.full_name}
                                </div>
                                <div className="text-sm text-gray-600">{course.teacher.bio}</div>
                            </div>
                        </Link>
                    </div>

                    {/* Benefits Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Award className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Bạn sẽ nhận được</h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Nắm vững kiến thức trọng tâm của môn học",
                                "Phát triển kỹ năng giải nhanh các dạng bài tập",
                                "Tự tin tham gia các kỳ thi quan trọng",
                                "Nhận chứng chỉ hoàn thành khóa học",
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                                    <span className="text-sm text-gray-700">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Star className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Nội dung nổi bật</h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Sự điện li và ứng dụng trong thực tiễn",
                                "Este - Lipit: Cấu tạo, tính chất, bài tập vận dụng",
                                "Cacbonhidrat: Phân loại, phản ứng hóa học",
                                "Cân bằng hóa học và các dạng bài tập nâng cao",
                            ].map((highlight, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"></div>
                                    <span className="text-sm text-gray-700">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <BookOpen className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Mô tả khóa học</h3>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                                - Bao phủ đầy đủ các chuyên đề Hóa 11 trọng tâm như: Sự điện li, Este - Lipit,
                                Cacbonhidrat, Cân bằng hóa học,...
                                <br />
                                - Bài giảng dễ hiểu, kết hợp sơ đồ tư duy và hình ảnh trực quan.
                                <br />- Có bài kiểm tra định kỳ giúp học sinh đánh giá tiến độ.
                            </p>
                        </div>
                    </div>

                    {/* Target Audience Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Target className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Đối tượng phù hợp</h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "Học sinh lớp 11 muốn học sớm, học chắc",
                                "Học sinh mất gốc cần học lại từ đầu",
                                "Học sinh muốn thi vào khối B, D",
                            ].map((target, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <GraduationCap className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{target}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <CheckCircle className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Yêu cầu trước khi học</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                "Kiến thức cơ bản môn Hóa học lớp 10",
                                "Có thiết bị (máy tính/điện thoại) có kết nối Internet",
                            ].map((requirement, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400"></div>
                                    <span className="text-sm text-gray-700">{requirement}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Learning Format Section */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Monitor className="text-primary h-5 w-5" />
                            <h3 className="text-lg font-semibold text-gray-900">Hình thức học</h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                "100% học online, chủ động thời gian",
                                "Có thể xem lại bài giảng bất cứ lúc nào",
                                "Hỗ trợ hỏi đáp trực tuyến với giảng viên",
                                "Tài liệu PDF tải về miễn phí",
                            ].map((format, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400"></div>
                                    <span className="text-sm text-gray-700">{format}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentLesson;

import React from "react";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { CourseGetDetailResponse } from "~/schemaValidate/course.schema";
import { ShareButton } from "~/app/(student)/_components/Shared/ShareButton";

const ContentLesson = ({ course }: { course: CourseGetDetailResponse["data"] }) => {
    return (
        <div className="mb-4 overflow-hidden shadow-sm lg:rounded-xl">
            <div className="bg-[linear-gradient(90deg,rgba(48,48,48,1)_0%,rgba(56,181,207,1)_52%,rgba(89,89,89,1)_100%)] p-4 text-white sm:p-8">
                {/* Tiêu đề */}
                <h1 className="text-xl font-bold uppercase sm:text-3xl">{course.name}</h1>

                {/* Giới thiệu ngắn */}
                <p className="mt-2 text-xs text-white sm:text-sm">{course.description}</p>

                {/* Đánh giá + học viên */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-1 items-end gap-1 text-xs sm:text-sm">
                        <span className="font-bold text-[#FFB23F]">{4}</span>
                        <Rating style={{ maxWidth: 120 }} value={4} readOnly />
                        <span>20 xếp hạng</span>
                        {course.enrollments_count > 0 && (
                            <span className="ml-2 font-bold">{course.enrollments_count} học viên đã tham gia</span>
                        )}
                    </div>
                    <ShareButton />
                </div>
            </div>
            <div className="space-y-6 bg-white p-4 sm:p-8">
                {/* Thông tin giảng viên */}
                <div>
                    <h3 className="mb-4 text-base font-semibold text-gray-800 sm:text-lg">Giáo viên giảng dạy</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link href={`/teachers/${course.teacher.id}`} className="flex items-center gap-3 sm:gap-4">
                            <Image
                                width={60}
                                height={60}
                                src={course.teacher.avatar}
                                alt={course.teacher.full_name}
                                className="h-12 w-12 rounded-full border object-cover sm:h-20 sm:w-20"
                            />
                            <div>
                                <div className="text-sm font-semibold text-gray-800 sm:text-base">
                                    {course.teacher.full_name}
                                </div>
                                <div className="text-xs text-gray-500 sm:text-sm">{course.teacher.bio}</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Lợi ích sau khóa học */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Bạn sẽ nhận được</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                        <li>Nắm vững kiến thức trọng tâm của môn học.</li>
                        <li>Phát triển kỹ năng giải nhanh các dạng bài tập.</li>
                        <li>Tự tin tham gia các kỳ thi quan trọng.</li>
                        <li>Nhận chứng chỉ hoàn thành khóa học.</li>
                    </ul>
                </div>

                {/* Nội dung nổi bật */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Nội dung nổi bật</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                        <li>Sự điện li và ứng dụng trong thực tiễn.</li>
                        <li>Este - Lipit: Cấu tạo, tính chất, bài tập vận dụng.</li>
                        <li>Cacbonhidrat: Phân loại, phản ứng hóa học.</li>
                        <li>Cân bằng hóa học và các dạng bài tập nâng cao.</li>
                    </ul>
                </div>

                {/* Mô tả chi tiết */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Mô tả khóa học</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                        - Bao phủ đầy đủ các chuyên đề Hóa 11 trọng tâm như: Sự điện li, Este - Lipit, Cacbonhidrat, Cân
                        bằng hóa học,...
                        <br />
                        - Bài giảng dễ hiểu, kết hợp sơ đồ tư duy và hình ảnh trực quan.
                        <br />- Có bài kiểm tra định kỳ giúp học sinh đánh giá tiến độ.
                    </p>
                </div>

                {/* Đối tượng phù hợp */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Đối tượng phù hợp</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                        <li>Học sinh lớp 11 muốn học sớm, học chắc.</li>
                        <li>Học sinh mất gốc cần học lại từ đầu.</li>
                        <li>Học sinh muốn thi vào khối B, D.</li>
                    </ul>
                </div>

                {/* Yêu cầu trước khi học */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Yêu cầu trước khi học</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                        <li>Kiến thức cơ bản môn Hóa học lớp 10.</li>
                        <li>Có thiết bị (máy tính/điện thoại) có kết nối Internet.</li>
                    </ul>
                </div>

                {/* Hình thức học */}
                <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Hình thức học</h3>
                    <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 sm:text-sm">
                        <li>100% học online, chủ động thời gian.</li>
                        <li>Có thể xem lại bài giảng bất cứ lúc nào.</li>
                        <li>Hỗ trợ hỏi đáp trực tuyến với giảng viên.</li>
                        <li>Tài liệu PDF tải về miễn phí.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContentLesson;

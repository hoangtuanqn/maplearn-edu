import Image from "next/image";
import React, { cache } from "react";
import SocialLink from "../../../_components/SidebarLeft/SocialLink";
import teacherApi from "~/apiRequest/teachers";
import { redirect } from "next/navigation";
import DisplayCourse from "../../../_components/Courses/DisplayCourse";
import { getFullName } from "~/libs/hepler";
import DisplayNoData from "~/app/(student)/_components/Courses/DisplayNoData";
const getTeacher = cache(async (id: number) => {
    const teacher = await teacherApi.getDetailTeacher(id);
    return teacher;
});
const DetailTeacherPage = async ({ params }: { params: Promise<{ id: number }> }) => {
    let teacher;
    try {
        const { id } = await params;
        teacher = await getTeacher(id);
    } catch (error) {
        console.error("Error fetching teacher details:", error);
        redirect("/teachers");
    }
    return (
        <section className="flex min-h-screen gap-5 max-lg:flex-col">
            <div className="flex-5/12 shrink rounded-xl bg-white p-4 shadow-sm">
                <div className="flex gap-5">
                    <Image
                        src={teacher.avatar ?? ""}
                        alt={teacher.full_name}
                        width={126}
                        height={126}
                        className="rounded-lg"
                    />
                    <div>
                        <h1 className="text-primary text-base font-bold">
                            {getFullName(teacher.gender, teacher.full_name)}
                        </h1>
                        <p>Giáo viên THPT</p>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="mt-8">
                        <h2 className="mb-4 text-sm font-semibold">Thông tin thầy Vũ Ngọc Anh</h2>
                        <ul className="list-inside list-disc space-y-3 px-5 text-sm leading-relaxed text-gray-700">
                            <li>
                                <span className="font-medium text-gray-900">Thủ khoa đầu vào</span> viện Vật lý - Đại
                                học Bách Khoa Hà Nội
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">8 năm kinh nghiệm</span> giảng dạy môn Vật
                                Lý ôn thi Đại Có 19 điểm 10 Lý trong kỳ thi THPTQG 2022, 1 học sinh Thủ khoa khối A01
                                toàn quốc
                            </li>
                            <li>
                                Có <span className="font-medium text-gray-900">11 điểm 10 Lý</span> trong kỳ thi THPTQG
                                2023, 2 học sinh Thủ khoa khối A00 toàn quốc; 2 học sinh Á khoa khối A00 toàn quốc; 8
                                học sinh Thủ khoa tỉnh/ thành phố; 69 học sinh Thủ khoa trường
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">18 học sinh đạt điểm 10 vật lý</span> (trên
                                tổng số 55 điểm 10 toàn quốc), 100 học sinh đạt 9.75 điểm, 291 học sinh đạt 9.5 điểm và
                                1740 học sinh đạt điểm 9+.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h2 className="mb-4 text-sm font-semibold">Phong cách giảng dạy</h2>
                        <ul className="list-inside list-disc space-y-3 px-5 text-sm leading-relaxed text-gray-700">
                            <li>
                                Cách dạy mới mẻ, không máy móc, đem những công thức Vật Lý nhàm chẵn khó hiểu thành
                                những hiện tượng đời sống lý thú, tạo niềm đam mê cho các học sinh.
                            </li>
                            <li>
                                Đi sâu vào bản chất, khai thác tối đa những bài toán đồ thị, tập trung vào các bài toán
                                mức độ Vận Dụng - Vận Dụng Cao
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h2 className="mb-2 text-sm font-semibold">Liên kết mạng xã hội</h2>
                        <SocialLink
                            title={getFullName(teacher.gender, teacher.full_name)}
                            url={teacher.facebook_link ?? ""}
                            image="/assets/images/social/facebook-circle.png"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-7/12 shrink-0 rounded-xl bg-white p-4 shadow-sm">
                <h2 className="text-primary mb-4 text-base font-semibold">Tất cả khoá học</h2>
                {teacher.courses.length == 0 ? (
                    <DisplayNoData title="Chưa có khoá học nào" />
                ) : (
                    <div className="grid grid-cols-4 gap-3.5 max-lg:grid-cols-2">
                        {teacher.courses.map((course) => (
                            <DisplayCourse key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DetailTeacherPage;

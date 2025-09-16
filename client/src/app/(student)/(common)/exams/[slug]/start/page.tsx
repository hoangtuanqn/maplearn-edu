import {
    BadgeCheck,
    BarChart3,
    BookOpen,
    Clock,
    FileQuestion,
    OctagonMinus,
    PenTool,
    Play,
    ShieldCheck,
    Users,
} from "lucide-react";

import React, { cache } from "react";
import StartExam from "./_components/StartExam";
import { Metadata } from "next";
import examApiServer from "~/apiRequest/server/exam";
import { redirect } from "next/navigation";
import { formatter } from "~/libs/format";
import { difficulties } from "~/apiRequest/exam";
const getExam = cache(async (slug: string) => {
    const {
        data: { data: post },
    } = await examApiServer.getExamDetail(slug);
    return post;
});

// ✅ Tạo metadata động từ dữ liệu bài viết
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const exam = await getExam(slug);
    return {
        title: exam.title,
        description: exam.title || "Chi tiết bài thi",
    };
}

const DetailExamPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    let exam;
    try {
        exam = await getExam(slug); // Dùng lại, không gọi API thêm
    } catch (error) {
        console.error("Error fetching exam details:", error);
        redirect("/exams");
    }

    const isMaxAttempt: boolean = exam.max_attempts ? exam.attempt_count >= exam.max_attempts : false;
    if (exam.is_in_progress || isMaxAttempt) {
        return redirect(`/exams/${slug}`);
    }

    return (
        <>
            <section className="mt-10 flex min-h-screen gap-4 px-4 pb-10">
                <section className="flex-1">
                    <section className="space-y-6 rounded-lg bg-white px-6 py-8 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-primary text-2xl font-bold">{exam.title}</h1>
                                <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <PenTool className="text-primary size-4" />
                                        <span>Tổng số câu: </span>
                                        <span className="font-medium">{exam.question_count ?? 40}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Clock className="text-primary size-4" />
                                        <span>Thời lượng: </span>
                                        <span className="font-medium">{exam.duration_minutes ?? 60} phút</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Play className="text-primary size-4" />
                                        <span>Bắt đầu: </span>
                                        <span className="font-medium">{formatter.date(exam.start_time)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <OctagonMinus className="text-primary size-4" />
                                        <span>Kết thúc: </span>
                                        <span className="font-medium">
                                            {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700 ring-1 ring-green-200">
                                <ShieldCheck className="mr-1 inline size-4" />
                                Bài thi tiêu chuẩn - Chống gian lận cơ bản
                            </div>
                        </div>

                        {/* Overview cards (static demo) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-lg border bg-white p-4">
                                <div className="mb-2 flex items-center gap-2 text-gray-500">
                                    <BarChart3 className="text-primary size-4" />
                                    <span className="text-sm">Độ khó</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    {" "}
                                    {difficulties.find((difficulty) => difficulty.slug === exam.difficulty)?.name}
                                </div>
                                <div className="text-xs text-gray-500">Phù hợp ôn luyện và kiểm tra</div>
                            </div>
                            <div className="rounded-lg border bg-white p-4">
                                <div className="mb-2 flex items-center gap-2 text-gray-500">
                                    <Users className="text-primary size-4" />
                                    <span className="text-sm">Lượt làm tối đa</span>
                                </div>
                                <div className="text-lg font-semibold">{exam.max_attempts ?? "Không giới hạn"}</div>
                                <div className="text-xs text-gray-500">Tính điểm theo lượt đầu tiên</div>
                            </div>
                            <div className="rounded-lg border bg-white p-4">
                                <div className="mb-2 flex items-center gap-2 text-gray-500">
                                    <FileQuestion className="text-primary size-4" />
                                    <span className="text-sm">Trộn câu hỏi/đáp án</span>
                                </div>
                                <div className="text-lg font-semibold">Có</div>
                                <div className="text-xs text-gray-500">Giảm gian lận, tăng công bằng</div>
                            </div>
                            <div className="rounded-lg border bg-white p-4">
                                <div className="mb-2 flex items-center gap-2 text-gray-500">
                                    <BookOpen className="text-primary size-4" />
                                    <span className="text-sm">Điểm đạt</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    ≥ {exam.pass_score} / {exam.max_score}
                                </div>
                                <div className="text-xs text-gray-500">Tự động đánh giá sau khi nộp</div>
                            </div>
                        </div>

                        {/* Primary actions + terms */}

                        <StartExam slug={slug} />

                        <div className="mb-2.5 w-full rounded-lg bg-sky-300/20 p-6 text-justify shadow-sm">
                            <div className="mb-2 flex items-center gap-2 text-base font-bold text-blue-600">
                                <BadgeCheck className="size-5" />
                                Hướng dẫn làm bài
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>
                                    * Bài thi TSA gồm năm dạng câu hỏi trắc nghiệm, thí sinh sử dụng chuột, bàn phím để
                                    trả lời các câu hỏi khác nhau.
                                </div>
                                <div>
                                    * Đối với ba dạng câu hỏi: <b>câu hỏi chọn một trong nhiều đáp án</b>,{" "}
                                    <b>câu hỏi dạng nhiều đáp án đúng</b> , <b>câu hỏi đúng sai</b> thí sinh dùng chuột
                                    để chọn đáp án đúng.
                                </div>
                                <div>
                                    * Đối với dạng câu hỏi kéo thả thí sinh dùng chuột để chọn và đưa đáp án vào ô trả
                                    lời
                                </div>
                                <div>
                                    * Đối với các câu hỏi điền đáp án, thí sinh nhập đáp án vào ô trống dạng số thập
                                    phân, nguyên dương, nguyên âm, cụm từ (Ví dụ: -1, 1, 1,2, -1,2) và{" "}
                                    <strong>không nhập đơn vị vào đáp án</strong>.
                                    <div className="pl-4">
                                        • Ví dụ số âm: <strong className="text-sm text-red-600">-1; -1,23</strong>
                                    </div>
                                    <div className="pl-4">
                                        • Ví dụ số thập phân:{" "}
                                        <strong className="text-sm text-red-600">1,2; -1,234</strong>
                                    </div>
                                </div>
                                <div>
                                    * Đối với các câu hỏi có nhiều ý, ví dụ như những câu hỏi có nhiều đáp án đúng, thí
                                    sinh phải trả lời <strong>đúng tất cả các ý thì mới được tính điểm</strong> cho câu
                                    hỏi đó. Hãy thận trọng trước khi lựa chọn đáp án của mình.
                                </div>
                            </div>
                            <div className="mt-2 mb-2 text-base font-bold text-blue-500 not-italic">
                                Tiến trình làm bài thi trên máy tính:
                            </div>
                            <div>
                                Khi <strong>BẮT ĐẦU</strong> làm bài, màn hình máy tính sẽ hiển thị phần thi thứ nhất:
                            </div>
                            <div className="mt-3 italic">
                                <strong>Phần 1: </strong>Tư duy toán học (40 câu hỏi - 60 phút)
                            </div>
                            <div>
                                Thí sinh làm lần lượt các câu hỏi. Nếu bạn kết thúc phần 1 trước thời gian quy định. Bạn
                                có thể nhấn nộp bài chuyển sang phần thi thứ hai. Khi hết thời gian phần 1, máy tính sẽ
                                tự động chuyển sang phần thi thứ hai.
                            </div>
                            <div className="mt-3 italic">
                                <strong>Phần 2: </strong>Tư duy đọc hiểu (20 câu hỏi - 1 phút)
                            </div>
                            <div>
                                Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 2 trước thời gian
                                quy định, bạn có thể nhấn nộp bài chuyển sang phần thi thứ ba. Khi hết thời gian quy
                                định, máy tính sẽ tự động chuyển sang phần thi thứ ba.
                            </div>
                            <div className="mt-3 italic">
                                <strong>Phần 3: </strong>Khoa học/ giải quyết vấn đề (40 câu hỏi - 5 phút)
                            </div>
                            <div>
                                Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 3 trước thời gian
                                quy định, bạn có thể bấm NỘP BÀI để hoàn thành bài thi sớm. Khi hết thời gian theo quy
                                định, máy tính sẽ tự động NỘP BÀI.
                            </div>
                            <div>
                                Khi <span className="font-black text-red-500">KẾT THÚC</span> bài thi, màn hình máy tính
                                sẽ hiển thị kết quả thi của bạn.
                            </div>
                        </div>
                        <div className="mb-2.5 w-full rounded-lg p-4 text-justify text-sm text-red-500 italic">
                            <strong className="block pb-2 text-base">Lưu ý làm bài thi:</strong>
                            <div>* Chỉ phiên làm bài đầu tiên mới được tính xếp hạng.</div>
                            <div>
                                * Một bài thi được coi là hợp lệ để tính xếp hạng khi không có gian lận (Không làm bài
                                cùng 1 lúc trên nhiều trình duyệt, không di chuyển sang các tab khác nhiều lần khi đang
                                làm bài ...).
                            </div>
                            <div>
                                * Khi đang trong 1 phiên làm bài thi được tính xếp hạng và bị out ra, hãy vào lại đề thi
                                và chọn tiếp tục làm bài, chọn <b>Làm lại từ đầu</b> sẽ huỷ kết quả và không được tính
                                xếp hạng.
                            </div>
                            <div>* Hệ thống có thể yêu cầu bật âm thanh và camera trong một số kỳ thi đặc biệt.</div>
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
};

export default DetailExamPage;

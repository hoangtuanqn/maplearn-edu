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
    AlertTriangle,
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
        <div className="min-h-screen">
            <div className="mx-auto px-4 py-6">
                {/* Header Card */}
                <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Bài thi tiêu chuẩn - Chống gian lận cơ bản</span>
                        </div>
                    </div>

                    {/* Exam Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <PenTool className="text-primary h-4 w-4" />
                            <div>
                                <span className="text-sm text-gray-600">Tổng số câu</span>
                                <p className="font-semibold text-gray-900">{exam.question_count ?? 40}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <Clock className="text-primary h-4 w-4" />
                            <div>
                                <span className="text-sm text-gray-600">Thời lượng</span>
                                <p className="font-semibold text-gray-900">{exam.duration_minutes ?? 60} phút</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <Play className="text-primary h-4 w-4" />
                            <div>
                                <span className="text-sm text-gray-600">Bắt đầu</span>
                                <p className="font-semibold text-gray-900">{formatter.date(exam.start_time)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                            <OctagonMinus className="text-primary h-4 w-4" />
                            <div>
                                <span className="text-sm text-gray-600">Kết thúc</span>
                                <p className="font-semibold text-gray-900">
                                    {exam.end_time ? formatter.date(exam.end_time) : "Không giới hạn"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exam Details Cards */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2 text-gray-600">
                            <BarChart3 className="text-primary h-4 w-4" />
                            <span className="text-sm">Độ khó</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                            {difficulties.find((difficulty) => difficulty.slug === exam.difficulty)?.name}
                        </div>
                        <div className="text-xs text-gray-500">Phù hợp ôn luyện và kiểm tra</div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2 text-gray-600">
                            <Users className="text-primary h-4 w-4" />
                            <span className="text-sm">Lượt làm tối đa</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                            {exam.max_attempts ?? "Không giới hạn"}
                        </div>
                        <div className="text-xs text-gray-500">Tính điểm theo lượt đầu tiên</div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2 text-gray-600">
                            <FileQuestion className="text-primary h-4 w-4" />
                            <span className="text-sm">Trộn câu hỏi/đáp án</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">Có</div>
                        <div className="text-xs text-gray-500">Giảm gian lận, tăng công bằng</div>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center gap-2 text-gray-600">
                            <BookOpen className="text-primary h-4 w-4" />
                            <span className="text-sm">Điểm đạt</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                            ≥ {exam.pass_score} / {exam.max_score}
                        </div>
                        <div className="text-xs text-gray-500">Tự động đánh giá sau khi nộp</div>
                    </div>
                </div>

                {/* Start Exam Section */}
                <div className="mb-6">
                    <StartExam slug={slug} />
                </div>

                {/* Instructions Card */}
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-blue-700">
                        <BadgeCheck className="h-5 w-5" />
                        <h2 className="text-lg font-bold">Hướng dẫn làm bài</h2>
                    </div>

                    <div className="space-y-3 text-sm text-blue-900">
                        <p>
                            • Bài thi TSA gồm năm dạng câu hỏi trắc nghiệm, thí sinh sử dụng chuột, bàn phím để trả lời
                            các câu hỏi khác nhau.
                        </p>
                        <p>
                            • Đối với ba dạng câu hỏi: <strong>câu hỏi chọn một trong nhiều đáp án</strong>,{" "}
                            <strong>câu hỏi dạng nhiều đáp án đúng</strong>, <strong>câu hỏi đúng sai</strong> thí sinh
                            dùng chuột để chọn đáp án đúng.
                        </p>
                        <p>• Đối với dạng câu hỏi kéo thả thí sinh dùng chuột để chọn và đưa đáp án vào ô trả lời</p>
                        <p>
                            • Đối với các câu hỏi điền đáp án, thí sinh nhập đáp án vào ô trống dạng số thập phân,
                            nguyên dương, nguyên âm, cụm từ (Ví dụ: -1, 1, 1,2, -1,2) và{" "}
                            <strong>không nhập đơn vị vào đáp án</strong>.
                        </p>
                        <div className="ml-4 space-y-1">
                            <p>
                                • Ví dụ số âm: <strong className="text-red-600">-1; -1,23</strong>
                            </p>
                            <p>
                                • Ví dụ số thập phân: <strong className="text-red-600">1,2; -1,234</strong>
                            </p>
                        </div>
                        <p>
                            • Đối với các câu hỏi có nhiều ý, ví dụ như những câu hỏi có nhiều đáp án đúng, thí sinh
                            phải trả lời <strong>đúng tất cả các ý thì mới được tính điểm</strong> cho câu hỏi đó. Hãy
                            thận trọng trước khi lựa chọn đáp án của mình.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="mb-3 font-bold text-blue-700">Tiến trình làm bài thi trên máy tính:</h3>
                        <div className="space-y-3 text-sm text-blue-900">
                            <p>
                                Khi <strong>BẮT ĐẦU</strong> làm bài, màn hình máy tính sẽ hiển thị phần thi thứ nhất:
                            </p>

                            <div className="space-y-2">
                                <p className="font-semibold text-blue-800">
                                    Phần 1: Tư duy toán học (40 câu hỏi - 60 phút)
                                </p>
                                <p>
                                    Thí sinh làm lần lượt các câu hỏi. Nếu bạn kết thúc phần 1 trước thời gian quy định.
                                    Bạn có thể nhấn nộp bài chuyển sang phần thi thứ hai. Khi hết thời gian phần 1, máy
                                    tính sẽ tự động chuyển sang phần thi thứ hai.
                                </p>

                                <p className="font-semibold text-blue-800">
                                    Phần 2: Tư duy đọc hiểu (20 câu hỏi - 1 phút)
                                </p>
                                <p>
                                    Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 2 trước thời
                                    gian quy định, bạn có thể nhấn nộp bài chuyển sang phần thi thứ ba. Khi hết thời
                                    gian quy định, máy tính sẽ tự động chuyển sang phần thi thứ ba.
                                </p>

                                <p className="font-semibold text-blue-800">
                                    Phần 3: Khoa học/ giải quyết vấn đề (40 câu hỏi - 5 phút)
                                </p>
                                <p>
                                    Các câu hỏi sẽ được chia theo từng nhóm chủ đề. Nếu bạn kết thúc phần 3 trước thời
                                    gian quy định, bạn có thể bấm NỘP BÀI để hoàn thành bài thi sớm. Khi hết thời gian
                                    theo quy định, máy tính sẽ tự động NỘP BÀI.
                                </p>
                            </div>

                            <p>
                                Khi <span className="font-bold text-red-600">KẾT THÚC</span> bài thi, màn hình máy tính
                                sẽ hiển thị kết quả thi của bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Important Notes Card */}
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-red-700">
                        <AlertTriangle className="h-5 w-5" />
                        <h2 className="text-lg font-bold">Lưu ý làm bài thi</h2>
                    </div>

                    <div className="space-y-2 text-sm text-red-900">
                        <p>• Chỉ phiên làm bài đầu tiên mới được tính xếp hạng.</p>
                        <p>
                            • Một bài thi được coi là hợp lệ để tính xếp hạng khi không có gian lận (Không làm bài cùng
                            1 lúc trên nhiều trình duyệt, không di chuyển sang các tab khác nhiều lần khi đang làm bài
                            ...).
                        </p>
                        <p>
                            • Khi đang trong 1 phiên làm bài thi được tính xếp hạng và bị out ra, hãy vào lại đề thi và
                            chọn tiếp tục làm bài, chọn <strong>Làm lại từ đầu</strong> sẽ huỷ kết quả và không được
                            tính xếp hạng.
                        </p>
                        <p>• Hệ thống có thể yêu cầu bật âm thanh và camera trong một số kỳ thi đặc biệt.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailExamPage;

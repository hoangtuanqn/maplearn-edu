import clsx from "clsx";
import { ChevronFirst, ChevronLast, Clock, User, Send, BarChart3 } from "lucide-react";
import React from "react";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { formatter } from "~/libs/format";
import { Question } from "~/schemaValidate/exam.schema";

const Sidebar = ({
    payload: { questionActive, setQuestionActive, questions, countdownSubmit, timeLeft, answers, handleSubmitExam },
}: {
    payload: {
        handleSubmitExam: () => void;
        questionActive: number;
        setQuestionActive: React.Dispatch<React.SetStateAction<number>>;
        questions: Question[];
        countdownSubmit: number;
        timeLeft: number;
        answers: Record<number, string[]>;
    };
}) => {
    // countdownSubmit = 0;
    const { user } = useAuth();
    const progress = (Object.keys(answers).length / questions.length) * 100;
    // Số câu còn lại
    const remainingQuestions = questions.length - Object.keys(answers).length;
    return (
        <div className="xl:w-96">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Mobile Navigation */}
                <div className="mb-6 xl:hidden">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <Button
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-white"
                            onClick={() => setQuestionActive((prev) => Math.max(prev - 1, 0))}
                            disabled={questionActive === 0}
                        >
                            <ChevronFirst className="h-4 w-4" />
                            <span>Trước</span>
                        </Button>
                        <span className="text-sm font-medium text-gray-600">
                            {questionActive + 1} / {questions.length}
                        </span>
                        <Button
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-white"
                            disabled={questionActive === questions.length - 1}
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1))}
                        >
                            <span>Sau</span>
                            <ChevronLast className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tiến độ hoàn thành</span>
                            <span className="font-semibold text-gray-900">
                                {Object.keys(answers).length}/{questions.length} câu
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div
                                    className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs font-medium text-gray-600">{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>

                {/* Student Info */}
                <div className="mb-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin thí sinh</h3>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                            <div className="flex items-center gap-2">
                                <User className="text-primary h-4 w-4" />
                                <span className="text-sm font-medium text-gray-600">Thí sinh</span>
                            </div>
                            <span className="text-primary font-semibold">{user?.full_name}</span>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-medium text-gray-600">Thời gian còn lại</span>
                                </div>
                                <span className="text-lg font-bold text-red-600">
                                    {formatter.parseMinutesSeconds(timeLeft)}
                                </span>
                            </div>

                            <ConfirmDialog
                                action={() => handleSubmitExam()}
                                message={`Bạn có chắc chắn muốn nộp bài không? Bạn vẫn còn ${formatter.parseMinutesSeconds(timeLeft)} phút ${remainingQuestions > 0 ? `và ${remainingQuestions} câu chưa làm` : ""}.`}
                            >
                                <Button
                                    className="w-full bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
                                    disabled={countdownSubmit > 0}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    Nộp bài
                                    {countdownSubmit > 0 && (
                                        <span className="ml-2">({formatter.parseMinutesSeconds(countdownSubmit)})</span>
                                    )}
                                </Button>
                            </ConfirmDialog>
                        </div>
                    </div>
                </div>

                {/* Progress Statistics */}
                <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2">
                        <BarChart3 className="text-primary h-4 w-4" />
                        <h3 className="text-lg font-semibold text-gray-900">Thống kê</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-emerald-50 p-3 text-center">
                            <div className="text-lg font-bold text-emerald-600">{Object.keys(answers).length}</div>
                            <div className="text-xs text-emerald-700">Đã làm</div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-3 text-center">
                            <div className="text-lg font-bold text-gray-600">{remainingQuestions}</div>
                            <div className="text-xs text-gray-700">Còn lại</div>
                        </div>
                    </div>
                </div>

                {/* Color Legend */}
                <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">Chỉ thị màu sắc</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-gray-300" />
                            <span className="text-xs text-gray-600">Chưa chọn đáp án</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-primary border-primary h-4 w-4 rounded-full border-2" />
                            <span className="text-xs text-gray-600">Đang làm câu này</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full border-2 border-emerald-600 bg-emerald-500" />
                            <span className="text-xs text-gray-600">Đã chọn đáp án</span>
                        </div>
                    </div>
                </div>

                {/* Question Grid */}
                <div>
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">Danh sách câu hỏi</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setQuestionActive(index)}
                                className={clsx(
                                    "flex cursor-pointer items-center justify-center rounded-lg py-3 text-sm font-semibold transition-all hover:scale-105",
                                    {
                                        "bg-primary text-white shadow-lg": index === questionActive,
                                        "bg-emerald-500 text-white": index !== questionActive && !!answers[q.id],
                                        "bg-gray-200 text-gray-700 hover:bg-gray-300":
                                            index !== questionActive && !answers[q.id],
                                    },
                                )}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

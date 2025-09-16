import clsx from "clsx";
import { ChevronFirst, ChevronLast } from "lucide-react";
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
        <div className="relative z-5 h-full rounded-xl bg-white px-5 pt-8 pb-10 shadow-xs xl:w-96">
            <div className="mb-5 flex h-auto flex-col items-center gap-4 md:h-20 md:gap-0 xl:hidden">
                <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            className="bg-primary cursor-pointer rounded-lg p-2 text-white shadow-xs md:py-6"
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1))}
                            disabled={questionActive === 0}
                        >
                            <ChevronFirst className="size-4" />
                        </Button>
                        <Button
                            className="t1-flex-center bg-primary cursor-pointer gap-2 rounded-lg p-2 text-white shadow-xs md:py-6"
                            disabled={questionActive === questions.length - 1}
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1))}
                        >
                            <ChevronLast className="size-4" />
                        </Button>
                    </div>
                </div>
                <div className="w-full">
                    <div className="mb-1 flex justify-between">
                        <span>Bạn đã hoàn thành</span>{" "}
                        <span>
                            <span className="mr-1 ml-auto font-bold">
                                {Object.keys(answers).length}/{questions.length}
                            </span>
                            <span>câu</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="text-base font-medium">Thông tin thí sinh</div>
                <div className="flex justify-between">
                    <span>Thí sinh</span>
                    <span className="text-primary font-bold">{user?.full_name}</span>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-slate-400 p-2">
                    <div className="flex-1">Thời gian còn lại:</div>
                    <div className="text-base font-bold">{formatter.parseMinutesSeconds(timeLeft)}</div>
                    <ConfirmDialog
                        action={() => handleSubmitExam()}
                        message={`Bạn có chắc chắn muốn nộp bài không? Bạn vẫn còn ${formatter.parseMinutesSeconds(timeLeft)} phút ${remainingQuestions > 0 ? `và ${remainingQuestions} câu chưa làm` : ""}.`}
                    >
                        <Button
                            className="view_tooltip bg-red-500 text-white hover:bg-red-500/90"
                            disabled={countdownSubmit > 0}
                            data-tooltip-content={"Bạn chỉ có thể nộp bài sau khi làm tối thiểu 5 phút!"}
                        >
                            Nộp bài
                            {countdownSubmit > 0 && <span>({formatter.parseMinutesSeconds(countdownSubmit)})</span>}
                        </Button>
                    </ConfirmDialog>
                </div>

                {/* Chỉ thị màu */}
                <div className="my-4">
                    <div className="mb-2 font-bold">Chỉ thị màu sắc</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="size-6 rounded-full bg-slate-300" />
                            <span className="text-sm">Chưa chọn đáp án</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="border-primary bg-primary size-6 rounded-full border" />
                            <span className="text-sm">Đang làm câu này</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-6 rounded-full border border-green-600 bg-green-500" />
                            <span className="text-sm">Đã chọn đáp án</span>
                        </div>
                    </div>
                </div>

                {/* Danh sách câu hỏi */}
                <div className="flex flex-wrap gap-3">
                    {questions.map((q, index) => (
                        <button
                            key={q.id}
                            onClick={() => setQuestionActive(index)}
                            className={clsx("t1-flex-center size-9 cursor-pointer rounded-full", {
                                "bg-primary font-bold text-white": index === questionActive,
                                "bg-green-500 font-bold text-white": !!answers[q.id],
                                "bg-slate-300 text-black": index !== questionActive && !answers[q.id],
                            })}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

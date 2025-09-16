"use client";
import { Brain } from "lucide-react";
import React, { memo } from "react";
import DragDrop from "~/app/(student)/exams/[slug]/doing/_components/DragDrop";

import { Button } from "~/components/ui/button";
import { QuestionsExamResponse, ResultDetailExamResponse } from "~/schemaValidate/exam.schema";

import RenderLatex from "~/components/RenderLatex";
import TrueFalseAnswer from "~/app/(student)/exams/[slug]/doing/_components/TrueFalseAnswer";
import NumericInput from "~/app/(student)/exams/[slug]/doing/_components/NumericInput";
import MultipleChoice from "~/app/(student)/exams/[slug]/doing/_components/MultipleChoice";
import SingleChoice from "~/app/(student)/exams/[slug]/doing/_components/SingleChoice";

const DetailResult = ({
    exam,
    resultRes,
    payload: { handleSubmit, setTab },
}: {
    exam: QuestionsExamResponse["data"];
    resultRes: ResultDetailExamResponse["data"];
    payload: {
        handleSubmit: (message: string) => void;
        setTab: React.Dispatch<React.SetStateAction<"detail" | "explain">>;
    };
}) => {
    return (
        <div className="rounded-xl bg-white p-6">
            <h1 className="text-primary text-xl font-bold">Đáp án chi tiết {exam.title}</h1>

            <div className="mt-8 flex flex-col gap-8">
                {resultRes.map((result, index) => (
                    <div key={result.id} className="border-b pb-6">
                        <div
                            className={`mb-2 flex items-center gap-3 rounded-sm border px-4 py-1.5 shadow-sm transition-all ${
                                result.your_choice.length === 0
                                    ? "border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100"
                                    : result.is_correct
                                      ? "border-green-400 bg-gradient-to-r from-green-50 to-green-100"
                                      : "border-red-400 bg-gradient-to-r from-red-50 to-red-100"
                            } `}
                        >
                            <span
                                className={`text-base font-bold tracking-wide ${
                                    result.your_choice.length === 0
                                        ? "text-gray-500"
                                        : result.is_correct
                                          ? "text-green-700"
                                          : "text-red-700"
                                } `}
                            >
                                Câu {index + 1}:
                            </span>
                            <div className="ml-4 flex items-center gap-2">
                                <span className="font-medium text-gray-700">Điểm:</span>
                                {result.your_choice.length === 0 ? (
                                    <span className="rounded bg-gray-200 px-2 py-1 text-gray-500 italic">
                                        Chưa làm (0)
                                    </span>
                                ) : result.is_correct ? (
                                    <span className="rounded bg-green-200 px-2 py-1 font-semibold text-green-700 shadow">
                                        Đúng (+0.25đ)
                                    </span>
                                ) : (
                                    <span className="rounded bg-red-200 px-2 py-1 font-semibold text-red-700 shadow">
                                        Sai (0)
                                    </span>
                                )}
                            </div>
                        </div>
                        {result.type === "DRAG_DROP" ? (
                            <DragDrop
                                question={result.content || ""}
                                items={result.options || []}
                                activeAnswers={result.your_choice ?? []}
                                idQuestion={result.id}
                                handleChoiceAnswer={() => {}}
                                disabled={true}
                            />
                        ) : (
                            <>
                                <div className="text-base">
                                    <RenderLatex content={result.content} />
                                </div>
                                <div className="mt-3">
                                    {result.type === "SINGLE_CHOICE" && (
                                        <SingleChoice
                                            // Check nếu là string thì đưa vô array, còn array thì truyền thẳng
                                            activeAnswer={
                                                Array.isArray(result.your_choice)
                                                    ? result.your_choice
                                                    : [result.your_choice]
                                            }
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            answers={result.options}
                                        />
                                    )}
                                    {result.type === "MULTIPLE_CHOICE" && (
                                        <MultipleChoice
                                            activeAnswers={result.your_choice}
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            answers={result.options}
                                        />
                                    )}
                                    {result.type === "NUMERIC_INPUT" && (
                                        <NumericInput
                                            handleChoiceAnswer={() => {}}
                                            idQuestion={result.id}
                                            activeAnswer={result.your_choice}
                                        />
                                    )}
                                    {result.type === "TRUE_FALSE" && (
                                        <TrueFalseAnswer
                                            idQuestion={result.id}
                                            answers={result.options || []}
                                            activeAnswer={result.your_choice}
                                            handleChoiceAnswer={() => {}}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                        <div className="mt-8 text-gray-700 lg:mt-5">
                            <span className="font-semibold">Giải thích từ giáo viên:</span>{" "}
                            <RenderLatex content={result.explanation ?? ""} />
                        </div>
                        <div className="text-primary mt-2 flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                            <div className="flex gap-2">
                                <span className="font-bold">Đáp án đúng:</span>
                                <span className="flex gap-2 font-bold text-green-600">
                                    <RenderLatex content={result.correct_answer?.join(", ")} />
                                </span>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    className="border-primary text-primary hover:bg-primary flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold shadow-sm transition-colors hover:text-white"
                                    onClick={() => {
                                        handleSubmit(
                                            `Câu hỏi: ${result.content}\n` +
                                                `Đáp án chính xác: ${Array.isArray(result.correct_answer) ? result.correct_answer.join(", ") : result.correct_answer}\n` +
                                                `Giải thích từ giáo viên: ${result.explanation}\n` +
                                                `Tôi chưa hiểu lắm, bạn có thể giải thích thêm không?`,
                                        );
                                        setTab("explain");
                                    }}
                                >
                                    <Brain />
                                    Giải thích thêm
                                </Button>
                            </div>
                        </div>
                        {/* <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                className="border-primary text-primary hover:bg-primary flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold shadow-sm transition-colors hover:text-white"
                                onClick={() => {
                                    handleSubmit(
                                        `Câu hỏi: ${result.content}\n` +
                                            `Đáp án chính xác: ${Array.isArray(result.correct) ? result.correct.join(", ") : result.correct}\n` +
                                            `Giải thích từ giáo viên: ${result.explanation}\n` +
                                            `Tôi chưa hiểu lắm, bạn có thể giải thích thêm không?`,
                                    );
                                    setTab("explain");
                                }}
                            >
                                <Brain />
                                Giải thích thêm
                            </Button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(DetailResult);

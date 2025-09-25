"use client";
import { Brain, CheckCircle, XCircle, Clock, Award, BookOpen } from "lucide-react";
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
        <div className="space-y-6">
            {/* Header Section */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Đáp án chi tiết</h1>
                        <p className="text-primary font-bold">{exam.title}</p>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                {resultRes.map((result, index) => (
                    <div
                        key={result.id}
                        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                    >
                        {/* Question Header */}
                        <div
                            className={`border-l-4 px-6 py-4 ${
                                result.your_choice.value.length === 0
                                    ? "border-l-gray-400 bg-gray-50"
                                    : result.is_correct
                                      ? "border-l-green-500 bg-green-50"
                                      : "border-l-red-500 bg-red-50"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                            result.your_choice.value.length === 0
                                                ? "bg-gray-200 text-gray-600"
                                                : result.is_correct
                                                  ? "bg-green-200 text-green-800"
                                                  : "bg-red-200 text-red-800"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div>
                                        <span className="text-base font-semibold text-gray-900">Câu {index + 1}</span>
                                        <div className="mt-1 flex items-center gap-2">
                                            {result.your_choice.value.length === 0 ? (
                                                <>
                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-500">Chưa làm</span>
                                                </>
                                            ) : result.is_correct ? (
                                                <>
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                    <span className="text-sm font-medium text-green-600">Đúng</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                    <span className="text-sm font-medium text-red-600">Sai</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-gray-500" />
                                    {result.your_choice.value.length === 0 ? (
                                        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
                                            0 điểm
                                        </span>
                                    ) : result.is_correct ? (
                                        <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-700">
                                            +0.25 điểm
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-red-200 px-3 py-1 text-sm font-medium text-red-700">
                                            0 điểm
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="p-6">
                            {result.type === "DRAG_DROP" ? (
                                <DragDrop
                                    question={result.content || ""}
                                    items={(result.options || []).map((opt: any, idx: number) => ({
                                        id: opt.id ?? idx,
                                        content: opt.content,
                                        is_correct: opt.is_correct,
                                    }))}
                                    activeAnswers={result.your_choice?.value ?? []}
                                    idQuestion={result.id}
                                    handleChoiceAnswer={() => {}}
                                    disabled={true}
                                />
                            ) : (
                                <>
                                    <div className="mb-4 text-base leading-relaxed text-gray-800">
                                        <RenderLatex content={result.content} />
                                    </div>
                                    <div className="mb-6">
                                        {result.type === "SINGLE_CHOICE" &&
                                            !Array.isArray(result.your_choice?.value) && (
                                                <SingleChoice
                                                    activeAnswer={[result.your_choice?.value]}
                                                    handleChoiceAnswer={() => {}}
                                                    idQuestion={result.id}
                                                    answers={result.options}
                                                />
                                            )}
                                        {result.type === "MULTIPLE_CHOICE" && (
                                            <MultipleChoice
                                                activeAnswers={result.your_choice?.value}
                                                handleChoiceAnswer={() => {}}
                                                idQuestion={result.id}
                                                answers={result.options}
                                            />
                                        )}
                                        {result.type === "NUMERIC_INPUT" && (
                                            <NumericInput
                                                handleChoiceAnswer={() => {}}
                                                idQuestion={result.id}
                                                activeAnswer={result.your_choice?.value}
                                            />
                                        )}
                                        {result.type === "TRUE_FALSE" && (
                                            <TrueFalseAnswer
                                                idQuestion={result.id}
                                                answers={result.options || []}
                                                activeAnswer={result.your_choice?.value}
                                                handleChoiceAnswer={() => {}}
                                            />
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Teacher Explanation */}
                            {result.explanation && (
                                <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="mb-2 font-semibold text-blue-900">
                                                Giải thích từ giáo viên
                                            </h4>
                                            <div className="text-sm leading-relaxed text-blue-800">
                                                <RenderLatex content={result.explanation} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Correct Answer Section */}
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <CheckCircle className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="mb-2 font-semibold text-green-900">Đáp án chính xác</h4>
                                            <div className="font-medium text-green-800">
                                                <RenderLatex content={result.correct_answer?.join(", ")} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <Button
                                            type="button"
                                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 px-4 py-2 text-white transition-colors"
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
                                            <Brain className="h-4 w-4" />
                                            Giải thích thêm
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(DetailResult);

import React, { useEffect } from "react";
import QuestionSkeleton from "./QuestionSkeleton";
import DragDrop from "./DragDrop";
import SingleChoice from "./SingleChoice";
import MultipleChoice from "./MultipleChoice";
import { Question } from "~/schemaValidate/exam.schema";
import Image from "next/image";
import NumericInput from "./NumericInput";
import TrueFalseAnswer from "./TrueFalseAnswer";
import RenderLatex from "~/components/RenderLatex";

const Questions = ({
    payload: { questions, questionActive, answers, handleChoiceAnswer, mounted, setQuestionActive },
}: {
    payload: {
        questions: Question[];
        questionActive: number;
        answers: Record<number, string[]>;
        handleChoiceAnswer: (questionId: number, answer: string, idx?: number) => void;
        mounted: boolean;
        setQuestionActive: React.Dispatch<React.SetStateAction<number>>;
    };
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                // sang câu tiếp
                setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1));
            }
            if (e.key === "ArrowLeft") {
                // quay lại câu trước
                setQuestionActive((prev) => Math.max(prev - 1, 0));
            }
            // Chỉ nhận khi đã chọn đáp án
            if (e.key === "Enter" && answers[questions[questionActive]?.id]) {
                // enter cũng sang câu tiếp
                setQuestionActive((prev) => Math.min(prev + 1, questions.length - 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [questionActive, answers, questions, setQuestionActive]);
    return (
        <section className="flex-1">
            <section className="space-y-4 rounded-lg bg-white px-6 py-8 shadow-xs">
                <h1 className="text-primary text-base font-bold">Câu hỏi:</h1>
                <div className="flex flex-col items-start gap-4 xl:flex-row">
                    <div className="t1-flex-center size-8.5 shrink-0 rounded-full bg-slate-300 font-bold">
                        {questionActive + 1}
                    </div>
                    <div className="flex w-full flex-col">
                        {!questions[questionActive] || !mounted ? (
                            <QuestionSkeleton />
                        ) : (
                            <>
                                {questions[questionActive].type === "DRAG_DROP" ? (
                                    <DragDrop
                                        question={questions[questionActive].content || ""}
                                        items={questions[questionActive].options || []}
                                        activeAnswers={answers[questions[questionActive].id] ?? []}
                                        idQuestion={questions[questionActive].id}
                                        handleChoiceAnswer={handleChoiceAnswer}
                                    />
                                ) : (
                                    <>
                                        <div className="mt-1.5 text-[15.5px]">
                                            <RenderLatex content={questions[questionActive].content || ""} />
                                        </div>
                                        {questions[questionActive].images &&
                                            questions[questionActive].images.map((item) => (
                                                <div className="mt-2" key={item}>
                                                    <Image
                                                        src={item}
                                                        width={250}
                                                        height={210}
                                                        alt={`Question Image ${item}`}
                                                        className="aspect-auto rounded-md"
                                                    />
                                                </div>
                                            ))}
                                        <div className="mt-2">
                                            {questions[questionActive].type === "SINGLE_CHOICE" && (
                                                <SingleChoice
                                                    activeAnswer={answers[questions[questionActive].id] || []}
                                                    handleChoiceAnswer={handleChoiceAnswer}
                                                    idQuestion={questions[questionActive].id}
                                                    answers={questions[questionActive].options || []}
                                                />
                                            )}
                                            {questions[questionActive].type === "MULTIPLE_CHOICE" && (
                                                <MultipleChoice
                                                    activeAnswers={answers[questions[questionActive].id] ?? []}
                                                    handleChoiceAnswer={handleChoiceAnswer}
                                                    idQuestion={questions[questionActive].id}
                                                    answers={questions[questionActive].options || []}
                                                />
                                            )}
                                            {questions[questionActive].type === "NUMERIC_INPUT" && (
                                                <NumericInput
                                                    handleChoiceAnswer={handleChoiceAnswer}
                                                    idQuestion={questions[questionActive].id}
                                                    activeAnswer={answers[questions[questionActive].id] || []}
                                                />
                                            )}
                                            {questions[questionActive].type === "TRUE_FALSE" && (
                                                <TrueFalseAnswer
                                                    idQuestion={questions[questionActive].id}
                                                    answers={questions[questionActive].options || []}
                                                    activeAnswer={answers[questions[questionActive].id] || []}
                                                    handleChoiceAnswer={handleChoiceAnswer}
                                                />
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Questions;

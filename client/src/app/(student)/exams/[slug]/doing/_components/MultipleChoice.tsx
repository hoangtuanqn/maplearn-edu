import React from "react";
import RenderLatex from "~/components/RenderLatex";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Answers } from "~/schemaValidate/exam.schema";
const MultipleChoice = ({
    idQuestion,
    answers,
    activeAnswers,
    handleChoiceAnswer,
}: {
    idQuestion: number;
    answers: Answers[];
    activeAnswers: string[];
    handleChoiceAnswer: (questionId: number, answer: string) => void;
}) => {
    return (
        <div className="space-y-3">
            {answers?.map((answer, index) => {
                const isSelected = activeAnswers?.includes(answer.content);
                const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

                return (
                    <div key={index} className="relative">
                        <div
                            className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all ${
                                isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-center">
                                <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => handleChoiceAnswer(idQuestion, answer.content)}
                                    id={`option-${index}`}
                                    className={`size-5 rounded border-2 ${
                                        isSelected
                                            ? "bg-primary border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                            : "border-gray-300 bg-white"
                                    }`}
                                />
                            </div>

                            <div className="flex-1">
                                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                                    <div className="flex items-start gap-2">
                                        <span
                                            className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-semibold ${
                                                isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {optionLabel}
                                        </span>
                                        <div className="flex-1">
                                            <RenderLatex content={answer.content} />
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MultipleChoice;

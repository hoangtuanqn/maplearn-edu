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
        <div className="space-y-2">
            {answers?.map((answer, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Checkbox
                        checked={activeAnswers?.includes(answer.content)}
                        onCheckedChange={() => handleChoiceAnswer(idQuestion, answer.content)}
                        id={`option-${index}`}
                        className="peer data-[state=checked]:bg-primary data-[state=checked]:text-primary round size-5.5 border-0 bg-slate-300"
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        <RenderLatex content={answer.content} />
                    </Label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoice;

import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Answers } from "~/schemaValidate/exam.schema";
import RenderLatex from "~/components/RenderLatex";

const SingleChoice = ({
    idQuestion,
    answers,
    activeAnswer,
    handleChoiceAnswer,
}: {
    idQuestion: number;
    answers: Answers[];
    activeAnswer: string[] | [];
    handleChoiceAnswer: (questionId: number, answer: string) => void;
}) => {
    return (
        <div className="space-y-3">
            <RadioGroup
                value={activeAnswer[0] || ""} // controlled component
                onValueChange={(value) => handleChoiceAnswer(idQuestion, value)}
            >
                {answers?.map((answer, index) => {
                    const isSelected = activeAnswer[0] === answer.content;
                    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

                    return (
                        <div key={answer.content} className="relative">
                            <div
                                className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all ${
                                    isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                <div className="relative flex items-center justify-center">
                                    <RadioGroupItem
                                        value={answer.content}
                                        id={answer.content}
                                        className={`size-5 rounded-full border-2 ${
                                            isSelected ? "bg-primary border-primary" : "border-gray-300 bg-white"
                                        }`}
                                        onKeyDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onPointerDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onFocus={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    />
                                    {isSelected && (
                                        <Check className="pointer-events-none absolute h-3 w-3 text-white" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor={answer.content} className="cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <span
                                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
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
            </RadioGroup>
        </div>
    );
};

export default SingleChoice;

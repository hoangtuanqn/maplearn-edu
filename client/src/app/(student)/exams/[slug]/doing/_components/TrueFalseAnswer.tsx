import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { Label } from "~/components/ui/label";
import { Answers } from "~/schemaValidate/exam.schema";
import { useEffect } from "react";

const TrueFalseAnswer = ({
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
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault(); // chặn scroll
                e.stopPropagation(); // ngăn sự kiện lan rộng
            }
            if (e.key === "ArrowUp") {
                handleChoiceAnswer(
                    idQuestion,
                    Number(activeAnswer) - 1 == 0 ? `${answers.length}` : `${Number(activeAnswer) - 1}`,
                );
            }
            if (e.key === "ArrowDown") {
                // Đáp án A chuyển sang B (ABCD):
                handleChoiceAnswer(
                    idQuestion,
                    Number(activeAnswer) + 1 <= answers.length ? `${Number(activeAnswer) + 1}` : "1",
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeAnswer, answers.length, idQuestion, handleChoiceAnswer]);

    return (
        <div className="space-y-3">
            <RadioGroup
                value={activeAnswer?.[0] || ""} // controlled component
                onValueChange={(value) => handleChoiceAnswer(idQuestion, value)}
            >
                {[
                    {
                        name: "Đúng",
                        value: "Đúng",
                        color: "bg-emerald-500",
                        hoverColor: "hover:bg-emerald-50 hover:border-emerald-300",
                        selectedColor: "border-emerald-500 bg-emerald-50",
                    },
                    {
                        name: "Sai",
                        value: "Sai",
                        color: "bg-red-500",
                        hoverColor: "hover:bg-red-50 hover:border-red-300",
                        selectedColor: "border-red-500 bg-red-50",
                    },
                ]?.map((answer) => {
                    const isSelected = activeAnswer?.[0] === answer.value;
                    return (
                        <div key={answer.name} className="relative">
                            <div
                                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                                    isSelected ? answer.selectedColor : `border-gray-200 bg-white ${answer.hoverColor}`
                                }`}
                            >
                                <RadioGroupItem
                                    value={answer.value}
                                    id={answer.name}
                                    className={`peer size-5 rounded-full border-2 ${
                                        isSelected ? `${answer.color} border-transparent` : "border-gray-300 bg-white"
                                    }`}
                                />
                                <Label
                                    htmlFor={answer.name}
                                    className="flex-1 cursor-pointer font-medium text-gray-900"
                                >
                                    {answer.name}
                                </Label>
                            </div>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
};

export default TrueFalseAnswer;

import React from "react";

const NumericInput = ({
    idQuestion,
    activeAnswer,
    handleChoiceAnswer,
}: {
    idQuestion: number;
    activeAnswer: string[] | [];
    handleChoiceAnswer: (questionId: number, answer: string) => void;
}) => {
    return (
        <div className="flex items-center gap-2 max-lg:text-xs">
            <span>Câu trả lời của bạn: </span>
            <div>
                <input
                    className="focus:border-primary w-full border-b border-gray-300 py-1 outline-none"
                    value={activeAnswer[0] || ""}
                    onChange={(e) => handleChoiceAnswer(idQuestion, e.target.value)}
                />
            </div>
        </div>
    );
};

export default NumericInput;

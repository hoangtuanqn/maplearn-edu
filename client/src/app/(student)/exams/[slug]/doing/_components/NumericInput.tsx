import React from "react";
import { Edit3 } from "lucide-react";

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
        <div className="space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Edit3 className="text-primary h-4 w-4" />
                    <span>Nhập câu trả lời của bạn:</span>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        className="focus:border-primary focus:bg-primary/5 w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-lg font-medium transition-colors outline-none"
                        value={activeAnswer[0] || ""}
                        onChange={(e) => handleChoiceAnswer(idQuestion, e.target.value)}
                        placeholder="Nhập đáp án..."
                    />
                </div>

                <div className="mt-2 text-xs text-gray-500">
                    Lưu ý: Nhập số thập phân sử dụng dấu phẩy (,) và không nhập đơn vị
                </div>
            </div>
        </div>
    );
};

export default NumericInput;

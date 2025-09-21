import { ChevronFirst, ChevronLast, BarChart3 } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const Footer = ({
    payload: { setQuestionActive, questionActive, countQuestion, answers },
}: {
    payload: {
        setQuestionActive: React.Dispatch<React.SetStateAction<number>>;
        questionActive: number;
        countQuestion: number;
        answers: Record<number, string[]>;
    };
}) => {
    const progress = (Object.keys(answers).length / countQuestion) * 100;
    return (
        <div className="fixed right-0 bottom-0 left-0 z-10 hidden border-t border-gray-200 bg-white shadow-lg xl:flex">
            <div className="mx-auto w-full px-6 py-4">
                <div className="flex justify-between">
                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                        <Button
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-3 text-white disabled:bg-gray-300"
                            disabled={questionActive === 0}
                            onClick={() => setQuestionActive((prev) => Math.max(prev - 1, 0))}
                        >
                            <ChevronFirst className="h-5 w-5" />
                            <span>Câu trước</span>
                        </Button>
                        <Button
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-3 text-white disabled:bg-gray-300"
                            disabled={questionActive === countQuestion - 1}
                            onClick={() => setQuestionActive((prev) => Math.min(prev + 1, countQuestion - 1))}
                        >
                            <span>Câu tiếp</span>
                            <ChevronLast className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Progress Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <BarChart3 className="text-primary h-4 w-4" />
                            <span>Tiến độ:</span>
                        </div>

                        <div className="w-64">
                            <div className="mb-1 flex justify-between text-sm">
                                <span className="text-gray-600">Đã hoàn thành</span>
                                <span className="font-semibold text-gray-900">
                                    {Object.keys(answers).length}/{countQuestion} câu
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-600">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Current Question */}
                        <div className="bg-primary/10 rounded-lg px-3 py-2">
                            <span className="text-primary text-sm font-medium">Câu {questionActive + 1}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

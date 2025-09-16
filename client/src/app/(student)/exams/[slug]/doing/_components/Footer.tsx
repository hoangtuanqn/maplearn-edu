import { ChevronFirst, ChevronLast } from "lucide-react";
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
        <div className="fixed right-0 bottom-0 left-0 z-10 hidden h-20 items-center justify-between bg-white px-15 py-2 shadow-lg xl:flex">
            <div className="flex items-center gap-2">
                <Button
                    className="t1-flex-center bg-primary cursor-pointer gap-2 rounded-lg px-3 py-6 text-white shadow-xs"
                    disabled={questionActive === 0}
                    onClick={() => setQuestionActive((prev) => Math.max(prev - 1, 0))}
                >
                    <ChevronFirst className="size-6" />
                </Button>
                <Button
                    className="t1-flex-center bg-primary cursor-pointer gap-2 rounded-lg px-3 py-6 text-white shadow-xs"
                    disabled={questionActive === countQuestion - 1}
                    onClick={() => setQuestionActive((prev) => Math.min(prev + 1, countQuestion - 1))}
                >
                    <span>Câu tiếp</span> <ChevronLast className="size-6" />
                </Button>
            </div>
            <div className="w-96">
                <div className="mb-3 flex items-end justify-between">
                    <span>Bạn đã hoàn thành</span>{" "}
                    <span>
                        <span className="mr-1 ml-auto text-base font-bold">
                            {Object.keys(answers).length}/{countQuestion}
                        </span>
                        <span>câu</span>
                    </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-green-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-xs">{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;

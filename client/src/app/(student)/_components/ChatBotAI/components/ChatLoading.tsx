import { ThreeDot } from "react-loading-indicators";
import { Bot } from "lucide-react";

const ChatLoading = () => {
    return (
        <div className="mr-auto max-w-[85%]">
            <div className="mb-2 flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                        <Bot className="h-4 w-4" />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-fit rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Đang suy nghĩ</span>
                            <ThreeDot
                                variant="pulsate"
                                color="#6366f1"
                                size="small"
                                text=""
                                textColor=""
                                style={{ fontSize: "8px" }}
                            />
                        </div>
                    </div>

                    <div className="mt-1 flex justify-start">
                        <span className="text-xs text-gray-500">ChatBot AI</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatLoading;

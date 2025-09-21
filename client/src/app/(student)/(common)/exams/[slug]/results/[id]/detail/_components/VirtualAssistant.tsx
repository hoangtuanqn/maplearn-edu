"use client";
import { Send, Bot, Sparkles, MessageCircle } from "lucide-react";
import React, { memo, useEffect, useRef } from "react";
import ChatBubble from "~/app/(student)/_components/ChatBotAI/components/ChatBubble";
import ChatLoading from "~/app/(student)/_components/ChatBotAI/components/ChatLoading";
import { ChatHistoriesType } from "~/app/api/chat/ai/types/ChatBotType.type";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useInput } from "~/hooks/useInput";

type PayloadType = {
    payload: {
        chatHistories: ChatHistoriesType[];
        handleSubmit: (message: string) => void;
        isPending: boolean;
    };
};

const VirtualAssistant = ({ payload: { handleSubmit, chatHistories, isPending } }: PayloadType) => {
    const { value, onChange, reset } = useInput("");
    const frameChat = useRef<HTMLDivElement>(null);

    useEffect(() => {
        frameChat.current?.scrollTo({
            top: frameChat.current.scrollHeight,
            behavior: "smooth",
        });
    }, [chatHistories]);

    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Trợ lý AI</h3>
                        <p className="text-sm text-gray-500">Sẵn sàng hỗ trợ bạn</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                            <span className="text-xs font-medium text-green-700">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="scrollbar flex-1 overflow-hidden">
                <div className="max-h-[calc(60vh-120px)] min-h-[400px] overflow-y-auto p-4" ref={frameChat}>
                    {chatHistories.length === 0 ? (
                        /* Welcome Message */
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                                <MessageCircle className="h-10 w-10 text-blue-600" />
                            </div>
                            <h4 className="mb-2 text-lg font-semibold text-gray-900">
                                Chào mừng đến với AI Assistant!
                            </h4>
                            <p className="mb-6 max-w-md text-sm text-gray-600">
                                Tôi là trợ lý ảo được trang bị AI thông minh, sẵn sàng giúp bạn giải đáp thắc mắc về bài
                                thi và học tập.
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <div className="mb-1 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-500" />
                                        <span className="text-xs font-medium text-gray-700">Gợi ý</span>
                                    </div>
                                    <p className="text-xs text-gray-600">&ldquo;Giải thích câu hỏi số 1&rdquo;</p>
                                </div>
                                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <div className="mb-1 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-blue-500" />
                                        <span className="text-xs font-medium text-gray-700">Gợi ý</span>
                                    </div>
                                    <p className="text-xs text-gray-600">&ldquo;Tóm tắt kiến thức chính&rdquo;</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Chat Messages */
                        <div className="space-y-4">
                            {chatHistories.map((history, index) => (
                                <ChatBubble
                                    version="v2"
                                    key={index}
                                    role={history.role}
                                    text={history.parts[0].text}
                                    name="Bạn"
                                />
                            ))}
                            {isPending && (
                                <div className="flex justify-start">
                                    <div className="flex items-start gap-3">
                                        <ChatLoading />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-4">
                <form
                    className="flex gap-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (value.trim()) {
                            handleSubmit(value);
                            reset();
                        }
                    }}
                >
                    <div className="flex-1">
                        <div className="relative">
                            <Textarea
                                value={value}
                                onChange={onChange}
                                placeholder="Nhập câu hỏi của bạn..."
                                className="min-h-[48px] resize-none border-gray-200 pr-12 focus:border-blue-500 focus:ring-blue-500"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        if (value.trim()) {
                                            handleSubmit(value);
                                            reset();
                                        }
                                    }
                                }}
                            />
                            <div className="absolute right-2 bottom-2">
                                <span className="text-xs text-gray-400">{value.length}/500</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={!value.trim() || isPending}
                        className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500"
                    >
                        {isPending ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </form>

                {/* Footer Note */}
                <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500">AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.</p>
                </div>
            </div>
        </div>
    );
};

export default memo(VirtualAssistant);

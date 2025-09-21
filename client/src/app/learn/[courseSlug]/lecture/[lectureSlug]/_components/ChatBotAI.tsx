"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, HelpCircle, Lightbulb, BookOpenText, Target, Brain } from "lucide-react";
import { LessonDetailResponse } from "~/schemaValidate/courseDetail.schema";

// Types
interface ChatMessage {
    id: string;
    type: "user" | "ai";
    content: string;
    timestamp: Date;
}

interface QuickQuestion {
    id: string;
    text: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface ChatBotAIProps {
    lesson: LessonDetailResponse["data"];
    courseName: string;
}

const ChatBotAI: React.FC<ChatBotAIProps> = ({ lesson, courseName }) => {
    // AI Assistant states
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            type: "ai",
            content: `Xin chào! Tôi là trợ lý AI của MapLearn. Tôi có thể giúp bạn hiểu rõ hơn về bài học "${lesson.title}". Hãy đặt câu hỏi cho tôi nhé! 🤖`,
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const quickQuestions: QuickQuestion[] = [
        {
            id: "explain",
            text: "Giải thích khái niệm chính",
            icon: Lightbulb,
        },
        {
            id: "summary",
            text: "Tóm tắt bài học",
            icon: BookOpenText,
        },
        {
            id: "examples",
            text: "Cho ví dụ thực tế",
            icon: Target,
        },
        {
            id: "help",
            text: "Tôi không hiểu phần này",
            icon: HelpCircle,
        },
    ];

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateAIResponse = (_userInput: string): string => {
        // Simple AI response logic - you can replace with actual AI API
        const responses = [
            `Đây là một câu hỏi hay về "${lesson.title}"! Theo tôi hiểu, khái niệm này có thể được giải thích như sau...`,
            `Tôi sẽ giúp bạn hiểu rõ hơn về vấn đề này. Trong bài học "${lesson.title}", chúng ta cần chú ý đến...`,
            `Để hiểu rõ hơn về điều bạn đang thắc mắc, hãy cùng tôi phân tích từng bước...`,
            `Đây là một phần quan trọng trong khóa học "${courseName}". Tôi sẽ giải thích chi tiết hơn...`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: "user",
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                type: "ai",
                content: generateAIResponse(content),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleQuickQuestion = (question: QuickQuestion) => {
        handleSendMessage(question.text);
    };

    return (
        <div className="flex h-[600px] flex-col">
            {/* AI Assistant Header */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Trợ lý AI MapLearn</h3>
                        <p className="text-sm text-gray-600">Hỏi đáp về bài học &ldquo;{lesson.title}&rdquo;</p>
                    </div>
                    <div className="ml-auto">
                        <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-700">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Questions */}
            <div className="border-b border-gray-200 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-medium text-gray-600">Câu hỏi gợi ý:</p>
                <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((question) => {
                        const IconComponent = question.icon;
                        return (
                            <button
                                key={question.id}
                                onClick={() => handleQuickQuestion(question)}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs transition-colors hover:border-blue-200 hover:bg-blue-50"
                            >
                                <IconComponent className="h-3 w-3 text-blue-600" />
                                <span className="truncate text-gray-700">{question.text}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {message.type === "ai" && (
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[280px] rounded-2xl px-4 py-3 ${
                                message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                        >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p
                                className={`mt-1 text-xs ${
                                    message.type === "user" ? "text-blue-100" : "text-gray-500"
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>

                        {message.type === "user" && (
                            <div className="flex-shrink-0">
                                <div className="rounded-full bg-gray-300 p-2">
                                    <User className="h-4 w-4 text-gray-600" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start gap-3">
                        <div className="flex-shrink-0">
                            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-2">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gray-100 px-4 py-3">
                            <div className="flex items-center gap-1">
                                <div className="flex gap-1">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                    <div
                                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                        style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                        style={{ animationDelay: "0.2s" }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-500">AI đang soạn tin...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(inputMessage);
                                }
                            }}
                            placeholder="Đặt câu hỏi về bài học..."
                            className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            disabled={isTyping}
                        />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            <Sparkles className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={() => handleSendMessage(inputMessage)}
                        disabled={!inputMessage.trim() || isTyping}
                        className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>

                {/* Helper Text */}
                <p className="mt-2 text-center text-xs text-gray-500">
                    AI sẽ giúp bạn hiểu rõ hơn về nội dung bài học hiện tại
                </p>
            </div>
        </div>
    );
};

export default ChatBotAI;

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Bot, User } from "lucide-react";

import ListCourseChatBotAI from "./ListCourseChatBotAI";
import RenderLatex from "~/components/RenderLatex";

const ChatBubble = ({
    role,
    text,
    name,
    course_id = [],
    version = "v1",
}: {
    role: "user" | "model";
    name?: string;
    text: string;
    course_id?: number[];
    version?: string;
}) => {
    const isUser = role === "user";
    name = isUser ? name || "Bạn" : "ChatBot AI";

    return (
        <div className={`${isUser ? "ml-auto" : "mr-auto"} ${version === "v2" && "mb-4"} max-w-[85%]`}>
            <div className="mb-2 flex items-start gap-3">
                {!isUser && (
                    <div className="flex-shrink-0">
                        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                            <Bot className="h-4 w-4" />
                        </div>
                    </div>
                )}

                <div className="flex-1">
                    <div
                        className={`relative w-fit rounded-2xl px-4 py-3 break-words ${
                            isUser
                                ? "bg-primary ml-auto rounded-br-md text-white"
                                : "mr-auto rounded-bl-md border border-gray-200 bg-white text-gray-800 shadow-sm"
                        } chat_ai`}
                    >
                        {version === "v1" ? (
                            <div className="prose prose-sm max-w-none [&>ol]:m-0 [&>p]:m-0 [&>ul]:m-0">
                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {text}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <RenderLatex content={text} />
                        )}
                    </div>

                    <div className={`mt-1 flex ${isUser ? "justify-end" : "justify-start"}`}>
                        <span className="text-xs text-gray-500">{name}</span>
                    </div>
                </div>

                {isUser && (
                    <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white">
                            <User className="h-4 w-4" />
                        </div>
                    </div>
                )}
            </div>

            {version === "v1" && <ListCourseChatBotAI course_id={course_id} />}
        </div>
    );
};

export default ChatBubble;

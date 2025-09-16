import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
    const bubbleClass = isUser
        ? "ml-auto bg-gradient-to-r from-blue-500 to-blue-400 text-white"
        : "mr-auto bg-[#F0F2F5] text-black";

    return (
        <div className={`${isUser ? `ml-auto` : `mr-auto`} ${version === "v2" && "mb-4"} max-w-[90%]`}>
            <div className={`w-fit rounded-lg px-4 py-2 break-words ${bubbleClass} chat_ai`}>
                {version === "v1" ? (
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {text}
                    </ReactMarkdown>
                ) : (
                    <RenderLatex content={text} />
                )}
            </div>

            {version == "v1" && <ListCourseChatBotAI course_id={course_id} />}
            <div className={`flex ${isUser ? `justify-end pr-0.5` : `justify-start pl-0.5`}`}>
                <span className={`text-[10px] text-gray-600`}>{name}</span>
            </div>
        </div>
    );
};

export default ChatBubble;

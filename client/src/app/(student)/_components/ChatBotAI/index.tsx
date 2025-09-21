import { FormEvent, useEffect, useRef, useState } from "react";
import { useInput } from "~/hooks/useInput";
import axios from "axios";
import Image from "next/image";
import { ArrowUp, ChevronDown, MessageSquare, MessageSquareOff, SendHorizontal, Bot, Sparkles } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import { ChatHistoriesType } from "../../../api/chat/ai/types/ChatBotType.type";
import ChatBubble from "./components/ChatBubble";
import ChatLoading from "./components/ChatLoading";
import { useNotificationSound } from "~/hooks/useNotificationSound";
import { notificate } from "~/libs/notification";
const helloMessageModel = (name: string = "khách") => ({
    role: "model",
    parts: [
        {
            text: `Xin chào **${name}**! Bạn có câu hỏi nào muốn đặt cho mình không!`,
        },
    ],
});
// type MessageTye = {
//     message: string;
//     course_id: number[];
// };
export const extractJSON = (input: string) => {
    const match = input.match(/{[\s\S]*}/); // tìm đoạn bắt đầu bằng { và kết thúc bằng }
    if (match) {
        try {
            return JSON.parse(match[0]); // parse ra object
        } catch (err) {
            console.error("Lỗi khi parse JSON:", err);
            return input;
        }
    }
    return null;
};

const ChatBotAI = () => {
    // const [isClose, setIsClose] = useState(false);
    const { user } = useAuth();
    const frameChat = useRef<HTMLDivElement>(null);
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { value: message, onChange, setValue: setMessage } = useInput("");
    const [chatHistories, setChatHistories] = useState<ChatHistoriesType[]>([]);
    const [ids, setIds] = useState<{ id: number; course_id: number[] }[]>([]);
    const { playSound } = useNotificationSound();
    // const [dataParse, setDataParse] = useState<MessageTye>({
    //     message: "",
    //     course_id: [],
    // });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        setIsPending(true);
        setMessage("");
        const newHistories: ChatHistoriesType[] = [...chatHistories, { role: "user", parts: [{ text: message }] }];
        setChatHistories(newHistories);
        let modelReply = "Hiện tại máy chủ đang quá tải nên chưa thể hỗ trợ bạn được!";

        try {
            const data = await axios.post("/api/chat/ai", {
                contents: newHistories,
            });

            if (data.data?.candidates[0].content.parts[0].text) {
                const parse = extractJSON(data.data?.candidates[0].content.parts[0].text);
                // setDataParse(parse);
                modelReply =
                    parse?.message ||
                    data.data?.candidates[0].content.parts[0].text ||
                    "Xin lỗi, mình không hiểu câu hỏi của bạn";
                if (parse?.course_id && parse?.course_id.length > 0) {
                    setIds((prev) => [...prev, { id: chatHistories.length + 2, course_id: parse.course_id || [] }]);
                }
            }
            notificate(modelReply);
        } catch (error) {
            // setDataParse({
            //     message: "Xin lỗi, mình không hiểu câu hỏi của bạn. 2",
            //     course_id: [],
            // } as MessageTye);
            console.error("Lỗi gọi API AI >> ", error);
        } finally {
            playSound();
            setChatHistories((prev) => [...prev, { role: "model", parts: [{ text: modelReply }] }]);
            setIsPending(false);
        }
    };

    // Lời chào đầu tiên của AI
    useEffect(() => {
        // AI chào người dùng
        setChatHistories([helloMessageModel(user?.full_name) as ChatHistoriesType]);
    }, [setChatHistories, user]);

    // Kéo xuống cuối cùng mỗi khi có đoạn chat mới
    useEffect(() => {
        frameChat.current?.scrollTo({
            top: frameChat.current.scrollHeight,
            behavior: "smooth",
        });
    }, [chatHistories]);

    return (
        <>
            {!isOpen && (
                <div
                    className="fixed right-10 bottom-44 z-50 hidden w-fit cursor-pointer rounded-2xl border border-gray-100 bg-white px-6 py-3 font-medium text-gray-700 shadow-lg transition-all duration-200 hover:shadow-xl xl:bottom-42 xl:block"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        <Bot className="text-primary h-4 w-4" />
                        <span>Xin chào! Bạn cần hỗ trợ gì không?</span>
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                    </div>
                </div>
            )}

            <button
                id="ai-chatbot"
                className="from-primary to-primary/80 fixed right-5 bottom-30 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl md:bottom-30 md:h-16 md:w-16 xl:bottom-24"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <MessageSquareOff className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </button>

            {isOpen && (
                <section className="fixed z-[100000] min-h-[600px] rounded-2xl border border-gray-100 bg-white shadow-2xl max-xl:inset-0 xl:right-32 xl:bottom-15 xl:min-h-[650px] xl:max-w-[440px]">
                    {/* Header */}
                    <div className="from-primary to-primary/90 flex h-20 w-full items-center rounded-t-2xl bg-gradient-to-r text-white">
                        <div className="flex w-full items-center justify-between px-6 py-4">
                            <div className="flex flex-row items-center gap-3">
                                <div className="relative">
                                    <Image
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full border-2 border-white/20 object-cover"
                                        alt="AI Assistant"
                                        src="/assets/images/logo/logo-64.png"
                                    />
                                    <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-400"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/80">Trò chuyện với</span>
                                    <span className="text-lg font-bold">Trợ Lý Ảo AI</span>
                                </div>
                            </div>
                            <button
                                className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-white/10"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <ChevronDown className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                        className="flex h-[calc(100%-140px)] flex-col gap-3 overflow-y-auto bg-gray-50/50 px-2 pt-6 pb-4 xl:h-[465px]"
                        ref={frameChat}
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                        }}
                    >
                        {chatHistories.map((history, index) => {
                            return (
                                <ChatBubble
                                    key={index}
                                    course_id={
                                        ids.filter((item) => item.id === index + 1).flatMap((item) => item.course_id) ||
                                        []
                                    }
                                    role={history.role}
                                    text={history.parts[0].text}
                                    name={user?.full_name}
                                />
                            );
                        })}
                        {isPending && <ChatLoading />}
                    </div>

                    {/* Input Form */}
                    <form
                        className="absolute right-0 bottom-0 left-0 flex min-h-[85px] rounded-b-2xl border-t border-gray-100 bg-white px-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-1 items-center">
                            <div className="focus-within:border-primary flex w-full items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus-within:bg-white">
                                <input
                                    onChange={onChange}
                                    value={message}
                                    type="text"
                                    placeholder="Nhập tin nhắn của bạn..."
                                    className="flex-1 border-none bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
                                />

                                {/* Mobile Send Button */}
                                {message && (
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-colors xl:hidden"
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Desktop Send Button */}
                        {message && (
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 absolute -right-[3%] bottom-[25%] hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 xl:flex"
                            >
                                <SendHorizontal className="h-5 w-5" />
                            </button>
                        )}
                    </form>
                </section>
            )}
        </>
    );
};

export default ChatBotAI;

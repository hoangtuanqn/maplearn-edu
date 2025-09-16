import { FormEvent, useEffect, useRef, useState } from "react";
import { useInput } from "~/hooks/useInput";
import axios from "axios";
import Image from "next/image";
import { ArrowUp, ChevronDown, MessageSquare, MessageSquareOff, SendHorizontal } from "lucide-react";
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
                    className="fixed right-10 bottom-44 z-2 hidden w-fit cursor-pointer rounded-xl bg-white px-4 py-2 font-semibold text-gray-600 shadow xl:bottom-42 xl:block"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>Xin chào! Bạn cần hỗ trợ gì không?</span>
                </div>
            )}
            <button
                className="t1-flex-center fixed right-5 bottom-30 size-12 cursor-pointer rounded-full bg-blue-400 text-white md:bottom-30 md:size-15 xl:bottom-24"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <MessageSquareOff className="!h-6 !w-6" /> : <MessageSquare className="!h-6 !w-6" />}
            </button>
            {isOpen && (
                <section className="fixed z-100000 min-h-[600px] rounded-xl bg-white shadow-sm max-xl:inset-0 xl:right-32 xl:bottom-15 xl:max-w-[420px]">
                    <div className="flex h-[80px] w-full items-center rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                        <div className="flex w-full items-center justify-between px-5 py-4">
                            <div className="flex flex-row items-center gap-3">
                                <Image
                                    width={48}
                                    height={48}
                                    className="h-12 rounded-full object-cover"
                                    alt=""
                                    src="/assets/images/logo/logo-64.png"
                                />
                                <div className="flex flex-col">
                                    <span className="text-xs">Trò chuyện với</span>
                                    <span className="text-lg font-bold">Trợ Lý Ảo</span>
                                </div>
                            </div>
                            <div
                                className="cursor-pointer rounded-full p-2 duration-100 hover:bg-blue-500"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <ChevronDown className="!h-6 !w-6" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex h-[calc(100%-120px)] flex-col gap-3 overflow-y-auto px-8 pt-6 pb-10 xl:h-[445px]"
                        ref={frameChat}
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#a5a5a5 transparent" }}
                    >
                        {chatHistories.map((history, index) => {
                            // nếu ids.includes(index + 1) = true thì truyền dataParse?.course_id ngược thì lại truyền về []
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
                    <form
                        className="absolute right-0 bottom-0 left-0 flex min-h-[75px] rounded-b-xl bg-white px-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex-1">
                            <div className="h-[0.5px] w-full bg-gray-300"></div>
                            <div className="flex">
                                <input
                                    onChange={onChange}
                                    value={message}
                                    type="text"
                                    placeholder="Tin nhắn của bạn ...."
                                    className="h-15 w-full border-none px-0.5 pr-5 outline-none"
                                />
                                {/* Screen < XL */}
                                {message && (
                                    <button
                                        type="submit"
                                        className="t1-flex-center mt-2 size-12 cursor-pointer rounded-full bg-blue-500 p-2 text-white shadow-2xl shadow-blue-800 xl:hidden"
                                    >
                                        <ArrowUp className="!h-5 !w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Screen >= XL */}
                        {message && (
                            <button
                                type="submit"
                                className="t1-flex-center absolute -right-[5%] bottom-[20%] hidden aspect-square w-12.5 cursor-pointer rounded-full bg-blue-500 text-white shadow-2xl shadow-blue-800 xl:flex"
                            >
                                <SendHorizontal className="!h-6 !w-6" />
                            </button>
                        )}
                    </form>
                </section>
            )}
        </>
    );
};

export default ChatBotAI;

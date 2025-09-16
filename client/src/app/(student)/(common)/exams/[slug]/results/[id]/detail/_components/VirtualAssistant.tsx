"use client";
import { Send } from "lucide-react";
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
        <div className="flex h-full flex-col justify-between rounded-xl bg-white p-4 py-8 shadow-sm dark:bg-gray-800">
            <div className="mb-auto max-h-screen min-h-[calc(60vh-20%)] overflow-y-scroll p-2" ref={frameChat}>
                {chatHistories.map((history, index) => {
                    // nếu ids.includes(index + 1) = true thì truyền dataParse?.course_id ngược thì lại truyền về []
                    return (
                        <ChatBubble
                            version="v2"
                            key={index}
                            role={history.role}
                            text={history.parts[0].text}
                            name={"Bạn"}
                        />
                    );
                })}
                {isPending && <ChatLoading />}
            </div>
            <form
                className="mt-4 flex items-center justify-between gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    reset();
                    handleSubmit(value);
                }}
            >
                <div className="w-full">
                    <Textarea
                        className=""
                        value={value}
                        onChange={onChange}
                        placeholder="Gửi tin nhắn với trợ lý ảo AI"
                    />
                </div>
                <Button
                    className="text-white disabled:bg-gray-600 disabled:opacity-50"
                    type="submit"
                    disabled={!value.trim() || isPending}
                >
                    <Send />
                    Gửi
                </Button>
            </form>
        </div>
    );
};

export default memo(VirtualAssistant);

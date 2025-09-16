"use client";
import React, { memo, useState, useMemo, useCallback } from "react";
import HeaderTab from "./HeaderTab";
import DetailResult from "./DetailResult";
import { QuestionsExamResponse, ResultDetailExamResponse } from "~/schemaValidate/exam.schema";
import VirtualAssistant from "./VirtualAssistant";
import { ChatHistoriesType } from "~/app/api/chat/ai/types/ChatBotType.type";
import { useMutation } from "@tanstack/react-query";
import serverApi from "~/libs/apis/serverApi";
import { useNotificationSound } from "~/hooks/useNotificationSound";

const DetailResultPage = ({
    exam,
    resultRes,
}: {
    exam: QuestionsExamResponse["data"];
    resultRes: ResultDetailExamResponse["data"];
}) => {
    const [tab, setTab] = useState<"detail" | "explain">("detail");
    const [chatHistories, setChatHistories] = useState<ChatHistoriesType[]>([
        {
            role: "model",
            parts: [{ text: "Xin chào bạn! Bạn có câu hỏi nào muốn đặt cho mình không!" }],
        },
    ]);
    const { playSound } = useNotificationSound();

    // gọi APi để hỏi bài
    const sendQuestionToAI = useMutation({
        mutationFn: async (message: string) => {
            let modelReply = "Xin lỗi, mình không hiểu câu hỏi của bạn";
            try {
                const newHistories: ChatHistoriesType[] = [
                    ...chatHistories,
                    { role: "user", parts: [{ text: message }] },
                ];
                const data = await serverApi.post("/api/chat/explain", {
                    contents: newHistories,
                });

                if (data.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    modelReply = data.data.candidates[0].content.parts[0].text;
                }
            } catch (error) {
                console.error("Lỗi gọi API AI >> ", error);
            } finally {
                playSound();
                setChatHistories((prev) => [...prev, { role: "model", parts: [{ text: modelReply }] }]);
            }
        },
    });

    const handleSubmit = useCallback((message: string) => {
        setChatHistories((prev) => [...prev, { role: "user", parts: [{ text: message }] }]);
        // console.log(message);
        sendQuestionToAI.mutate(message);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const detailResultEl = useMemo(() => {
        return <DetailResult exam={exam} resultRes={resultRes} payload={{ handleSubmit, setTab }} />;
    }, [exam, resultRes, handleSubmit]);

    return (
        <div>
            <HeaderTab activeTab={tab} onChange={setTab} />
            <div hidden={tab !== "detail"}>{detailResultEl}</div>
            <div hidden={tab !== "explain"}>
                <VirtualAssistant payload={{ chatHistories, handleSubmit, isPending: sendQuestionToAI.isPending }} />
            </div>
        </div>
    );
};

export default memo(DetailResultPage);

import axios from "axios";
import { API_URL, trainingAI } from "./config";
import publicApi from "~/libs/apis/publicApi";

export async function POST(request: Request) {
    let courseString = "Bị lỗi lấy dữ liệu rồi, hãy thông báo cho người dùng biết nhé!";
    try {
        const data = await publicApi.get("/courses/ai-data");
        courseString = JSON.stringify(data.data?.data || []);
    } catch {}
    trainingAI.systemInstruction.parts[0].text += courseString;
    try {
        const body = await request.json();

        if (!body?.contents) {
            return new Response(JSON.stringify({ error: "Missing 'contents' in request body" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const res = await axios.post(API_URL, {
            ...trainingAI,
            contents: body.contents,
        });

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("POST /chat/ai error:", error);

        if (axios.isAxiosError(error)) {
            return new Response(
                JSON.stringify({
                    error: "Đã xảy ra lỗi khi gửi dữ liệu đến AI",
                    details: error?.response?.data || error.message || error,
                }),
                {
                    status: error?.response?.status || 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
    }
}

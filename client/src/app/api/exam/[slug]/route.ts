import { NextRequest, NextResponse } from "next/server";
import examApi from "~/apiRequest/exam";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const cookie = request.headers.get("cookie");

    const { slug } = await params;

    // Gọi backend API với cookie
    try {
        const res = await examApi.getDetailExam(slug, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch exam questions" }, { status: 500 });
    }
}

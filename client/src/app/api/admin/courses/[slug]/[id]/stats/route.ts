import { NextRequest, NextResponse } from "next/server";
import studentApi from "~/apiRequest/admin/student";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string; id: string }> }) {
    const cookie = request.headers.get("cookie");

    const { slug, id } = await params;

    // Gọi backend API với cookie
    try {
        const res = await studentApi.getLearningStats(slug, id, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch exam questions" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import examApi from "~/apiRequest/exam";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string; ids?: string[] }> }) {
    const cookie = request.headers.get("cookie");

    const { slug, ids } = await params;
    const id = ids?.[0] ?? null;
    // return NextResponse.json({ id });

    // Gọi backend API với cookie
    try {
        const res = await examApi.getExamResults(id, slug, {
            Cookie: cookie || "",
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch exam results" }, { status: 500 });
    }
}

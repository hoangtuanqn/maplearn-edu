import { NextRequest, NextResponse } from "next/server";
import examApi from "~/apiRequest/exam";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string; id: string }> }) {
    const cookie = request.headers.get("cookie");

    const { slug, id } = await params;
    // return NextResponse.json({ id });
    // return NextResponse.json({ slug, id });
    // Gọi backend API với cookie
    try {
        const res = await examApi.getResultDetail(slug, id, {
            Cookie: cookie || "",
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch exam results" }, { status: 500 });
    }
}

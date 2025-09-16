import { NextRequest, NextResponse } from "next/server";
import studentApi from "~/apiRequest/admin/student";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const cookie = request.headers.get("cookie");

    const { id } = await params;

    // Gọi backend API với cookie
    try {
        const res = await studentApi.getDetailStudent(id, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch student details" }, { status: 500 });
    }
}

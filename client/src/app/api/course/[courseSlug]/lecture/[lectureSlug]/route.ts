import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import courseDetailApi from "~/apiRequest/courseDetail";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ courseSlug: string; lectureSlug: string }> },
) {
    const cookie = request.headers.get("cookie");

    const { courseSlug, lectureSlug } = await params;

    // Gọi backend API với cookie
    try {
        const res = await courseDetailApi.getDetailLesson(courseSlug, lectureSlug, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
        }
        return NextResponse.json({ error: "Failed to fetch course details" }, { status: 500 });
    }
}

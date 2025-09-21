import { NextRequest, NextResponse } from "next/server";
import profileApi from "~/apiRequest/profile";

export async function GET(request: NextRequest) {
    const cookie = request.headers.get("cookie");

    // Gọi backend API với cookie
    try {
        const res = await profileApi.getMeInfo({
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        console.error("Error fetching user information:", error);
        return NextResponse.json({ error: "Failed to fetch user information" }, { status: 500 });
    }
}

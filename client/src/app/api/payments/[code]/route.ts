import { NextRequest, NextResponse } from "next/server";
import paymentApi from "~/apiRequest/payment";

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    const cookie = request.headers.get("cookie");

    const { code } = await params;

    try {
        const res = await paymentApi.getDetailPayment(code, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch invoice detail" }, { status: 500 });
    }
}

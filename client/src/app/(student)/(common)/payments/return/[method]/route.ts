import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import publicApi from "~/libs/apis/publicApi";

export async function GET(req: NextRequest, { params }: { params: Promise<{ method: string }> }) {
    const { method } = await params; // vnpay, momo, zalopay

    const searchParams = req.nextUrl.searchParams;
    const transaction_code =
        searchParams.get("vnp_TxnRef") ||
        searchParams.get("orderId")?.split("_")[0] ||
        searchParams.get("apptransid")?.split("_")[0] ||
        "";
    try {
        await publicApi.get(`/payment/${method}/return?${searchParams.toString()}`);
        // return NextResponse.json(res.data);
    } catch {
        // return NextResponse.json(error);
    }

    if (transaction_code) redirect(`/payments/${transaction_code}`);
    else redirect(`/profile/payments`);
}

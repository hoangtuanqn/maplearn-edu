import { NextRequest } from "next/server";
import cloudinary from "../config";

export async function DELETE(req: NextRequest) {
    try {
        const { publicId } = await req.json();

        if (!publicId || typeof publicId !== "string") {
            return Response.json({ error: "Thiếu publicId để xóa" }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        return Response.json({ result });
    } catch (err) {
        if (err instanceof Error) {
            return Response.json({ error: err.message }, { status: 500 });
        }
        return Response.json({ error: "Lỗi không xác định" }, { status: 500 });
    }
}

import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

// DELETE /api/upload
export async function DELETE(req: NextRequest) {
    try {
        const { fileName, folder = "uploads" } = await req.json();

        if (!fileName || typeof fileName !== "string") {
            return Response.json({ error: "Thiếu fileName để xóa" }, { status: 400 });
        }

        // Xác định đường dẫn file trong thư mục public
        const filePath = path.join(process.cwd(), "public", folder, fileName);

        // Kiểm tra và xóa file
        await fs.unlink(filePath);

        return Response.json({ success: true, message: `Đã xóa ${fileName}` });
    } catch (err: any) {
        if (err.code === "ENOENT") {
            return Response.json({ error: "File không tồn tại" }, { status: 404 });
        }

        if (err instanceof Error) {
            return Response.json({ error: err.message }, { status: 500 });
        }

        return Response.json({ error: "Lỗi không xác định" }, { status: 500 });
    }
}

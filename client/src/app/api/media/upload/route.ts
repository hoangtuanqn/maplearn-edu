import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) ?? "uploads";

        if (!file) {
            return Response.json({ error: "Không có file để upload" }, { status: 400 });
        }

        // Chuyển file thành buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Tạo thư mục nếu chưa có
        const uploadDir = path.join(process.cwd(), "public", folder);
        await fs.mkdir(uploadDir, { recursive: true });

        // Lấy đuôi file gốc và kiểm tra loại file (ví dụ, video hoặc ảnh)
        const ext = path.extname(file.name).toLowerCase();
        const allowedImageExts = [".jpg", ".jpeg", ".png", ".gif"];
        const allowedVideoExts = [".mp4", ".avi", ".mov", ".mkv"];

        // Kiểm tra xem file có phải là ảnh hoặc video không
        if (![...allowedImageExts, ...allowedVideoExts].includes(ext)) {
            return Response.json({ error: "Định dạng file không hỗ trợ" }, { status: 400 });
        }

        // Tạo tên file ngẫu nhiên bằng UUID
        const fileName = `${uuidv4()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        // Ghi file vào server
        await fs.writeFile(filePath, buffer);

        // Trả về URL public
        const url = `/${folder}/${fileName}`;

        return Response.json({
            url,
            fileName,
        });
    } catch (err) {
        if (err instanceof Error) {
            return Response.json({ error: err.message }, { status: 500 });
        }
        return Response.json({ error: "Lỗi không xác định" }, { status: 500 });
    }
}

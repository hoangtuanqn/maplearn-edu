import { UploadApiResponse } from "cloudinary";
import { NextRequest } from "next/server";
import cloudinary from "../config";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) ?? "nextjs_uploads";

        if (!file) {
            return Response.json({ error: "Không có file để upload" }, { status: 400 });
        }

        // Chuyển file thành buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload lên Cloudinary
        const result: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: "auto",
                        quality: "auto", // Tự động tối ưu chất lượng ảnh
                        fetch_format: "auto", // Chuyển sang định dạng WebP/AVIF nếu trình duyệt hỗ trợ
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        if (!result) return reject(new Error("Không có phản hồi từ Cloudinary"));
                        resolve(result);
                    },
                )
                .end(buffer);
        });

        return Response.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        if (err instanceof Error) {
            return Response.json({ error: err.message }, { status: 500 });
        }
        return Response.json({ error: "Lỗi không xác định" }, { status: 500 });
    }
}

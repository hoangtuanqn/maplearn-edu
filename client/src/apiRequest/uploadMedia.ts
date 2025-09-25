import axios from "axios";

interface UploadResponse {
    url: string; // Link file đã upload
    public_id: string;
}

interface DeleteResponse {
    success: boolean;
    message?: string;
}

const uploadMedia = {
    /**
     * Upload file lên server
     * @param file File cần upload
     * @returns Thông tin file sau khi upload
     */
    upload: async (file: File, folder: string): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await axios.post<UploadResponse>("/api/media/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data;
    },

    /**
     * Xóa file trên server
     * @param filename Tên file hoặc đường dẫn file
     * @returns Kết quả xóa
     */
    delete: async (filename: string): Promise<DeleteResponse> => {
        try {
            const res = await axios.delete<DeleteResponse>("/api/media/delete", {
                data: { filename },
            });

            return res.data;
        } catch (err) {
            console.error("Delete error:", err);
            throw err;
        }
    },
};

export default uploadMedia;

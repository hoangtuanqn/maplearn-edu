"use client";
import { useEffect, useRef } from "react";
import postApi from "~/apiRequest/post";

export default function UpdateViewClient({ slug }: { slug: string }) {
    const calledRef = useRef(false); // Đảm bảo chỉ gọi 1 lần
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!calledRef.current) {
                postApi.incrementView(slug).catch(console.error);
                calledRef.current = true;
            }
        }, 15000); // người dùng đọc 15 giây sẽ update số view lên

        return () => clearTimeout(timeout);
    }, [slug]);

    return null; // Không render gì cả
}

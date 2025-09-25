"use client";

import { useEffect } from "react";

const SaveLocalStorage = ({ courseId }: { courseId: string }) => {
    // lưu lại id course để gợi ý sau này, tối đa 8 id, không trùng lặp
    useEffect(() => {
        if (typeof window !== "undefined" && courseId) {
            const viewed_course_ids = localStorage.getItem("viewed_course_ids");
            let parsedIds: string[] = viewed_course_ids ? JSON.parse(viewed_course_ids) : [];
            // Xóa id nếu đã tồn tại để đưa lên đầu
            parsedIds = parsedIds.filter((id) => id !== courseId);
            // Thêm id mới vào đầu mảng
            parsedIds.unshift(courseId);
            // Giới hạn tối đa 8 id
            if (parsedIds.length > 8) {
                parsedIds = parsedIds.slice(0, 8);
            }
            localStorage.setItem("viewed_course_ids", JSON.stringify(parsedIds));
        }
    }, [courseId]);
    return null;
};

export default SaveLocalStorage;

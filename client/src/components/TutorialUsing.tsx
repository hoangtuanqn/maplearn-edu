"use client";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";

export default function TutorialUsing() {
    const { tutorial } = useGetSearchQuery(["tutorial"] as const);

    const { user } = useAuth();
    useEffect(() => {
        if (!user) return;
        const driverObj = driver({
            showProgress: true,
            steps: [
                {
                    element: "#courses",
                    popover: {
                        title: "Các khóa học",
                        description: "Nhấn vào đây để xem danh sách các khóa học và chọn khóa học phù hợp với bạn.",
                    },
                },
                {
                    element: "#exams",
                    popover: {
                        title: "Hệ thống luyện đề",
                        description: "Xem các đề thi và bài kiểm tra của bạn tại đây.",
                    },
                },
                {
                    element: "#suggest-courses",
                    popover: {
                        title: "Hệ thống gợi ý khóa học",
                        description: "Xem các khóa học được gợi ý cho bạn tại đây.",
                    },
                },
                {
                    element: "#dashboard-stats",
                    popover: {
                        title: "Thông tin thống kê",
                        description: "Thống kê dữ liệu của bạn khi học tập trên hệ thống!",
                    },
                },

                {
                    element: "#ai-chatbot",
                    popover: {
                        title: "Trợ lý ảo",
                        description:
                            "Hãy trò chuyện với trợ lý ảo để được hỗ trợ tốt nhất! Nó sẽ tư vấn cho bạn những khóa học phù hợp nhất!",
                    },
                },
                {
                    element: "#profile",
                    popover: {
                        title: "Hồ sơ cá nhân",
                        description: "Xem và chỉnh sửa thông tin cá nhân của bạn tại đây.",
                    },
                },
                {
                    element: "#notifications",
                    popover: {
                        title: "Thông báo",
                        description: "Xem và quản lý các thông báo của bạn tại đây.",
                    },
                },
            ],
        });
        if (tutorial == "1") {
            driverObj.drive();
        }
    }, [user, tutorial]);

    return null;
}

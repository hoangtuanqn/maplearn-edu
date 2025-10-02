import { LayoutDashboard, GraduationCap, ClipboardList, History, Undo2 } from "lucide-react";
const menuItems = [
    {
        type: "title",
        label: "Trang chính",
        children: [
            {
                type: "link",
                label: "Tổng quan",
                icon: LayoutDashboard,
                href: "/teacher",
                matcher: ["/teacher"],
                id: "dashboard-stats",
            },
        ],
    },

    {
        type: "title",
        label: "Khóa học",
        children: [
            {
                type: "link",
                label: "Khóa học",
                icon: GraduationCap,
                href: "/teacher/courses",
                matcher: [
                    "/teacher/courses",
                    "/teacher/courses/edit/:slug",
                    "/teacher/courses/:slug",
                    "/teacher/courses/:slug/students/:id",
                    "/teacher/courses/:slug/:id/compare/:id2",
                ],
                id: "courses",
            },
        ],
    },
    {
        type: "title",
        label: "Đề thi",
        children: [
            {
                type: "link",
                label: "Đề thi",
                icon: ClipboardList,
                href: "/teacher/exams",
                matcher: ["/teacher/exams", "/teacher/exams/:slug", "/teacher/exams/:slug/edit"],
                id: "exams",
            },
        ],
    },

    {
        type: "title",
        label: "Lịch sử",
        children: [
            {
                type: "link",
                label: "Làm bài thi",
                icon: History,
                href: "/teacher/history/exams",
                matcher: ["/teacher/history/exams"],
                id: "history-exams",
            },
            {
                type: "link",
                label: "Học bài",
                icon: History,
                href: "/teacher/history/learns",
                matcher: ["/teacher/history/learns"],
                id: "history-learns",
            },
        ],
    },
    {
        type: "title",
        label: "Thao tác",
        children: [
            {
                type: "link",
                label: "Quay lại trang chủ",
                icon: Undo2,
                href: "/",
                matcher: ["/"],
            },
        ],
    },
];
export default menuItems;

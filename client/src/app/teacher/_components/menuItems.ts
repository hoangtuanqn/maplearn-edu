import { LayoutDashboard, GraduationCap, ClipboardList, Receipt, History, Undo2 } from "lucide-react";
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
                matcher: ["/teacher/courses", "/teacher/courses/:slug"],
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
                matcher: ["/teacher/exams", "/teacher/exams/:slug"],
            },
        ],
    },

    {
        type: "title",
        label: "Thanh toán",
        children: [
            {
                type: "link",
                label: "Thanh toán",
                icon: Receipt,
                href: "/teacher/payments",
                matcher: ["/teacher/payments"],
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

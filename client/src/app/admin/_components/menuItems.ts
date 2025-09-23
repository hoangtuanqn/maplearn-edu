import {
    LayoutDashboard,
    UserRound,
    UserCog,
    GraduationCap,
    ClipboardList,
    Receipt,
    History,
    Undo2,
} from "lucide-react";
const menuItems = [
    {
        type: "title",
        label: "Trang chính",
        children: [
            {
                type: "link",
                label: "Tổng quan",
                icon: LayoutDashboard,
                href: "/admin",
                matcher: ["/admin"],
                id: "dashboard-stats",
            },
        ],
    },

    {
        type: "title",
        label: "Người dùng",
        children: [
            {
                type: "link",
                label: "Học sinh",
                icon: UserRound,
                href: "/admin/students",
                matcher: ["/admin/students", "/admin/students/:id"],
                id: "students",
            },
            {
                type: "link",
                label: "Giáo viên",
                icon: UserCog,
                href: "/admin/teachers",
                matcher: ["/admin/teachers"],
                id: "teachers",
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
                href: "/admin/courses",
                matcher: ["/admin/courses", "/admin/courses/edit/:slug", "/admin/courses/:slug"],
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
                href: "/admin/exams",
                matcher: ["/admin/exams", "/admin/exams/:slug"],
                id: "exams",
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
                href: "/admin/payments",
                matcher: ["/admin/payments"],
                id: "payments",
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
                href: "/admin/history/exams",
                matcher: ["/admin/history/exams"],
                id: "history-exams",
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

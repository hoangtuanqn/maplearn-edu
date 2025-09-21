"use client";
import { driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { Button } from "~/components/ui/button";

export default function TutorialButtonAdmin() {
    const steps: DriveStep[] = [
        {
            element: "#dashboard-stats",
            popover: {
                title: "Thông tin thống kê",
                description: "Thống kê dữ liệu tổng quan của hệ thống dành cho quản trị viên.",
            },
        },
        {
            element: "#students",
            popover: {
                title: "Quản lý học viên",
                description: "Xem, chỉnh sửa và quản lý danh sách học viên trên hệ thống.",
            },
        },
        {
            element: "#teachers",
            popover: {
                title: "Quản lý giáo viên",
                description: "Xem, chỉnh sửa và quản lý danh sách giáo viên trên hệ thống.",
            },
        },
        {
            element: "#courses",
            popover: {
                title: "Quản lý khóa học",
                description: "Tạo mới, chỉnh sửa và quản lý các khóa học trên hệ thống.",
            },
        },
        {
            element: "#exams",
            popover: {
                title: "Quản lý đề thi",
                description: "Tạo mới, chỉnh sửa và quản lý các đề thi, bài kiểm tra.",
            },
        },
        {
            element: "#payments",
            popover: {
                title: "Quản lý thanh toán",
                description: "Hiển thị đầy đủ thông tin các khóa học được người dùng mua và quản lý giao dịch.",
            },
        },
        {
            element: "#history-exams",
            popover: {
                title: "Lịch sử làm bài",
                description: "Xem lịch sử làm bài kiểm tra và kết quả của học viên.",
            },
        },
        {
            element: "#quick-actions",
            popover: {
                title: "Thao tác nhanh",
                description: "Truy cập nhanh các chức năng thường dùng trong quản trị hệ thống.",
            },
        },
    ];

    const handleStart = () => {
        const d = driver({
            showProgress: true,
            steps,
            overlayOpacity: 0.45,
            stagePadding: 12,
            stageRadius: 8,
            nextBtnText: "Tiếp",
            prevBtnText: "Trước",
            doneBtnText: "Hoàn tất",
        });
        d.drive();
    };

    return (
        <Button variant="outline" onClick={handleStart}>
            Hướng dẫn sử dụng
        </Button>
    );
}

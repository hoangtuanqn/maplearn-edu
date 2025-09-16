"use client";

import { Bell } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: "info" | "success" | "warning" | "error";
}

const mockNotifications: NotificationItem[] = [
    {
        id: "1",
        title: "Môn học mới",
        message: "Môn 'Toán học' đã được thêm vào danh sách lớp",
        time: "2 phút trước",
        isRead: false,
        type: "info",
    },
    {
        id: "2",
        title: "Bài kiểm tra đã chấm",
        message: "Bài kiểm tra 'Vật lý' đã được chấm điểm",
        time: "1 giờ trước",
        isRead: false,
        type: "success",
    },
    {
        id: "3",
        title: "Nhắc nhở",
        message: "Bạn có bài tập 'Ngữ văn' sắp đến hạn nộp",
        time: "3 giờ trước",
        isRead: true,
        type: "warning",
    },
    {
        id: "4",
        title: "Thanh toán thành công",
        message: "Bạn đã đăng ký thành công môn 'Tiếng Anh'",
        time: "1 ngày trước",
        isRead: true,
        type: "success",
    },
];

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications] = useState<NotificationItem[]>(mockNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success":
                return "✅";
            case "warning":
                return "⚠️";
            case "error":
                return "❌";
            default:
                return "ℹ️";
        }
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer rounded-lg border border-gray-200/50 bg-white/80 p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                        <span className="text-xs font-medium text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50 ${
                                        !notification.isRead ? "bg-blue-50/50" : ""
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 text-lg">{getNotificationIcon(notification.type)}</span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between">
                                                <h4
                                                    className={`text-sm font-medium ${
                                                        !notification.isRead ? "text-gray-900" : "text-gray-700"
                                                    }`}
                                                >
                                                    {notification.title}
                                                    {!notification.isRead && (
                                                        <span className="ml-1 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                                                    )}
                                                </h4>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                            <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <Bell className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                                <p className="text-sm text-gray-500">Không có thông báo mới</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                            <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                                Xem tất cả thông báo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;

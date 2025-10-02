"use client";
import { Menu, LogOut } from "lucide-react";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import { useAuth } from "~/hooks/useAuth";

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="mt-2 mb-5 flex h-16 items-center justify-between rounded-sm border-b border-gray-100 bg-white px-4 shadow-sm">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-4">
                <button
                    id="sidebar-toggle"
                    className="cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-100 2xl:hidden"
                >
                    <Menu className="h-5 w-5 text-gray-600" />
                </button>

                <div className="flex items-center space-x-3">
                    <h1 className="text-lg font-semibold text-gray-800">Quản lý giảng dạy</h1>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                        <User className="h-5 w-5 text-white" />
                    </div> */}
                    <DisplayAvatar avatar={user?.avatar} fullName={user?.full_name} ratio="9" />
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium text-gray-700">{user?.full_name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    className="group cursor-pointer rounded-md p-2 transition-colors hover:bg-red-50 hover:text-red-600"
                    onClick={() => logout()}
                    title="Đăng xuất"
                >
                    <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                </button>
            </div>
        </div>
    );
};

export default Header;

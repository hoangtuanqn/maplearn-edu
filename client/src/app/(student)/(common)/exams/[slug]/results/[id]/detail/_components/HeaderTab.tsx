"use client";
import { Brain } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeaderTab = ({
    activeTab,
    onChange,
}: {
    activeTab: "detail" | "explain";
    onChange: (tab: "detail" | "explain") => void;
}) => {
    return (
        <div className="t1-flex-center mx-auto mb-5 h-12 cursor-pointer justify-between rounded-xl bg-white text-xs font-bold shadow-sm lg:w-xl">
            <div
                className={`t1-flex-center h-full flex-1 gap-2 rounded-xl p-2 text-center ${
                    activeTab === "detail" ? "bg-primary text-white" : "bg-white text-[#979797]"
                }`}
                onClick={() => onChange("detail")}
            >
                <Image
                    src="/assets/icons/logo.svg"
                    width={64}
                    height={64}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                />
                <span>Đáp án chi tiết</span>
            </div>
            <div
                className={`t1-flex-center h-full flex-1 gap-2 rounded-xl p-2 ${
                    activeTab === "explain" ? "bg-primary text-white" : "bg-white text-[#979797]"
                }`}
                onClick={() => onChange("explain")}
            >
                <Brain />
                <span>Trợ lý ảo</span>
            </div>
        </div>
    );
};

export default HeaderTab;

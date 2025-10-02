"use client";
import React, { useState } from "react";
import { MessageCircle, Download, Eye, PenTool } from "lucide-react";
import Notes from "./Notes";
import Discussion from "./Discussion";
import Quiz from "./Quiz";
import Overview from "./Overview";
import Resources from "./Resources";

const VideoLessonTab = () => {
    const [activeVideoTab, setActiveVideoTab] = useState("overview");

    return (
        <div className="bg-white shadow-sm">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setActiveVideoTab("overview")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "overview"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <Eye className="mr-2 inline h-4 w-4" />
                    Tổng quan bài học
                </button>
                <button
                    onClick={() => setActiveVideoTab("discussion")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "discussion"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <MessageCircle className="mr-2 inline h-4 w-4" />
                    Thảo luận
                </button>
                <button
                    onClick={() => setActiveVideoTab("notes")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "notes"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <PenTool className="mr-2 inline h-4 w-4" />
                    Ghi chú
                </button>
                <button
                    onClick={() => setActiveVideoTab("resources")}
                    className={`relative cursor-pointer px-6 py-4 text-sm font-semibold ${
                        activeVideoTab === "resources"
                            ? "text-primary border-primary border-t-2 bg-white shadow-sm"
                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                    }`}
                >
                    <Download className="mr-2 inline h-4 w-4" />
                    Tài nguyên
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-8 max-lg:p-6">
                {activeVideoTab === "overview" && <Overview />}

                {activeVideoTab === "discussion" && <Discussion />}

                {activeVideoTab === "notes" && <Notes />}

                {activeVideoTab === "resources" && <Resources />}

                {activeVideoTab === "quiz" && <Quiz />}
            </div>
        </div>
    );
};

export default VideoLessonTab;

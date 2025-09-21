"use client";
import React, { useEffect, useState } from "react";
import MapLearnIcon from "../../../_components/Icons/MapLearnIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { courseCategoriesMock } from "~/mockdata/course/courseCategoties.data";
import { BookOpen } from "lucide-react";

const SelectCategory = ({ url }: { url: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("category") || "all");

    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        if (tab == activeTab) {
            params.delete("category");
            setActiveTab("all");
        } else {
            setActiveTab(tab);
            params.set("category", tab);
        }
        if (tab === "all") {
            params.delete("category");
        }
        if (tab !== activeTab) {
            params.set("page", "1");
        }
        router.push(`${url}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveTab(params.get("category") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return (
        <div className="w-full shrink-0 lg:w-[350px]">
            {/* Header */}
            <div className="rounded-xl p-6">
                <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <BookOpen className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Danh mục khóa học</h2>
                        <p className="text-sm text-gray-600">Chọn danh mục để lọc khóa học</p>
                    </div>
                </div>

                {/* Categories List */}
                <div className="mt-8 space-y-2">
                    {courseCategoriesMock?.map((cate) => {
                        const isActive = activeTab === cate.slug;
                        return (
                            <div
                                onClick={() => handleChoiceTab(cate.slug)}
                                key={cate.slug}
                                className={`group cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                                    isActive
                                        ? "border-primary/50 bg-primary/10 shadow-sm"
                                        : "border-gray-200 bg-white hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg transition-colors`}
                                    >
                                        <MapLearnIcon />
                                    </div>

                                    <div className="flex-1">
                                        <p
                                            className={`font-medium transition-colors ${
                                                isActive ? "text-primary" : "text-gray-900"
                                            }`}
                                        >
                                            {cate.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-500">Khám phá nhiều khóa học</p>
                                    </div>

                                    {isActive && <div className="bg-primary h-2 w-2 rounded-full"></div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;

"use client";
import { GraduationCap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";

const SelectObject = ({ url }: { url: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(searchParams.get("grade_level") || "all");

    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        const isSameTab = tab === activeTab;

        const newTab = isSameTab ? "all" : tab;
        setActiveTab(newTab);

        if (newTab === "all") {
            params.delete("grade_level");
        } else {
            params.set("grade_level", newTab);
        }
        params.set("page", "1");

        router.push(`${url}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveTab(params.get("grade_level") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return (
        <div className="space-y-4">
            {/* Grade Level Tags */}
            <div className="mt-5 flex flex-wrap gap-3">
                {gradeLevelsMock?.map((level) => {
                    const isActive = activeTab === level.slug;
                    return (
                        <button
                            key={level.slug}
                            onClick={() => handleChoiceTab(level.slug)}
                            className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                            }`}
                        >
                            <GraduationCap
                                size={16}
                                className={`transition-colors ${
                                    isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-600"
                                }`}
                            />
                            <span>{level.name}</span>
                            {isActive && <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectObject;

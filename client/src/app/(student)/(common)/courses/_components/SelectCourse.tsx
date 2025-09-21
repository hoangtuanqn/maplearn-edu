"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { subjectsMock } from "~/mockdata/subject.data";

const SelectCourse = ({ url }: { url: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(searchParams.get("subject") || "all");

    const [subjects] = useState([
        {
            name: "Tất cả",
            slug: "all",
        },
        ...subjectsMock,
    ]);

    const handleChoiceTab = (tab: string) => {
        const params = new URLSearchParams(window.location.search);
        setActiveTab(tab);
        params.set("subject", tab);
        if (tab === "all") {
            params.delete("subject");
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
            setActiveTab(params.get("subject") || "all");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return (
        <div className="space-y-4">
            {/* Header */}

            {/* Subject Tabs */}
            <div className="mt-5 rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
                <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    {subjects.map((subject) => {
                        const isActive = activeTab === subject.slug;
                        return (
                            <button
                                key={subject.slug}
                                onClick={() => handleChoiceTab(subject.slug)}
                                className={`relative flex-shrink-0 cursor-pointer px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <span className="relative z-10">{subject.name}</span>
                                {isActive && (
                                    <div className="bg-primary/10 border-primary/20 absolute inset-0 rounded-lg border"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectCourse;

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
        <div
            className="relative mt-6 flex w-full flex-wrap items-center overflow-x-auto [&>button]:cursor-pointer [&>button]:border-b-gray-300"
            style={{ scrollbarWidth: "none" }}
        >
            {subjects.map((tab) => (
                <button
                    key={tab.slug}
                    className={`relative min-w-[4.7rem] border-b-[1px] px-2 py-3 ${activeTab === tab.slug ? "" : ""}`}
                    onClick={() => handleChoiceTab(tab.slug)}
                >
                    {activeTab === tab.slug && (
                        <div
                            className="bg-primary absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                            style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
                        />
                    )}
                    <p className={`text-md font-medium ${activeTab === tab.slug ? "text-primary" : "text-[#999999]"}`}>
                        {tab.name}
                    </p>
                </button>
            ))}
        </div>
    );
};

export default SelectCourse;

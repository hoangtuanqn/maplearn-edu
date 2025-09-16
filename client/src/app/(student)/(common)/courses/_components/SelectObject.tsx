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
        <>
            <div className="mt-6 flex flex-wrap gap-2 text-xs lg:text-sm xl:gap-4 [&>button]:flex [&>button]:gap-2">
                {gradeLevelsMock?.map((tab) => (
                    <button
                        key={tab.slug}
                        className={`t1-flex-center flex w-fit cursor-pointer rounded-xl bg-[#F0F3F7] px-5 py-3 font-semibold text-gray-600 ${activeTab === tab.slug ? "bg-primary text-white" : ""}`}
                        onClick={() => handleChoiceTab(tab.slug)}
                    >
                        <GraduationCap /> {tab.name}
                    </button>
                ))}
            </div>
        </>
    );
};

export default SelectObject;

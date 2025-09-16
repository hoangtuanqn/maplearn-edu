"use client";
import React, { useEffect, useState } from "react";
import MapLearnIcon from "../../../_components/Icons/MapLearnIcon";

import { useRouter, useSearchParams } from "next/navigation";
import { courseCategoriesMock } from "~/mockdata/course/courseCategoties.data";

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
        <div className="w-full shrink-0 p-8 lg:w-[350px]">
            <h2 className="text-primary text-base font-semibold">Danh mục</h2>
            <div className="mt-4 flex flex-col gap-3.5">
                {courseCategoriesMock?.map((cate) => {
                    return (
                        <div
                            onClick={() => handleChoiceTab(cate.slug)}
                            key={cate.slug}
                            className={`group flex cursor-pointer items-center gap-3.5 rounded-xl bg-[#eaf0f9] p-4 shadow-sm duration-200 ${activeTab === cate.slug ? "text-primary bg-primary" : "hover:bg-primary hover:text-white"}`}
                        >
                            <div
                                className={`t1-flex-center size-10 shrink-0 rounded-full duration-200 ${activeTab === cate.slug ? "text-primary bg-white" : "bg-primary group-hover:text-primary text-white group-hover:bg-white"}`}
                            >
                                <MapLearnIcon />
                            </div>

                            <div>
                                <p
                                    className={`line-clamp-3 font-bold uppercase ${activeTab === cate.slug ? "text-white" : "text-primary group-hover:text-white"}`}
                                >
                                    {cate.name}
                                </p>
                                <span
                                    className={`text-sm ${activeTab === cate.slug ? "text-white" : "text-gray-500 group-hover:text-white"}`}
                                >
                                    Hiện có nhiều khóa học
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectCategory;

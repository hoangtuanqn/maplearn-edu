"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import examApi from "~/apiRequest/exam";

const RankingExam = ({ slug }: { slug: string }) => {
    const { data: rankings } = useQuery({
        queryKey: ["ranking", slug],
        queryFn: async () => {
            const res = await examApi.getRanking(slug);
            return res.data.data;
        },
    });

    const { data: getRankingMe } = useQuery({
        queryKey: ["rankingMe", slug],
        queryFn: async () => {
            const res = await examApi.getRankingMe(slug);
            return res.data.data;
        },
    });
    return (
        <div className="sticky top-[70px] h-fit shrink-0 rounded-xl bg-white py-4 shadow-sm lg:w-96">
            <h2 className="text-primary mb-2 px-4 text-base font-bold">Top 10 xếp hạng</h2>
            <div className="mt-5">
                {Array.isArray(rankings) && rankings.length > 0 ? (
                    rankings.map((item: any, idx: number) => (
                        <div key={item.id} className="flex items-center gap-3.5 py-3 pr-6 pl-5 even:bg-[#F3F7FA]">
                            <div className="t1-flex-center w-7.5 shrink-0">
                                <div
                                    className={
                                        idx === 0
                                            ? "h-8.5 w-8.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFEDB7] to-[#FF9800] p-0.5"
                                            : idx === 1 || idx === 2
                                              ? "h-7.5 w-7.5 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B4B5B7] p-0.5"
                                              : "h-6.5 w-6.5 shrink-0 rounded-full bg-gradient-to-b from-[#fff] to-[#fff] p-0.5"
                                    }
                                >
                                    <div
                                        className={
                                            idx === 0
                                                ? "t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#F32114] to-[#880404] text-[1.25rem] font-medium text-white"
                                                : idx === 1 || idx === 2
                                                  ? "t1-flex-center h-full w-full rounded-full bg-gradient-to-b from-[#8CB5E9] to-[#0034DF] text-base font-medium text-white"
                                                  : "t1-flex-center text-md h-full w-full rounded-full bg-gradient-to-b from-[#d8d8d8] to-[#aeaeae] font-medium text-white"
                                        }
                                    >
                                        {idx + 1}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    idx === 0
                                        ? "relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#FFEDB7] to-[#FF9B08] p-[3px] shadow-md"
                                        : idx === 1 || idx === 2
                                          ? "relative h-11 w-11 shrink-0 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#B3B3B3] p-[3px] shadow-md"
                                          : "relative h-11 w-11 shrink-0 rounded-full bg-white p-[3px] shadow-md"
                                }
                            >
                                {item.user?.avatar ? (
                                    <Image
                                        alt={item.user.full_name}
                                        className="h-full w-full shrink-0 rounded-full object-cover"
                                        width={32.5}
                                        height={32.5}
                                        src={item.user.avatar}
                                    />
                                ) : (
                                    <div
                                        className="t1-flex-center h-full w-full shrink-0 rounded-full bg-gradient-to-b from-[#dadada] to-[#bebebe] font-medium text-white"
                                        style={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
                                    >
                                        {item.user?.full_name?.charAt(0) || "?"}
                                    </div>
                                )}
                                {idx === 0 && (
                                    <div className="t1-flex-center absolute inset-x-0 -top-6">
                                        <Image src="/assets/icons/crown.svg" alt="" width={28} height={28} />
                                    </div>
                                )}
                            </div>
                            <div className="grow">
                                <div className="mb-1 line-clamp-1 font-medium text-[#26292D]">
                                    {item.user?.full_name}
                                </div>
                                <div className="text-cp text-[#7B7B7B]">
                                    {item.time_spent
                                        ? `${
                                              Math.floor(item.time_spent / 60) > 0
                                                  ? `${Math.floor(item.time_spent / 60)} phút `
                                                  : ""
                                          }${item.time_spent % 60} giây`
                                        : "0 giây"}
                                </div>
                            </div>
                            <div className="ml-3 shrink-0 text-[#189BD3]">
                                <span
                                    className={
                                        idx === 0
                                            ? "text-base font-bold text-[#F32114]"
                                            : idx === 1 || idx === 2
                                              ? "text-base font-bold text-[#3d82dc]"
                                              : "text-base font-bold text-gray-500"
                                    }
                                >
                                    {item.score}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-6 text-center text-gray-400">Không có dữ liệu xếp hạng</div>
                )}
                <div className="t1-flex-center text-primary-light relative bottom-2 -mb-3 h-12 text-4xl">. . .</div>
                <div className="text-primary-light mt-3 text-center">
                    {getRankingMe?.rank ? (
                        <>
                            Bạn đang ở top <span className="font-bold">{getRankingMe?.rank || 0}</span> trên BXH
                        </>
                    ) : (
                        "Bạn chưa có dữ liệu xếp hạng"
                    )}
                </div>
            </div>
        </div>
    );
};

export default RankingExam;

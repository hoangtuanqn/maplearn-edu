"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "~/hooks/useAuth";
import { getFormattedVietnameseDate } from "~/libs/hepler";

const DashboardStats = () => {
    const { user } = useAuth();
    if (!user) return null;
    return (
        <div
            className="md:rounded-block mt-3.5 rounded-2xl p-4 shadow-sm max-md:mb-2.5 md:p-5 xl:mt-6"
            id="dashboard-stats"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
            <div className="flex flex-col gap-4 md:gap-5.5">
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <p className="line-clamp-1 flex-1 text-base">
                        <span className="text-slate-600">Xin chào </span>
                        <span className="bg-[linear-gradient(90deg,_#3899D1_13.99%,_#1C51CA_104.92%)] bg-clip-text font-bold text-transparent">
                            {user.full_name}
                        </span>
                        <span> !</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hidden md:block"
                        >
                            <path
                                d="M19.167 6.7H.833A.834.834 0 000 7.533V17.5C0 18.878 1.122 20 2.5 20h15c1.378 0 2.5-1.122 2.5-2.5V7.533a.834.834 0 00-.833-.833z"
                                fill="#EDEDED"
                            />
                            <path d="M17.5 2.5h-15A2.5 2.5 0 000 5v2.533h20V5a2.5 2.5 0 00-2.5-2.5z" fill="#2196F3" />
                            <path
                                d="M5 0h-.833a.834.834 0 00-.833.833v3.334c0 .46.373.833.833.833h.834c.46 0 .833-.373.833-.833V.833A.834.834 0 005.001 0zm10.834 0h-.833a.834.834 0 00-.834.833v3.334c0 .46.374.833.834.833h.833c.46 0 .833-.373.833-.833V.833A.834.834 0 0015.834 0z"
                                fill="#1976D2"
                            />
                            <path
                                d="M5.208 9.167H3.125a.625.625 0 00-.625.625v2.083c0 .345.28.625.625.625h2.083c.345 0 .625-.28.625-.625V9.792a.625.625 0 00-.625-.625zm0 5H3.125a.625.625 0 00-.625.625v2.083c0 .345.28.625.625.625h2.083c.345 0 .625-.28.625-.625v-2.083a.625.625 0 00-.625-.625zm5.834-5H8.958a.625.625 0 00-.625.625v2.083c0 .345.28.625.625.625h2.084c.345 0 .625-.28.625-.625V9.792a.625.625 0 00-.625-.625z"
                                fill="#2196F3"
                            />
                            <path
                                d="M11.042 14.167H8.96a.625.625 0 00-.625.625v2.083c0 .345.28.625.625.625h2.083c.345 0 .625-.28.625-.625v-2.083a.625.625 0 00-.625-.625z"
                                fill="#90CAF9"
                            />
                            <path
                                d="M16.874 9.167h-2.083a.625.625 0 00-.625.625v2.083c0 .345.28.625.625.625h2.083c.345 0 .625-.28.625-.625V9.792a.625.625 0 00-.625-.625z"
                                fill="#2196F3"
                            />
                        </svg>
                        <p className="text-[13.125px] font-medium text-slate-500 md:text-sm">
                            Hôm nay là {getFormattedVietnameseDate()}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-3.5">
                    <Link
                        className="flex flex-col items-center gap-3 rounded-xl bg-[linear-gradient(278.32deg,_#BAE2FF_1.57%,_#E7F5FF_107.77%)] px-3.5 py-4 md:flex-row"
                        href="/profile/my-courses"
                    >
                        <div className="t1-flex-center size-12 rounded-lg bg-[#A8DBFF]">
                            <svg
                                width={27}
                                height={23}
                                viewBox="0 0 27 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-7"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.712 19.821a1.866 1.866 0 013.232 0h16.108a.933.933 0 010 1.866H9.944a1.866 1.866 0 01-3.232 0H1.798a.933.933 0 010-1.866h4.914zM26.985 3.03A2.798 2.798 0 0024.186.23H3.664A2.799 2.799 0 00.865 3.03v11.194a2.799 2.799 0 002.799 2.799h20.522a2.799 2.799 0 002.799-2.799V3.03zM16.35 9.373a.933.933 0 000-1.492L12.62 5.082a.933.933 0 00-1.492.746v5.597a.932.932 0 001.492.747l3.731-2.799z"
                                    fill="#0581D7"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-center text-4xl font-bold text-[#0581D7] md:text-start">
                                {user.learning_courses || 0}
                            </p>
                            <p className="text-cp text-center text-[#155E94] md:text-start">Khoá đang học</p>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center gap-3 rounded-xl bg-[linear-gradient(278.91deg,_#FFDCB3_0.46%,_#FFF4F4_119.68%)] px-3.5 py-4 md:flex-row">
                        <div className="t1-flex-center size-12 rounded-lg bg-[#FFD6A6]">
                            <svg
                                width={28}
                                height={26}
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-7"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.72.47a.75.75 0 111.06 1.06L2.03 5.28A.75.75 0 11.97 4.22L4.72.47zM14 25.5c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm-.75-17a.75.75 0 011.5 0v4.599l3.416 2.277.061.046a.75.75 0 01-.827 1.241l-.066-.039-3.75-2.5a.75.75 0 01-.334-.624v-5zM22.22.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06z"
                                    fill="#EE5F06"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-center text-4xl font-bold text-[#EE5F06] md:text-start">
                                {user.hours_in_week || 0}
                            </p>
                            <p className="text-cp l text-center text-[#EE5F06] md:text-start">Giờ học tuần này</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 rounded-xl bg-[linear-gradient(278.19deg,_#CBCCFF_-18.91%,_#F5E6FF_100%)] px-3.5 py-4 md:flex-row">
                        <div className="t1-flex-center size-12 rounded-lg bg-[#DFC7FD]">
                            <svg
                                width={20}
                                height={27}
                                viewBox="0 0 20 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-7"
                            >
                                <path
                                    d="M19.845 6.303v18.744c0 .59-.484 1.073-1.073 1.073H3.643c-1.934 0-3.49-1.288-3.49-2.954V4.37c0-1.934 1.825-3.49 4.136-3.49h10.667c.593 0 1.076.483 1.076 1.072v19.334c0 .59-.483 1.074-1.076 1.074H3.643c-.805 0-1.397.43-1.397.86 0 .375.592.859 1.397.859h14.052V6.359c0-.593.484-1.076 1.076-1.076.59 0 1.02.43 1.074 1.02z"
                                    fill="#8555E7"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-center text-4xl font-bold text-[#8555E7] md:text-start">
                                {user.lessons_in_week || 0}
                            </p>
                            <p className="text-cp text-center text-[#8555E7] md:text-start">Bài đã học tuần này</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;

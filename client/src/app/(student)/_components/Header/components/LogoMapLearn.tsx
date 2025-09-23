import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoMapLearn = ({ textColor = "" }: { textColor?: string }) => {
    return (
        <div className="flex items-center max-xl:hidden">
            <Link className="group flex cursor-pointer items-center gap-3" href={"/"}>
                <div className="flex items-center justify-center rounded-xl bg-white/20 p-1 shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <Image
                        width={36}
                        height={36}
                        className="rounded-lg object-contain"
                        alt="MapLearn Logo"
                        src="/assets/images/logo/logo-64.png"
                    />
                </div>
                <div className="hidden lg:block">
                    <h1 className={`text-xl font-bold tracking-tight ${textColor ? textColor : "text-white"}`}>
                        MapLearn
                    </h1>
                    <p className={`mt-0.5 text-xs font-normal ${textColor ? "text-gray-400" : "text-white"}`}>
                        Nền tảng học tập thông minh
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default LogoMapLearn;

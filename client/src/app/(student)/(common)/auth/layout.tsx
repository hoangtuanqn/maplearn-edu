import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="min-h-screen rounded-2xl bg-[#FDFDFD] py-10 max-xl:pt-12 xl:flex xl:items-center xl:justify-center">
            <div className="text-secondary-typo flex w-full px-6 md:px-20">
                <section className="hidden flex-1 pr-32 xl:block">
                    <h2 className="mb-2 text-4xl font-bold opacity-90">Hệ thống học tập</h2>
                    <Image
                        src="/assets/images/common/study.png"
                        alt="Welcome to Login"
                        className="w-full object-cover"
                        width={887}
                        height={548}
                    />
                </section>
                <section className="t1-flex-center flex-1 xl:border-l-2 xl:border-[#e5e7eb] xl:pl-32">
                    {children}
                </section>
            </div>
        </section>
    );
};

export default AuthLayout;

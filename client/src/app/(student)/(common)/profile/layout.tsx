import React from "react";
import ProfileSidebar from "./_components/Sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="min-h-screen">
                <div className="flex h-full w-full gap-6">
                    <ProfileSidebar />
                    <div className="w-full grow xl:w-[70%]">
                        <div className="min-h-full rounded-xl bg-white px-8 py-6 shadow-sm">{children}</div>
                    </div>
                </div>
            </section>
        </>
    );
}

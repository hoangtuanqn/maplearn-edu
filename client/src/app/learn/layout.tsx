import React from "react";
import LayoutGetInfoMe from "~/components/Layout/LayoutGetInfoMe";
import Footer from "./_components/Footer";

const VideoLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <section className="bg-[#ffffff90] pb-6">
                    <div className="mx-auto pb-12">{children}</div>
                </section>
                <Footer />
            </LayoutGetInfoMe>
        </>
    );
};

export default VideoLayout;

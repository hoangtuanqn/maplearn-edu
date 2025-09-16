import React from "react";
import Footer from "~/app/(student)/_components/Footer";
import Header from "~/app/(student)/_components/Header";
import LayoutGetInfoMe from "~/components/Layout/LayoutGetInfoMe";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <Header />
                <section className="bg-[#ffffff90] pb-6">
                    <div className="max-w-8xl mx-auto pt-5 pb-12 md:mt-[56px] md:py-5 lg:px-4">{children}</div>
                </section>
                <Footer />
            </LayoutGetInfoMe>
        </>
    );
};

export default RootLayout;

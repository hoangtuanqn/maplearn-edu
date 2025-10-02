import LayoutGetInfoMe from "~/components/Layout/LayoutGetInfoMe";
import Sidebar from "./_components/Sidebar";
import { Toaster } from "sonner";
import Header from "./_components/Header";
import Script from "next/script";

const LayoutAdminRoot = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutGetInfoMe>
                <Script src="/assets/js/admin/sidebar.js" strategy="afterInteractive" />
                <section className="bg-[#F5F5F5] p-2">
                    <Sidebar />
                    <main className="min-h-screen 2xl:ml-65">
                        <Header />
                        {children}
                    </main>
                </section>
            </LayoutGetInfoMe>
            <Toaster position="top-center" expand={true} richColors duration={5000} />
        </>
    );
};

export default LayoutAdminRoot;

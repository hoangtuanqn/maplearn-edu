import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "~/styles/global.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@smastrom/react-rating/style.css";
import "katex/dist/katex.min.css";

import "swiper/css";
import "swiper/css/pagination";
import QueryProvider from "~/wrapper/QueryProvider";
import { ReduxProvider } from "~/wrapper/ReduxProvider";
import TopProgressBar from "~/components/TopProgressBar";
import Script from "next/script";
const inter = Inter({
    subsets: ["latin", "vietnamese"],
    display: "swap", // giúp tránh bị trắng chữ khi font chưa load
});

export const metadata: Metadata = {
    title: {
        template: "%s | MapLearn - Định vị tri thức - Dẫn lối tư du",
        default: "MapLearn - Định vị tri thức - Dẫn lối tư duy", // a default is required when creating a template
    },

    description: "MapLearn - Nền tảng học tập trực tuyến dành cho học sinh trung học phổ thông!",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <body className={inter.className}>
                <Script
                    type="text/javascript"
                    id="MathJax-script"
                    async
                    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                ></Script>
                <TopProgressBar />
                <ReduxProvider>
                    <QueryProvider>{children}</QueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}

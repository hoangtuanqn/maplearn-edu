import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Hiển thị nút khi scroll xuống quá 300px
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll lên top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="t1-flex-center fixed right-2 bottom-[4.5rem] z-20 size-8 cursor-pointer rounded-full bg-[#F0F3F7] duration-400 lg:size-12 xl:right-6 xl:size-10 2xl:bottom-[2.5rem]"
            >
                <ArrowUp className="size-4 xl:size-5" />
            </button>
        )
    );
}

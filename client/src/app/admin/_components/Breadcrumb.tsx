"use client";

import { useRouter } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Breadcrumb = ({ breadcrumbData }: { breadcrumbData: { label: string; href: string }[] }) => {
    const router = useRouter();

    const handleClick = (href: string) => {
        router.push(href);
    };

    return (
        <nav aria-label="Breadcrumb" className="w-fit">
            <motion.ol
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center gap-1 rounded-lg border border-gray-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
            >
                {breadcrumbData.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                    >
                        {/* Icon cho item đầu */}
                        {index === 0 && (
                            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                                <Home className="h-3 w-3 text-blue-600" />
                            </div>
                        )}

                        {/* Link */}
                        <button
                            onClick={() => handleClick(item.href)}
                            className={`flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-all duration-200 ${
                                index === breadcrumbData.length - 1
                                    ? "cursor-default text-gray-500"
                                    : "text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                            }`}
                            disabled={index === breadcrumbData.length - 1}
                        >
                            {item.label}
                        </button>

                        {/* Separator */}
                        {index < breadcrumbData.length - 1 && <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />}
                    </motion.li>
                ))}
            </motion.ol>
        </nav>
    );
};

export default Breadcrumb;

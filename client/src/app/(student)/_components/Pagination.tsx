"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface PaginationProps {
    totalPages: number;
    basePath?: string; // /posts
    queryKey?: string;
    siblingCount?: number;
}

export function PaginationNav({ totalPages, basePath = "", queryKey = "page", siblingCount = 1 }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get(queryKey)) || 1;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(queryKey, String(page));
        router.push(`${basePath}?${params.toString()}`);
    };

    const pageNumbers = generatePageNumbers(currentPage, totalPages, siblingCount);

    return (
        <Pagination className="mt-10">
            <PaginationContent className="flex-wrap gap-1 sm:gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={currentPage === 1}
                        className={clsx("px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm", {
                            "cursor-not-allowed text-gray-700/40": currentPage <= 1,
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) goToPage(currentPage - 1);
                        }}
                    />
                </PaginationItem>

                {pageNumbers.map((page, idx) => (
                    <PaginationItem key={idx}>
                        {page === "..." ? (
                            <PaginationEllipsis className="px-1 text-xs sm:px-2 sm:text-sm" />
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                className={clsx(
                                    "hover:bg-primary min-w-[32px] px-2 py-1 text-xs hover:text-white sm:min-w-[40px] sm:px-3 sm:py-2 sm:text-sm",
                                    {
                                        "bg-primary text-white": currentPage === page,
                                    },
                                )}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(Number(page));
                                }}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        className={clsx("px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm", {
                            "cursor-not-allowed text-gray-700/40": currentPage >= totalPages,
                        })}
                        aria-disabled={currentPage === totalPages}
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) goToPage(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

// Tạo mảng trang cần hiển thị như [1, "...", 4, 5, 6, "...", 10]
function generatePageNumbers(current: number, total: number, sibling: number = 1) {
    const totalVisible = sibling * 2 + 5;
    if (total <= totalVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const left = Math.max(current - sibling, 2);
    const right = Math.min(current + sibling, total - 1);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push("...");
    pages.push(total);

    return pages;
}

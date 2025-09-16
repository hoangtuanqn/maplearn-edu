"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

const useSearch = (url: string) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultKeyword = searchParams.get("search") || "";
    const [keyword, setKeyword] = useState(defaultKeyword);

    // Hàm debounce để cập nhật URL sau 500ms người dùng ngưng nhập
    const debouncedSearch = useMemo(
        () =>
            debounce((search: string) => {
                const params = new URLSearchParams(window.location.search);
                if (search) {
                    params.set("search", search);
                    params.set("page", "1"); // Reset lại về trang đầu tiên
                } else {
                    params.delete("search");
                    params.set("page", "1");
                }
                router.push(`${url}?${params.toString()}`);
            }, 500),
        [router, url],
    );

    // Kích hoạt debounce mỗi khi keyword thay đổi
    useEffect(() => {
        debouncedSearch(keyword);
        return () => {
            debouncedSearch.cancel();
        };
    }, [keyword, debouncedSearch]);

    return {
        keyword,
        setKeyword,
    };
};

export default useSearch;

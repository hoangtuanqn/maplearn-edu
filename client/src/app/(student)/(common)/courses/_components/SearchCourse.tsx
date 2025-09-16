"use client";

import { Input } from "~/components/ui/input";
import useSearch from "~/hooks/useSearch";

const SearchCourse = ({ url }: { url: string }) => {
    const { keyword, setKeyword } = useSearch(url);
    return (
        <div className="w-full">
            <Input
                className="bg-white"
                placeholder="Tìm kiếm từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
};

export default SearchCourse;

"use client";

import { Input } from "~/components/ui/input";
import useSearch from "~/hooks/useSearch";
import { FilterPosts } from "./FilterPosts";
// import SearchAdvanceModal from "./SearchAdvance";

const SearchPosts = () => {
    const { keyword, setKeyword } = useSearch("/posts");

    return (
        <div className="mb-5 ml-auto flex w-md max-w-full gap-2">
            <div className="w-full">
                <Input
                    className="bg-white"
                    placeholder="Tìm kiếm bài viết theo từ khóa"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <FilterPosts />
            {/* <SearchAdvanceModal /> */}
        </div>
    );
};

export default SearchPosts;

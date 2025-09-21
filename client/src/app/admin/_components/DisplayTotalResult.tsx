import React from "react";

const DisplayTotalResult = ({ total }: { total: number }) => {
    return (
        <div className="mb-4 flex items-center justify-between">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 shadow">
                Tìm thấy <span className="font-bold">{total}</span> kết quả
            </span>
        </div>
    );
};

export default DisplayTotalResult;

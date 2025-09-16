import React from "react";
import Skeleton from "react-loading-skeleton";

const TableSkeleton = ({ col }: { col: number }) => {
    return (
        <tr className="odd:bg-white even:bg-gray-100">
            {Array.from({ length: col - 1 }).map((_, index) => (
                <td key={index} className="px-6 py-4">
                    <Skeleton width={index === 0 ? 50 : 100} />
                </td>
            ))}

            <td className="px-6 py-4 text-end">
                <Skeleton width={100} />
            </td>
        </tr>
    );
};

export default TableSkeleton;

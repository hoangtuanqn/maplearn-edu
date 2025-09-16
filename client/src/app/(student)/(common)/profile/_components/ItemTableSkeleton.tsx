import React from "react";
import Skeleton from "react-loading-skeleton";

const ItemTableSkeleton = ({ cols, rows }: { cols: number; rows: number }) => {
    return (
        <>
            {[...Array(rows).keys()].map((_, rowIndex) => (
                <tr
                    key={rowIndex}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                >
                    {[...Array(cols).keys()].map((_, colIndex) => (
                        <td
                            key={colIndex}
                            className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-neutral-200"
                        >
                            <Skeleton width={80} height={20} />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default ItemTableSkeleton;

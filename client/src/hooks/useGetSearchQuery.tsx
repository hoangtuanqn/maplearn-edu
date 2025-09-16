"use client";

import { useSearchParams } from "next/navigation";

const useGetSearchQuery = <T extends readonly string[]>(fields: T): { [K in T[number]]: string } => {
    const searchParams = useSearchParams();
    const result = {} as { [K in T[number]]: string };

    fields.forEach((field) => {
        const value = searchParams.get(field);
        result[field as T[number]] = value ?? "";
    });

    return result;
};

export default useGetSearchQuery;

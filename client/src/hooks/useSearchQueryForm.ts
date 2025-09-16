"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type SortDirection = "asc" | "desc";

export function useSearchQueryFormSort(allowedFields: string[]) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [formValues, setFormValues] = useState<Record<string, SortDirection>>({});

    // Khi load lần đầu, lấy giá trị từ URL
    useEffect(() => {
        const sortParam = searchParams.get("sort");
        if (!sortParam) return;

        const entries: [string, SortDirection][] = sortParam
            .split(",")
            .map((field) => {
                const isDesc = field.startsWith("-");
                const key = isDesc ? field.slice(1) : field;
                if (!allowedFields.includes(key)) return null;
                return [key, isDesc ? "desc" : "asc"];
            })
            .filter(Boolean) as [string, SortDirection][];

        setFormValues(Object.fromEntries(entries));
    }, [searchParams, allowedFields]);

    const setFieldValue = (key: string, direction: SortDirection) => {
        if (!allowedFields.includes(key)) return;
        setFormValues((prev) => ({ ...prev, [key]: direction }));
    };

    const removeField = (key: string) => {
        setFormValues((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
    };

    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams.toString());

        const sortString = Object.entries(formValues)
            .map(([key, dir]) => (dir === "desc" ? `-${key}` : key))
            .join(",");
        if (params.get("page")) {
            params.set("page", "1");
        }
        if (sortString) {
            params.set("sort", sortString);
        } else {
            params.delete("sort");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return {
        formValues,
        setFieldValue,
        removeField,
        handleSubmit,
    };
}

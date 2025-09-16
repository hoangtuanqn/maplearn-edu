// Do tuấn code
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Directive = "sort" | "filter" | "filterMultiple";
type FilterQueryType = {
    sort: Record<string, string>;
    filterMultiple: Record<string, string[]>;
    filter: Record<string, string>;
};
const initialValue = {
    sort: {},
    filterMultiple: {},
    filter: {},
};
export function useFilterQuery<const Fields extends readonly string[]>(allowedFields: Fields) {
    type FieldKey = Fields[number]; // lấy giá trị từ tuple
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [formValues, setFormValues] = useState<FilterQueryType>(initialValue);
    const isFiltered = Object.values(formValues).some((value) => {
        const check = Object.values(value).some((v) => {
            switch (typeof v) {
                case "object":
                    return v.length > 0;
                case "string":
                    return v ? true : false;
            }

            return false;
        });
        return check;
    });

    const resetFields = () => {
        setFormValues(initialValue);
    };

    // Loại bỏ những trường không hợp lệ từ allowedFields
    /**
     * Quy định query như sau:
     * sort=value,value2,value3 => Cách nhau bởi dấu phẩy sẽ thuộc về sort
     * filter=value => Thuộc về filter
     * key=value1,value2 => Cách nhau bởi dấu phẩy sẽ thuộc về filterMultiple (key phải khác sort và filter)
     */
    // Lấy giá trị từ searchParams và cập nhật formValues
    useEffect(() => {
        const newFormValues: FilterQueryType = { sort: {}, filterMultiple: {}, filter: {} };
        for (const [key, value] of searchParams.entries()) {
            if (allowedFields.includes(key) || key === "sort") {
                if (key === "sort") {
                    // VD: sort=created_at,-download_count thì created_at=created_at và download_count=-download_count sẽ được tách ra
                    const sortValues = value.split(",");
                    for (const sortValue of sortValues) {
                        const isDesc = sortValue.startsWith("-");
                        const field = isDesc ? sortValue.slice(1) : sortValue;
                        if (allowedFields.includes(field)) {
                            newFormValues.sort[field] = sortValue;
                        }
                    }
                } else if (!value.includes(",")) {
                    // key == filter thì trong value sẽ ko có dấu phẩy. VD: price=1000, teacher=John
                    newFormValues.filter[key] = value;
                } else {
                    newFormValues.filterMultiple[key] = value.split(",");
                }
            }
        }
        setFormValues(newFormValues);
    }, [searchParams, allowedFields]);
    const setFieldValue = (key: FieldKey, value: string | string[], directive: Directive) => {
        if (!allowedFields.includes(key)) return;
        setFormValues((prev) => ({ ...prev, [directive]: { ...prev[directive], [key]: value } }));
    };
    const handleSubmit = () => {
        const params = new URLSearchParams(searchParams.toString());
        // Mỗi khi filter cần set về lại = 1
        if (params.has("page")) {
            params.set("page", "1");
        }
        for (const [key, value] of Object.entries(formValues)) {
            if (key === "sort") {
                let query = "";
                for (const sort of Object.entries(value)) {
                    query += `${sort[1]},`;
                }
                if (query) {
                    if (params.has("sort")) {
                        params.set("sort", query.slice(0, -1));
                    } else {
                        params.append("sort", query.slice(0, -1));
                    }
                } else {
                    params.delete("sort");
                }
            }
            if (key === "filterMultiple") {
                for (const [key2, value2] of Object.entries(value)) {
                    if (value2.length === 0) {
                        params.delete(key2);
                        continue;
                    }
                    let value = value2.join(",");
                    // Nếu chỉ có 1 giá trị thì thêm dấu , phía sau (để nhận biết value này thuộc key số nhiều)
                    if (value2.length === 1) {
                        value += ",";
                    }
                    if (value)
                        if (params.has(key2)) {
                            params.set(key2, value);
                        } else {
                            params.append(key2, value);
                        }
                }
            }
            if (key === "filter") {
                for (const [key2, value2] of Object.entries(value)) {
                    if (value2) {
                        if (params.has(key2)) {
                            params.set(key2, value2);
                        } else {
                            params.append(key2, value2);
                        }
                    } else {
                        params.delete(key2);
                    }
                }
            }
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    return {
        resetFields,
        isFiltered,
        formValues,
        setFieldValue,
        handleSubmit,
    };
}

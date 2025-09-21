"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { difficulties } from "~/apiRequest/exam";
import { ChevronDown, Search, Filter } from "lucide-react";
import MultiSelectDropdown from "../../../_components/MultiSelectDropdown";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import { useRouter } from "next/navigation";
import { subjectsMock } from "~/mockdata/subject.data";
import { examCategories } from "~/mockdata/exam/examCategories.data";
import { provinces } from "~/mockdata/other/provinces.data";

const fields = ["provinces", "search", "subject", "categories", "difficulties"] as const;
const FilterExam = () => {
    const router = useRouter();
    const { formValues, setFieldValue, handleSubmit, isFiltered, resetFields } = useFilterQuery(fields);
    const [resetKey, setResetKey] = useState(0);

    return (
        <div className="scrollbar sticky top-20 h-fit max-h-[85vh] overflow-y-auto rounded-xl border border-gray-100 bg-white px-6 py-5 shadow-sm lg:w-96">
            {/* Search Section */}
            <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                    <Search className="text-primary h-4 w-4" />
                    <h2 className="text-primary text-base font-semibold">Tìm kiếm</h2>
                </div>
                <Input
                    name="search"
                    placeholder="Tìm kiếm đề thi..."
                    value={formValues.filter.search ?? ""}
                    onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                    className="focus:border-primary focus:ring-primary/20 border-gray-200"
                />
            </div>

            <div className="space-y-6" key={resetKey}>
                <div className="mb-4 flex items-center gap-2">
                    <Filter className="text-primary h-4 w-4" />
                    <h2 className="text-primary text-base font-semibold">Bộ lọc</h2>
                </div>

                {/* Subject Filter */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <span className="font-medium text-gray-800">Môn học</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-50 focus:outline-none"
                        >
                            <ChevronDown className="size-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {subjectsMock.map((subject) => (
                            <div key={subject.slug} className="flex items-center gap-2">
                                <Checkbox
                                    id={subject.name}
                                    checked={formValues.filterMultiple.subject?.includes(subject.name) || false}
                                    onCheckedChange={(checked) => {
                                        const current = formValues.filterMultiple.subject || [];
                                        if (checked) {
                                            setFieldValue(
                                                "subject",
                                                [...current.filter((s) => s !== ""), subject.name],
                                                "filterMultiple",
                                            );
                                        } else {
                                            setFieldValue(
                                                "subject",
                                                current.filter((s) => s !== subject.name && s !== ""),
                                                "filterMultiple",
                                            );
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor={subject.name}
                                    className="w-full cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                                >
                                    {subject.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <span className="font-medium text-gray-800">Phân loại đề</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-50 focus:outline-none"
                        >
                            <ChevronDown className="size-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {examCategories.map((category) => (
                            <div key={category.slug} className="flex items-center gap-2">
                                <Checkbox
                                    id={category.slug}
                                    checked={formValues.filterMultiple.categories?.includes(category.slug) || false}
                                    onCheckedChange={(checked) => {
                                        const current = formValues.filterMultiple.categories || [];
                                        if (checked) {
                                            setFieldValue(
                                                "categories",
                                                [...current.filter((s) => s !== ""), category.slug],
                                                "filterMultiple",
                                            );
                                        } else {
                                            setFieldValue(
                                                "categories",
                                                current.filter((s) => s !== category.slug && s !== ""),
                                                "filterMultiple",
                                            );
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor={category.name}
                                    className="w-full cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                                >
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <span className="font-medium text-gray-800">Độ khó</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-50 focus:outline-none"
                        >
                            <ChevronDown className="size-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {difficulties.map((difficulty) => (
                            <div key={difficulty.id} className="flex items-center gap-2">
                                <Checkbox
                                    id={difficulty.slug}
                                    checked={formValues.filterMultiple.difficulties?.includes(difficulty.slug) || false}
                                    onCheckedChange={(checked) => {
                                        const current = formValues.filterMultiple.difficulties || [];
                                        if (checked) {
                                            setFieldValue(
                                                "difficulties",
                                                [...current.filter((s) => s !== ""), difficulty.slug],
                                                "filterMultiple",
                                            );
                                        } else {
                                            setFieldValue(
                                                "difficulties",
                                                current.filter((s) => s !== difficulty.slug && s !== ""),
                                                "filterMultiple",
                                            );
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor={difficulty.slug}
                                    className="w-full cursor-pointer text-sm text-gray-700 hover:text-gray-900"
                                >
                                    {difficulty.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Province Filter */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary h-2 w-2 rounded-full"></div>
                            <span className="font-medium text-gray-800">Tỉnh/Thành phố</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-50 focus:outline-none"
                        >
                            <ChevronDown className="size-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="mt-4 w-full space-y-3">
                        <MultiSelectDropdown
                            onChange={(value) => setFieldValue("provinces", value, "filter")}
                            label="Tỉnh / Thành phố ra đề"
                            values={formValues.filterMultiple.province || []}
                            options={provinces.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
                <Button
                    variant="outline"
                    disabled={!isFiltered}
                    onClick={() => {
                        if (isFiltered) {
                            resetFields();
                            setResetKey((prev) => prev + 1);
                            router.push("/exams");
                        }
                    }}
                    className="flex-1 border-gray-200 py-3 hover:bg-gray-50"
                >
                    Đặt lại
                </Button>

                <Button
                    onClick={handleSubmit}
                    disabled={!isFiltered}
                    className="bg-primary hover:bg-primary/90 flex-1 py-3 text-white"
                >
                    Xác nhận lọc
                </Button>
            </div>
        </div>
    );
};

export default FilterExam;

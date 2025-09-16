"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { difficulties } from "~/apiRequest/exam";
import { ChevronDown, GraduationCap } from "lucide-react";
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
        <div className="top-[70px] h-fit rounded-xl bg-white px-6 py-4 shadow-sm lg:sticky lg:w-96">
            <div className="mb-6">
                <h2 className="text-primary mb-2 text-base font-bold">Tìm kiếm</h2>
                <Input
                    name="search"
                    placeholder="Tìm kiếm đề thi ...."
                    value={formValues.filter.search ?? ""}
                    onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                />
            </div>
            <div className="space-y-6" key={resetKey}>
                <h2 className="text-primary mb-3 text-base font-bold">Bộ lọc</h2>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="size-5" />
                            <span className="font-semibold text-gray-800">Môn học</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronDown className="size-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <>
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
                                    <Label htmlFor={subject.name} className="w-full text-sm text-gray-700">
                                        {subject.name}
                                    </Label>
                                </div>
                            ))}
                        </>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="size-5" />
                            <span className="font-semibold text-gray-800">Phân loại đề</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronDown className="size-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <>
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
                                    <Label htmlFor={category.name} className="w-full text-sm text-gray-700">
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="size-5" />
                            <span className="font-semibold text-gray-800">Độ khó</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronDown className="size-5 text-gray-500" />
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
                                <Label htmlFor={difficulty.slug} className="w-full text-sm text-gray-700">
                                    {difficulty.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-[15.725px]">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="size-5" />
                            <span className="font-semibold text-gray-800">Tỉnh/Thành phố</span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center rounded-md px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none"
                        >
                            <ChevronDown className="size-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="mt-4 w-full space-y-3">
                        <MultiSelectDropdown
                            onChange={(value) => setFieldValue("provinces", value, "filter")}
                            label="Tỉnh / Thành phố ra đề"
                            // Chuyển value từ dạng 1,2,3 sang mảng
                            values={formValues.filterMultiple.province || []}
                            options={provinces.map((item) => ({
                                label: item.name,
                                value: item.name,
                            }))}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 flex gap-2 border-t border-gray-200 pt-4">
                <Button
                    className="flex-1 py-4"
                    variant={"outline"}
                    disabled={!isFiltered}
                    onClick={() => {
                        if (isFiltered) {
                            resetFields();
                            setResetKey((prev) => prev + 1);
                            router.push("/exams"); // Reset URL to base path
                        }
                    }}
                >
                    Đặt lại
                </Button>

                <Button className="bg-primary flex-1 py-4 text-white" onClick={handleSubmit} disabled={!isFiltered}>
                    Xác nhận lọc
                </Button>
            </div>
        </div>
    );
};

export default FilterExam;

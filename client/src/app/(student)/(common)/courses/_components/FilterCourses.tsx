"use client";
import { Funnel } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { usePathname } from "next/navigation";
import MultiSelectDropdown from "../../../_components/MultiSelectDropdown";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import { useQuery } from "@tanstack/react-query";
import teacherApi from "~/apiRequest/teachers";
const fields = [
    "created_at",
    "rating",
    "enrollment_count",
    "price_range",
    "duration",
    "teachers",
    "is_active",
] as const;
export function FilterCourses() {
    const { data: teachers = [], isLoading } = useQuery({
        queryKey: ["user", "teachers"],
        queryFn: teacherApi.getTeachers,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
    };

    const handleOnChangeTeacher = (value: string[]) => {
        setFieldValue("teachers", value, "filterMultiple");
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <Funnel />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm và lọc khóa học</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Grid 2 cột cho thời gian và đánh giá */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Thời gian tạo */}
                            <div className="grid gap-3">
                                <Label>Thời gian</Label>
                                <Select
                                    value={formValues.sort.created_at || "-created_at"}
                                    onValueChange={(value) => setFieldValue("created_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo thời gian" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="-created_at">Mới nhất</SelectItem>
                                            <SelectItem value="created_at">Cũ nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Đánh giá */}
                            <div className="grid gap-3">
                                <Label>Đánh giá</Label>
                                <Select
                                    value={formValues.filter.rating || ""}
                                    onValueChange={(value) => setFieldValue("rating", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo đánh giá" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="4.5">Trên 4.5 sao</SelectItem>
                                            <SelectItem value="4">Trên 4 sao</SelectItem>
                                            <SelectItem value="3.5">Trên 3.5 sao</SelectItem>
                                            {/* <SelectItem value="most-reviewed">Được đánh giá nhiều nhất</SelectItem> */}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Số lượng mua */}
                            <div className="grid gap-3">
                                <Label>Số học sinh tham gia</Label>
                                <Select
                                    value={formValues.sort.enrollment_count || ""}
                                    onValueChange={(value) => setFieldValue("enrollment_count", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo số học sinh tham gia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="enrollment_count">Tăng dần</SelectItem>
                                            <SelectItem value="-enrollment_count">Giảm dần</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Giá tiền - Radio Group */}
                            <div className="grid gap-3">
                                <Label>Giá tiền</Label>
                                <Select
                                    value={formValues.filter.price_range || ""}
                                    onValueChange={(value) => setFieldValue("price_range", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo giá tiền" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="free">Miễn phí</SelectItem>
                                            <SelectItem value="under-500k">Dưới 500.000đ</SelectItem>
                                            <SelectItem value="500k-1m">500.000đ - 1.000.000đ</SelectItem>
                                            <SelectItem value="1m-2m">1.000.000đ - 2.000.000đ</SelectItem>
                                            <SelectItem value="above-2m">Trên 2.000.000đ</SelectItem>
                                            <SelectItem value="asc">Giá thấp đến cao</SelectItem>
                                            <SelectItem value="desc">Giá cao đến thấp</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label>Chọn giáo viên dạy</Label>
                            {!isLoading && (
                                <MultiSelectDropdown
                                    onChange={handleOnChangeTeacher}
                                    label="Giáo viên"
                                    // Chuyển value từ dạng 1,2,3 sang mảng
                                    values={
                                        formValues.filterMultiple.teachers
                                            ? String(formValues.filterMultiple.teachers).split(",")
                                            : []
                                    }
                                    options={teachers.map((teacher) => ({
                                        label: String(teacher.full_name),
                                        value: String(teacher.id),
                                    }))}
                                />
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                    id="toggle-2"
                                    checked={formValues.filter.is_active === "true"}
                                    onCheckedChange={(checked) =>
                                        setFieldValue("is_active", checked ? "true" : "false", "filter")
                                    }
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                    <p className="text-sm leading-none font-medium">
                                        Chỉ hiện thị khóa học đang diễn ra
                                    </p>
                                    <p className="text-muted-foreground text-sm">Ẩn các khóa học chưa bắt đầu.</p>
                                </div>
                            </Label>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa bộ lọc
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                                Áp dụng bộ lọc
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

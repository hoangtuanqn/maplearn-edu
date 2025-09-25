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
import { Label } from "~/components/ui/label";
import { usePathname } from "next/navigation";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import { Input } from "~/components/ui/input";

const fields = ["search", "enrolled_at", "completion_status", "progress_range"] as const;

// Progress ranges
const progressRanges = [
    { value: "0-25", label: "0% - 25%" },
    { value: "26-50", label: "26% - 50%" },
    { value: "51-75", label: "51% - 75%" },
    { value: "76-99", label: "76% - 99%" },
    { value: "100", label: "100% (Hoàn thành)" },
];

// Completion status
const completionStatuses = [
    { value: "in_progress", label: "Đang học" },
    { value: "completed", label: "Đã hoàn thành" },
    { value: "not_passed_exam", label: "Chưa đạt bài thi" },
    { value: "waiting_certificate", label: "Chờ cấp chứng chỉ" },
];

export function FilterCourses() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
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
                        <DialogTitle>Tìm kiếm và lọc học viên</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm học viên đăng ký khóa học bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Tìm kiếm học viên */}
                        <div className="grid gap-3">
                            <Label>Tìm kiếm học viên</Label>
                            <Input
                                type="text"
                                placeholder="Nhập tên, email học viên..."
                                value={formValues.filter.search || ""}
                                onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                            />
                        </div>

                        {/* Grid 2 cột cho thời gian đăng ký và trạng thái */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Thời gian đăng ký */}
                            <div className="grid gap-3">
                                <Label>Thời gian đăng ký</Label>
                                <Select
                                    value={formValues.sort.enrolled_at || "-enrolled_at"}
                                    onValueChange={(value) => setFieldValue("enrolled_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo thời gian đăng ký" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="-enrolled_at">Mới nhất</SelectItem>
                                            <SelectItem value="enrolled_at">Cũ nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Trạng thái học tập */}
                            <div className="grid gap-3">
                                <Label>Trạng thái học tập</Label>
                                <Select
                                    value={formValues.filter.completion_status || ""}
                                    onValueChange={(value) => setFieldValue("completion_status", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn trạng thái học tập" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Trạng thái</SelectLabel>
                                            {completionStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tiến độ học tập */}
                        <div className="grid gap-3">
                            <Label>Tiến độ học tập</Label>
                            <Select
                                value={formValues.filter.progress_range || ""}
                                onValueChange={(value) => setFieldValue("progress_range", value, "filter")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn khoảng tiến độ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Tiến độ</SelectLabel>
                                        {progressRanges.map((range) => (
                                            <SelectItem key={range.value} value={range.value}>
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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

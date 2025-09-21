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

const fields = [
    "search",
    "started_at",
    "score",
    "min_score",
    "max_score",
    "status",
    "violation_count",
    "time_spent",
    "full_name",
] as const;

// Trạng thái làm bài
const examStatuses = [
    { value: "in_progress", label: "Đang làm" },
    { value: "submitted", label: "Đã nộp bài" },
    { value: "detected", label: "Phát hiện vi phạm" },
    { value: "canceled", label: "Đã hủy" },
];

// Mức độ vi phạm
const violationLevels = [
    { value: "0", label: "Không vi phạm" },
    { value: "1-2", label: "Vi phạm nhẹ (1-2 lần)" },
    { value: "3+", label: "Vi phạm nhiều (3+ lần)" },
];

export function FilterAttemptExams() {
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
                        <DialogTitle>Lọc lịch sử làm bài thi</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm kết quả làm bài thi theo các tiêu chí phù hợp.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Tìm kiếm chung */}
                        <div className="grid gap-3">
                            <Label>Tìm kiếm</Label>
                            <Input
                                type="text"
                                placeholder="Tên đề thi..."
                                value={formValues.filter.search || ""}
                                onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                            />
                        </div>

                        {/* Grid 2 cột cho thời gian và tên học sinh */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Sắp xếp theo thời gian */}
                            <div className="grid gap-3">
                                <Label>Sắp xếp theo thời gian</Label>
                                <Select
                                    value={formValues.sort.started_at || "-started_at"}
                                    onValueChange={(value) => setFieldValue("started_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo thời gian làm bài" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Thời gian làm bài</SelectLabel>
                                            <SelectItem value="-started_at">Mới nhất</SelectItem>
                                            <SelectItem value="started_at">Cũ nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tên học sinh */}
                            <div className="grid gap-3">
                                <Label>Tên học sinh</Label>
                                <Input
                                    type="text"
                                    placeholder="Nhập tên học sinh..."
                                    value={formValues.filter.full_name || ""}
                                    onChange={(e) => setFieldValue("full_name", e.target.value, "filter")}
                                />
                            </div>
                        </div>

                        {/* Grid 2 cột cho điểm số */}
                        <div className="grid gap-4 lg:grid-cols-3">
                            <div className="grid gap-3">
                                <Label>Sắp xếp theo điểm</Label>
                                <Select
                                    value={formValues.sort.score || ""}
                                    onValueChange={(value) => setFieldValue("score", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo điểm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Điểm số</SelectLabel>
                                            <SelectItem value="-score">Điểm cao nhất</SelectItem>
                                            <SelectItem value="score">Điểm thấp nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Label>Điểm tối thiểu</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={formValues.filter.min_score || ""}
                                    onChange={(e) => setFieldValue("min_score", e.target.value, "filter")}
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label>Điểm tối đa</Label>
                                <Input
                                    type="number"
                                    placeholder="10"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={formValues.filter.max_score || ""}
                                    onChange={(e) => setFieldValue("max_score", e.target.value, "filter")}
                                />
                            </div>
                        </div>

                        {/* Grid 2 cột cho trạng thái và vi phạm */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Trạng thái làm bài */}
                            <div className="grid gap-3">
                                <Label>Trạng thái làm bài</Label>
                                <Select
                                    value={formValues.filter.status || ""}
                                    onValueChange={(value) => setFieldValue("status", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Trạng thái</SelectLabel>
                                            {examStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Mức độ vi phạm */}
                            <div className="grid gap-3">
                                <Label>Mức độ vi phạm</Label>
                                <Select
                                    value={formValues.filter.violation_count || ""}
                                    onValueChange={(value) => setFieldValue("violation_count", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn mức độ vi phạm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Vi phạm</SelectLabel>
                                            {violationLevels.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Thời gian làm bài */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-3">
                                <Label>Tổng phút làm bài</Label>
                                <Select
                                    value={formValues.sort.time_spent || ""}
                                    onValueChange={(value) => setFieldValue("time_spent", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tổng phút làm bài" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Thời gian hoàn thành</SelectLabel>
                                            <SelectItem value="-time_spent">Lâu nhất</SelectItem>
                                            <SelectItem value="time_spent">Nhanh nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Label>Ghi chú</Label>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <p>• Điểm số: 0-10 (có thể nhập số thập phân)</p>
                                    <p>• Tìm kiếm: Tên học sinh hoặc tên đề thi</p>
                                    <p>• Vi phạm: Số lần vi phạm quy tắc làm bài</p>
                                </div>
                            </div>
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

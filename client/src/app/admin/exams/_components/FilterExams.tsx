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
import { subjectsMock } from "~/mockdata/subject.data";
import { examCategories } from "~/mockdata/exam/examCategories.data";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { provinces } from "~/mockdata/other/provinces.data";
import { Input } from "~/components/ui/input";
const fields = ["search", "created_at", "subject", "exam_category", "grade_level", "province", "difficulty"] as const;

// Difficulty levels
const difficultyLevels = [
    { value: "easy", label: "Dễ" },
    { value: "normal", label: "Trung bình" },
    { value: "hard", label: "Khó" },
    { value: "very_hard", label: "Rất khó" },
];
export function FilterExams() {
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
                        <DialogTitle>Tìm kiếm và lọc đề thi</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Input */}
                        <div className="grid gap-3">
                            <Label>Tên đề thi</Label>
                            <Input
                                type="text"
                                placeholder="Nhập từ khóa..."
                                value={formValues.filter.search || ""}
                                onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                            />
                        </div>
                        {/* Grid 2 cột cho thời gian và môn học */}
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

                            {/* Môn học */}
                            <div className="grid gap-3">
                                <Label>Môn học</Label>
                                <Select
                                    value={formValues.filter.subject || ""}
                                    onValueChange={(value) => setFieldValue("subject", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn môn học" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Môn học</SelectLabel>
                                            {subjectsMock.map((subject) => (
                                                <SelectItem key={subject.slug} value={subject.slug}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Loại đề thi */}
                            <div className="grid gap-3">
                                <Label>Loại đề thi</Label>
                                <Select
                                    value={formValues.filter.exam_category || ""}
                                    onValueChange={(value) => setFieldValue("exam_category", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn loại đề thi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Loại đề thi</SelectLabel>
                                            {examCategories.map((category) => (
                                                <SelectItem key={category.slug} value={category.slug}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cấp bậc */}
                            <div className="grid gap-3">
                                <Label>Cấp bậc</Label>
                                <Select
                                    value={formValues.filter.grade_level || ""}
                                    onValueChange={(value) => setFieldValue("grade_level", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn cấp bậc" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Cấp bậc</SelectLabel>
                                            {gradeLevelsMock.map((level) => (
                                                <SelectItem key={level.slug} value={level.slug}>
                                                    {level.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Tỉnh thành */}
                            <div className="grid gap-3">
                                <Label>Tỉnh thành</Label>
                                <Select
                                    value={formValues.filter.province || ""}
                                    onValueChange={(value) => setFieldValue("province", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn tỉnh thành" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tỉnh thành</SelectLabel>
                                            {provinces.map((province) => (
                                                <SelectItem key={province.name} value={province.name}>
                                                    {province.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Độ khó */}
                            <div className="grid gap-3">
                                <Label>Độ khó</Label>
                                <Select
                                    value={formValues.filter.difficulty || ""}
                                    onValueChange={(value) => setFieldValue("difficulty", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn độ khó" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Độ khó</SelectLabel>
                                            {difficultyLevels.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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

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
import MultiSelectDropdown from "../../../_components/MultiSelectDropdown";

import { subjectsMock } from "~/mockdata/subject.data";
const fields = ["created_at", "views", "courses"] as const;
export function FilterPosts() {
    const pathName = usePathname();

    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);
    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
    };

    const handleOnChangeCourse = (value: string[]) => {
        setFieldValue("courses", value, "filterMultiple");
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="view_tooltip bg-white" data-tooltip-content={"Tìm kiếm thêm"}>
                        <Funnel />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tìm kiếm bài viết</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm bài viết nhanh chóng bằng cách nhập thông tin bên dưới.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3 lg:grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Ngày đăng</Label>
                                <Select
                                    value={formValues.sort.created_at || ""}
                                    onValueChange={(value) => setFieldValue("created_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo" />
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
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Lượt xem</Label>
                                <Select
                                    value={formValues.sort.views || ""}
                                    onValueChange={(value) => setFieldValue("views", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Sắp xếp theo</SelectLabel>
                                            <SelectItem value="-views">Giảm dần</SelectItem>
                                            <SelectItem value="views">Tăng dần</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label>Môn học liên quan</Label>

                            <MultiSelectDropdown
                                onChange={handleOnChangeCourse}
                                label="Môn học liên quan"
                                // Chuyển value từ dạng 1,2,3 sang mảng
                                values={
                                    formValues.filterMultiple.courses
                                        ? String(formValues.filterMultiple.courses).split(",")
                                        : []
                                }
                                options={subjectsMock.map((subject) => ({
                                    label: String(subject.name),
                                    value: String(subject.slug),
                                }))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa tìm kiếm
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                                Lọc
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import courseAdminApi from "~/apiRequest/admin/course";
import SingleSelectDropdown from "~/app/(student)/_components/SingleSelectDropdown";
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
import { Label } from "~/components/ui/label";

export function CompareOtherStudentDialog({ slug, idCurrentStudent }: { slug: string; idCurrentStudent: string }) {
    const [idStudent, setIdStudent] = useState("0");
    const router = useRouter();
    // get học sinh của khóa học
    let { data: students } = useQuery({
        queryKey: ["students", slug],
        queryFn: async () => {
            const res = await courseAdminApi.getAllStudents(slug);
            return res.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    if (!students) return;
    // loại bỏ chính mình
    students = students.filter((student) => String(student.id) !== idCurrentStudent);
    const handleSubmit = () => {
        if (idStudent === "0") {
            toast.error("Vui lòng chọn học sinh để so sánh!");
            return;
        }
        // chuyển hướng sang trang so sánh
        router.push(`/admin/courses/${slug}/${idCurrentStudent}/compare/${idStudent}`);
        toast.success("Đang chuyển hướng...");
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>So sánh với học sinh khác</Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>So sánh với học sinh khác</DialogTitle>
                        <DialogDescription>Chọn học sinh bạn muốn so sánh tiến độ học tập.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Chọn học sinh</Label>
                            <SingleSelectDropdown
                                onChange={setIdStudent}
                                label="Chọn học sinh của bạn"
                                value={idStudent}
                                options={students.map((student) => {
                                    return {
                                        label: student.full_name + " - " + student.email,
                                        value: String(student.id),
                                    };
                                })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Hủy thao tác</Button>
                        </DialogClose>
                        <Button type="submit" variant={"primary"} onClick={handleSubmit} disabled={idStudent === "0"}>
                            So sánh
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

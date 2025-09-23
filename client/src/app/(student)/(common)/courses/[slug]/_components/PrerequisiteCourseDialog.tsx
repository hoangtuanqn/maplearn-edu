"use client";

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

import { CourseGetDetailResponse } from "~/schemaValidate/course.schema";
import DisplayCourse from "~/app/(student)/_components/Courses/DisplayCourse";
import { PaymentMethodsDialog } from "./PaymentMethodsDialog";

export function PrerequisiteCourseDialog({ course }: { course: CourseGetDetailResponse["data"] }) {
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button className="text-primary mt-2 w-full" variant={"outline"}>
                            {course.price === 0 ? "Tham gia khóa học" : "Mua ngay"}
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-white sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="leading-7">Yêu cầu kiến thức tiên quyết</DialogTitle>
                            <DialogDescription>
                                Bạn không nhất thiết phải hoàn tất hết nội dung khóa học bên dưới, nhưng cần có tất cả
                                kiến thức về nội dung bên dưới để hiểu tốt hơn khóa học này.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-4">
                            <DisplayCourse course={course.prerequisite_course!} />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Đóng</Button>
                            </DialogClose>
                            <PaymentMethodsDialog course={course} isCheckPrerequisite={true} />
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}

"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { PenTool, Clock, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseDetailResponse } from "~/schemaValidate/courseDetail.schema";

interface NotificationExamProps {
    course: CourseDetailResponse["data"];
}

/**
 * Primary-themed Notification for Exam
 * - Uses shadcn/ui tokens (primary, background, ring, muted-foreground)
 * - Accessible roles/labels
 * - Subtle motion via CSS utilities (no extra deps)
 */
export function NotificationExam({ course }: NotificationExamProps) {
    const [open, setOpen] = useState(false);

    const shouldShow = useMemo(
        () =>
            course.percent_completed === 100 &&
            course.code_certificate === null &&
            !!course.exam &&
            course.exam.user_highest_exam_score === null,
        [course],
    );

    useEffect(() => {
        if (!shouldShow) return;
        const t = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(t);
    }, [shouldShow]);

    if (!shouldShow) return null;

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="border-border from-primary/5 max-w-2xl overflow-hidden border bg-gradient-to-b to-white p-0 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-white/90">
                <div className="relative flex flex-col items-center px-7 pt-10 pb-6">
                    {/* Hero Icon */}
                    <div className="bg-primary text-primary-foreground ring-primary/15 animate-in fade-in-50 zoom-in-95 mb-4 grid h-20 w-20 place-content-center rounded-full shadow-lg ring-8">
                        <PenTool className="h-10 w-10 text-white" aria-hidden="true" />
                    </div>

                    <AlertDialogTitle className="text-foreground mb-2 text-center text-2xl font-semibold tracking-tight">
                        🎉 Chúc mừng bạn đã hoàn thành khóa học!
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-muted-foreground mb-4 max-w-md text-center text-sm">
                        Bạn đã hoàn thành tất cả bài học.{" "}
                        <span className="text-primary font-medium">
                            Hãy làm bài kiểm tra cuối khóa để nhận chứng chỉ!
                        </span>
                    </AlertDialogDescription>

                    {/* Info Card */}
                    <div className="border-border bg-card/80 mb-4 w-full rounded-2xl border p-5 shadow-sm">
                        <h4 className="text-foreground mb-3 flex items-center gap-2 text-base font-semibold">
                            <PenTool className="text-primary h-5 w-5" aria-hidden="true" />
                            {course.exam?.title}
                        </h4>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="border-border/60 bg-muted/40 flex flex-col items-center rounded-xl border px-3 py-3">
                                <Clock className="text-primary mb-1 h-5 w-5" aria-hidden="true" />
                                <span className="text-foreground font-semibold">
                                    {course.exam?.duration_minutes} phút
                                </span>
                                <span className="text-muted-foreground text-xs">Thời gian</span>
                            </div>

                            <div className="border-border/60 bg-muted/40 flex flex-col items-center rounded-xl border px-3 py-3">
                                <Target className="text-primary mb-1 h-5 w-5" aria-hidden="true" />
                                <span className="text-foreground font-semibold">
                                    {course.exam?.pass_score}/{course.exam?.max_score}
                                </span>
                                <span className="text-muted-foreground text-xs">Điểm qua</span>
                            </div>

                            <div className="border-border/60 bg-muted/40 flex flex-col items-center rounded-xl border px-3 py-3">
                                <PenTool className="text-primary mb-1 h-5 w-5" aria-hidden="true" />
                                <span className="text-foreground font-semibold">
                                    {course.exam?.question_count} câu hỏi
                                </span>
                                <span className="text-muted-foreground text-xs">Số câu</span>
                            </div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-1 flex w-full gap-2">
                        <Link
                            href={`/exams/${course.exam?.slug}/start`}
                            target="_blank"
                            aria-label="Bắt đầu làm bài kiểm tra"
                            onClick={() => setOpen(false)}
                            className="flex-3/4"
                        >
                            <Button className="h-11 w-full text-base font-semibold text-white shadow-md">
                                <PenTool className="mr-2 h-5 w-5" aria-hidden="true" />
                                Làm bài kiểm tra
                            </Button>
                        </Link>

                        <AlertDialogCancel
                            onClick={() => setOpen(false)}
                            className="text-primary hover:bg-primary/5 h-11 w-full flex-1/4 border"
                        >
                            Để sau
                        </AlertDialogCancel>
                    </div>

                    {/* Decorative ring */}
                    <div className="bg-[radial-gradient(closest-side,theme(colors.primary/15),transparent)] pointer-events-none absolute -inset-x-16 -top-20 h-40" />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

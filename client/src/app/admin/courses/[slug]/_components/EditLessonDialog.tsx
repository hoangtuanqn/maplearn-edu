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
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { Edit } from "lucide-react";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import courseAdminApi from "~/apiRequest/admin/course";
import { formatter } from "~/libs/format";
// Schema validation - giống AddLessonDialog
const editLessonSchema = z.object({
    title: z
        .string()
        .min(15, { message: "Tiêu đề bài học phải có ít nhất 15 ký tự." })
        .max(255, { message: "Tiêu đề không được vượt quá 255 ký tự." }),
    content: z
        .string()
        .min(10, { message: "Nội dung bài học phải có ít nhất 10 ký tự." })
        .max(10000, { message: "Nội dung không được vượt quá 10000 ký tự." })
        .optional(),
    video_url: z.string().url({ message: "Vui lòng nhập URL hợp lệ." }),
    position: z
        .number()
        .min(1, { message: "Vị trí phải lớn hơn 0." })
        .max(30, { message: "Vị trí không được vượt quá 30." }),
    duration: z
        .number()
        .min(60, { message: "Thời lượng phải lớn hơn hoặc bằng 60 giây." })
        .max(86400, { message: "Thời lượng không được vượt quá 86400 giây (24 giờ)." }),
    is_free: z.boolean(),
});

type EditLessonFormData = z.infer<typeof editLessonSchema>;
export function EditLessonDialog({
    lesson,
}: {
    lesson: {
        slug: string;
        title: string;
        content: string;
        position: number;
        duration: number;
        is_free: boolean;
        video_url: string;
    };
}) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const form = useForm<EditLessonFormData>({
        resolver: zodResolver(editLessonSchema),
        defaultValues: {
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.video_url,
            position: lesson.position,
            duration: lesson.duration,
            is_free: lesson.is_free,
        },
    });

    // Mutation for editing lesson
    const editLessonMutation = useMutation({
        mutationFn: async (data: EditLessonFormData) => {
            const res = await courseAdminApi.editLesson(lesson.slug, data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Cập nhật bài học thành công!");
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["course", "chapters"] });
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (values: EditLessonFormData) => {
        editLessonMutation.mutate(values);
    };

    const fillSampleData = () => {
        form.setValue("title", "Tổng hợp kiến thức Vật lý 12");
        form.setValue(
            "content",
            "Trong bài học này, chúng ta sẽ tổng hợp các kiến thức trọng tâm của môn Vật lý lớp 12 như điện xoay chiều, sóng cơ, sóng âm, lượng tử ánh sáng và hạt nhân nguyên tử. Bài học giúp học sinh chuẩn bị tốt cho kỳ thi THPT Quốc gia.",
        );
        form.setValue("video_url", "http://localhost:3000/video.mp4");
        form.setValue("position", lesson.position);
        form.setValue("duration", 2700); // 45 phút
        form.setValue("is_free", false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset({
                title: lesson.title,
                content: lesson.content,
                video_url: lesson.video_url,
                position: lesson.position,
                duration: lesson.duration,
                is_free: lesson.is_free,
            });
        }
    };
    return (
        <>
            {editLessonMutation.isPending && <Loading />}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa bài học</DialogTitle>
                        <DialogDescription>
                            Cập nhật thông tin bài học: <span className="text-primary font-bold">{lesson.title}</span>
                        </DialogDescription>
                        <Button className="mb-2 ml-auto text-white" onClick={fillSampleData}>
                            Điền dữ liệu mẫu
                        </Button>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-4">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tiêu đề bài học *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập tiêu đề bài học..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nội dung ({formatter.number(form.watch("content")?.length || 0)}/10.000)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Nhập nội dung bài học..."
                                                    maxLength={10000}
                                                    rows={4}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Mô tả chi tiết về nội dung bài học (tùy chọn)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="video_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>URL Video</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/video.mp4"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 items-start gap-4">
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vị trí trong chương*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Vị trí bài học..."
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormDescription>Vị trí bài học trong chương</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Thời lượng (giây)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormDescription>Thời lượng bài học tính bằng giây</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="is_free"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    <FormDescription>Được phép học thử</FormDescription>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" disabled={editLessonMutation.isPending}>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={editLessonMutation.isPending}
                                    className="text-white"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    Cập nhật bài học
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

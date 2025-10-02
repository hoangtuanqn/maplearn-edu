"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import courseAdminApi from "~/apiRequest/admin/course";

// Schema validation
const editChapterSchema = z.object({
    title: z
        .string()
        .min(10, { message: "Tên chương phải có ít nhất 10 ký tự." })
        .max(255, { message: "Tên chương không được vượt quá 255 ký tự." }),
    position: z.number().min(1, { message: "Vị trí phải lớn hơn 0." }).max(30, { message: "Vị trí phải nhỏ hơn 30." }),
});

type EditChapterFormData = z.infer<typeof editChapterSchema>;

export function EditChapterButton({
    chapterId,
    nameChapterCourse,
    currentPosition,
}: {
    chapterId: number;
    nameChapterCourse: string;
    currentPosition: number;
}) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const form = useForm<EditChapterFormData>({
        resolver: zodResolver(editChapterSchema),
        defaultValues: {
            title: nameChapterCourse,
            position: currentPosition,
        },
        mode: "onBlur",
    });

    // Mutation for editing chapter
    const editChapterMutation = useMutation({
        mutationFn: async (data: EditChapterFormData) => {
            const res = await courseAdminApi.editChapter(chapterId, data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Cập nhật chương thành công!");
            queryClient.invalidateQueries({ queryKey: ["course", "chapters"] });
            setOpen(false);
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (values: EditChapterFormData) => {
        editChapterMutation.mutate(values);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset({
                title: nameChapterCourse,
                position: currentPosition,
            });
        }
    };

    return (
        <>
            {editChapterMutation.isPending && <Loading />}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Pencil className="h-4 w-4" />
                        Sửa
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa chương</DialogTitle>
                        <DialogDescription>
                            Cập nhật thông tin chương học. Vui lòng điền đầy đủ thông tin.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-4">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên chương</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập tên chương học..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vị trí</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Nhập vị trí chương..."
                                                    {...field}
                                                    min={1}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>
                                                Nếu có hai chương cùng vị trí, chương được thêm sau sẽ hiển thị trước
                                                chương cũ.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" disabled={editChapterMutation.isPending}>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={editChapterMutation.isPending}
                                    className="text-white"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    Cập nhật chương
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}

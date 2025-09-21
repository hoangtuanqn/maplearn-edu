"use client";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { toast } from "sonner";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Tên chương phải có ít nhất 2 ký tự." })
        .max(255, { message: "Tên chương không được vượt quá 255 ký tự." }),
    position: z.number().min(2, { message: "Vị trí phải lớn hơn 0." }),
});

interface FormAddChapterProps {
    courseSlug: string;
    onSuccess?: () => void;
    onCancel?: () => void;
    maxPosition?: number;
}

const FormAddChapter = ({ courseSlug, onSuccess, onCancel, maxPosition = 0 }: FormAddChapterProps) => {
    const queryClient = useQueryClient();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            position: maxPosition + 1,
        },
        mode: "onBlur",
    });

    // Mutation for creating chapter
    const mutationChapter = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            // Replace with your actual API call
            // return chapterApi.createChapter(courseSlug, data);

            // Mock API call for now
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: {
                            data: {
                                id: Date.now(),
                                name: data.name,
                                position: data.position,
                                courseSlug: courseSlug,
                            },
                        },
                    });
                }, 1000);
            });
        },
        onSuccess: () => {
            toast.success("Thêm chương học thành công!");
            form.reset({
                name: "",
                position: maxPosition + 1,
            });
            // Invalidate and refetch course data
            queryClient.invalidateQueries({ queryKey: ["course", courseSlug] });
            onSuccess?.();
        },
        onError: notificationErrorApi,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutationChapter.mutate(values);
    }

    function handleCancel() {
        form.reset();
        onCancel?.();
    }

    return (
        <>
            {mutationChapter.isPending && <Loading />}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Thêm chương mới</h3>
                    <p className="mt-1 text-sm text-gray-500">Tạo chương học mới cho khóa học</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên chương</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên chương học" {...field} />
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
                                                placeholder="Vị trí của chương"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                value={form.watch("position") ?? 1}
                                                min={1}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-3 border-t border-gray-200 pt-4">
                            <Button type="submit" variant="primary" disabled={mutationChapter.isPending}>
                                Thêm chương
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={mutationChapter.isPending}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default FormAddChapter;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import { Input } from "~/components/ui/input";

import { subjectsMock } from "~/mockdata/subject.data";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { examCategories } from "~/mockdata/exam/examCategories.data";
import { provinces } from "~/mockdata/other/provinces.data";
import { useMutation } from "@tanstack/react-query";
import examAdminApi from "~/apiRequest/admin/exam";
import Loading from "~/app/(student)/_components/Loading";
import { QuestionsExamResponse } from "~/schemaValidate/exam.schema";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import formSchema from "../schema/formEditExam.schema";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

const difficultyLevels = [
    { value: "easy", label: "Dễ" },
    { value: "normal", label: "Trung bình" },
    { value: "hard", label: "Khó" },
    { value: "very_hard", label: "Rất khó" },
];

// Only exam info, not questions
const FormEditExam = ({ exam }: { exam: QuestionsExamResponse["data"] }) => {
    // Chuyển pass_score và max_score sang phần trăm (chỉ quy ước 30% = 3, 40% = 4, 50% = 5)
    const percentPassScore = (() => {
        const pass = Number(exam.pass_score);
        const max = Number(exam.max_score);
        const percent = Math.round((pass / max) * 100);
        if (percent >= 50) return 5;
        if (percent >= 40) return 4;
        return 3;
    })();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: exam.title || "",
            exam_category: exam.exam_category,
            subject: exam.subject,
            grade_level: exam.grade_level || "",
            province: exam.province || "",
            difficulty: exam.difficulty || "normal",
            max_score: exam.max_score ?? 10,
            pass_score: percentPassScore ?? 5,
            duration_minutes: exam.duration_minutes ?? 60,
            is_active: exam.status ?? true,
            max_attempts: exam.max_attempts ?? 1,
            is_password_protected: exam.is_password_protected ?? false,
            anti_cheat_enabled: exam.anti_cheat_enabled ?? false,
        },
        mode: "onBlur",
    });

    const mutationEdit = useMutation({
        mutationFn: (data) => examAdminApi.updatePaperExam(exam.slug, data),
        onSuccess: () => {
            toast.success("Cập nhật đề thi thành công");
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: any) => {
        console.log(data);
        mutationEdit.mutate(data);
    };

    return (
        <>
            {mutationEdit.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2 lg:col-span-3">
                                    <FormLabel className="mb-0.5 block">Tên đề thi</FormLabel>
                                    <FormControl>
                                        <Input className="mb-2" placeholder="Nhập tên đề thi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="exam_category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Loại đề thi</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="mb-1">
                                                <SelectValue placeholder="Chọn loại đề thi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {examCategories.map((category) => (
                                                <SelectItem key={category.slug} value={category.slug}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Môn học</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="mb-1">
                                                <SelectValue placeholder="Chọn môn học" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {subjectsMock.map((subject) => (
                                                <SelectItem key={subject.slug} value={subject.slug}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="grade_level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Cấp bậc</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="mb-1">
                                                <SelectValue placeholder="Chọn cấp bậc" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {gradeLevelsMock.map((level) => (
                                                <SelectItem key={level.slug} value={level.slug}>
                                                    {level.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Tỉnh thành</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="mb-1">
                                                <SelectValue placeholder="Chọn tỉnh thành" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {provinces.map((province) => (
                                                <SelectItem key={province.name} value={province.name}>
                                                    {province.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Độ khó</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="mb-1">
                                                <SelectValue placeholder="Chọn độ khó" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {difficultyLevels.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_score"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Điểm tối đa (Thang điểm)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="mb-2"
                                            placeholder="Nhập điểm tối đa"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("max_score") ?? 10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pass_score"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Điểm qua môn</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="mb-1">
                                                    <SelectValue placeholder="Chọn điểm qua môn" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="3">Trên 30%</SelectItem>
                                                <SelectItem value="4">Trên 40%</SelectItem>
                                                <SelectItem value="5">Trên 50%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Thời gian làm bài (phút)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="mb-2"
                                            placeholder="Nhập thời gian (phút)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_attempts"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-0.5 block">Số lần làm tối đa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="mb-2"
                                            placeholder="Số lần làm tối đa"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2 grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="is_password_protected"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked === true)}
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">Mật khẩu đề thi</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Bảo vệ đề thi bằng mật khẩu (TOTP)
                                                </p>
                                            </div>
                                        </Label>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="anti_cheat_enabled"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                            <Checkbox
                                                id="toggle-2"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked === true)}
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">Chống gian lận</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Khóa màn hình của thí sinh khi làm bài
                                                </p>
                                            </div>
                                        </Label>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-6">
                        <Button type="submit" variant="primary" disabled={mutationEdit.isPending}>
                            {mutationEdit.isPending ? "Đang cập nhật..." : "Cập nhật đề thi"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default FormEditExam;

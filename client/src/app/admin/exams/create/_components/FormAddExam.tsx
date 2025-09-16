"use client";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { subjectsMock } from "~/mockdata/subject.data";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import { useMutation } from "@tanstack/react-query";
import examAdminApi from "~/apiRequest/admin/exam";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { useRouter } from "next/navigation";
import { examCategories } from "~/mockdata/exam/examCategories.data";
import { provinces } from "~/mockdata/other/provinces.data";
import SingleSelectDropdown from "~/app/(student)/_components/SingleSelectDropdown";
import formSchema from "../schema/formAddExam.schema";

// Difficulty levels
const difficultyLevels = [
    { value: "easy", label: "Dễ" },
    { value: "normal", label: "Trung bình" },
    { value: "hard", label: "Khó" },
    { value: "very_hard", label: "Rất khó" },
];

type FormData = z.infer<typeof formSchema>;

const FormAddExam = () => {
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            exam_category: "",
            subject: "",
            grade_level: "",
            province: "",
            difficulty: "normal",
            max_score: 10,
            pass_score: 5,
            duration_minutes: 60,
            start_time: "",
            end_time: "",
            description: "",
            instructions: "",
            is_active: true,
            is_shuffle_questions: false,
            is_shuffle_answers: false,
            is_show_result: true,
            is_retakeable: false,
            max_attempts: 1,
        },
    });

    const mutationExam = useMutation({
        mutationFn: examAdminApi.addPaperExam,
        onSuccess: () => {
            router.push("/admin/exams");
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: FormData) => {
        mutationExam.mutate(data);
    };

    return (
        <>
            {mutationExam.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2 lg:col-span-3">
                                    <FormLabel>Tên đề thi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên đề thi" {...field} />
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
                                    <FormLabel>Loại đề thi</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)}>
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormLabel>Môn học</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)}>
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormLabel>Cấp bậc</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)}>
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormLabel>Tỉnh thành</FormLabel>
                                    <SingleSelectDropdown
                                        onChange={field.onChange}
                                        label="Tỉnh thành ra đề"
                                        value={field.value}
                                        options={provinces.map((province) => ({
                                            label: province.name,
                                            value: province.name,
                                        }))}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Độ khó</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)}>
                                        <FormControl>
                                            <SelectTrigger>
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
                                    <FormLabel>Điểm tối đa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập điểm tối đa"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("max_score") ?? 100}
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
                                    <FormLabel>Điểm qua môn</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập điểm qua môn"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("pass_score") ?? 50}
                                        />
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
                                    <FormLabel>Thời gian làm bài (phút)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thời gian (phút)"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("duration_minutes") ?? 60}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="start_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian bắt đầu</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="end_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian đóng đề</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Để trống nếu muốn không giới hạn thời gian đóng đề
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="max_attempts"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số lần làm tối đa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập số lần làm tối đa"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("max_attempts") ?? 1}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả đề thi</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập mô tả chi tiết về đề thi..." rows={3} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end space-x-4 pt-6">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Hủy bỏ
                        </Button>
                        <Button type="submit" variant="primary" disabled={mutationExam.isPending}>
                            {mutationExam.isPending ? "Đang tạo..." : "Tạo đề thi"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default FormAddExam;

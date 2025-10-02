"use client";
import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
import FormAddQuestion from "./FormAddQuestion";
import { toast } from "sonner";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

// Difficulty levels
const difficultyLevels = [
    { value: "easy", label: "Dễ" },
    { value: "normal", label: "Trung bình" },
    { value: "hard", label: "Khó" },
    { value: "very_hard", label: "Rất khó" },
];

// Question interface for type safety
interface QuestionOption {
    content: string;
    is_correct?: boolean;
}

interface Question {
    id: string;
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "DRAG_DROP" | "TRUE_FALSE" | "NUMERIC_INPUT";
    content: string;
    score: number;
    options: QuestionOption[];
    correct_answer?: string[];
    explanation?: string;
}

type FormData = z.infer<typeof formSchema>;

const FormAddExam = () => {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);

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
            is_active: true,
            max_attempts: 1,
            is_password_protected: false,
            anti_cheat_enabled: false,
        },
        mode: "onBlur",
    });

    const mutationExam = useMutation({
        mutationFn: examAdminApi.addPaperExam,
        onSuccess: (data) => {
            router.push(`/admin/exams/${data.data.data.slug}`);
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: FormData) => {
        // Validate total score
        const totalScore = getTotalScore();
        const maxScore = data.max_score || 10;

        if (questions.length === 0) {
            toast.error("Vui lòng thêm ít nhất một câu hỏi");
            return;
        }

        // Strict score validation
        if (totalScore > maxScore) {
            toast.error(
                `Tổng điểm câu hỏi (${totalScore.toFixed(2)}) vượt quá điểm tối đa (${maxScore}). Vui lòng giảm điểm các câu hỏi hoặc tăng điểm tối đa.`,
            );
            return;
        }

        if (Math.abs(totalScore - maxScore) > 0.01) {
            // Allow small floating point differences
            toast.error(
                `Tổng điểm câu hỏi (${totalScore.toFixed(2)}) không bằng điểm tối đa (${maxScore}). Tổng điểm các câu hỏi phải bằng chính xác điểm tối đa của đề thi.`,
            );
            return;
        }

        // Validate each question thoroughly
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const questionNumber = i + 1;

            if (!question.content.trim()) {
                toast.error(`Câu hỏi ${questionNumber}: Vui lòng nhập nội dung câu hỏi`);
                return;
            }

            if (question.score <= 0) {
                toast.error(`Câu hỏi ${questionNumber}: Điểm số phải lớn hơn 0`);
                return;
            }

            if (question.type === "NUMERIC_INPUT") {
                if (
                    !question.correct_answer ||
                    question.correct_answer.length === 0 ||
                    !question.correct_answer[0]?.trim()
                ) {
                    toast.error(`Câu hỏi ${questionNumber}: Vui lòng nhập đáp án số`);
                    return;
                }
            } else if (question.type === "DRAG_DROP") {
                if (question.options.length < 2) {
                    toast.error(`Câu hỏi ${questionNumber}: Phải có ít nhất 2 phần tử kéo thả`);
                    return;
                }
                const hasEmptyOptions = question.options.some((opt) => !opt.content.trim());
                if (hasEmptyOptions) {
                    toast.error(`Câu hỏi ${questionNumber}: Tất cả phần tử kéo thả phải có nội dung`);
                    return;
                }
            } else {
                // Single choice, multiple choice, true/false
                if (question.options.length < 2) {
                    toast.error(`Câu hỏi ${questionNumber}: Phải có ít nhất 2 lựa chọn`);
                    return;
                }

                const hasEmptyOptions = question.options.some((opt) => !opt.content.trim());
                if (hasEmptyOptions) {
                    toast.error(`Câu hỏi ${questionNumber}: Tất cả lựa chọn phải có nội dung`);
                    return;
                }

                const hasCorrectAnswer = question.options.some((opt) => opt.is_correct);
                if (!hasCorrectAnswer) {
                    toast.error(`Câu hỏi ${questionNumber}: Vui lòng chọn ít nhất một đáp án đúng`);
                    return;
                }

                // For single choice and true/false, ensure only one correct answer
                if (question.type === "SINGLE_CHOICE" || question.type === "TRUE_FALSE") {
                    const correctCount = question.options.filter((opt) => opt.is_correct).length;
                    if (correctCount !== 1) {
                        toast.error(
                            `Câu hỏi ${questionNumber}: ${question.type === "TRUE_FALSE" ? "Đúng/Sai" : "Trắc nghiệm một đáp án"} chỉ được có một đáp án đúng`,
                        );
                        return;
                    }
                }
            }
        }

        const examData = {
            ...data,
            questions: questions.map((q) => ({
                type: q.type,
                content: q.content,
                score: q.score,
                options: q.options,
                correct_answer: q.correct_answer,
                explanation: q.explanation,
            })),
        };

        // console.log(examData);
        mutationExam.mutate(examData);
    };

    const getTotalScore = () => {
        return questions.reduce((total, q) => total + q.score, 0);
    };
    // điền dữ liệu mẫu (set value cho form)
    const fillSampleData = () => {
        form.setValue("title", "Đề thi thử Toán học lớp 10 - Học kỳ 1");
        form.setValue("exam_category", examCategories[0]?.slug ?? "");
        form.setValue("subject", subjectsMock.find((s) => s.slug === "toan")?.slug ?? subjectsMock[0]?.slug ?? "");
        form.setValue(
            "grade_level",
            gradeLevelsMock.find((g) => g.slug === "lop-10")?.slug ?? gradeLevelsMock[0]?.slug ?? "",
        );
        form.setValue("province", provinces.find((p) => p.name === "Hà Nội")?.name ?? provinces[0]?.name ?? "");
        form.setValue("difficulty", "normal");
        form.setValue("max_score", 10);
        form.setValue("pass_score", 5);
        form.setValue("duration_minutes", 60);
        // Lấy thời gian hiện tại ở Việt Nam (UTC+7)
        const nowVN = new Date(Date.now() + 7 * 60 * 60 * 1000);
        form.setValue("start_time", new Date(nowVN.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16)); // 1h sau giờ VN
        form.setValue("end_time", new Date(nowVN.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)); // 2h sau giờ VN
        form.setValue("is_active", true);
        form.setValue("max_attempts", 1);
        form.setValue("is_password_protected", true);
        form.setValue("anti_cheat_enabled", true);

        // Add sample questions
        const sampleQuestions: Question[] = [
            {
                id: "sample-1",
                type: "SINGLE_CHOICE",
                content: "Cho hàm số \\( f(x) = 2x + 3 \\). Tính \\( f(2) \\)?",
                score: 2.5,
                options: [
                    { content: "5", is_correct: false },
                    { content: "7", is_correct: true },
                    { content: "9", is_correct: false },
                    { content: "11", is_correct: false },
                ],
                correct_answer: ["7"],
                explanation: "Thay x = 2 vào hàm số: f(2) = 2(2) + 3 = 4 + 3 = 7",
            },
            {
                id: "sample-2",
                type: "MULTIPLE_CHOICE",
                content: "Những số nào sau đây là số nguyên tố?",
                score: 2.5,
                options: [
                    { content: "2", is_correct: true },
                    { content: "3", is_correct: true },
                    { content: "4", is_correct: false },
                    { content: "5", is_correct: true },
                ],
                correct_answer: ["2", "3", "5"],
                explanation: "Số nguyên tố là số tự nhiên lớn hơn 1 và chỉ có hai ước là 1 và chính nó.",
            },
            {
                id: "sample-3",
                type: "TRUE_FALSE",
                content: "Căn bậc hai của 16 là 4",
                score: 2.5,
                options: [
                    { content: "Đúng", is_correct: true },
                    { content: "Sai", is_correct: false },
                ],
                correct_answer: ["Đúng"],
                explanation: "√16 = 4 vì 4² = 16",
            },
            {
                id: "sample-4",
                type: "NUMERIC_INPUT",
                content: "Tính: \\( 3 + 4 \\times 2 \\)",
                score: 2.5,
                options: [],
                correct_answer: ["11"],
                explanation: "Theo thứ tự thực hiện phép tính: 3 + 4 × 2 = 3 + 8 = 11",
            },
        ];
        setQuestions(sampleQuestions);
    };

    return (
        <>
            {mutationExam.isPending && <Loading />}
            <div className="flex justify-end">
                <Button className="mb-2 ml-auto text-white" onClick={fillSampleData}>
                    Điền dữ liệu mẫu
                </Button>
            </div>
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
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                                    <FormLabel className="mb-0.5 block">Độ khó</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                                            placeholder="Nhập điểm tối đa"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("max_score") ?? 10}
                                            className="mb-2"
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
                                            placeholder="Nhập thời gian (phút)"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("duration_minutes") ?? 60}
                                            className="mb-2"
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
                                    <FormLabel className="mb-0.5 block">Thời gian mở đề</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                            min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                                                .toISOString()
                                                .slice(0, 16)}
                                            className="mb-2"
                                        />
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
                                    <FormLabel className="mb-0.5 block">Thời gian đóng đề</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                            min={
                                                form.watch("start_time") ||
                                                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                                                    .toISOString()
                                                    .slice(0, 16)
                                            }
                                            className="mb-2"
                                        />
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
                                    <FormLabel className="mb-0.5 block">Số lần làm tối đa</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={field.value === null ? "unlimited" : String(field.value)}
                                        >
                                            <SelectTrigger className="mb-2 w-full">
                                                <SelectValue placeholder="Số lần làm tối đa" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[...Array(3)].map((_, index) => (
                                                    <SelectItem key={index + 1} value={`${index + 1}`}>
                                                        {index + 1} lần
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="999">Không giới hạn</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-2">
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

                    {/* Questions Section */}
                    <FormAddQuestion
                        questions={questions}
                        setQuestions={setQuestions}
                        maxScore={form.watch("max_score") || 10}
                        getTotalScore={getTotalScore}
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

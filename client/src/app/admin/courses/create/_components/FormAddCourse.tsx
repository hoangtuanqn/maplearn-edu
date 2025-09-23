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
import { courseCategoriesMock } from "~/mockdata/course/courseCategoties.data";
import { gradeLevelsMock } from "~/mockdata/gradeLevels";
import teacherApi from "~/apiRequest/teachers";
import { useMutation, useQuery } from "@tanstack/react-query";
import SingleSelectDropdown from "~/app/(student)/_components/SingleSelectDropdown";
import courseApi from "~/apiRequest/course";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { useRouter } from "next/navigation";
import courseAdminApi from "~/apiRequest/admin/course";
import { formSchema } from "../schema/formAddCourse.schema";
import uploadMedia from "~/apiRequest/uploadMedia";

const FormAddCourse = () => {
    const router = useRouter();
    const { data: teachers = [] } = useQuery({
        queryKey: ["user", "teachers"],
        queryFn: teacherApi.getTeachers,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const { data: courses = [] } = useQuery({
        queryKey: ["user", "courses"],
        queryFn: async () => {
            const res = await courseApi.getCourses(1, 100000);
            return res.data.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            category: "",
            gradeLevel: "",
            instructor: "",
            price: 0,
            startDate: "",
            endDate: "",

            description: "",
        },
        mode: "onBlur",
    });

    const mutationCourse = useMutation({
        mutationFn: (data: any) => courseAdminApi.createCourse(data),
        onSuccess: (data) => {
            router.push(`/admin/courses/${data.data.data.slug}`);
        },
        onError: notificationErrorApi,
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Kiểm tra nếu có ảnh bìa và upload
            const coverImageFile = form.watch("coverImage"); // Lấy file ảnh
            if (coverImageFile) {
                const coverImageResponse = await uploadMedia.upload(coverImageFile, "cover-images");
                values.coverImageUrl = coverImageResponse.url; // Gán URL vào form data
            }

            // Kiểm tra nếu có video giới thiệu và upload
            const introVideoFile = form.watch("introVideo"); // Lấy file video
            if (introVideoFile) {
                const introVideoResponse = await uploadMedia.upload(introVideoFile, "intro-videos");
                values.introVideoUrl = introVideoResponse.url; // Gán URL vào form data
            }

            // Sau khi đã upload, gửi dữ liệu đến API
            mutationCourse.mutate(values);
        } catch (error) {
            console.error("Error uploading files", error);
        }
    };

    // Điền dữ liệu mẫu
    const fillSampleData = () => {
        form.setValue("name", "Phong tỏa Xác Xuất Thống Kê - TOÁN 12");
        form.setValue(
            "description",
            "Khóa học này giúp học sinh THPT củng cố và nâng cao kiến thức môn Toán, bao gồm các chuyên đề đại số, hình học, xác suất và thống kê. Phù hợp với học sinh chuẩn bị cho kỳ thi tốt nghiệp THPT.",
        );
        form.setValue("price", 300000);
        form.setValue("category", courseCategoriesMock[0]?.slug ?? "");
        form.setValue("gradeLevel", gradeLevelsMock[2]?.slug ?? "");
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);
        form.setValue("startDate", today.toISOString().split("T")[0]);
        form.setValue("endDate", nextMonth.toISOString().split("T")[0]);
        form.setValue("subject", subjectsMock[0]?.slug ?? "");
        form.setValue("instructor", teachers[0]?.id ? String(teachers[0].id) : "");
        form.setValue("prerequisiteCourse", courses[0]?.id ? String(courses[0].id) : "");
        form.setValue("introVideoUrl", "/video.mp4");
        form.setValue("coverImageUrl", "/assets/images/courses/toan-demo.jpg");
    };

    return (
        <>
            {mutationCourse.isPending && <Loading />}
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
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2 lg:col-span-3">
                                    <FormLabel>Tên khóa học</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên khóa học" {...field} />
                                    </FormControl>
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
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Danh mục</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn danh mục" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {courseCategoriesMock.map((category) => (
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
                            name="gradeLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cấp bậc</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                            name="instructor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giáo viên giảng dạy</FormLabel>
                                    <SingleSelectDropdown
                                        onChange={field.onChange}
                                        label="Giáo viên"
                                        value={field.value}
                                        options={teachers.map((teacher) => ({
                                            label: String(teacher.full_name),
                                            value: String(teacher.id),
                                        }))}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số tiền bán khóa học</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập giá (VNĐ)"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={form.watch("price") ?? 0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dự kiến bắt đầu</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dự kiến kết thúc</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            disabled={form.watch("startDate") ? false : true}
                                            min={
                                                form.watch("startDate")
                                                    ? new Date(
                                                          new Date(form.watch("startDate")).getTime() +
                                                              24 * 60 * 60 * 1000,
                                                      )
                                                          .toISOString()
                                                          .split("T")[0]
                                                    : new Date().toISOString().split("T")[0]
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>Để trống: Sẽ không bao giờ kết thúc!</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prerequisiteCourse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Khóa học tiên quyết</FormLabel>
                                    <SingleSelectDropdown
                                        onChange={field.onChange}
                                        label="Chọn khóa học"
                                        value={field.value}
                                        options={courses.map((course) => ({
                                            label: course.name,
                                            value: String(course.id),
                                        }))}
                                    />
                                    <FormMessage />
                                    <FormDescription>Chọn khóa học tiên quyết nếu có</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ảnh bìa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                // Lấy file từ input và gán vào form
                                                if (e.target.files?.[0]) {
                                                    field.onChange(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="introVideo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video giới thiệu khóa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                // Lấy file từ input và gán vào form
                                                if (e.target.files?.[0]) {
                                                    field.onChange(e.target.files[0]);
                                                }
                                            }}
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
                                <FormLabel>Mô tả khóa học ({form.watch("description")?.length || 0}/5000)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập mô tả chi tiết về khóa học..." rows={4} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={"primary"}>
                        Thêm khóa học
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormAddCourse;

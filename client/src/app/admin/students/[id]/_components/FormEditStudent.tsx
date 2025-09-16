"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { getGender } from "~/libs/hepler";
import { StudentDetailResponseType } from "~/schemaValidate/user.schema";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import studentApi from "~/apiRequest/admin/student";
import { toast } from "sonner";
import { notificationErrorApi } from "~/libs/apis/http";
import Loading from "~/app/(student)/_components/Loading";
import { UpdateProfileSchema, updateProfileSchema } from "~/schemaValidate/admin/student.schema";
import { useUnsavedChangesWarning } from "~/hooks/useUnsavedChangesWarning";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import uploadMedia from "~/apiRequest/uploadMedia";
import { ResetPassword } from "./ResetPassword";
import { provinces } from "~/mockdata/other/provinces.data";

interface FormEditStudentProps {
    studentData: StudentDetailResponseType["data"];
}

const FormEditStudent = ({ studentData }: FormEditStudentProps) => {
    const [preview, setPreview] = useState<string>(studentData.avatar);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const form = useForm<UpdateProfileSchema>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            email: studentData.email || "",
            full_name: studentData.full_name || "",
            phone_number: studentData.phone_number || "",
            gender: studentData.gender || "male",
            birth_year: studentData.birth_year,
            facebook_link: studentData.facebook_link || "",
            school: studentData.school || "",
            city: studentData.city || "",
            banned: studentData.banned || false,
        },
    });
    useUnsavedChangesWarning(form.formState.isDirty);

    const updateStudentMutation = useMutation({
        mutationFn: async (data: UpdateProfileSchema) => {
            if (file) {
                // Thực hiện upload ảnh
                const uploadPromise = await uploadMedia.upload(file as File, "avatars");
                data.avatar = uploadPromise.url; // gán link ảnh đã upload vào data
                setFile(null);
            }
            await studentApi.updateStudent(String(studentData.id), data);
        },
        onSuccess: () => {
            toast.success("Cập nhật thông tin học viên thành công");
        },
        onError: notificationErrorApi,
    });

    function onSubmit(values: UpdateProfileSchema) {
        updateStudentMutation.mutate(values);
    }
    const handleClick = () => {
        fileInputRef.current?.click(); // bấm nút => mở dialog chọn file
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file)); // tạo link preview
            // Gửi file lên server hoặc preview
        }
    };

    return (
        <>
            {updateStudentMutation.isPending && <Loading />}

            <div className="mt-6 flex gap-5">
                <div className="flex flex-1/5 flex-col items-center rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="relative mb-4 h-24 w-24 rounded-full border">
                        <DisplayAvatar avatar={preview} fullName={studentData.full_name} ratio="28" />
                        {/* Input file ẩn */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            onClick={handleClick}
                            className="absolute right-0 bottom-0.5 cursor-pointer rounded-md bg-white pt-[1px] pl-[1px] opacity-90 hover:opacity-100"
                            type="button"
                        >
                            <svg fill="none" viewBox="0 0 24 24" className="h-[30px] w-[30px]">
                                <path
                                    fill="var(--primary)"
                                    d="M16.185 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.37c0 3.65 2.17 5.82 5.81 5.82h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81c.01-3.64-2.16-5.81-5.8-5.81Zm-5.24 15.51c-.29.29-.84.57-1.24.63l-2.46.35c-.09.01-.18.02-.27.02-.41 0-.79-.14-1.06-.41-.33-.33-.47-.81-.39-1.34l.35-2.46c.06-.41.33-.95.63-1.24l4.46-4.46a7.546 7.546 0 0 0 .6 1.29c.1.17.21.33.3.45.11.17.24.33.32.42.05.07.09.12.11.14.25.3.54.58.79.79.07.07.11.11.13.12.15.12.3.24.43.33.16.12.32.23.49.32.2.12.42.23.64.34.23.1.44.19.65.26l-4.48 4.45Zm6.42-6.42-.92.93a.31.31 0 0 1-.22.09c-.03 0-.07 0-.09-.01a6.202 6.202 0 0 1-4.23-4.23c-.03-.11 0-.23.08-.3l.93-.93c1.52-1.52 2.97-1.49 4.46 0 .76.76 1.13 1.49 1.13 2.25-.01.72-.38 1.44-1.14 2.2Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                        <p>
                            <span className="font-bold">Tên người dùng:</span> {studentData.username}
                        </p>

                        {studentData.full_name && (
                            <p>
                                <span className="font-bold">Họ tên:</span> {studentData.full_name}
                            </p>
                        )}
                        {studentData.gender && (
                            <p>
                                <span className="font-bold">Giới tính:</span> {getGender(studentData.gender)}
                            </p>
                        )}
                        {studentData.birth_year && (
                            <p>
                                <span className="font-bold">Năm sinh:</span> {studentData.birth_year}
                            </p>
                        )}
                        {studentData.city && (
                            <p>
                                <span className="font-bold">Thành phố:</span> {studentData.city}
                            </p>
                        )}
                        {studentData.school && (
                            <p>
                                <span className="font-bold">Trường học:</span> {studentData.school}
                            </p>
                        )}
                        {studentData.email && (
                            <p>
                                <span className="font-bold">Email:</span>{" "}
                                <Link href={`mailto:${studentData.email}`} className="underline">
                                    {studentData.email}
                                </Link>
                            </p>
                        )}
                        {studentData.phone_number && (
                            <p>
                                <span className="font-bold">Số điện thoại:</span>{" "}
                                <Link href={`tel:${studentData.phone_number}`} className="underline">
                                    {studentData.phone_number}
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex-4/5 shrink-0 rounded-lg bg-white p-6 pb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Chỉnh sửa thông tin</h3>
                            <p className="mb-4 text-sm text-slate-500">Chỉnh sửa thông tin người dùng tại đây.</p>
                        </div>
                        <ResetPassword id={String(studentData.id)} />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Row 1: Full name, Email, Phone */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Họ và tên</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nguyễn Văn A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="email@example.com"
                                                    type="email"
                                                    {...field}
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0123456789" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 2: Gender, Birth year, City */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Giới tính</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn giới tính" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Nam</SelectItem>
                                                    <SelectItem value="female">Nữ</SelectItem>
                                                    <SelectItem value="other">Khác</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birth_year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Năm sinh</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Năm sinh"
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    value={form.watch("birth_year") ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full flex-col">
                                            <FormLabel className="text-sm font-normal">Tỉnh thành</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value
                                                                ? (provinces.find(
                                                                      (province) => province.name === field.value,
                                                                  )?.name ?? "Tỉnh thành của bạn")
                                                                : "Tỉnh thành của bạn"}

                                                            <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Tìm kiếm..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>Không tìm thấy dữ liệu.</CommandEmpty>
                                                            <CommandGroup>
                                                                {provinces.map((province) => (
                                                                    <CommandItem
                                                                        value={province.name}
                                                                        key={province.province_code}
                                                                        onSelect={() => {
                                                                            form.setValue("city", province.name);
                                                                        }}
                                                                    >
                                                                        {province.name}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                province.name === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0",
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row 3: School, Facebook link */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="school"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Trường học</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tên trường" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="facebook_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facebook</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://facebook.com/..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="banned"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Trạng thái tài khoản</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(value === "true")}
                                                defaultValue={field.value == true ? "true" : "false"}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn trạng thái" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="false">Hoạt động</SelectItem>
                                                    <SelectItem value="true">Bị cấm</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button type="submit" variant={"primary"} disabled={!form.formState.isDirty}>
                                    Cập nhật thông tin
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={!form.formState.isDirty}
                                >
                                    Đặt lại
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default FormEditStudent;

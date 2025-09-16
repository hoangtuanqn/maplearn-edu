"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileType, UserType } from "~/schemaValidate/user.schema";
import { useAuth } from "~/hooks/useAuth";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import profileApi from "~/apiRequest/profile";
import Loading from "~/app/(student)/_components/Loading";
import { useUnsavedChangesWarning } from "~/hooks/useUnsavedChangesWarning";
import DisplayAvatar from "~/app/(student)/_components/DisplayAvatar";
import uploadMedia from "~/apiRequest/uploadMedia";
import { provinces } from "~/mockdata/other/provinces.data";
import SingleSelectDropdown from "~/app/(student)/_components/SingleSelectDropdown";
import { notificationErrorApi } from "~/libs/apis/http";

const FormEdit = () => {
    const { user, updateProfile } = useAuth();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<ProfileType>({
        resolver: zodResolver(profileSchema),
        mode: "onBlur",
        defaultValues: {
            full_name: user?.full_name ?? "",
            birth_year: user?.birth_year,
            gender: user?.gender ?? "other",
            school: user?.school ?? "",
            city: user?.city ?? "",
            facebook_link: user?.facebook_link ?? "",
            phone_number: user?.phone_number ?? "",
        },
    });
    useUnsavedChangesWarning(form.formState.isDirty);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProfileType) => {
            if (file) {
                // Thực hiện upload ảnh
                const uploadPromise = await uploadMedia.upload(file as File, "avatars");
                data.avatar = uploadPromise.url; // gán link ảnh đã upload vào data
                setFile(null);
            }
            await profileApi.update(data);
        },
        onSuccess: (_, data) => {
            updateProfile(data as UserType);
            toast.success("Cập nhật thông tin thành công!");
        },
        onError: notificationErrorApi,
    });

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

    const onSubmit = async (data: ProfileType) => {
        if (isPending) {
            toast.warning("Thao tác quá nhanh!");
            return;
        }

        mutate(data);
    };
    useEffect(() => {
        form.reset({
            full_name: user?.full_name ?? "",
            birth_year: user?.birth_year,
            gender: user?.gender ?? "other",
            school: user?.school ?? "",
            city: user?.city ?? "",
            facebook_link: user?.facebook_link ?? "",
            phone_number: user?.phone_number ?? "",
        });
        setPreview(user?.avatar ?? null);
    }, [user, form]);

    if (!user) return <Loading />;
    return (
        <>
            {isPending && <Loading />}
            <Form {...form}>
                <div className="relative mb-8 w-fit">
                    <DisplayAvatar avatar={preview} fullName={user.full_name} ratio="28" />
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

                <form onSubmit={form.handleSubmit(onSubmit)} className="w-md max-w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Họ và tên *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Họ và tên của bạn" {...field} />
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
                                <FormLabel className="text-sm font-normal">Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="Số điện thoại của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Giới tính</FormLabel>
                                <Select defaultValue={user?.gender} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Giới tính của bạn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="male">Nam</SelectItem>
                                            <SelectItem value="female">Nữ</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectGroup>
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
                                <FormLabel className="text-sm font-normal">Năm sinh</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Năm sinh của bạn"
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
                        render={({ field }) => {
                            console.log("field.value >> ", field.value);

                            return (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="text-sm font-normal">Tỉnh thành</FormLabel>
                                    <SingleSelectDropdown
                                        onChange={field.onChange}
                                        label="Tỉnh thành của bạn"
                                        value={field.value}
                                        options={provinces.map((province) => ({
                                            label: province.name,
                                            value: province.name,
                                        }))}
                                    />

                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Trường học</FormLabel>
                                <FormControl>
                                    <Input placeholder="Trường THPT hiện tại của bạn" {...field} />
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
                                <FormLabel className="text-sm font-normal">Liên kết Facebook</FormLabel>
                                <FormControl>
                                    <Input placeholder="Địa chỉ liên kết Facebook của bạn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-white">
                        Cập nhật
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormEdit;

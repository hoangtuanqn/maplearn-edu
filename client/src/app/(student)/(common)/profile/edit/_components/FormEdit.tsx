"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileType, UserType } from "~/schemaValidate/user.schema";
import { useAuth } from "~/hooks/useAuth";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
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
import { User, Phone, Calendar, MapPin, GraduationCap, Facebook, Save, Upload, CheckCircle } from "lucide-react";

const FormEdit = ({ user }: { user: UserType }) => {
    const { updateProfile } = useAuth();
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

            <div className="space-y-8">
                {/* Header Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">Chỉnh sửa thông tin cá nhân</h1>
                        <p className="text-gray-600">Cập nhật thông tin để hoàn thiện hồ sơ của bạn</p>
                    </div>

                    {/* Avatar Upload Section */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                        <div className="group relative">
                            <DisplayAvatar avatar={preview} fullName={user.full_name} ratio="28" />
                            {/* Input file ẩn */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {/* Edit Button */}
                            <button
                                onClick={handleClick}
                                className="bg-primary hover:bg-primary/90 absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-colors"
                                type="button"
                            >
                                <Upload size={16} />
                            </button>

                            {file && (
                                <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                                    <CheckCircle size={14} className="text-white" />
                                </div>
                            )}
                        </div>

                        <div className="text-center sm:text-left">
                            <h3 className="mb-1 font-semibold text-gray-900">Ảnh đại diện</h3>
                            <p className="mb-3 text-sm text-gray-600">
                                Tải lên ảnh đại diện để cá nhân hóa tài khoản của bạn
                            </p>
                            <div className="space-y-1 text-xs text-gray-500">
                                <p>• Định dạng: JPG, PNG</p>
                                <p>• Kích thước tối đa: 5MB</p>
                                <p>• Khuyên dùng: 300x300px</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="text-primary h-5 w-5" />
                                    <h2 className="text-primary text-lg font-semibold">Thông tin cá nhân</h2>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="full_name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <User size={14} />
                                                    Họ và tên *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập họ và tên của bạn"
                                                        className="focus:border-primary focus:ring-primary h-11 border-gray-300"
                                                        {...field}
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
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <Phone size={14} />
                                                    Số điện thoại
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập số điện thoại của bạn"
                                                        className="focus:border-primary focus:ring-primary h-11 border-gray-300"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <User size={14} />
                                                    Giới tính
                                                </FormLabel>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="focus:border-primary focus:ring-primary h-11 w-full border-gray-300">
                                                        <SelectValue placeholder="Chọn giới tính" />
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
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <Calendar size={14} />
                                                    Năm sinh
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value ? String(field.value) : undefined}
                                                        onValueChange={(val) => field.onChange(Number(val))}
                                                    >
                                                        <SelectTrigger className="focus:border-primary focus:ring-primary h-11 w-full border-gray-300">
                                                            <SelectValue placeholder="Chọn năm sinh" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Năm sinh</SelectLabel>
                                                                {[...Array(20)].map((_, index) => {
                                                                    const year = 1995 + index;
                                                                    return (
                                                                        <SelectItem key={year} value={String(year)}>
                                                                            {year}
                                                                        </SelectItem>
                                                                    );
                                                                })}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Location & Education */}
                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <MapPin className="text-primary h-5 w-5" />
                                    <h2 className="text-lg font-semibold text-gray-900">Thông tin địa chỉ & học tập</h2>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <MapPin size={14} />
                                                    Tỉnh thành
                                                </FormLabel>
                                                <SingleSelectDropdown
                                                    onChange={field.onChange}
                                                    label="Chọn tỉnh thành của bạn"
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
                                        name="school"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                    <GraduationCap size={14} />
                                                    Trường học
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập tên trường THPT hiện tại"
                                                        className="focus:border-primary focus:ring-primary h-11 border-gray-300"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Facebook className="text-primary h-5 w-5" />
                                    <h2 className="text-lg font-semibold text-gray-900">Liên kết mạng xã hội</h2>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="facebook_link"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Facebook size={14} />
                                                Liên kết Facebook
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://facebook.com/yourprofile"
                                                    className="focus:border-primary focus:ring-primary h-11 border-gray-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-gray-500">
                                                Liên kết này sẽ được hiển thị trong hồ sơ công khai của bạn
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-gray-600">
                                        <p>* Các trường bắt buộc cần phải điền</p>
                                        <p className="mt-1 text-xs">Thông tin của bạn sẽ được bảo mật và an toàn</p>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-primary hover:bg-primary/90 h-auto px-8 py-3 font-medium text-white"
                                    >
                                        <Save size={16} className="mr-2" />
                                        {isPending ? "Đang cập nhật..." : "Cập nhật thông tin"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Privacy Notice */}
                <div className="border-primary/20 bg-primary/5 rounded-xl border p-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div>
                            <h3 className="mb-1 font-medium text-blue-900">Bảo mật thông tin</h3>
                            <p className="text-sm text-blue-700">
                                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và chỉ sử dụng để cải thiện trải
                                nghiệm học tập. Thông tin sẽ không được chia sẻ với bên thứ ba mà không có sự đồng ý của
                                bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormEdit;

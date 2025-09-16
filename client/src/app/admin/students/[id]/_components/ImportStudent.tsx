"use client";
import { Check } from "lucide-react";
import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { importExcel } from "~/libs/importExcel";
import { toast } from "sonner";
import { UserType } from "~/schemaValidate/user.schema";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import studentApi from "~/apiRequest/admin/student";
import Loading from "~/app/(student)/_components/Loading";
import axios from "axios";
import { ImportStudentSuccessSchema } from "~/schemaValidate/admin/student.schema";
export function ImportStudent() {
    const [file, setFile] = useState<File | null>(null);
    const [errorHandling, setErrorHandling] = useState<"strict" | "partial">("strict");
    const [errors, setErrors] = useState<Array<{ error: string; data: string[] }>>([]);
    const [success, setSuccess] = useState<Array<{ error: string; data: string[] }>>([]);

    const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };
    const importMutationStudent = useMutation({
        mutationFn: async (data: Partial<UserType>[]) => {
            const res = await studentApi.importStudents(errorHandling, data);
            return res.data.data as ImportStudentSuccessSchema["data"];
        },
        onSuccess: (res) => {
            console.log(res);

            if (res.errors.length > 0) {
                setErrors([
                    {
                        error: "Email hoặc Username đã tồn tại trong hệ thống",
                        data: res.errors.map((item: any) => item.data.username || item.data.email || "Không rõ"),
                    },
                ]);
            }
            if (res.success.length > 0) {
                setSuccess([
                    {
                        error: "Nhập thành công",
                        data: res.success.map((item: any) => item.data.username || item.data.email || "Không rõ"),
                    },
                ]);
            }
        },
        onError: (error) => {
            // error_handling = strict mới rơi vô cái này
            if (axios.isAxiosError(error)) {
                const res = error.response?.data;
                toast.error(res?.message || "Lỗi khi nhập học sinh. Vui lòng thử lại sau.");

                if (!_.isArray(res?.data) && Object.entries(res?.data).length > 0) {
                    // Lỗi schema validation laravel thì rơi vô đây
                    for (const [_, value] of Object.entries(res?.data || {})) {
                        setErrors([{ error: res, data: value as string[] }]);
                    }
                } else {
                    // passed qua lỗi schema validation laravel, và lỗi do người dùng định nghĩa thì rơi vô đây
                    setErrors([{ error: res.message, data: res.data as string[] }]);
                }
            }
        },
    });
    const handleSubmit = async () => {
        if (!file) {
            toast.error("Hãy chọn file trước!");
            return;
        }

        const mapping = {
            "Tên tài khoản": "username",
            "Mật khẩu": "password",
            "Họ và Tên": "full_name",
            Email: "email",
            "Số điện thoại": "phone",
            "Giới tính": "gender",
            "Năm sinh": "birth_year",
            "Thành phố": "city",
            "Trường học": "school",
            "Link Facebook": "facebook_link",
        };

        try {
            const json = (await importExcel(file, mapping)).map((item) => {
                if (item.gender === "Nam") {
                    item.gender = "male";
                } else if (item.gender === "Nữ") {
                    item.gender = "female";
                } else {
                    item.gender = "other";
                }
                return item;
            });

            if (errorHandling == "strict") {
                const duplicatesUsername = _(json.map((item) => item.username))
                    .countBy()
                    .pickBy((count) => count > 1)
                    .keys()
                    .value();
                const duplicatesEmail = _(json.map((item) => item.email))
                    .countBy()
                    .pickBy((count) => count > 1)
                    .keys()
                    .value();
                if (duplicatesEmail.length > 0 || duplicatesUsername.length > 0) {
                    setErrors([
                        {
                            error: `Phát hiện trùng lặp email trong file`,
                            data: duplicatesEmail,
                        },
                        {
                            error: `Phát hiện trùng lặp username trong file`,
                            data: duplicatesUsername,
                        },
                    ]);
                    return;
                }
            }
            importMutationStudent.mutate(json);
        } catch (error) {
            console.log("Parse lỗi:", error);
            toast.error("Lỗi khi đọc file. Vui lòng kiểm tra lại định dạng.");
        }
    };
    return (
        <>
            {importMutationStudent.isPending && <Loading />}
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="primary">Nhập học sinh</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                                Nhập danh sách học sinh
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                                Vui lòng{" "}
                                <a
                                    href="/examples/users.xlsx"
                                    download
                                    target="_blank"
                                    className="font-medium underline hover:no-underline"
                                >
                                    tải file mẫu Excel
                                </a>{" "}
                                để đảm bảo định dạng đúng
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Thêm phần thông báo lỗi */}
                            {errors?.length > 0 && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                    <h4 className="mb-3 text-sm font-medium text-red-900">
                                        Phát hiện lỗi trong dữ liệu:
                                    </h4>
                                    <ul className="space-y-2 text-sm text-red-700">
                                        {errors.map((error, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <span className="mt-0.5 text-red-500">•</span>
                                                <span>
                                                    <strong>{error.error}:</strong> {error.data?.join(", ")}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {success?.length > 0 && (
                                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                    <h4 className="mb-3 text-sm font-medium text-green-900">Nhập thành công:</h4>
                                    <ul className="space-y-2 text-sm text-green-700">
                                        {success.map((item, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <span className="mt-0.5 text-green-500">•</span>
                                                <span>
                                                    <strong>{item.error}:</strong> {item.data?.join(", ")}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* File upload section */}
                            <div className="space-y-3">
                                <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                                    Chọn file Excel
                                </Label>
                                <div className="">
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".xlsx,.xls"
                                        className="flex-1"
                                        onChange={handleChooseFile}
                                    />
                                    {file && (
                                        <span className="mt-2 flex items-center gap-2 text-sm font-medium text-green-600">
                                            <Check />
                                            <span>Đã ghi nhận file: {file.name} </span>
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">Hỗ trợ file .xlsx, .xls</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="error-handling" className="text-sm font-medium text-gray-700">
                                    Cơ chế xử lý lỗi
                                </Label>
                                <RadioGroup
                                    defaultValue={errorHandling}
                                    onValueChange={(value) => setErrorHandling(value as "strict" | "partial")}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="strict" id="strict" />
                                        <Label htmlFor="strict" className="text-sm">
                                            <span className="font-medium">Nghiêm ngặt:</span> Nếu có bất kỳ lỗi nào,
                                            không nhập học sinh nào
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="partial" id="partial" />
                                        <Label htmlFor="partial" className="text-sm">
                                            <span className="font-medium">Nhập một phần:</span> Bỏ qua học sinh có lỗi,
                                            nhập những học sinh hợp lệ
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <p className="text-xs text-gray-500">
                                    Chọn cách xử lý khi phát hiện dữ liệu không hợp lệ
                                </p>
                            </div>

                            {/* Requirements section */}
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <h4 className="mb-3 text-sm font-bold text-red-500">Lưu ý:</h4>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <span className="mt-0.5 text-red-500">•</span>
                                        <span>
                                            <strong>Bắt buộc (*):</strong> Họ và Tên, Email, Tên tài khoản
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="mt-0.5 text-yellow-500">•</span>
                                        <span>
                                            <strong>Mật khẩu:</strong> Nếu để trống sẽ dùng mặc định:{" "}
                                            <code className="rounded bg-gray-200 px-1 text-xs">
                                                FPTAptech@MapLean@Edu
                                            </code>
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="mt-0.5 text-blue-500">•</span>
                                        <span>
                                            <strong>Trùng lặp:</strong> Hệ thống sẽ cảnh báo nếu Email hoặc Tên tài
                                            khoản đã tồn tại
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="mt-0.5 text-red-500">•</span>
                                        <span>
                                            <strong>Sai cấu trúc:</strong> Hệ thống sẽ báo lỗi nếu file không đúng định
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="gap-3">
                            <DialogClose asChild>
                                <Button variant="outline">Hủy</Button>
                            </DialogClose>
                            <Button type="submit" onClick={handleSubmit} disabled={!file} variant={"primary"}>
                                Nhập dữ liệu
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}

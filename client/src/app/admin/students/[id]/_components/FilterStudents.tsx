"use client";
import { Funnel } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { usePathname } from "next/navigation";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import { Input } from "~/components/ui/input";
import SingleSelectDropdown from "~/app/(student)/_components/SingleSelectDropdown";
import { provinces } from "~/mockdata/other/provinces.data";

const fields = [
    "search",
    "full_name",
    "email",
    "city",
    "school",
    "gender",
    "birth_year",
    "banned",
    "email_verified",
    "created_at",
    "phone_number",
] as const;

// Giới tính
const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
];

// Trạng thái tài khoản
const accountStatuses = [
    { value: "active", label: "Hoạt động" },
    { value: "banned", label: "Bị cấm" },
];

// Trạng thái email
const emailStatuses = [
    { value: "verified", label: "Đã xác thực" },
    { value: "unverified", label: "Chưa xác thực" },
];

// Năm sinh (động)
const currentYear = new Date().getFullYear();

// Thành phố phổ biến tại Việt Nam
const popularCities = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
];

export function FilterStudents() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <Funnel />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Lọc danh sách học sinh</DialogTitle>
                        <DialogDescription>
                            Tìm kiếm và lọc học sinh theo các tiêu chí như thông tin cá nhân, thành phố, trường học.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Tìm kiếm chung */}
                        <div className="grid gap-3">
                            <Label>Tìm kiếm tổng quát</Label>
                            <Input
                                type="text"
                                placeholder="Tìm theo tên, email, username..."
                                value={formValues.filter.search || ""}
                                onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                            />
                        </div>

                        {/* Grid 2 cột cho thông tin cá nhân */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Tên đầy đủ */}
                            <div className="grid gap-3">
                                <Label>Họ và tên</Label>
                                <Input
                                    type="text"
                                    placeholder="Nhập họ tên học sinh..."
                                    value={formValues.filter.full_name || ""}
                                    onChange={(e) => setFieldValue("full_name", e.target.value, "filter")}
                                />
                            </div>

                            {/* Email */}
                            <div className="grid gap-3">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    placeholder="Nhập email học sinh..."
                                    value={formValues.filter.email || ""}
                                    onChange={(e) => setFieldValue("email", e.target.value, "filter")}
                                />
                            </div>
                        </div>

                        {/* Grid 3 cột cho thông tin bổ sung */}
                        <div className="grid gap-4 lg:grid-cols-3">
                            {/* Giới tính */}
                            <div className="grid gap-3">
                                <Label>Giới tính</Label>
                                <Select
                                    value={formValues.filter.gender || ""}
                                    onValueChange={(value) => setFieldValue("gender", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn giới tính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Giới tính</SelectLabel>
                                            {genderOptions.map((gender) => (
                                                <SelectItem key={gender.value} value={gender.value}>
                                                    {gender.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Năm sinh */}
                            <div className="grid gap-3">
                                <Label>Năm sinh</Label>
                                <Select
                                    value={formValues.filter.birth_year ? String(formValues.filter.birth_year) : ""}
                                    onValueChange={(val) => setFieldValue("birth_year", val, "filter")}
                                >
                                    <SelectTrigger className="w-full">
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
                            </div>

                            {/* Số điện thoại */}
                            <div className="grid gap-3">
                                <Label>Số điện thoại</Label>
                                <Input
                                    type="text"
                                    placeholder="Nhập số điện thoại..."
                                    value={formValues.filter.phone_number || ""}
                                    onChange={(e) => setFieldValue("phone_number", e.target.value, "filter")}
                                />
                            </div>
                        </div>

                        {/* Grid 2 cột cho địa điểm và trường học */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Thành phố */}
                            <div className="grid gap-3">
                                <Label>Tỉnh/Thành phố</Label>

                                <SingleSelectDropdown
                                    onChange={(value) => setFieldValue("city", value, "filter")}
                                    label="Chọn tỉnh thành của bạn"
                                    value={formValues.filter.city || ""}
                                    options={provinces.map((province) => ({
                                        label: province.name,
                                        value: province.name,
                                    }))}
                                />
                            </div>

                            {/* Trường học */}
                            <div className="grid gap-3">
                                <Label>Trường học</Label>
                                <Input
                                    type="text"
                                    placeholder="Nhập tên trường học..."
                                    value={formValues.filter.school || ""}
                                    onChange={(e) => setFieldValue("school", e.target.value, "filter")}
                                />
                            </div>
                        </div>

                        {/* Grid 2 cột cho trạng thái */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Trạng thái tài khoản */}
                            <div className="grid gap-3">
                                <Label>Trạng thái tài khoản</Label>
                                <Select
                                    value={formValues.filter.banned || ""}
                                    onValueChange={(value) => setFieldValue("banned", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Trạng thái</SelectLabel>
                                            {accountStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Trạng thái email */}
                            <div className="grid gap-3">
                                <Label>Xác thực email</Label>
                                <Select
                                    value={formValues.filter.email_verified || ""}
                                    onValueChange={(value) => setFieldValue("email_verified", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn trạng thái email" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Xác thực email</SelectLabel>
                                            {emailStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Sắp xếp */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="grid gap-3">
                                <Label>Sắp xếp theo thời gian đăng ký</Label>
                                <Select
                                    value={formValues.sort.created_at || "-created_at"}
                                    onValueChange={(value) => setFieldValue("created_at", value, "sort")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sắp xếp theo thời gian đăng ký" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Thời gian đăng ký</SelectLabel>
                                            <SelectItem value="-created_at">Mới nhất</SelectItem>
                                            <SelectItem value="created_at">Cũ nhất</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Label>Ghi chú</Label>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <p>• Tìm kiếm: Có thể tìm theo tên, email hoặc username</p>
                                    <p>• Năm sinh: Nhập năm từ 1995 đến 2014</p>
                                    <p>• Thành phố: Chọn từ danh sách 34 tỉnh thành</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa tất cả bộ lọc
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" variant={"primary"} onClick={handleSubmit}>
                                Áp dụng bộ lọc
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

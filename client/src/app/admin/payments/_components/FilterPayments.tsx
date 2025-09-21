"use client";
import { Funnel, Calendar } from "lucide-react";
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
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

const fields = ["search", "payment_method", "amount_min", "amount_max", "date_from", "date_to"] as const;

// Payment methods
const paymentMethods = [
    { value: "transfer", label: "Chuyển khoản" },
    { value: "vnpay", label: "VNPay" },
    { value: "momo", label: "MoMo" },
    { value: "zalopay", label: "ZaloPay" },
];

export function FilterPayments() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    // Khôi phục giá trị dateRange từ formValues khi component mount
    useEffect(() => {
        const dateFrom = formValues.filter.date_from;
        const dateTo = formValues.filter.date_to;

        if (dateFrom || dateTo) {
            setDateRange({
                from: dateFrom ? new Date(dateFrom) : undefined,
                to: dateTo ? new Date(dateTo) : undefined,
            });
        }
    }, [formValues.filter.date_from, formValues.filter.date_to]);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
        setDateRange(undefined);
        // Reset tất cả các field về giá trị rỗng
        setFieldValue("search", "", "filter");
        setFieldValue("payment_method", "", "filter");
        setFieldValue("amount_min", "", "filter");
        setFieldValue("amount_max", "", "filter");
        setFieldValue("date_from", "", "filter");
        setFieldValue("date_to", "", "filter");
    };

    const handleDateRangeSelect = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from) {
            setFieldValue("date_from", format(range.from, "yyyy-MM-dd"), "filter");
        } else {
            setFieldValue("date_from", "", "filter");
        }
        if (range?.to) {
            setFieldValue("date_to", format(range.to, "yyyy-MM-dd"), "filter");
        } else {
            setFieldValue("date_to", "", "filter");
        }
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <Funnel className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Lọc và tìm kiếm thanh toán</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm thanh toán theo các tiêu chí dưới đây để quản lý hiệu quả.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Search Input */}
                        <div className="grid gap-3">
                            <Label>Tìm kiếm</Label>
                            <Input
                                type="text"
                                placeholder="Tìm theo tên người dùng, email, mã giao dịch..."
                                value={formValues.filter.search || ""}
                                onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                            />
                        </div>

                        {/* Grid 2 columns for Payment Method and Status */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Payment Method */}
                            <div className="grid gap-3">
                                <Label>Phương thức thanh toán</Label>
                                <Select
                                    value={formValues.filter.payment_method || ""}
                                    onValueChange={(value) => setFieldValue("payment_method", value, "filter")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn phương thức" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Phương thức thanh toán</SelectLabel>
                                            {paymentMethods.map((method) => (
                                                <SelectItem key={method.value} value={method.value}>
                                                    {method.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date Range Picker */}
                            <div className="grid gap-3">
                                <Label>Khoảng thời gian</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dateRange && !formValues.filter.date_from && "text-muted-foreground",
                                            )}
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {dateRange?.from || formValues.filter.date_from ? (
                                                dateRange?.to || formValues.filter.date_to ? (
                                                    <>
                                                        {format(
                                                            dateRange?.from || new Date(formValues.filter.date_from),
                                                            "dd/MM/yyyy",
                                                            { locale: vi },
                                                        )}{" "}
                                                        -{" "}
                                                        {format(
                                                            dateRange?.to || new Date(formValues.filter.date_to),
                                                            "dd/MM/yyyy",
                                                            { locale: vi },
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        dateRange?.from || new Date(formValues.filter.date_from),
                                                        "dd/MM/yyyy",
                                                        { locale: vi },
                                                    )
                                                )
                                            ) : (
                                                "Chọn khoảng thời gian"
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            initialFocus
                                            mode="range"
                                            defaultMonth={
                                                dateRange?.from ||
                                                (formValues.filter.date_from
                                                    ? new Date(formValues.filter.date_from)
                                                    : undefined)
                                            }
                                            selected={
                                                dateRange || {
                                                    from: formValues.filter.date_from
                                                        ? new Date(formValues.filter.date_from)
                                                        : undefined,
                                                    to: formValues.filter.date_to
                                                        ? new Date(formValues.filter.date_to)
                                                        : undefined,
                                                }
                                            }
                                            onSelect={handleDateRangeSelect}
                                            numberOfMonths={2}
                                            locale={vi}
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Amount Range */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Min Amount */}
                            <div className="grid gap-3">
                                <Label>Số tiền tối thiểu (VNĐ)</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={formValues.filter.amount_min || ""}
                                    onChange={(e) => setFieldValue("amount_min", e.target.value, "filter")}
                                />
                            </div>

                            {/* Max Amount */}
                            <div className="grid gap-3">
                                <Label>Số tiền tối đa (VNĐ)</Label>
                                <Input
                                    type="number"
                                    placeholder="10,000,000"
                                    value={formValues.filter.amount_max || ""}
                                    onChange={(e) => setFieldValue("amount_max", e.target.value, "filter")}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleRemoveQuery}>
                                Xóa bộ lọc
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

"use client";
import { Calendar } from "lucide-react";
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
import { Label } from "~/components/ui/label";
import { usePathname } from "next/navigation";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

const fields = ["start_date", "end_date"] as const;

export function FilterDashboard() {
    const pathName = usePathname();
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    // Khôi phục giá trị dateRange từ formValues khi component mount
    useEffect(() => {
        const dateFrom = formValues.filter.start_date;
        const dateTo = formValues.filter.end_date;

        if (dateFrom || dateTo) {
            setDateRange({
                from: dateFrom ? new Date(dateFrom) : undefined,
                to: dateTo ? new Date(dateTo) : undefined,
            });
        }
    }, [formValues.filter.start_date, formValues.filter.end_date]);

    const handleRemoveQuery = () => {
        window.history.replaceState({}, "", pathName);
        setDateRange(undefined);

        setFieldValue("start_date", "", "filter");
        setFieldValue("end_date", "", "filter");
    };

    const handleDateRangeSelect = (range: DateRange | undefined) => {
        setDateRange(range);
        if (range?.from) {
            setFieldValue("start_date", format(range.from, "yyyy-MM-dd"), "filter");
        } else {
            setFieldValue("start_date", "", "filter");
        }
        if (range?.to) {
            setFieldValue("end_date", format(range.to, "yyyy-MM-dd"), "filter");
        } else {
            setFieldValue("end_date", "", "filter");
        }
    };

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white">
                        <Calendar className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Lọc và tìm kiếm thanh toán</DialogTitle>
                        <DialogDescription>
                            Lọc và tìm kiếm thanh toán theo các tiêu chí dưới đây để quản lý hiệu quả.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6">
                        {/* Grid 2 columns for Payment Method and Status */}
                        <div className="grid gap-4">
                            {/* Date Range Picker */}
                            <div className="grid gap-3">
                                <Label>Khoảng thời gian</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dateRange && !formValues.filter.start_date && "text-muted-foreground",
                                            )}
                                        >
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {dateRange?.from || formValues.filter.start_date ? (
                                                dateRange?.to || formValues.filter.end_date ? (
                                                    <>
                                                        {format(
                                                            dateRange?.from || new Date(formValues.filter.start_date),
                                                            "dd/MM/yyyy",
                                                            { locale: vi },
                                                        )}{" "}
                                                        -{" "}
                                                        {format(
                                                            dateRange?.to || new Date(formValues.filter.end_date),
                                                            "dd/MM/yyyy",
                                                            { locale: vi },
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        dateRange?.from || new Date(formValues.filter.start_date),
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
                                                (formValues.filter.start_date
                                                    ? new Date(formValues.filter.start_date)
                                                    : undefined)
                                            }
                                            selected={
                                                dateRange || {
                                                    from: formValues.filter.start_date
                                                        ? new Date(formValues.filter.start_date)
                                                        : undefined,
                                                    to: formValues.filter.end_date
                                                        ? new Date(formValues.filter.end_date)
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

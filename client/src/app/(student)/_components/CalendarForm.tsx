import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { Button } from "~/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
const CalendarForm = ({
    dateRange,
    setDateRange,
}: {
    dateRange: DateRange;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}) => {
    const formattedDateRange =
        dateRange.from && dateRange.to
            ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
            : "Chọn khoảng thời gian";

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" id="date" className="justify-between font-normal">
                    {formattedDateRange}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-auto p-0 max-lg:max-h-[300px]" align="start">
                <Calendar
                    mode="range"
                    selected={dateRange}
                    captionLayout="dropdown"
                    numberOfMonths={2}
                    modifiers={{
                        selectedRange: (date) => {
                            if (!dateRange?.from || !dateRange?.to) return false;
                            return date >= dateRange.from && date <= dateRange.to;
                        },
                    }}
                    modifiersClassNames={{
                        selectedRange: "!bg-primary/50 !text-white",
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    onSelect={(range) => {
                        if (!range) {
                            setDateRange({ from: undefined, to: undefined });
                            return;
                        }
                        setDateRange({
                            from: range.from ?? undefined,
                            to: range.to ?? undefined,
                        });
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};

export default CalendarForm;

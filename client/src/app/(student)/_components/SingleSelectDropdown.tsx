"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandGroup } from "~/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { CommandEmpty, CommandList } from "cmdk";

export default function SingleSelectDropdown({
    label,
    options,
    onChange,
    value,
}: {
    label: string;
    options: { label: string; value: string }[];
    onChange: (value: string) => void;
    value?: string;
}) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(value || null);

    const toggleValue = (value: string) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        onChange(selectedValue || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    const getLabel = () => {
        if (!selectedValue) return label;
        return options
            .filter((item) => item.value === selectedValue)
            .map((item) => item.label)
            .join(", ");
    };
    useEffect(() => {
        setSelectedValue(value || null);
    }, [value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="border-input bg-background inline-flex w-full items-center justify-between overflow-hidden rounded-md border px-3 py-2 text-sm shadow-sm">
                    <span className={cn("truncate text-left", selectedValue === null && "text-muted-foreground")}>
                        {getLabel() || label}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>

            <PopoverContent align="start" sideOffset={4} className="w-(--radix-popover-trigger-width) p-0">
                <Command>
                    <CommandInput placeholder="Tìm..." className="h-9" />
                    <CommandList>
                        <CommandEmpty className="p-5 text-center text-slate-600">Không tìm thấy dữ liệu.</CommandEmpty>

                        <CommandGroup className="max-h-60 overflow-y-auto">
                            {options.map((item) => {
                                if (!item) return null;
                                return (
                                    <CommandItem
                                        key={item.value}
                                        onSelect={() => {
                                            toggleValue(item.value);
                                            setOpen(false);
                                        }}
                                    >
                                        <span className="mr-2 w-4">
                                            {selectedValue === item.value ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <div className="h-4 w-4" />
                                            )}
                                        </span>
                                        {item.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

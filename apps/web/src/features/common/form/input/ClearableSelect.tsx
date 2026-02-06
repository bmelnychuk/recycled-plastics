import * as React from "react";

import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/design-system/components/ui/select";

import { XIcon } from "lucide-react";
import { PropsWithChildren } from "react";


interface ClearableSelectProps<T extends string = string> extends PropsWithChildren {
    name?: string;
    value?: T;
    onChange?: (value: T | undefined) => void;
}

export function ClearableSelect<T extends string = string>({
    name,
    value,
    onChange,
    children,
}: ClearableSelectProps<T>) {
    const handleClear = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onChange?.(undefined);
    };

    return (
        <Select
            name={name}
            value={value ?? ""}
            onValueChange={(v) => onChange?.(v ? (v as T) : undefined)}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select value" />
                {value && (
                    <span
                        role="button"
                        className="h-6 w-6 shrink-0 ml-auto inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                        onPointerDown={handleClear}
                    >
                        <XIcon className="h-4 w-4" />
                    </span>
                )}
            </SelectTrigger>
            {children}
            {/* <SelectContent position="item-aligned">
            <SelectGroup>
                <SelectLabel>Chain of custody</SelectLabel>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent> */}
        </Select>
    );
}
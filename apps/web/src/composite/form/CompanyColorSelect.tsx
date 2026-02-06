"use client";

import { FC, useState, useCallback, useEffect, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/design-system/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/components/ui/popover";
import { Palette, Check, ChevronDown } from "lucide-react";
import { cn } from "@/design-system/lib/utils";

const allColors = {
  amber: "#f3d673",
  blue: "#acd8fc",
  bronze: "#dfcdc5",
  brown: "#e4cdb7",
  crimson: "#f3bed1",
  cyan: "#9ddde7",
  gold: "#d8d0bf",
  grass: "#b2ddb5",
  gray: "#d9d9d9",
  green: "#adddc0",
  indigo: "#c1d0ff",
  iris: "#cbcdff",
  jade: "#acdec8",
  lime: "#c2da91",
  mint: "#9ce0d0",
  olive: "#d7dad7",
  orange: "#ffc182",
  pink: "#efbfdd",
  plum: "#e9c2ec",
  purple: "#e0c4f4",
  red: "#fdbdbe",
  ruby: "#f8bfc8",
  sand: "#dad9d6",
  sky: "#a9daed",
  slate: "#d9d9e0",
  teal: "#a1ded2",
  tomato: "#fdbdaf",
  violet: "#d4cafe",
  yellow: "#f3d768",
};

export const defaultColor = allColors.indigo;

export const CompanyColorSelect: FC<{
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}> = ({ name, value, disabled, onChange }) => {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const colorEntries = Object.entries(allColors);

  // Find the color name for the current value
  const selectedColorName = colorEntries.find(
    ([_, colorValue]) => colorValue === value
  )?.[0];

  const handleSelect = useCallback(
    (colorValue: string) => {
      onChange?.(colorValue);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          disabled={disabled}
          type="button"
          className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            {value ? (
              <>
                <div
                  className="w-5 h-5 rounded border border-gray-300"
                  style={{ backgroundColor: value }}
                />
                <span className="capitalize">{selectedColorName}</span>
              </>
            ) : (
              <>
                <Palette className="text-gray-500" />
                <span>Select a color</span>
              </>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            <CommandEmpty>No color found.</CommandEmpty>
            <CommandGroup heading="Colors">
              {colorEntries.map(([colorName, colorValue]) => (
                <CommandItem
                  key={colorValue}
                  value={colorName}
                  onSelect={() => handleSelect(colorValue)}
                >
                  <div
                    className="w-4 h-4 rounded border border-gray-300 mr-2"
                    style={{ backgroundColor: colorValue }}
                  />
                  <span className="capitalize">{colorName}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === colorValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </Popover>
  );
};

'use client';

import { FC, useState, useCallback, useEffect, useRef } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/design-system/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/design-system/components/ui/popover';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/design-system/lib/utils';
import { Color } from '@rp/core';
import { CompanyColors, getColorValue } from './CompanyColors';

export const CompanyColorSelect: FC<{
  name?: string;
  value?: Color;
  disabled?: boolean;
  onChange?: (value: Color) => void;
}> = ({ name, value, disabled, onChange }) => {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleSelect = useCallback(
    (colorValue: Color) => {
      onChange?.(colorValue);
      setOpen(false);
    },
    [onChange],
  );

  const colorValue = value ? getColorValue(value) : undefined;

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
                  className="w-5 h-5 rounded border border-border"
                  style={{ backgroundColor: colorValue }}
                />
                <span className="capitalize">{value}</span>
              </>
            ) : (
              <>
                <Palette className="text-muted-foreground" />
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
              {Object.entries(CompanyColors).map(([colorName, colorValue]) => (
                <CommandItem
                  key={colorName}
                  value={colorName}
                  onSelect={() => handleSelect(colorName as Color)}
                >
                  <div
                    className="w-4 h-4 rounded border border-border mr-2"
                    style={{ backgroundColor: colorValue }}
                  />
                  <span className="capitalize">{colorName}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === colorValue ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </Popover>
  );
};

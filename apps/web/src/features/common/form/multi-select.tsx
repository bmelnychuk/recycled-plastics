'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/design-system/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/design-system/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

export interface MultiSelectProps<T extends string = string> {
  options: readonly T[];
  value?: T[];
  onChange?: (value: T[]) => void;
  placeholder?: string;
}

export const MultiSelect = <T extends string = string>({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
}: MultiSelectProps<T>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const selected = value;

  const handleUnselect = React.useCallback(
    (val: T) => {
      onChange?.(selected.filter((s) => s !== val));
    },
    [onChange, selected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...selected];
            newSelected.pop();
            onChange?.(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [onChange, selected],
  );

  const selectables = options.filter(
    (framework) => !selected.includes(framework),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="border-input dark:bg-input/30 flex min-h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
        <div className="flex flex-wrap items-center gap-1 py-0.5">
          {selected.map((item) => (
            <Badge key={item} variant="secondary" className="h-6">
              {item}
              <button
                className="ml-1 rounded-full outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="size-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length > 0 ? undefined : placeholder}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[80px]"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="bg-popover text-popover-foreground absolute top-1 z-50 max-h-64 w-full overflow-y-auto rounded-md border p-1 shadow-md animate-in fade-in-0 zoom-in-95">
              <CommandGroup className="overflow-hidden">
                {selectables.map((option) => (
                  <CommandItem
                    key={option}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      onChange?.([...selected, option]);
                    }}
                    className="cursor-pointer"
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};

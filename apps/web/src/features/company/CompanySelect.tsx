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
import { Input } from '@/design-system/components/ui/input';
import { Building2, Check, X, Search } from 'lucide-react';
import { cn } from '@/design-system/lib/utils';

type CompanyId = string;

interface Company {
  id: CompanyId;
  name: string;
  verified: boolean;
}

export const CompanySelect: FC<{
  name?: string;
  options: Company[];
  value?: CompanyId;
  onChange: (value: CompanyId | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}> = ({
  options,
  value,
  onChange,
  disabled,
  placeholder = 'Type to search companies...',
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const selectedCompany = options.find((c) => c.id === value);

  useEffect(() => {
    if (selectedCompany) {
      setInputValue(selectedCompany.name);
    }
  }, [selectedCompany]);

  const filteredOptions = options.filter((company) =>
    company.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = useCallback(
    (company: Company) => {
      onChange(company.id);
      setInputValue(company.name);
      setOpen(false);
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      onChange(undefined);
      setInputValue('');
      setOpen(false);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setOpen(newValue.length >= 3);

      // If input doesn't match selected company, clear selection
      if (selectedCompany && newValue !== selectedCompany.name) {
        onChange(undefined);
      }
    },
    [selectedCompany, onChange],
  );

  const handleInputFocus = useCallback(() => {
    // Don't open on focus, only on typing
  }, []);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      // Only allow opening if there are 3+ characters
      if (newOpen && inputValue.length < 3) {
        return;
      }
      setOpen(newOpen);
    },
    [inputValue],
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {selectedCompany ? (
              <Building2
                size={16}
                className={cn(
                  'mr-2',
                  selectedCompany.verified ? 'text-green-500' : 'text-gray-500',
                )}
              />
            ) : (
              <Search className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <Input
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={disabled}
            placeholder={placeholder}
            className="pl-10 pr-10"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {selectedCompany && (
              <button
                type="button"
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
                className="h-4 w-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => handleSelect(option)}
                >
                  <Building2
                    size={16}
                    className={cn(
                      'mr-2',
                      option.verified ? 'text-green-500' : 'text-gray-500',
                    )}
                  />
                  {option.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === option.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import React, {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  ForwardedRef,
  FC,
  useRef,
} from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/design-system/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/components/ui/popover";
import {
  ChevronDown,
  CheckIcon,
  Globe,
  ChevronsUpDown,
  Check,
  X,
} from "lucide-react";
import { countries } from "country-data-list";
import { cn } from "@/design-system/lib/utils";
import { Button } from "@/design-system/components/ui/button";
import { CircleFlag } from "react-circle-flags";

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes?: string[];
  currencies: string[];
  emoji?: string;
  ioc?: string;
  languages: string[];
  name: string;
  status?: string;
}

interface CountryDropdownProps {
  onChange?: (country: string | null) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: string[];
}

export const CountryDropdown: FC<CountryDropdownProps> = ({
  onChange,
  value,
  options,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const allOptions: Country[] = countries.all.filter(
    (c) => c.emoji && c.status !== "deleted" && c.ioc !== "PRK" && (!options || options.includes(c.alpha2))
  );
  const selectedCountry = allOptions.find((c) => c.alpha2 === value);

  const handleSelect = useCallback(
    (country: Country) => {
      onChange?.(country.alpha2);
      setOpen(false);
    },
    [onChange]
  );
  const handleClear = useCallback(() => {
    onChange?.(null);
    setOpen(false);
  }, [onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-3">
            {selectedCountry ? (
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase()}
                height="16"
                width="16"
              />
            ) : (
              <Globe className="text-gray-500" />
            )}
            <span
              className={selectedCountry ? "text-gray-900" : "text-gray-500"}
            >
              {selectedCountry ? selectedCountry.name : "Select country..."}
            </span>
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: triggerWidth }}>
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {selectedCountry && (
                <CommandItem
                  onSelect={handleClear}
                  className="text-muted-foreground"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear selection
                </CommandItem>
              )}
              {allOptions
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    key={key}
                    value={option.name}
                    onSelect={() => handleSelect(option)}
                  >
                    <CircleFlag
                      countryCode={option.alpha2.toLowerCase()}
                      height="16"
                      width="16"
                    />
                    {option.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.alpha2 ? "opacity-100" : "opacity-0"
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

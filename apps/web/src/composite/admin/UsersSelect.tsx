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
import { Input } from "@/design-system/components/ui/input";
import { User, Check, X, Search } from "lucide-react";
import { cn } from "@/design-system/lib/utils";

type UserId = string;

interface UserOption {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  updatedDate: string;
}

export const UsersSelect: FC<{
  options: UserOption[];
  value?: UserId;
  onChange: (value: UserId | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}> = ({
  options,
  value,
  onChange,
  disabled,
  placeholder = "Type to search users...",
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const selectedUser = options.find((u) => u.id === value);

  useEffect(() => {
    if (selectedUser) {
      setInputValue(`${selectedUser.firstName} ${selectedUser.lastName}`);
    }
  }, [selectedUser]);

  const filteredOptions = options.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchTerm = inputValue.toLowerCase();
    return fullName.includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
  });

  const handleSelect = useCallback(
    (user: UserOption) => {
      onChange(user.id);
      setInputValue(`${user.firstName} ${user.lastName}`);
      setOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange(undefined);
      setInputValue("");
      setOpen(false);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setOpen(newValue.length >= 3);

      // If input doesn't match selected user, clear selection
      if (selectedUser && newValue !== `${selectedUser.firstName} ${selectedUser.lastName}`) {
        onChange(undefined);
      }
    },
    [selectedUser, onChange]
  );

  const handleInputFocus = useCallback(() => {
    // Don't open on focus, only on typing
  }, []);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      // Only allow opening if there are 3+ characters
      if (newOpen && inputValue.length < 3) {
        return;
      }
      setOpen(newOpen);
    },
    [inputValue]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={disabled}
            placeholder={placeholder}
            className="pl-10 pr-10"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {selectedUser && (
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
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={`${option.firstName} ${option.lastName}`}
                  onSelect={() => handleSelect(option)}
                >
                  <User size={16} className="mr-2" />
                  <div className="flex flex-col">
                    <span>{option.firstName} {option.lastName}</span>
                    <span className="text-xs text-muted-foreground">{option.email}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.id ? "opacity-100" : "opacity-0"
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

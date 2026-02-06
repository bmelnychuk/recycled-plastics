import { Currency, CurrencySchema, Price } from "@/backend";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/design-system/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupButton } from "@/design-system/components/ui/input-group";
import { cn } from "@/design-system/lib/utils";
import { FC } from "react";
import { NumericFormat } from "react-number-format";

const DEFAULT_CURRENCY: Currency = 'EUR';

const inputGroupControlStyles = "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1 rounded-none border-0 shadow-none focus-visible:ring-0 dark:bg-transparent";

export interface PriceInputProps {
    name?: string;
    value: Price | undefined | null;
    onChange: (value: Price | null) => void;
}

export const PriceInput: FC<PriceInputProps> = ({ value, onChange, name }) => {
    const currencyOptions = CurrencySchema.options;
    const displayValue = value?.amount != null ? value.amount / 100 : undefined;
    const hasValue = value?.amount != null;

    return (
        <InputGroup>
            <NumericFormat
                name={name}
                data-slot="input-group-control"
                className={cn(inputGroupControlStyles)}
                value={displayValue}
                placeholder="0.00"
                decimalScale={2}
                allowNegative={false}
                thousandSeparator=" "
                decimalSeparator="."
                onValueChange={(values) => {
                    if (values.floatValue != null) {
                        const cents = Math.round(values.floatValue * 100);
                        onChange({ amount: cents, currency: value?.currency || DEFAULT_CURRENCY });
                    } else {
                        onChange(null);
                    }
                }}
               
            />
            {hasValue && <InputGroupAddon align="inline-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <InputGroupButton variant="ghost" className="relative">
                            {value?.currency || DEFAULT_CURRENCY}
                        </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {currencyOptions.map((currency) => (
                            <DropdownMenuItem key={currency} onSelect={() => onChange({ amount: value?.amount || 0, currency })}>
                                {currency}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </InputGroupAddon>}
        </InputGroup>
    );
};

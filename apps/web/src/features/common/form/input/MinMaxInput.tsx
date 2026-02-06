import { MinMax, Unit } from "@/backend";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/design-system/components/ui/input-group";
import { FC } from "react";
import { UnitLabel } from "../../../material/UnitLabel";

interface MaterialDataInputProps {
    value?: MinMax | null;
    onChange?: (value: MinMax | null) => void;
    onBlur?: () => void;
    unit: Unit;
}

export const MinMaxInput: FC<MaterialDataInputProps> = ({
    value,
    onChange,
    onBlur,
    unit,
}) => {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = value?.max;
        const min = e.target.value === "" ? undefined : Number(e.target.value);
        if (min === undefined && max === undefined) onChange?.(null);
        else onChange?.({ max, min });
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const min = value?.min;
        const max = e.target.value === "" ? undefined : Number(e.target.value);
        if (max === undefined && min === undefined) onChange?.(null);
        else onChange?.({ min, max });
    };

    return (
        <InputGroup className="w-full">
            <InputGroupInput
                type="number"
                placeholder="Min"
                value={value?.min ?? ""}
                onChange={handleMinChange}
                onBlur={onBlur}
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                onFocus={(e) =>
                    e.target.addEventListener(
                        "wheel",
                        function (e) {
                            e.preventDefault();
                        },
                        { passive: false }
                    )
                }
            />
            <span className="text-muted-foreground px-2">–</span>
            <InputGroupInput
                type="number"
                placeholder="Max"
                value={value?.max ?? ""}
                onChange={handleMaxChange}
                onBlur={onBlur}
                className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                onFocus={(e) =>
                    e.target.addEventListener(
                        "wheel",
                        function (e) {
                            e.preventDefault();
                        },
                        { passive: false }
                    )
                }
            />
            <InputGroupAddon align="inline-end" className="w-12 justify-end">
                <UnitLabel unit={unit} />
            </InputGroupAddon>
        </InputGroup>
    );
};
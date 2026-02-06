import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
} from "@/design-system/components/ui/select";
import { FC } from "react";

import { MaterialSource, MaterialSourceSchema } from "@/backend";
import { ClearableSelect } from "@/features/common/form/input/ClearableSelect";


export const MaterialSourceSelect: FC<{
    name?: string;
    value?: MaterialSource;
    onChange?: (value: MaterialSource | undefined) => void;
}> = ({ name, value, onChange }) => {
    const options = MaterialSourceSchema.options;

    return (
        <ClearableSelect<MaterialSource> name={name} value={value} onChange={onChange}>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Material source</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </ClearableSelect>
    );
};
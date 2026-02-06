import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/design-system/components/ui/select";
import { FC } from "react";

import { MaterialFillerType, MaterialFillerTypeSchema } from "@/backend";



const fillerTypeLabels: Record<MaterialFillerType, string> = {
    glassFibres: "Glass fibres",
    carbonFibres: "Carbon fibres",
    carbonBlack: "Carbon black",
    naturalFibres: "Natural fibres",
    talcum: "Talcum",
    calciumCarbonate: "Calcium carbonate",
    silica: "Silica",
    mica: "Mica",
    chalk: "Chalk",
};

export const FillerTypeSelect: FC<{
    value?: MaterialFillerType;
    onChange?: (value: MaterialFillerType) => void;
}> = ({ value, onChange }) => {
    const options = MaterialFillerTypeSchema.options;

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select filler type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filler type</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {fillerTypeLabels[option]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

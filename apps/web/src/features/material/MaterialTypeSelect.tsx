import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/design-system/components/ui/select";
import { FC } from "react";
import { Package } from "lucide-react";
import { MaterialType, MaterialTypeSchema } from "@/backend";

export const MaterialTypeSelect: FC<{
  options?: MaterialType[];
  name?: string;
  value?: MaterialType;
  onChange?: (value: MaterialType) => void;
}> = ({ name, value, onChange, options }) => {
  const allOptions = (options ?? MaterialTypeSchema.options).sort();
  const selectedValue = value ?? "";

  const handleValueChange = (nextValue: string) => {
    if (!onChange) return;

    const parsedValue = MaterialTypeSchema.safeParse(nextValue);
    if (parsedValue.success) {
      onChange(parsedValue.data);
    }
  };

  return (
    <Select name={name} value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center gap-2">
          <Package className={value ? "text-gray-900" : "text-gray-500"} />
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value ? value.toUpperCase() : "Select a material"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Materials</SelectLabel>
          {allOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

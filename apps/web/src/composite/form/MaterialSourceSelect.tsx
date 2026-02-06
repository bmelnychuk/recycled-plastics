import * as React from "react";

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
import z from "zod";
import { Package, Target } from "lucide-react";

const MaterialTypeSchema = z.enum(["Post Industrial", "Post Consumer"]);

export const MaterialSourceSelect: FC<{ name?: string }> = ({ name }) => {
  const options = MaterialTypeSchema.options;

  return (
    <Select name={name}>
      <SelectTrigger className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center gap-2">
          <Target />
          <SelectValue placeholder="Select a material source" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Material sources</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

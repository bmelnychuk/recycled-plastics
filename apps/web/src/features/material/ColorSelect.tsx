'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import { FC } from 'react';
import { Palette } from 'lucide-react';
import { MaterialColor, MaterialColorSchema } from '@rp/core';
import { ColorLabel, ColorPreview } from './MaterialColor';

export const ColorSelect: FC<{
  options?: MaterialColor[];
  name?: string;
  value?: MaterialColor;
  onChange?: (value: MaterialColor) => void;
}> = ({ name, value, onChange, options }) => {
  const allOptions = (options ?? MaterialColorSchema.options).sort();

  return (
    <Select name={name} value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
        <div className="flex items-center gap-2">
          {!value && <Palette className="text-gray-500" />}
          <SelectValue placeholder="Select a color" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Colors</SelectLabel>
          {allOptions.map((option) => (
            <SelectItem key={option} value={option}>
              <div className="flex items-center gap-2">
                <ColorPreview color={option} />
                <ColorLabel color={option} />
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

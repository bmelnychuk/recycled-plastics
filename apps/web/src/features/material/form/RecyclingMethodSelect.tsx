import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/design-system/components/ui/select';
import { FC } from 'react';

import { RecyclingMethod, RecyclingMethodSchema } from '@rp/core';
import { ClearableSelect } from '@/features/common/form/input/ClearableSelect';

export const RecyclingMethodSelect: FC<{
  name?: string;
  value?: RecyclingMethod;
  onChange?: (value: RecyclingMethod | undefined) => void;
}> = ({ name, value, onChange }) => {
  const options = RecyclingMethodSchema.options;

  return (
    <ClearableSelect<RecyclingMethod>
      name={name}
      value={value}
      onChange={onChange}
    >
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Recycling method</SelectLabel>
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

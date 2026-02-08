import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/design-system/components/ui/select';
import { FC } from 'react';

import { IntendedMarket, IntendedMarketSchema } from '@rp/core';
import { ClearableSelect } from '@/features/common/form/input/ClearableSelect';

export const IntendedMarketSelect: FC<{
  name?: string;
  value?: IntendedMarket;
  onChange?: (value: IntendedMarket | undefined) => void;
}> = ({ name, value, onChange }) => {
  const options = IntendedMarketSchema.options;

  return (
    <ClearableSelect<IntendedMarket>
      name={name}
      value={value}
      onChange={onChange}
    >
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Intended market</SelectLabel>
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

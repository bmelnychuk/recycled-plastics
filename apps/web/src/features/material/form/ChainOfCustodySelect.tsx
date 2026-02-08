import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/design-system/components/ui/select';
import { FC } from 'react';

import { ChainOfCustody, ChainOfCustodySchema } from '@rp/core';
import { ClearableSelect } from '@/features/common/form/input/ClearableSelect';

export const ChainOfCustodySelect: FC<{
  name?: string;
  value?: ChainOfCustody;
  onChange?: (value: ChainOfCustody | undefined) => void;
}> = ({ name, value, onChange }) => {
  const options = ChainOfCustodySchema.options;

  return (
    <ClearableSelect<ChainOfCustody>
      name={name}
      value={value}
      onChange={onChange}
    >
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chain of custody</SelectLabel>
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

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/design-system/components/ui/select';
import { FC } from 'react';
import { MaterialCondition, MaterialConditionSchema } from '@rp/core';
import { ClearableSelect } from '@/features/common/form/input/ClearableSelect';

export const MaterialConditionSelect: FC<{
  name?: string;
  value?: MaterialCondition;
  onChange?: (value: MaterialCondition | undefined) => void;
}> = ({ name, value, onChange }) => {
  const options = MaterialConditionSchema.options;

  return (
    <ClearableSelect<MaterialCondition>
      name={name}
      value={value}
      onChange={onChange}
    >
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Material conditions</SelectLabel>
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

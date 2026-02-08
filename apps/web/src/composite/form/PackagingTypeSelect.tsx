import { FC } from 'react';
import { PackagingType, PackagingTypeSchema } from '@rp/core';
import { MultiSelect } from '@/features/common/form/multi-select';

export interface PackagingTypeSelectProps {
  value?: PackagingType[];
  onChange?: (value: PackagingType[]) => void;
}

export const PackagingTypeSelect: FC<PackagingTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const options = PackagingTypeSchema.options;
  return (
    <MultiSelect<PackagingType>
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

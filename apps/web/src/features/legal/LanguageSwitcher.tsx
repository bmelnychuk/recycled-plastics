import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/design-system/components/ui/toggle-group';
import type { FC } from 'react';

export const LanguageSwitcher: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <ToggleGroup
      value={value}
      onValueChange={onChange}
      type="single"
      variant="outline"
    >
      <ToggleGroupItem value="en" aria-label="Toggle English">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="de" aria-label="Toggle German">
        DE
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

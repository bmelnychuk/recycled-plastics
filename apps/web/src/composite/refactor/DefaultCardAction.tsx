import { CardAction } from '@/design-system/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/design-system/components/ui/toggle-group';

export const DefaultCardAction = () => {
  return (
    <CardAction className="flex items-center gap-2">
      <Select>
        <SelectTrigger
          size="sm"
          className="hidden rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="PP" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="90d" className="rounded-lg">
            PP
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            PET
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            HDPE
          </SelectItem>
        </SelectContent>
      </Select>
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        defaultValue="demand"
      >
        <ToggleGroupItem value="demand">Demand</ToggleGroupItem>
        <ToggleGroupItem value="supply">Supply</ToggleGroupItem>
      </ToggleGroup>
    </CardAction>
  );
};

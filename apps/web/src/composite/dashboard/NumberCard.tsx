import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { FC } from 'react';
import { DefaultCardAction } from '../refactor/DefaultCardAction';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/design-system/components/ui/toggle-group';

export const NumberCard: FC<{ title: string; amount: string }> = ({
  title,
  amount,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-semibold">{amount}</div>
      </CardContent>
    </Card>
  );
};

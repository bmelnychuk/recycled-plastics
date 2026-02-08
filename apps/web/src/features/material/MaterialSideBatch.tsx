import { Badge } from '@/design-system/components/ui/badge';
import { FC } from 'react';

export const SupplyBadge: FC = () => {
  return (
    <Badge variant="outline" className="bg-green-50 text-green-800">
      <span className="capitalize">Supply</span>
    </Badge>
  );
};

export const DemandBadge: FC = () => {
  return (
    <Badge className="bg-red-50 text-red-800" variant="outline">
      <span className="capitalize">Demand</span>
    </Badge>
  );
};

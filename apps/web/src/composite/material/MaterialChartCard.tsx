import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { AreaChartInteractive } from './AreaChartInteractive';

import { FC } from 'react';

export const MaterialChartCard: FC<{ data?: any }> = ({ data }) => {
  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle>Material visibility</CardTitle>
        <CardDescription>People interested in this material</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <AreaChartInteractive />
      </CardContent>
    </Card>
  );
};

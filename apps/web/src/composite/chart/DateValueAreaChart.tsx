'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/design-system/components/ui/chart';
import { FC } from 'react';
import { format } from 'date-fns';

export const description = 'An area chart with a legend';

interface ChartDataEntry {
  date: string;
  value: number;
}

export const DateValueAreaChart: FC<{ data: ChartDataEntry[] }> = ({
  data,
}) => {
  return (
    <div className="pt-0 h-full flex flex-col">
      <ChartContainer config={{}} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => format(value, 'MMM')}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <Area
            dataKey="value"
            type="monotone"
            fill="var(--chart-1)"
            stroke="var(--chart-1)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

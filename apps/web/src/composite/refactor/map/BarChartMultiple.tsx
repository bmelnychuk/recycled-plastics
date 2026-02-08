'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/design-system/components/ui/chart';
import { FC } from 'react';
import { DefaultCardAction } from '../DefaultCardAction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';

export const description = 'A multiple bar chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'January', desktop: 156, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'February', desktop: 335, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'March', desktop: 227, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'April', desktop: 79, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'May', desktop: 309, mobile: 130 },
  { month: 'June', desktop: 254, mobile: 140 },
  { month: 'June', desktop: 264, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Supply',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Demand',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export const BarChartMultiple: FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Supply / Demand</CardTitle>
        <CardDescription>January 2025 - June 2025</CardDescription>
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
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

'use client';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/design-system/components/ui/select';
import { DefaultCardAction } from '../refactor/DefaultCardAction';

export const description = 'A bar chart with a custom label';

const chartData = [
  { month: 'Germany', desktop: 305, mobile: 200 },
  { month: 'France', desktop: 237, mobile: 120 },
  { month: 'Italy', desktop: 214, mobile: 140 },
  { month: 'Spain', desktop: 209, mobile: 130 },
  { month: 'Portugal', desktop: 186, mobile: 80 },
  { month: 'Greece', desktop: 73, mobile: 190 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-2)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig;

export const BarChartHorizontal: FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Geographical Distribution</CardTitle>
        <CardDescription>Distribution of the last 6 months</CardDescription>
        <DefaultCardAction />
      </CardHeader>
      <CardContent className="overflow-auto flex-1">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

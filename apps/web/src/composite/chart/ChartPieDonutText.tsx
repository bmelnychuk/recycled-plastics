'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardAction,
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
import { DefaultCardAction } from '../refactor/DefaultCardAction';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/design-system/components/ui/toggle-group';

export const description = 'A donut chart with text';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'Amount',
  },
  chrome: {
    label: 'PP',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'PET',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'HDPE',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'LDPE',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export const ChartPieDonutText: FC = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Materials composition</CardTitle>
        <CardDescription>Most requested materials</CardDescription>
        <CardAction className="flex items-center gap-4">
          <ToggleGroup type="single" variant="outline" defaultValue="demand">
            <ToggleGroupItem value="demand">Demand</ToggleGroupItem>
            <ToggleGroupItem value="supply">Supply</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="flex h-full w-full gap-6">
          <ChartContainer
            config={chartConfig}
            className="min-h-[220px] md:min-h-0 flex-none aspect-square"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                outerRadius={85}
                innerRadius={65}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tons
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="flex flex-1 flex-col gap-2 md:max-h-full md:overflow-y-auto pr-8">
            {chartData.map(({ browser, visitors, fill }) => {
              const configEntry =
                chartConfig[browser as keyof typeof chartConfig];
              const percentage = totalVisitors
                ? (visitors / totalVisitors) * 100
                : 0;

              return (
                <div key={browser} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm border border-border/60"
                    style={{
                      backgroundColor:
                        'color' in configEntry
                          ? configEntry.color
                          : (fill ?? `var(--chart-${browser})`),
                    }}
                  />

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {configEntry?.label ?? browser}
                      </span>
                      <span className="text-sm font-mono font-semibold text-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {visitors.toLocaleString()} tons
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

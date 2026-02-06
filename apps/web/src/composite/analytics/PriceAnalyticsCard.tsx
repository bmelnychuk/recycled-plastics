"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/design-system/components/ui/chart";
import { FC, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/design-system/components/ui/toggle-group";
import { MaterialType } from "@/backend";
import { MaterialAnalyticsByDate } from "@/backend";
import { format } from "date-fns";

export const description = "An area chart with a legend";

interface ChartDataItem {
  date: string;
  demand: number;
  supply: number;
}

const chartConfig = {
  demand: {
    label: "Demand",
    color: "var(--chart-1)",
  },
  supply: {
    label: "Supply",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const PriceAnalyticsCard: FC<{
  data: MaterialAnalyticsByDate[];
}> = ({ data }) => {
  const uniqueMaterials = new Set([...data.map((item) => item.materialType)]);

  const [sides, setSides] = useState<string>("supply");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(
    Array.from(uniqueMaterials)[0]
  );

  const chartData = useMemo(() => {
    const materialData = data.find((d) => d.materialType === selectedMaterial);
    return materialData?.data.map((d) => ({
      date: d.date,
      demand: d.demand.price / 100,
      supply: d.supply.price / 100,
    })) || [];
  }, [data, selectedMaterial]);

  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 100];

    const maxValue = Math.max(
      ...chartData.map(({ demand, supply }) => Math.max(demand, supply))
    );
    const adjustedMax = maxValue > 0 ? maxValue * 1.4 : 100;
    return [0, adjustedMax];
  }, [chartData]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Price Trend</CardTitle>
        <CardDescription>Janaury 2025 - June 2025</CardDescription>
        <CardAction className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            value={sides}
            onValueChange={setSides}
          >
            <ToggleGroupItem value="demand" aria-label="Toggle demand">
              Demand
            </ToggleGroupItem>
            <ToggleGroupItem value="supply" aria-label="Toggle supply">
              Supply
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={selectedMaterial}
            onValueChange={(value) =>
              setSelectedMaterial(value as MaterialType)
            }
          >
            <SelectTrigger
              size="sm"
              className="hidden rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select a material" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Array.from(uniqueMaterials).map((material) => (
                <SelectItem
                  key={material}
                  value={material}
                  className="rounded-lg"
                >
                  {material.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(value, "MMM")}
            />
            <YAxis domain={yAxisDomain} hide={true} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {sides === "demand" && (
              <Area
                dataKey="demand"
                type="monotone"
                fill="var(--color-demand)"
                fillOpacity={0.6}
                stroke="var(--color-demand)"
              />
            )}
            {sides === "supply" && (
              <Area
                dataKey="supply"
                type="monotone"
                fill="var(--color-supply)"
                fillOpacity={0.6}
                stroke="var(--color-supply)"
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

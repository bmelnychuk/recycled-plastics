"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { MaterialAnalyticsByDate } from "@/backend";
import { MaterialType } from "@/backend";
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

export const AmountAnalyticsCard: FC<{
  data: MaterialAnalyticsByDate[];
}> = ({ data }) => {
  const uniqueMaterials = new Set([...data.map((item) => item.materialType)]);

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(
    Array.from(uniqueMaterials)[0]
  );

  const chartData = useMemo(() => {
    const materialData = data.find((d) => d.materialType === selectedMaterial);

    return (
      materialData?.data.map((d) => ({
        date: d.date,
        demand: d.demand.amount,
        supply: d.supply.amount,
      })) || []
    );
  }, [data, selectedMaterial]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Supply / Demand</CardTitle>
        <CardDescription>Janaury 2025 - June 2025</CardDescription>
        <CardAction className="flex items-center gap-2">
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
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => format(value, "MMM")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="demand" fill="var(--color-demand)" radius={4} />
            <Bar dataKey="supply" fill="var(--color-supply)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

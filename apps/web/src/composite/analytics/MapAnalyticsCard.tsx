"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
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
import { MaterialAnalyticsByCountry } from "@/backend";
import { MaterialType } from "@/backend";
import { FC, useMemo, useState } from "react";
import { AnalyticsMapView } from "../refactor/AnalyticsMapView";
import { CircleFlag } from "react-circle-flags";
import { getCountryName } from "../common/location-utils";

const supplyColor = "#94CE9A";
const demandColor = "#FF0000"; // red variation
const hoveredSupplyColor = "#46A758";
const hoveredDemandColor = "#FF0000"; // red variation
const hoveredSupplyBorderColor = "#3E9B4F";
const hoveredDemandBorderColor = "#FF0000"; // red variation

export const MapAnalyticsCard: FC<{ data: MaterialAnalyticsByCountry[] }> = ({
  data,
}) => {
  const uniqueMaterials = new Set([...data.map((item) => item.materialType)]);

  const [sides, setSides] = useState<string>("supply");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>(
    Array.from(uniqueMaterials)[0]
  );

  const chartData = useMemo(() => {
    return (
      data
        .find((d) => d.materialType === selectedMaterial)
        ?.data.map((d) => ({
          countryCode: d.country,
          value: sides === "supply" ? d.supply.amount : d.demand.amount,
        }))
        ?.sort((a, b) => b.value - a.value) || []
    );
  }, [data, selectedMaterial, sides]);

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Map</CardTitle>
        <CardDescription>Demand and supply by country</CardDescription>
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
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-1 grid grid-cols-1 gap-6 lg:grid-cols-4 min-h-0">
          <div className="col-span-3 w-full h-full flex-1 min-h-0">
            <AnalyticsMapView
              countryHighlights={chartData.map((d) => ({
                countryCode: d.countryCode,
                color: sides === "supply" ? supplyColor : demandColor,
                hoverColor: sides === "supply" ? hoveredSupplyColor : hoveredDemandColor,
                hoverBorderColor: sides === "supply" ? hoveredSupplyBorderColor : hoveredDemandBorderColor,
                opacity: 0.5,
              }))}
              onCountryClick={(countryCode) => {
                console.log(countryCode);
              }}
            />
          </div>

          <div className="col-span-1 flex-1 min-h-0 overflow-y-auto pr-8">
            <CountiesChart
              data={chartData.map((d) => ({
                countryCode: d.countryCode,
                value: d.value,
              }))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CountiesChartRecord {
  countryCode: string;
  value: number;
}

const CountiesChart: FC<{ data: CountiesChartRecord[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex flex-col gap-4 w-full py-4">
      {data.map((data, index) => {
        const widthPercentage = (data.value / maxValue) * 100;
        return (
          <div className="flex items-center gap-4 w-full" key={index}>
            <CircleFlag
              countryCode={data.countryCode.toLowerCase()}
              height="22"
              width="22"
            />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{getCountryName(data.countryCode)}</span>
                <span>{data.value} kg</span>
              </div>
              <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

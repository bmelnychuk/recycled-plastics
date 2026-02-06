"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { AnalyticsMapView } from "./AnalyticsMapView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/ui/select";
import { CountiesChart } from "./map/CountiesChart";
import { Bold, Italic, Underline } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/design-system/components/ui/toggle-group";
import { DefaultCardAction } from "./DefaultCardAction";

const color = "#94CE9A";

export const MapCard = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Map</CardTitle>
        <CardDescription>Demand and supply by country</CardDescription>
        <DefaultCardAction />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-1 grid grid-cols-1 gap-6 lg:grid-cols-4 min-h-0">
          <div className="col-span-3 w-full h-full flex-1 min-h-0">
            <AnalyticsMapView
              countryHighlights={[
                { countryCode: "DE", color, opacity: 0.5 },
                { countryCode: "FR", color, opacity: 0.5 },
                { countryCode: "PL", color, opacity: 0.5 },
                { countryCode: "GB", color, opacity: 0.5 },
                { countryCode: "AU", color, opacity: 0.5 },
                { countryCode: "NZ", color, opacity: 0.5 },
                { countryCode: "IE", color, opacity: 0.5 },
                { countryCode: "NL", color, opacity: 0.5 },
                { countryCode: "BE", color, opacity: 0.5 },
                { countryCode: "SE", color, opacity: 0.5 },
                { countryCode: "CN", color, opacity: 0.5 },
              ]}
              onCountryClick={(countryCode) => {
                // console.log(countryCode);
              }}
            />
          </div>

          <div className="col-span-1 flex-1 min-h-0 overflow-y-auto pr-8">
            <CountiesChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

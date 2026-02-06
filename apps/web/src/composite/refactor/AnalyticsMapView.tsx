"use client";

import type { MapMouseEvent } from "mapbox-gl";
import type { MapRef } from "react-map-gl/mapbox";
import { Map as MapGl, Source, Layer } from "react-map-gl/mapbox";
import { FC, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/components/ui/table";
import { Button } from "@/design-system/components/ui/button";
import { XIcon } from "lucide-react";

export interface CountryHighlight {
  countryCode: string;
  color: string;
  opacity: number;
  hoverColor?: string;
  hoverBorderColor?: string;
}

// const hoveredCountryColor = "#46A758";
// const hoveredCountryBorderColor = "#3E9B4F";

const germanCompanyShipments = [
  { companyName: "PolyCycle GmbH", city: "Berlin", amount: 312 },
  { companyName: "RePlastics AG", city: "Munich", amount: 284 },
  { companyName: "Circular Matters", city: "Hamburg", amount: 265 },
  { companyName: "GreenLoop Industries", city: "Frankfurt", amount: 241 },
  { companyName: "EcoForm Solutions", city: "Cologne", amount: 228 },
  { companyName: "Nordic Polymer", city: "Bremen", amount: 219 },
  { companyName: "SüdPlast Vertriebs", city: "Stuttgart", amount: 207 },
  { companyName: "Rhein Recycling Co.", city: "Düsseldorf", amount: 198 },
  { companyName: "LoopUp Partners", city: "Leipzig", amount: 176 },
  { companyName: "NextCycle Labs", city: "Dresden", amount: 169 },
  { companyName: "BlueMatter GmbH", city: "Hanover", amount: 154 },
  { companyName: "ZeroWaste Logistics", city: "Essen", amount: 143 },
  { companyName: "PolyTech Services", city: "Nuremberg", amount: 131 },
  { companyName: "CircularWave", city: "Mannheim", amount: 124 },
  { companyName: "MetroLoop Trading", city: "Bochum", amount: 118 },
];

export const AnalyticsMapView: FC<{
  countryHighlights: CountryHighlight[];
  onCountryClick: (country: string) => void;
}> = ({ countryHighlights, onCountryClick }) => {
  const mapRef = useRef<MapRef>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const onClick = (event: any) => {
    const features = event.features;
    if (!features || features.length === 0) return;

    const feature = features[0];
    if (!feature.properties) return;
    const country = feature.properties.iso_3166_1;
    onCountryClick(country);
    setSelectedCountry(country);
  };

  const handleMouseMove = (event: MapMouseEvent) => {
    const features = event.features;
    if (!features || features.length === 0) {
      setHoveredCountry(null);
      return;
    }

    const feature = features[0];
    if (!feature.properties) {
      setHoveredCountry(null);
      return;
    }
    const countryCode = feature.properties.iso_3166_1 as string | undefined;
    setHoveredCountry(countryCode ?? null);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  const countryCodes = countryHighlights.map((country) => country.countryCode);
  const hoverCountry = countryHighlights.find((country) => country.countryCode === hoveredCountry);

  return (
    <div className="relative h-full w-full">
      <MapGl
        initialViewState={{ latitude: 50.0, longitude: 8.0, zoom: 4 }}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken="pk.eyJ1IjoiYm1lbG55Y2h1ayIsImEiOiJjbTFyd3lqY2EwMDhxMmtxdjgwcHd4djdzIn0.ua-dMcW2Ps5eOn0r3b1R4g"
        ref={mapRef}
        interactiveLayerIds={["country-highlight"]}
        // onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {countryCodes.length && (
          <Source
            id="countries"
            type="vector"
            url="mapbox://mapbox.country-boundaries-v1"
          >
            <Layer
              id="country-highlight"
              type="fill"
              source-layer="country_boundaries"
              filter={[
                "all",
                ["in", ["get", "iso_3166_1"], ["literal", countryCodes]],
                ["==", ["get", "disputed"], "false"],
                [
                  "any",
                  ["==", "all", ["get", "worldview"]],
                  ["in", "US", ["get", "worldview"]],
                ],
              ]}
              paint={{
                "fill-color": [
                  "case",
                  ...(hoveredCountry
                    ? [["==", ["get", "iso_3166_1"], hoveredCountry], hoverCountry?.hoverColor]
                    : []),
                  ...countryHighlights.flatMap((country) => [
                    ["==", ["get", "iso_3166_1"], country.countryCode],
                    country.color,
                  ]),
                  "#088",
                ],
                "fill-opacity": [
                  "case",
                  ...(hoveredCountry
                    ? [["==", ["get", "iso_3166_1"], hoveredCountry], 0.7]
                    : []),
                  ...countryHighlights.flatMap((country) => [
                    ["==", ["get", "iso_3166_1"], country.countryCode],
                    country.opacity,
                  ]),
                  0.4,
                ],
                "fill-outline-color": "#000",
              }}
            />
            {hoveredCountry && (
              <Layer
                id="country-hover-outline"
                type="line"
                source-layer="country_boundaries"
                filter={[
                  "all",
                  ["==", ["get", "iso_3166_1"], hoveredCountry],
                  ["==", ["get", "disputed"], "false"],
                  [
                    "any",
                    ["==", "all", ["get", "worldview"]],
                    ["in", "US", ["get", "worldview"]],
                  ],
                ]}
                paint={{
                  "line-color": hoverCountry?.hoverBorderColor,
                  "line-width": 2,
                }}
              />
            )}
          </Source>
        )}
      </MapGl>

      {selectedCountry && (
        <Card className="absolute left-4 top-4 z-10 flex w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] max-w-md flex-col overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle>Germany, PP Availability</CardTitle>
            <CardDescription>Total materials: 2459 tons</CardDescription>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCountry(null)}
              >
                <XIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Company Name</TableHead>
                  <TableHead className="font-bold">City</TableHead>
                  <TableHead className="font-bold text-right">
                    Amount (t)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {germanCompanyShipments.map((entry) => (
                  <TableRow key={entry.companyName}>
                    <TableCell className="font-medium">
                      {entry.companyName}
                    </TableCell>
                    <TableCell>{entry.city}</TableCell>
                    <TableCell className="text-right">
                      {entry.amount.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

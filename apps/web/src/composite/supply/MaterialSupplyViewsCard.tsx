import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { DateValueAreaChart } from "../chart/DateValueAreaChart";

import { FC } from "react";

export const MaterialSupplyViewsCard: FC<{ data?: any }> = ({ data }) => {
  const hasData = (data?.data?.length ?? 0) > 1;
  return (
    <Card className="h-[300px]">
      <CardHeader>
        <CardTitle>Material visibility</CardTitle>
        <CardDescription>People interested in this material</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {hasData ? (
          <DateValueAreaChart
            data={
              data?.data?.map((item: any) => ({
                date: item.date,
                value: item.views,
              })) ?? []
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Not enough data available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// import {
//   getMaterialsAnalyticsByDate,
//   getMaterialsAnalyticsByCountry,
//   getPlatformAnalytics,
// } from "@/backend";

import { AmountAnalyticsCard } from "@/composite/analytics/AmountAnalyticsCard";
import { MapAnalyticsCard } from "@/composite/analytics/MapAnalyticsCard";
import { PriceAnalyticsCard } from "@/composite/analytics/PriceAnalyticsCard";
import { NumberCard } from "@/composite/dashboard/NumberCard";

export const revalidate = 43200; // 12 hours in seconds

export const generateMetadata = () => ({
  title: "Materials | Recycled Plastics",
  description:
    "Browse a list of materials including PET, HDPE, LDPE, PP, PS, ABS, PC, PA, PE and more. See descriptions, colors, countries and prices.",
});

export default async function Page() {
  // const [analyticsByDate, analyticsByCountry, platformAnalytics] =
  //   await Promise.all([
  //     getMaterialsAnalyticsByDate(),
  //     getMaterialsAnalyticsByCountry(),
  //     getPlatformAnalytics(),
  //   ]);

  return <div>Analytics</div>;

  // return (
  //   <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-4">
  //     <h1 className="col-span-4 text-2xl font-bold">Platform</h1>
  //     <div className="col-span-1">
  //       <NumberCard
  //         title="Verified users"
  //         amount={platformAnalytics.users.toString()}
  //       />
  //     </div>
  //     <div className="col-span-1">
  //       <NumberCard
  //         title="Verified companies"
  //         amount={platformAnalytics.companies.toString()}
  //       />
  //     </div>
  //     <div className="col-span-1">
  //       <NumberCard
  //         title="Total supply"
  //         amount={platformAnalytics.supply.toString()}
  //       />
  //     </div>
  //     <div className="col-span-1">
  //       <NumberCard
  //         title="Total demand"
  //         amount={platformAnalytics.demand.toString()}
  //       />
  //     </div>
  //     <h1 className="col-span-4 text-2xl font-bold mt-6">
  //       Price / availability development
  //     </h1>
  //     <div className="col-span-2 h-[400px]">
  //       <PriceAnalyticsCard data={analyticsByDate} />
  //     </div>
  //     <div className="col-span-2 h-[400px]">
  //       <AmountAnalyticsCard data={analyticsByDate} />
  //     </div>
  //     <h1 className="col-span-4 text-2xl font-bold mt-6">
  //       Geographic distribution
  //     </h1>
  //     <div className="col-span-4 h-[700px] pb-12">
  //       <MapAnalyticsCard data={analyticsByCountry} />
  //     </div>
  //   </div>
  // );
}

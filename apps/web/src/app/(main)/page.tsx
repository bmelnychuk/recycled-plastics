import { getDemandMaterials, getSupplyMaterials } from "@/backend/api";
import { getCurrentUser } from "@/backend/api/session";
import { MaterialsCard } from "@/composite/dashboard/MaterialsCard";
import { DemandHeroCompact } from "@/features/demand/DemandHeroCompact";
import { SupplyHeroCompact } from "@/features/supply/SupplyHeroCompact";
import { hello } from "@rp/core";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({}); // OIDC credentials auto-picked




export default async function Page() {
  await client.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME!,
    Item: {
      id: { S: crypto.randomUUID() }
    }
  }));


  const [user, supply, demand] = await Promise.all([
    getCurrentUser(),
    getSupplyMaterials(),
    getDemandMaterials(),
  ]);

  const suppliers = new Set(supply.map((m) => m.companyId));
  const buyers = new Set(demand.map((m) => m.companyId));

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>{hello("World")}</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SupplyHeroCompact
          activeListings={supply.length}
          suppliers={suppliers.size}
        />
        <DemandHeroCompact
          activeListings={demand.length}
          buyers={buyers.size}
        />
      </div>
      <MaterialsCard user={user} demand={demand} supply={supply} />
    </div>
  );
}

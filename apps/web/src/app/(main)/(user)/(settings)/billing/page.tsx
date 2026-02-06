import { BillingInfo } from "@/features/settings/billing/BillingInfo";
import { getSignedInUser } from "@/backend/api/session";

export default async function Page() {
  const user = await getSignedInUser();

  return (
    <div className="p-10">
      <BillingInfo user={user} />
    </div>
  );
}

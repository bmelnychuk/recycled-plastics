import { CheckoutStatus } from "@/features/settings/billing/CheckoutStatus";
import { Suspense } from "react";

export default function StripeSuccessPage() {
  return (
    <Suspense>
      <CheckoutStatus />
    </Suspense>
  );
}

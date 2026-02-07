import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;
    const externalId = user.externalId;

    // Get the origin from the request URL
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: "price_1SYQbdPix0BlNYPAYK562QpG", quantity: 1 }],
      mode: "subscription",
      customer_email: primaryEmail,
      success_url: `${origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing`,
      metadata: {
        userId: externalId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

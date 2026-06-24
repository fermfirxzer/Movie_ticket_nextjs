import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSeatBooking } from '@/../lib/booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log("Webhook route called");

  const signature = req.headers.get('stripe-signature'); // Fix syntax
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook is missing a signature header or webhook secret.');
    return NextResponse.json({ error: 'Webhook is not configured correctly' }, { status: 400 });
  }

  let event;
  try {
    const body = await req.text(); // Get the raw body

    // Verify the signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // console.log("Verified event:", event.type);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event type
  switch (event.type) {

    case 'checkout.session.completed':
      const session = event.data.object;
      const metadata = session.metadata;
      if (metadata.type === 'seat') {
      try {
        const booking = await createSeatBooking(metadata);
        console.log("Seat booking processed from webhook:", booking);
      } catch (apiError) {
        console.error("Error processing seat booking:", apiError);
        return NextResponse.json({ error: "Failed to process seat booking" }, { status: 500 });
      }
      break;
    }else if (metadata.type === 'tier') {
      console.log('Promotion purchase successful for session:', session.id);
      console.log(metadata);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotionTier`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            metadata 
        ),
        });
        const apiResponse = await response.json();
        console.log("Response from other API:", apiResponse);
      } catch (apiError) {
        console.error("Error calling external API:", apiError);
        return NextResponse.json({ error: "Failed to call external API" }, { status: 500 });
      }
    }
  }
  // Acknowledge receipt of the event
  return NextResponse.json({ received: true });
}

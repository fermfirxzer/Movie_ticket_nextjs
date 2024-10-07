import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // console.log("Webhook route called");

  const signature = req.headers.get('stripe-signature'); // Fix syntax
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const body = await req.text(); // Get the raw body
    // console.log("Request body:", body);

    // Verify the signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // console.log("Verified event:", event.type);
  } catch (err) {
    // console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event type
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const metadata = session.metadata;
      console.log('Payment successful for session:', session.id);
     
      console.log('Metadata:', metadata);
      try {
        const origin = req.headers.get('origin');
        const response = await fetch(`http://localhost:3000/api/seat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            metadata // Example data from your event object
        ),
        });
        const apiResponse = await response.json();
        console.log("Response from other API:", apiResponse);
      } catch (apiError) {
        console.error("Error calling external API:", apiError);
        return NextResponse.json({ error: "Failed to call external API" }, { status: 500 });
      }
      break;
    // case 'payment_intent.succeeded':
    //   // console.log('paymant success');
    //   break;
    default:
      // console.log(`Unhandled event type: ${event.type}`);
  }

  // Acknowledge receipt of the event
  return NextResponse.json({ received: true });
}

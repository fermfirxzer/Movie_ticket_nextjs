import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  
  try {

    const body = await req.json();
    const { selectedSeats, moviename, date, selectedTheater, selectedShowtime, username,total_amount } = body;
    console.log(selectedSeats)
    const line_items = Object.entries(selectedSeats).map(([seatId, price]) => ({
      price_data: {
        currency: 'thb', // Define the currency
        product_data: {
          name: `Seat ${seatId} for ${decodeURI(moviename)}`,
        },
        unit_amount: Number(price)*100, 
      },
      quantity: 1,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items: line_items, 
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/history?success=true`, // Dynamically set success URL based on origin
      cancel_url: `${req.headers.get('origin')}/history?canceled=true`, 
      metadata: {
        date: date,
        selectedTheater: selectedTheater,
        selectedShowtime: selectedShowtime,
        moviename: decodeURI(moviename),
        username: username,
        selectedSeats: JSON.stringify(selectedSeats),
        total_amount:total_amount,
        type: 'seat',
      },
      
    }
  );

    return NextResponse.json({ url:session.url }, { status: 200 });

  } catch (err) {
    // Use NextResponse to return an error with the appropriate status code
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
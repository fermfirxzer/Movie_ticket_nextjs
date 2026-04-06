import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectMongoDB } from '@/../lib/mongodb.js';
import { Theater } from '@/../lib/model/theater';
import { Seat } from '@/../lib/model/seat';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { selectedSeats, moviename, date, showid, theater, time, username, total_amount } = body;
    const seats = selectedSeats && typeof selectedSeats === 'object' ? selectedSeats : {};
    const seatIds = Object.keys(seats);

    if (!seatIds.length) {
      return NextResponse.json({ error: 'No seats selected.' }, { status: 400 });
    }

    const theaterDoc = await Theater.findOne({ theater_name: theater }).select('_id');
    if (!theaterDoc) {
      return NextResponse.json({ error: 'Theater not found.' }, { status: 404 });
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const seatDocs = Object.entries(seats).map(([seatId, price]) => ({
      seat_id: seatId,
      price: price,
      theater_id: theaterDoc._id,
      Date: date,
      Time: time,
      status: 'not paying',
      expires_at: expiresAt,
    }));

    const insertedSeats = await Seat.insertMany(seatDocs);

    const line_items = Object.entries(seats).map(([seatId, price]) => ({
      price_data: {
        currency: 'thb',
        product_data: {
          name: `Seat ${seatId} for ${decodeURI(moviename)}`,
        },
        unit_amount: Number(price) * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/history?success=true`,
      cancel_url: `${req.headers.get('origin')}/history?canceled=true`,
      metadata: {
        date: date,
        theater: theater,
        time: time,
        showid: showid,
        moviename: decodeURI(moviename),
        username: username,
        // selectedSeats: JSON.stringify(seats),
        seatIds: JSON.stringify(insertedSeats.map(seat => seat._id.toString())),
        total_amount: total_amount,
        type: 'seat',
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body=await req.json();
    console.log(body)
    const {username,name,price,id}=body;           
    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: `Purchase Name: ${name}`, 
            },
            unit_amount: Number(price)*100, 
          },
          quantity: 1, 
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/promotion?success=true`,
      cancel_url: `${req.headers.get('origin')}/promotion?canceled=true`, 
      metadata: {
        username:username,
        Tiername:name,
        price:price,
        Tierid:id,
        type:"tier"
      },
      
    }
  );
  

    return NextResponse.json({ url:session.url }, { status: 200 });

  } catch (err) {
    // Use NextResponse to return an error with the appropriate status code
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
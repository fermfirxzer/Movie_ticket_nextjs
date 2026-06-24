import { NextResponse } from "next/server";
import { createSeatBooking } from "@/../lib/booking";

export async function POST(req) {
    try {
        const body = await req.json();
        const result = await createSeatBooking(body);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { NextResponse } from "next/server";
import { User } from "@/../lib/model/user";
import { PromotionHistory } from "@/../lib/model/promotionhistory";
//get Item and Tier 
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        await connectMongoDB();
        const point = await User.findOne({ username: username }).select('point');

        return NextResponse.json({ point:point.point }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Message: 'Failed to fetch Point from User' }, { status: 400 });
    }
}



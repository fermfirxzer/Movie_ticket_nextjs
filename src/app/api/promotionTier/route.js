import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { NextResponse } from "next/server";
import { User } from "../../../../lib/model/user";
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
export async function POST(request) {
    try {
        await connectMongoDB();
        const body=await request.json();
        const {username,name,price,discount,id}=body;
        const user = await User.findOne({username:username});
        if (!user) {
            return NextResponse.json({ Message: 'User not found' }, { status: 404 });
        }
        
        const promotionTier = [];
        promotionTier.push({
            item_id: id,
            name: name,
            discount:discount,
            quantity: 1,
        });
        
        const newHistory = new PromotionHistory({
            userId: user._id,
            type: "Tier",
            items: promotionTier,
            purchaseTime:new Date(),
            Total:price,
        });
        
        await newHistory.save();
        
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        
        user.tier=name;
        user.tier_expiration_date=expirationDate;
        user.tier_status='active'
        await user.save();
        return NextResponse.json({ Message:`Success buy Tier ${name}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Message: 'Failed to fetch Point from User' }, { status: 400 });
    }
}



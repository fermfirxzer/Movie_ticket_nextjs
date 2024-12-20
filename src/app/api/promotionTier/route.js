import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { NextResponse } from "next/server";
import { User } from "@/../lib/model/user";
import { PromotionHistory } from "@/../lib/model/promotionhistory"; // Update the path as needed
export async function POST(request) {
    console.log("This is post promotion Tier")
    try {
        await connectMongoDB();
        const body=await request.json();
        console.log(body)
        const {username,Tiername,price,Tierid}=body;
        const user = await User.findOne({username:username});
        if (!user) {
            return NextResponse.json({ Message: 'User not found' }, { status: 404 });
        }
        const promotionTier = [];
        promotionTier.push({
            item_id: Tierid,
            name: Tiername,
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
        
        user.tier=Tiername;
        user.tier_expiration_date=expirationDate;
        user.tier_status='active'
        await user.save();
        return NextResponse.json({ Message:`Success buy Tier ${Tiername}` }, { status: 200 });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return NextResponse.json({ Message: 'Failed to fetch Point from User' }, { status: 400 });
    }
}

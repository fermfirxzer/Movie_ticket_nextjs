import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { PromotionItem } from "@/../lib/model/promotionitem";
import { PromotionTier } from "@/../lib/model/promotionTier";
import { PromotionHistory } from "@/../lib/model/promotionhistory";
import { NextResponse } from "next/server";
import { User } from "@/../lib/model/user";

//get Item and Tier 
export async function GET(req) {
    try {
        await connectMongoDB();

        const promotionItems = await PromotionItem.find();
        const promotionTier = await PromotionTier.find();

        return NextResponse.json({ Item: promotionItems, Tier: promotionTier }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Message: 'Failed to fetch Item and Tier' }, { status: 400 });
    }
}
export async function POST(request) {
    try {
        const { username, item_id, total } = await request.json();

        // Ensure all required fields are present
        
        console.log(username,item_id,total)
        await connectMongoDB();

        const user = await User.findOne({username:username});
        if (!user) {
            return NextResponse.json({ Message: 'User not found' }, { status: 404 });
        }
        if (user.points < total) {
            return NextResponse.json({ Message: 'Not enough points' }, { status: 400 });
        }
        const promotionItems = [];
        item_id.forEach((item)=>{
            promotionItems.push({
                item_id: item.rewardId,
                name: item.rewardName,
                quantity: 1, // Default quantity to 1, modify if needed
            });
        })
    
        
        // Create a new promotion history entry
        const newHistory = new PromotionHistory({
            userId: user._id,
            type: "Item",
            items: promotionItems,
            purchaseTime:new Date(),
            Total:total,
        });

        // Save to the database
        await newHistory.save();
        user.point -= total;
        // Save the updated user points
        await user.save();
        return NextResponse.json({ Message: 'Promotion history added successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Failed to add promotion history' }, { status: 500 });
    }
}
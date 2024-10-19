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
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');
        const user=await User.findOne({username:username});
        if(!user){
            return NextResponse.json({ Message:"User not found" }, { status: 404 }); 
        }
        
        const History=await PromotionHistory.find({userId:user._id});

        

        return NextResponse.json({ History }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ Message: 'Failed to History Promotion User' }, { status: 400 });
    }
}
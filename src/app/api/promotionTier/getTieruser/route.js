import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { NextResponse } from "next/server";
import { User } from "../../../../../lib/model/user";

export const dynamic = 'force-dynamic'; 
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        await connectMongoDB();
    
        const user = await User.findOne({ username: username }); // Fetch the user by username
        
        
        if (user) {
            await checkTierStatus(user);
        } else {
            return NextResponse.json({ Message: 'User not found!' }, { status: 404 });
        }

        // Aggregate the user tier details
        const userTier = await User.aggregate([
            {
                $match: { 
                    username: username,
                    tier_status: 'active' // Ensure only active tiers are matched
                }
            },
            {
                $lookup: {
                    from: 'promotiontiers', // The name of the PromotionTier collection
                    localField: 'tier', // The field in User that references PromotionTier
                    foreignField: 'name', // The field in PromotionTier that matches the localField
                    as: 'tierDetails' // The output array field that will contain the matched documents
                }
            },
            {
                $unwind: '$tierDetails' // Unwind the array to get a single document
            },
            {
                $project: {
                    tier: 1,
                    discount: '$tierDetails.discount',
                    tier_expiration_date:1
                }
            }
        ]);
        
       
        return NextResponse.json({ userTier:userTier }, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ Message: 'Failed to fetch tier information from User' }, { status: 400 });
    }
}

const checkTierStatus = async (user) => {
    const currentDate = new Date();
    if (user.tier_expiration_date && currentDate > new Date(user.tier_expiration_date)) {
    
        user.tier_status = 'expired';
        user.tier = null;
        await user.save();
    }
};

import { connectMongoDB } from "@/../lib/mongodb.js";
import { History } from "@/../lib/model/history";
import { User } from "@/../lib/model/user";
import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import QRCode from 'qrcode';
//get HIstory from User
export async function POST(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Parse the request body
        const body = await req.json();
        const { username } = body;
        const user = await User.findOne({ username: username }).select('_id');
        // Fetch the history for the given userId and join with Seat, Movie, and Theater

        const historyData = await History.aggregate([
            {
                $match: { user_id: user._id }
            },
            {
                $lookup: {
                    from: "seats", // Join with the seats collection
                    localField: "_id", // history_id from History
                    foreignField: "history_id", // history_id in Seats
                    as: "seats" // Name for the joined data
                }
            },
            {
                $unwind: "$seats" // Unwind to process each seat entry
            },
            {
                $lookup: {
                    from: "theaters", // Join with the theaters collection
                    localField: "seats.theater_id", // theater_id in Seats
                    foreignField: "_id", // _id in Theaters
                    as: "theater" // Name for the joined theater data
                }
            },
            {
                $unwind: "$theater" // Unwind theater to access its fields
            },
            {
                $lookup: {
                    from: "movies", // Join with the movies collection
                    localField: "movie_id", // field in History
                    foreignField: "_id", // field in Movies
                    as: "movie"
                }
            },
            {
                $unwind: "$movie" // Unwind the movie data
            },
            {
                $group: {
                    _id: "$_id", // Group by history_id
                    theater_name: { $first: "$theater.theater_name" }, // Get theater name
                    show_date: { $first: "$seats.Date" }, // Assuming Date is stored in seats
                    show_time: { $first: "$seats.Time" }, // Assuming Time is stored in seats
                    seats: { $push: "$seats.seat_id" }, // Collect all seat IDs into an array
                    total_amount: { $first: "$total_amount" },
                    purchase_time: { $first: "$purchase_time" },
                    payment_status: { $first: "$payment_status" },
                    movie: { $first: "$movie.movie_name" },
                    imageUrl: { $first: "$movie.imageUrl" },
                    duration: { $first: "$movie.duration" },
                    qrcode:{$first:"$qrcode"},
                    qrcode_isscan:{$first:"$qrcode_isscan"},
                }
            },
            {
                $project: {
                    _id: 0,
                    
                    theater_name: 1,
                    show_date: 1,
                    show_time: 1,
                    seats: 1,
                    total_amount: 1,
                    purchase_time: 1,
                    payment_status: 1,
                    movie: 1,
                    imageUrl: 1,
                    duration: 1,
                    qrcode:1,
                    qrcode_isscan:1,
                }
            },
            {
                $sort: { purchase_time: -1 } // -1 for descending (newest first), 1 for ascending (oldest first)
            }
        ]);
        // if (historyData.length === 0) {
        //     return NextResponse.json({ error: 'No history found for the user.' }, { status: 404 });
        // };

        

        // Return the fetched data as a JSON response
        return NextResponse.json({ historyData: historyData }, { status: 200 });

    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

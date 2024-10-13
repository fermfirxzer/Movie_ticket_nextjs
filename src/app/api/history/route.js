import { connectMongoDB } from "@/../lib/mongodb.js";
import { History } from "@/../lib/model/history";
import { Seat } from "@/../lib/model/seat";
import { Movie } from "@/../lib/model/movie";
import { Theater } from "@/../lib/model/theater";
import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import QRCode from 'qrcode';

export async function POST(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Parse the request body
        const body = await req.json();
        const { userId } = body;

        // Fetch the history for the given userId and join with Seat, Movie, and Theater
        const historyData = await History.aggregate([
            {
                $match: { user_id: new mongoose.Types.ObjectId("6704335295b1035f984c082d") }
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
                    imageUrl:{$first:"$movie.imageUrl"},
                    duration:{$first:"$movie.duration"},
                }
            },
            {
                $project: {
                    history_id: "$_id", // Rename _id to history_id
                    theater_name: 1,
                    show_date: 1,
                    show_time: 1,
                    seats: 1,
                    total_amount: 1,
                    purchase_time: 1,
                    payment_status: 1,
                    movie: 1,
                    imageUrl:1,
                    duration:1,
                }
            },
            {
                $sort: { purchase_time: -1 } // -1 for descending (newest first), 1 for ascending (oldest first)
            }
        ]);
        
        if (historyData.length === 0) {
            return NextResponse.json({ error: 'No history found for the user.' }, { status: 404 });
        }

        // Generate QR Code for the first history entry (or you can customize which entry to use)
        const qrData = {
            history_id: historyData[0]._id,
            movie: historyData[0].movie,
            theater_name: historyData[0].theater_name,
            show_date: historyData[0].show_date,
            show_time: historyData[0].show_time,
            seats: historyData[0].seats
        };

        // Generate the QR code as a data URL
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));

        const responseData = {
            history: historyData,
            qrCode: qrCodeDataUrl // Send the QR code as part of the response
        };

        // Return the fetched data as a JSON response
        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
import { Showtime } from "@/../lib/model/showtime";
import { Theater } from "@/../lib/model/theater";
import { Movie } from "@/../lib/model/movie";
import { History } from "@/../lib/model/history"; // Assuming you have a History model defined
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { Seat } from "../../../../lib/model/seat";
import { User } from "@/../lib/model/user";
export async function POST(req) {
    await connectMongoDB();
    const body = await req.json(); // Parse JSON body
    
    
    const { date, selectedTheater, selectedShowtime, moviename,selectedSeats: selectedSeatsString, username,total_amount } = body;
    const selectedSeats = typeof selectedSeatsString === 'string' ? JSON.parse(selectedSeatsString) : selectedSeatsString;
    console.log(body)
    try {
        const userId=await User.findOne({username:username}).select('_id');
        const movie_id = await Movie.findOne({ movie_name: decodeURI(moviename) }).select('_id');
        const theater_id = await Theater.findOne({ theater_name: selectedTheater }).select('_id');
        const seatIds = Object.keys(selectedSeats);
        const takenSeats = await Seat.find({
            seat_id:{$in:seatIds},
            Time: selectedShowtime, // Use the selected showtime from the request body
            Date: date,
            theater_id:new mongoose.Types.ObjectId(theater_id),
        });
        if (takenSeats.length > 0) {
        
            return NextResponse.json({ message: "Seat already Taken!" }, { status: 400 });
        }
        
        const history = new History({
            user_id: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
            theater_id: theater_id,
            purchase_time: new Date(),
            total_amount: total_amount, 
            movie_id: movie_id, 
        });
        const savedHistory = await history.save();
        const historyId = savedHistory._id;
        const seatDocs = Object.entries(selectedSeats).map(([seatId, price]) => ({
            seat_id: seatId,              // Seat ID from the object key (e.g., "A1")
            price: price,         // Price from the object value (e.g., "31")
            theater_id: new mongoose.Types.ObjectId(theater_id),
            Date: date,         // Date from the request
            Time: selectedShowtime,
            history_id:new mongoose.Types.ObjectId(historyId)
        }));

        const insertedSeats = await Seat.insertMany(seatDocs);
    
        return NextResponse.json({ message: "Booking succedasssful" }, { status: 200 });

    } catch (err) {
        
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

import { connectMongoDB } from "@/../lib/mongodb.js";
import { Showtime } from "@/../lib/model/showtime";
import { Theater } from "@/../lib/model/theater";
import { Movie } from "@/../lib/model/movie";
import { History } from "@/../lib/model/history"; // Assuming you have a History model defined
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { Seat } from "../../../../lib/model/seat";
import { User } from "@/../lib/model/user";
import QRCode from 'qrcode';

export async function POST(req) {
    await connectMongoDB();
    const body = await req.json(); // Parse JSON body

    const { date, selectedTheater, selectedShowtime, moviename, selectedSeats: selectedSeatsString, username, total_amount } = body;
    const selectedSeats = typeof selectedSeatsString === 'string' ? JSON.parse(selectedSeatsString) : selectedSeatsString;


    try {
        const userId = await User.findOne({ username: username }).select('_id point');
        const movie_id = await Movie.findOne({ movie_name: decodeURI(moviename) }).select('_id');
        const theater_id = await Theater.findOne({ theater_name: selectedTheater }).select('_id');
        const seatIds = Object.keys(selectedSeats);

        const takenSeats = await Seat.find({
            seat_id: { $in: seatIds },
            Time: selectedShowtime, // Use the selected showtime from the request body
            Date: date,
            theater_id: new mongoose.Types.ObjectId(theater_id),
        });

        if (takenSeats.length > 0) {
            return NextResponse.json({ message: "Seat already Taken!" }, { status: 400 });
        }

        // Create the history entry first
        const history = new History({
            user_id: new mongoose.Types.ObjectId(userId),
            theater_id: theater_id,
            purchase_time: new Date(),
            total_amount: total_amount,
            movie_id: movie_id,
        });
        

        // Save the history first to get the history ID
        const savedHistory = await history.save();
        const historyId = savedHistory._id;

        // Prepare the QR code data
        const qrData = {
            history_id: historyId, // Include the history ID here
            movie: moviename,
            theater_name: selectedTheater,
            show_date: date,
            show_time: selectedShowtime,
            seats: Object.entries(selectedSeats).map(([seatId, price]) => ({
                seat_id: seatId,
                price: price,
            }))
        };
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));
        savedHistory.qrcode = qrCodeDataUrl;
        await savedHistory.save(); // Save the updated history entry

        const seatDocs = Object.entries(selectedSeats).map(([seatId, price]) => ({
            seat_id: seatId, 
            price: price,
            theater_id: new mongoose.Types.ObjectId(theater_id),
            Date: date, 
            Time: selectedShowtime,
            history_id: new mongoose.Types.ObjectId(historyId)
        }));
        await Seat.insertMany(seatDocs);
        const count_seat=seatIds.length;
        console.log(count_seat)
        userId.point=userId.point+count_seat;
        await userId.save();
        return NextResponse.json({ message: "Booking successful", qrCode: qrCodeDataUrl }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

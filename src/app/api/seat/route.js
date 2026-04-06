import { connectMongoDB } from "@/../lib/mongodb.js";
import { Theater } from "@/../lib/model/theater";
import { Movie } from "@/../lib/model/movie";
import { History } from "@/../lib/model/history"; 
import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { Seat } from "../../../../lib/model/seat";
import { User } from "@/../lib/model/user";
import QRCode from 'qrcode';

export async function POST(req) {
    await connectMongoDB();
    const body = await req.json(); // Parse JSON body
    const {  seatIds, moviename, date,showid, theater, time, username,total_amount } = body;
    // const selectedSeats = typeof selectedSeatsString === 'string' ? JSON.parse(selectedSeatsString) : selectedSeatsString;
    console.log("This is seat api");
    console.log(body);
    const session=await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = await User.findOne({ username: username }).select('_id point');
        const movie_id = await Movie.findOne({ movie_name: decodeURI(moviename) }).select('_id');
        const theater_id = await Theater.findOne({ theater_name: theater }).select('_id');
        // Create the history entry first
        const history = new History({
            user_id: new mongoose.Types.ObjectId(userId),
            theater_id: theater_id,
            purchase_time: new Date(),
            total_amount: total_amount,
            movie_id: movie_id,
            showtime_id:showid,
        });
        

        // Save the history first to get the history ID
        const savedHistory = await history.save();
        const historyId = savedHistory._id;

        const parsedSeatIds = JSON.parse(seatIds);
        const seatObjectIds = parsedSeatIds.map(id => new mongoose.Types.ObjectId(id));
        await Seat.updateMany({ _id: { $in: seatObjectIds } }, { status: 'success', history_id: historyId });
        const updatedSeats = await Seat.find({ _id: { $in: seatObjectIds } }).select('seat_id price');

        const qrData = {
            history_id: historyId, // Include the history ID here
            movie: moviename,
            theater_name: theater,
            show_date: date,
            show_time: time,
            seats: updatedSeats.map(seat => ({
                seat_id: seat.seat_id,
                price: seat.price,
            }))
        };
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));
        savedHistory.qrcode = qrCodeDataUrl;
        await savedHistory.save(); // Save the updated history entry
        const count_seat=parsedSeatIds.length;
        userId.point=userId.point+count_seat;
        await userId.save();
        await session.commitTransaction();
        session.endSession();
        return NextResponse.json({ message: "Booking successful" }, { status: 200 });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

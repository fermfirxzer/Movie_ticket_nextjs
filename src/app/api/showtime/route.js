import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
// Adjust the import path based on your Mongoose model
import { Showtime } from "@/../lib/model/showtime"; // Adjust the import path based on your Mongoose model
import { Theater } from "@/../lib/model/theater";
import { NextResponse } from "next/server";
//เอาโรงหนังที่ยังไม่มีรอบฉายในวันที่เลือก
export async function POST(request) {
    const { startDate, endDate } = await request.json(); // Get the JSON body from the request
    console.log(startDate,endDate);
    try {
        await connectMongoDB();
        const showtimes = await Showtime.aggregate([
            {
                $match: {
                    startDate: { $lte: new Date(endDate) }, // Existing startDate should be less than or equal to newEndDate
                    endDate: { $gte: new Date(startDate) }  // Existing endDate should be greater than or equal to newStartDate
                }
            },
             
        ]);

        const theaterIdsInShowtime = showtimes.map(item => item.theater_id);

        const theatersNotInShowtime = await Theater.find({
            _id: { $nin: theaterIdsInShowtime }
        });

        return NextResponse.json(theatersNotInShowtime, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}

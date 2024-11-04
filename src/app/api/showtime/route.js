import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
// Adjust the import path based on your Mongoose model
import { Showtime } from "@/../lib/model/showtime"; // Adjust the import path based on your Mongoose model
import { Theater } from "@/../lib/model/theater";
import { NextResponse } from "next/server";
import { Movie } from "../../../../lib/model/movie";
//เอาโรงหนังที่ยังไม่มีรอบฉายในวันที่เลือก
export async function GET(request) {
    try {
        // Extract query parameters from the URL
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        console.log(startDate, endDate);

        await connectMongoDB();

        const showtimes = await Showtime.aggregate([
            {
                $match: {
                    startDate: { $lte: endDate }, // Existing startDate should be less than or equal to newEndDate
                    endDate: { $gte: startDate }  // Existing endDate should be greater than or equal to newStartDate
                }
            }
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
export async function POST(request) {
    try {
        const body = await request.json(); // Get the JSON body
        const { showDate, selectedTheaters, Moviename } = body;
        const decodeMoviename=decodeURIComponent(Moviename);
        const movie = await Movie.findOne({ movie_name: decodeMoviename });
        if (!movie) {
            return NextResponse.json({ Message: 'Movie not found' }, { status: 404 });
        }
        const movieId = movie._id;
        const theater=await Theater.findOne({theater_name:selectedTheaters.Theater}); 
        if (!theater) {
            return NextResponse.json({ Message: 'Theater not found' }, { status: 404 });
        }
        const theaterId=theater._id;
        
       
        const showtimes = await Showtime.aggregate([
            {
                $match: {
                    startDate: { $lte: showDate.endDate }, // Existing startDate should be less than or equal to newEndDate
                    endDate: { $gte: showDate.startDate }, // Existing endDate should be greater than or equal to newStartDate
                    theater_id: theaterId // Assuming theaterId is defined in your context
                }
            }
        ]);
        console.log(showtimes);
        if(showtimes.length>0){
            console.log("showtime already Taken!")
            return NextResponse.json({ Message: 'showtime already Taken' }, { status: 400 });
        }
        const showtimesToInsert = {
            theater_id: theaterId,
            movie_id: movieId,
            show_time: selectedTheaters.time,
            startDate: showDate.startDate,
            endDate: showDate.endDate,
        };

        // Use insertOne instead of insertMany since you are inserting a single document
        await Showtime.create(showtimesToInsert);

        return NextResponse.json({ Message: 'Showtime added successfully' }, { status: 201 });

    } catch (error) {
        console.error('Error adding showtime:', error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
export async function DELETE(request) {
    const body = await request.json();
    const showtime_id=body._id;
    try {
        const deletedShowtime = await Showtime.findByIdAndDelete(showtime_id);

        if (!deletedShowtime) {
            return NextResponse.json({ Message: 'Showtime not found' }, { status: 404 });
        }

        return NextResponse.json({ Message: 'Showtime deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting showtime:', error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
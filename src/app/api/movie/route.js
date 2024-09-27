import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import {Movie} from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const movieData = await request.json();
        console.log(movieData)

        if (!movieData.movie_name || !movieData.startDate || !movieData.endDate || !movieData.price || !movieData.duration||!movieData.desc) {
            return NextResponse.json({ Message: 'Missing required fields' }, { status: 400 });
        }

        await connectMongoDB();

        const checkname = await Movie.findOne({ movie_name: movieData.movie_name }); // Use `findOne` for a single document

        if (checkname) {
            return NextResponse.json({ Message: "Movie name already exists!" }, { status: 400 }); // Change status to 400
        }

        const newMovie = new Movie(movieData);
        try {
            await newMovie.save();
            return NextResponse.json({ Message: "Insert Movie success" }, { status: 201 });
        } catch (error) {
            console.error('Error saving movie:', error); 
            return NextResponse.json({ Message: 'Failed to save in DB' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error inserting movie:', error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}

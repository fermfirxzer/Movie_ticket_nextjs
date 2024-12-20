
import { connectMongoDB } from "@/../lib/mongodb.js"; 
import { Movie } from "@/../lib/model/movie.js"; 
import { NextResponse } from "next/server";
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const moviename = searchParams.get('moviename'); // Adjust based on your route parameter key
    try {
        await connectMongoDB(); // Connect to your MongoDB database

        // Fetch only the `Tag` field
        const movie = await Movie.findOne(
            { movie_name: moviename }, // Query condition
            { Tag: 1, _id: 0 } // Projection: Include `Tag`, exclude `_id`
        );
        if (!movie) {
            return NextResponse.json({ Message: 'Movie not found' }, { status: 404 });
        }
        return NextResponse.json(movie.Tag, { status: 200 }); // Return only the `Tag` array
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
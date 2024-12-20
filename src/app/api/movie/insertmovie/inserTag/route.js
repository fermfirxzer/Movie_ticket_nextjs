import { connectMongoDB } from "@/../lib/mongodb.js";
import { Movie } from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse the request body to extract `movie_name` and `Tag`
        var { movie_name, Tag } = await req.json();
        console.log(movie_name,Tag);
        movie_name = decodeURIComponent(movie_name).trim();
        //Array.isArray(Tag) || Tag.length === 0
        if (!movie_name) {
            return NextResponse.json({ Message: 'Invalid input' }, { status: 400 });
        }
       
        await connectMongoDB();

        // Find the movie and update its tags
        const updatedMovie = await Movie.findOneAndUpdate(
            { movie_name },
            { $set: { Tag } }, // Update the `Tag` field
            { new: true } // Return the updated document
        );
        if (!updatedMovie) {
            return NextResponse.json({ Message: 'Movie not found!' }, { status: 404 });
        }

        return NextResponse.json({ Message: 'Insert Tag to Movie Success'}, { status: 200 });
    } catch (err) {
        console.error('Error updating movie tags:', err);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}

import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import Movie from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const movieData = await request.json();
        console.log(movieData)
        return NextResponse.json(movieData, { status: 201 });
        // // Validate the movie data (optional)
        // if (!movieData.name || !movieData.startDate || !movieData.endDate) {
        //     return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        // }
        // // Connect to the database
        // const db = await connectToDatabase();

        // // Create a new movie instance
        // const newMovie = new Movie(movieData);

        // // Save the movie to the database
        // await newMovie.save();

        // return new Response(JSON.stringify(newMovie), { status: 201 }); // Return the created movie with a 201 status
    } catch (error) {
        console.error('Error inserting movie:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

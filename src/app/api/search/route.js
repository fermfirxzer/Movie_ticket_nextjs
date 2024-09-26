import { connectMongoDB } from "@/../lib/mongodb.js"; // MongoDB connection utility
import Movie from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";

// Mock data for movies
const mockMovies = [
    { id: 1, title: "Mock Movie 1", desc: "Description of Mock Movie 1" },
    { id: 2, title: "Mock Movie 2", desc: "Description of Mock Movie 2" },
    { id: 3, title: "Mock Movie 3", desc: "Description of Mock Movie 3" },
];

export async function GET(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();    

        // Extract search query parameter from the request
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');

        await connectMongoDB();    

         
        let movies;

        if (name) {
            // If search query exists, filter movies by search query
            console.log("Search query parameter:", name);
            movies = await Movie.find({
                movie_name: { $regex: name, $options: "i" } // "i" for case-insensitive search
            });
            console.log("Movies found:", movies);
        } else {
            // If no search query, fetch all movies
            movies = await Movie.find();
            console.log("All movies from DB:", movies);
        }
      
        // Return the filtered movies
        return NextResponse.json(movies);
       
      
       
    } catch (error) {
        console.error('Error inserting movie:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

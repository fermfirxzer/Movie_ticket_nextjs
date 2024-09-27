import { connectMongoDB } from "@/../lib/mongodb.js"; // MongoDB connection utility
import {Movie} from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();    

        // Extract search query parameter from the request
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 12;
        const skip = (page - 1) * limit;
    
         

         
        let movies;
        let totalCount;
        if (name) {
            totalCount = await Movie.countDocuments({
                movie_name: { $regex: name, $options: "i" } // Count matching documents
            });
            // If search query exists, filter movies by search query
            console.log("Search query parameter:", name);
            movies = await Movie.find({
                movie_name: { $regex: name, $options: "i" } // "i" for case-insensitive search
            }).skip(skip).limit(limit);

            console.log("Movies found:", movies);
         
        } else {
            // If no search query, fetch all movies
            totalCount = await Movie.countDocuments();
            movies = await Movie.find().skip(skip).limit(limit);
            console.log("All movies from DB:", movies);
        }
      
        // Return the filtered movies
        return NextResponse.json({ movies, totalCount });
       
      
       
    } catch (error) {
        console.error('Error inserting movie:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

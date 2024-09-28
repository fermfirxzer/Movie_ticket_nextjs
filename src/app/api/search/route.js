import { connectMongoDB } from "@/../lib/mongodb.js"; 
import { Movie } from "@/../lib/model/movie.js"; 
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();    

        // Use the URL constructor to parse the request URL
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        const page = parseInt(searchParams.get('page')) ; 
        const limit = parseInt(searchParams.get('limit')) ; 
        const skip = (page - 1) * limit; 
        const orderBy = searchParams.get('orderBy') ;

        const sortDirection = orderBy === 'asc' ? 1 : -1;
        let movies;
        let totalCount;

        if (name) {
           
            totalCount = await Movie.countDocuments({
                movie_name: { $regex: name, $options: "i" } // Case-insensitive search
            });

           
            movies = await Movie.find({
                movie_name: { $regex: name, $options: "i" }
            }).sort({ startDate: sortDirection }).skip(skip).limit(limit);
        } else {
           
            totalCount = await Movie.countDocuments();
            movies = await Movie.find().sort({ startDate: sortDirection }).skip(skip).limit(limit);
        }

       
        return NextResponse.json({ movies, totalCount });

    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

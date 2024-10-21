import { connectMongoDB } from "@/../lib/mongodb.js"; 
import { Movie } from "@/../lib/model/movie.js"; 

import { NextResponse } from "next/server";

export async function GET(req ) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    try {
        // Connect to MongoDB
        await connectMongoDB();  
        if (!date) {
            return new Response('Date parameter is missing', { status: 400 });
        }

        const ongoingmovies = await Movie.aggregate([
            {
                $match: {
                    startDate: { $lte: date },
                    endDate: { $gte: date }
                }
            },
          
        ]);
        const upcomingmovies = await Movie.aggregate([
            {
                $match: {
                    startDate: { $gt: date }
                }
            },
           
        ]);

       
        return NextResponse.json( {ongoingmovies,upcomingmovies}, { status: 200 } );

    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



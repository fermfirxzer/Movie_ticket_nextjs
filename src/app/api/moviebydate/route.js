import { connectMongoDB } from "@/../lib/mongodb.js"; 
import { Movie } from "@/../lib/model/movie.js"; 
import { Showtime } from "@/../lib/model/showtime";
import { NextResponse } from "next/server";


export async function GET(req ) {
    const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');
        const moviename = searchParams.get('moviename');
    try {
        // Connect to MongoDB
        await connectMongoDB();  
        const matchquery = {
            startDate: { $lte: date },
            endDate: { $gte: date }
        };
        const projectquery = {};
       
       
        if (moviename) {
            matchquery["movies.movie_name"] = { $regex: moviename ,$options : "i" };
            Object.assign(projectquery, {
                theater_name: "$theater.theater_name",
                show_time: "$show_time"
            });
        }else{
            Object.assign(projectquery, {
                theater_name: "$theater.theater_name",
                show_time: "$show_time",
                movie_name: "$movies.movie_name",
                duration: "$movies.duration",
                imageUrl: "$movies.imageUrl",
                startDate: "$movies.startDate"
            });
        }
    
       


        if (!date) {
            return new Response('Date parameter is missing', { status: 400 });
        }

        const movies = await Showtime.aggregate([
            {
                $lookup: {
                    from: "theaters",               
                    localField: "theater_id",        
                    foreignField: "_id",             
                    as: "theater"                   
                }
            },
            {
                
                $lookup: {
                    from: "movies",                 
                    localField: "movie_id",         
                    foreignField: "_id",             
                    as: "movies"                    
                }
            },
            {
                $match: matchquery
            },
            {
                $unwind: "$theater"  
            },
            {
                $unwind: "$movies"    
            },
            {
                $sort: { "theater.theater_name": 1 } // Sort by theater name in ascending order
            },
            {
                
                $project: projectquery
            }
        ]);

       
        return NextResponse.json( movies, { status: 200 } );

    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



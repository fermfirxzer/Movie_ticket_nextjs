import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file

import { Showtime } from "@/../lib/model/showtime";
import { Theater } from "@/../lib/model/theater";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { moviename } = params; 
    try {
        await connectMongoDB();
        const showtimes = await Showtime.aggregate([
            {
                $lookup: {
                    from: 'movies',
                    localField: 'movie_id',
                    foreignField: '_id',
                    as: 'movie'
                },
                
            },{ 
                $lookup:{
                    from:'theaters',
                    localField: 'theater_id',
                    foreignField: '_id',
                    as: 'theaters'
                },
            },
            {
                $unwind: '$movie'
            },
            {
                $match: {
                    'movie.movie_name': moviename // Match the moviename
                }
            },
            {
                $group: {
                    _id: {
                        startDate: "$startDate", // Group by both startDate and endDate
                        endDate: "$endDate"
                    },
                    showtimes: { $push: { // Gather the showtimes in an array
                        _id: "$_id",
                        show_id: "$show_id",
                        theater_id: "$theater_id",
                        theater_name:"$theaters.theater_name",
                        show_time: "$show_time"
                    }},
                }
            },{
                $sort: { // Sort by startDate
                    '_id.startDate': 1 // 1 for ascending order, -1 for descending
                }
            },
            {
                $project: {
                    _id: 0, // Hide the _id field
                    startDate: "$_id.startDate", // Keep startDate and endDate in the result
                    endDate: "$_id.endDate",

                    showtimes: 1 // Keep the array of showtimes
                }
            }
        ]);
        
        return NextResponse.json( showtimes, { status: 200 });
    }catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}

import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
import { Showtime } from "@/../lib/model/showtime";// Adjust the import path based on your Mongoose model
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
export async function GET(request) {
    try {
        await connectMongoDB();// Connect to your MongoDB database

        const showtimes= await Showtime.find({}); // Fetch the movie by ID

        if (!showtimes) {
            return NextResponse.json({ Message: 'Showtime not found' }, { status: 404 });
        }
        return NextResponse.json(showtimes, { status: 200 }); // Return the movie data
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
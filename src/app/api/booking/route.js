import { connectMongoDB } from "@/../lib/mongodb.js"; 
import { Seat } from "@/../lib/model/seat";
import { Theater } from "@/../lib/model/theater"; // Import your Theater model
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();  
        
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const theater_name = searchParams.get('theater_name'); // Get the theater name
        const date = searchParams.get('date');
        const time = searchParams.get('time');
        const dateObject = new Date(date);
        // Check for missing parameters
        if (!theater_name || !date|| !time) {
            return new Response('Missing parameters', { status: 400 });
        }

        
      
        const theater = await Theater.findOne({ theater_name:   theater_name });

        // If no theater found, return error
        if (!theater) {
            return new Response('Theater not found', { status: 404 });
        }

        const seats = await Seat.find({
            theater_id: theater._id,  
            Date:  { $eq: dateObject },               
            Time: time
          
        }).select('seat_id -_id');;
        return NextResponse.json(seats, { status: 200 });

    } catch (error) {
        console.error('Error fetching seats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

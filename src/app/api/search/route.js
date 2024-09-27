import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import {Movie} from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";


export async function GET(req) {
    // Parse the query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');

    // Log the query parameters
    console.log('Name:', name);
    console.log('Page:', page);
    console.log('Limit:', limit);

    // Return a JSON response
    return NextResponse.json({ 
        message: 'Search API', 
        query: { name, page, limit } 
    });
}

import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
import { Movie } from "@/../lib/model/movie.js";// Adjust the import path based on your Mongoose model
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
export async function GET(request, { params }) {
    const { moviename } = params; // Get the movie ID from the request parameters

    try {
        await connectMongoDB();// Connect to your MongoDB database

        const movie = await Movie.findOne({ movie_name: moviename }); // Fetch the movie by ID

        if (!movie) {
            return NextResponse.json({ Message: 'Movie not found' }, { status: 404 });
        }
        return NextResponse.json(movie, { status: 200 }); // Return the movie data
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    try {
        const moviename = params.moviename; // Get the movie ID from the URL params
        console.log(`Attempting to delete movie with ID: ${moviename}`);

        await connectMongoDB();

        // Check if movie exists
        const checkmovie = await Movie.findOne({ movie_name: moviename });
        if (!checkmovie) {
            return NextResponse.json({ Message: "Movie name not found" }, { status: 404 });
        }

        // Delete the movie
        const result = await Movie.deleteOne({ movie_name: moviename });

        // Check if deletion was successful
        if (result.deletedCount === 0) {
            return NextResponse.json({ Message: 'No movie found to delete' }, { status: 204 });
        }

        return NextResponse.json({ Message: `Deleted Movie name: ${moviename} successfully` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Delete Error' }, { status: 500 });
    }
}


import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
import { Movie } from "@/../lib/model/movie.js";// Adjust the import path based on your Mongoose model
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
export async function GET(request, { params }) {
    const { id } = params; // Get the movie ID from the request parameters

    try {
        await connectMongoDB();// Connect to your MongoDB database

        const movie = await Movie.findById({ _id: id }); // Fetch the movie by ID

        if (!movie) {
            return NextResponse.json({ Message: 'Movie not found' }, { status: 404 });
        }
        return NextResponse.json(movie, { status: 200 }); // Return the movie data
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(request, { params }) {
    try {
        const movieData = await request.json();
        const movid_id = params.id;
        console.log(movieData, movid_id)
        if (!movieData.movie_name || !movieData.startDate || !movieData.endDate || !movieData.price || !movieData.duration || !movieData.desc) {
            return NextResponse.json({ Message: 'Missing required fields' }, { status: 400 });
        }
        await connectMongoDB();
        const checkmovie = await Movie.findOne({ _id: movid_id });
        if (!checkmovie) {
            return NextResponse.json({ Message: "Movie id not found" }, { status: 400 });
        }
        const result=await Movie.updateOne(
            { _id: movid_id }, // Ensure the ID is correctly wrapped in ObjectId
            {
                $set: {
                    movie_name: movieData.movie_name,
                    startDate: movieData.startDate,
                    endDate: movieData.endDate,
                    price: movieData.price,
                    duration: movieData.duration,
                    desc: movieData.desc,
<<<<<<< HEAD
                    imageUrl:movieData.imageUrl,
=======
>>>>>>> 979582ac1c53debe17842f4e0ccc32e5145fc18f
                },
            });
        if (result.modifiedCount === 0) {
            return NextResponse.json({ Message: 'No changes made to the movie' }, { status: 204 });
        }

        return NextResponse.json({ Message: `Update Movie id: ${movid_id} success` }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Update Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const movid_id = params.id; // Get the movie ID from the URL params
        console.log(`Attempting to delete movie with ID: ${movid_id}`);

        await connectMongoDB();

        // Check if movie exists
        const checkmovie = await Movie.findOne({ _id: movid_id });
        if (!checkmovie) {
            return NextResponse.json({ Message: "Movie id not found" }, { status: 404 });
        }

        // Delete the movie
        const result = await Movie.deleteOne({ _id: ObjectId(movid_id) });

        // Check if deletion was successful
        if (result.deletedCount === 0) {
            return NextResponse.json({ Message: 'No movie found to delete' }, { status: 204 });
        }

        return NextResponse.json({ Message: `Deleted Movie id: ${movid_id} successfully` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Delete Error' }, { status: 500 });
    }
}
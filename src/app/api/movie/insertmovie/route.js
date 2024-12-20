import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB
import { Movie } from "@/../lib/model/movie.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const movieData = await request.json();
        
        if (!movieData.movie_name || !movieData.startDate || !movieData.endDate || !movieData.price || !movieData.duration || !movieData.desc || !movieData.imageUrl||!movieData.Age||!movieData.Sub) {
            return NextResponse.json({ Message: 'Missing required fields' }, { status: 400 });
        }
        movieData.price = Number(movieData.price);
        movieData.duration = Number(movieData.duration);
        if (isNaN(movieData.price) || isNaN(movieData.duration)) {
            return NextResponse.json({ Message: 'Price and Duration must be valid numbers' }, { status: 400 });
        }
        if (new Date(movieData.startDate) > new Date(movieData.endDate)) {
            return NextResponse.json({ Message: 'EndDate must be greater than startDate' }, { status: 400 });
        }
        await connectMongoDB();

        const checkname = await Movie.findOne({ movie_name: movieData.movie_name }); // Use `findOne` for a single document

        if (checkname) {
            return NextResponse.json({ Message: "Movie name already exists!" }, { status: 400 }); // Change status to 400
        }
        
        const newMovie = new Movie({
            ...movieData,
            Tag: movieData.Tags,
            Age:movieData.Age,
            Sub:movieData.Sub,
        });
        try {
            await newMovie.save();
            return NextResponse.json({ Message: "Insert Movie success" }, { status: 201 });
        } catch (error) {
            console.error('Error saving movie:', error);
            return NextResponse.json({ Message: 'Failed to save in DB' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error inserting movie:', error);
        return NextResponse.json({ Message: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(request) {
    try {
        const movieData = await request.json();
        console.log(movieData)
        if (!movieData._id || !movieData.movie_name || !movieData.startDate || !movieData.endDate || !movieData.price || !movieData.duration || !movieData.desc||!movieData.Age||!movieData.Sub) {
            return NextResponse.json({ Message: 'Missing required fields' }, { status: 400 });
        }
        await connectMongoDB();
        const checkmovie = await Movie.findOne({ _id: movieData._id });
        if (!checkmovie) {
            return NextResponse.json({ Message: "Movie id not found" }, { status: 400 });
        }
        const result = await Movie.updateOne(
            { _id: movieData._id }, // Ensure the ID is correctly wrapped in ObjectId
            {
                $set: {
                    movie_name: movieData.movie_name,
                    startDate: movieData.startDate,
                    endDate: movieData.endDate,
                    price: movieData.price,
                    duration: movieData.duration,
                    desc: movieData.desc,
                    imageUrl: movieData.imageUrl,
                    Age:movieData.Age,
                    Sub:movieData.Sub,
                },
            });
        if (result.modifiedCount === 0) {
            return NextResponse.json({ Message: 'No changes made to the movie' }, { status: 204 });
        }

        return NextResponse.json(
            {
                Message: `Update Movie id: ${movieData._id} success`,
                movie_name: movieData.movie_name
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ Message: 'Update Error' }, { status: 500 });
    }
}
import { connectMongoDB } from "@/../lib/mongodb.js"; // Adjust the import path based on your MongoDB connection file
import { Movie } from "@/../lib/model/movie.js";// Adjust the import path based on your Mongoose model
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
// export async function PUT(request, { params }) {
//     try {
//         const movieData = await request.json();
//         const movieid = params.moviename;
//         console.log(movieData, movid_id)
//         if (!movieData.movie_name || !movieData.startDate || !movieData.endDate || !movieData.price || !movieData.duration || !movieData.desc) {
//             return NextResponse.json({ Message: 'Missing required fields' }, { status: 400 });
//         }
//         await connectMongoDB();
//         const checkmovie = await Movie.findOne({ _id: movid_id });
//         if (!checkmovie) {
//             return NextResponse.json({ Message: "Movie id not found" }, { status: 400 });
//         }
//         const result = await Movie.updateOne(
//             { _id: movid_id }, // Ensure the ID is correctly wrapped in ObjectId
//             {
//                 $set: {
//                     movie_name: movieData.movie_name,
//                     startDate: movieData.startDate,
//                     endDate: movieData.endDate,
//                     price: movieData.price,
//                     duration: movieData.duration,
//                     desc: movieData.desc,
//                     imageUrl: movieData.imageUrl,
//                 },
//             });
//         if (result.modifiedCount === 0) {
//             return NextResponse.json({ Message: 'No changes made to the movie' }, { status: 204 });
//         }

//         return NextResponse.json({ Message: `Update Movie id: ${movid_id} success` }, { status: 200 });

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ Message: 'Update Error' }, { status: 500 });
//     }
// }
'use client'

import SwiperDate from "@/component/SwiperDate"
import Link from 'next/link';
import React, { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react';
export default function MovieBydate(){
   
    const [date,setDate] = useState(new Date().toISOString().split('T')[0]);
    const { data: session } = useSession();
    console.log(date);
    const handleDateSelect = (date) => {
        const selectedDate = new Date(date).toISOString().split('T')[0];
        setDate(selectedDate); // Update the selected date state
    };
    const [movies, setMovies] = useState([]);
    const fetchMovies = async () => {
        try {
            const response = await fetch(`/api/moviebydate?date=${date}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setMovies(data);
            console.log(data);
          
           
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect (() => {
       fetchMovies()
      
    },[date])


    



    const groupShowtimesByTheater = (movies) => {
        return movies.reduce((acc, movie) => {
            const { movie_name, theater_name, show_time , imageUrl , startDate , duration } = movie;
    
            // Check if the movie is already in the accumulator
            const existingMovie = acc.find(movie => movie.movie_name === movie_name);
            if (existingMovie) {
                // Check if the theater is already in the movie's theaters array
                const existingTheater = existingMovie.theaters.find(theater => theater.theater_name === theater_name);
                if (existingTheater) {
                    // If the theater exists, push the showtimes into its show_time array
                    existingTheater.show_time.push(...show_time);
                } else {
                    // If the theater doesn't exist, add a new theater entry
                    existingMovie.theaters.push({
                        theater_name,
                        show_time: [...show_time],
                    });
                }
            } else {
                // If the movie doesn't exist, create a new entry
                acc.push({
                    movie_name,
                    imageUrl, 
                    startDate,
                    duration,
                    theaters: [{
                        theater_name,
                        show_time: [...show_time],
                    }],
                });
            }
            return acc;
        }, []);
    };
    
    const groupedShowtimes = groupShowtimesByTheater(movies);
    console.log(groupedShowtimes);
  
    
    return(
        <main className="my-12 mx-2  md:mx-20 ">
         
            <h1 className='mx-6 my-2  text-white font-Kanit text-3xl'>รอบฉายหนัง</h1>
            <SwiperDate onDateSelect={handleDateSelect}></SwiperDate>
            <div className="m-6">
                 <div>
                {groupedShowtimes.length === 0 ? (
                    <div className="text-center text-xl">
                        No movies available.
                    </div>
                ) : (
                groupedShowtimes.map((movie) => (
                    <div key={movie.movie_name} className="mb-20 md:flex">
                        <div className="md:w-2/5 xl:w-1/5 mr-2 text-xl md:text-2xl">
                            <Link href={`showtime/${movie.movie_name}`}>
                                <img src={`/uploads/${movie.imageUrl}`} className='w-48 md:w-60 rounded-xl' alt={movie.movie_name} />
                                
                            </Link>

                            <div className="flex justify-between md:block my-2 text-white">
                                <div className="w-full">
                            
                                    <div className=" text-sm font-Kanit w-full md:w-60 justify-between flex flex-wrap ">
                                        <span className=" w-1/2 text-gold">
                                            {movie.startDate}
                                        </span>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg"  height="12px" viewBox="0 -960 960 960" width="12px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                            <p className="mx-1 text-gray-600">{Math.floor(movie.duration / 60)} ชม. {movie.duration % 60} นาที</p>
                                        </div>
                    
                                    </div>
                                    <div className=" text-xl font-Kanit w-full md:w-60">{movie.movie_name}</div>
                                </div>
                                {session?.user?.isAdmin && (
                                    <div className="font-bold w-full text-end md:text-start">
                                        <Link href={`editmovie/${movie.movie_name}`}>
                                            <button className="bg-gold w-14 p-1 rounded-md text-lg hover:scale-90">
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full font-bold font-Kanit text-md md:text-lg mb-5 xl:flex xl:flex-wrap h-full">
                            {movie.theaters.map((theater) => (
                                <div key={theater.theater_name} className="text-white bg-bggray mb-2 p-4 rounded-md md:w-4/5 lg:w-4/5 md:mx-12 xl:w-1/3">
                                    <div className="text-md">{theater.theater_name}</div>
                                    <div className="flex flex-wrap">
                                        {theater.show_time.map((time, index) => (
                                            <Link href={`showtime/${movie.movie_name}?theater_name=${theater.theater_name}&date=${date}&time=${time}`}>
                                                <div key={index} className="m-2 bg-white text-black p-2 w-20 text-center rounded-md hover:bg-gold duration-300 cursor-pointer">
                                                    {time}
                                                </div>
                                            </Link>
                                            
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
            </div>
          
        </main>


    )

}


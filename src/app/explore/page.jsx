'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '@/component/Pagination';

const Explore = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 12;
    const totalItems = movies.length; // Update based on actual data
    
    
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`/api/search?name=${searchQuery}`, {
                    method: 'GET',
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const data = await response.json();
                setMovies(data);
                console.log(data); 
            } catch (error) {
                console.error('Error fetching movies3:', error);
            }
        };
    
      
            fetchMovies();
       
    }, []);
    const handleSearchClick = async () => {
        if (!searchQuery) return; // Don't search if the search query is empty
        try {
            const response = await fetch(`/api/search?name=${searchQuery}`, {
                method: 'GET',
            });

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
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    return (
        <div>
            <div className=''>
                <div className="lg:mx-9 mt-6 flex justify-center px-24 md:px-0">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer" onClick={handleSearchClick} >
                        
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                              
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z"
                                />

                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for movies..."
                            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[--gold]"
                        />
                    </div>
                </div>

                {/* Movie list */}
                <div className='flex flex-wrap gap-4 justify-center'>
                    {movies.map((movie, index) => {
                        const date = new Date(movie.startDate);
                        const formattedDate = date.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        });
                        return (
                        
                        <div key={index} className='flex flex-col w-[40%] md:w-[30%] lg:w-[20%] items-center justify-start'>
                            <div className="relative flex flex-col items-center w-full">
                                <img src={movie.imageUrl} className='w-4/5  rounded-xl' alt={movie.movie_name} />
                                <Link href='showtime'>
                                    <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                                        <input type="button" value="ดูเพิ่มเติม" className='bg-gray-100 text-black w-4/6 rounded cursor-pointer' />
                                    </div>
                                </Link>
                            </div>
                            <div className='flex justify-between w-4/5 mt-2'>
                                <div className='w-1/2'>
                                    <p className='text-[--gold] text-xs md:text-sm '>{formattedDate}</p>
                                    <p className='text-sm md:text-lg lg:text-xl'>{movie.movie_name}</p>
                                </div>
                                <div className='flex justify-end  w-1/2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                    <p className='text-xs md:text-sm '>{movie.duration}</p>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>

                {/* Pagination */}
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Explore;

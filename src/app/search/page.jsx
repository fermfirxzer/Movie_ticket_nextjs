

'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Loading from '@/component/Loading';
import Pagination from '@/component/Pagination';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react';
const Explore = () => {
    const [movies, setMovies] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('moviename')||'');
    const [orderBy, setOrderBy] = useState('');
    const { data: session,status } = useSession();
    const itemsPerPage = 12;
    const [totalItems, setTotalItems] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
   

    const [sessionData, setSessionData] = useState(null);




    useEffect(() => {
        const fetchMovies = async () => {
            try {
                
                const response = await fetch(`/api/search?name=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}&orderBy=${orderBy}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const data = await response.json();
                setMovies(data.movies);
    
                setTotalItems(data.totalCount);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();

    }, [currentPage, searchQuery, orderBy]);

 
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleClick = (movie_name) => {
        
        if (status === 'loading') return;
        if (session?.user?.isAdmin) {
            router.push(`/editmovie/${movie_name}`);
        } else {
            router.push(`/showtime/${movie_name}`);
        }

    };
    const handleAddClick = () => {
        // setMovieId(null);
        router.push('/editmovie/');
    }
    const handleSortChange = (e) => {
        setOrderBy(e.target.value); // Update sorting order based on dropdown selection
    }

    return (
        <div>
            <div className='font-Kanit mx-8 lg:mx-40 xl:mx-56'>
                <div className="lg:mx-9 mt-6 flex justify-center px-24 md:px-0">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            
                            value={searchQuery||''}
                            placeholder="Search for movies..."
                            className="w-full pl-10 px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[--gold]"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            pattern=''
                        />
                    </div>
                </div>

                <div className='search-body  my-6'>
                    {session?.user?.isAdmin &&
                        <button className='bg-white text-black hover:scale-90 p-2 rounded-md mx-2 ml-auto flex' onClick={handleAddClick}>เพิ่มหนัง</button>
                    }
                    <div className='flex justify-between items-center'>
                        <h3 className='text-3xl text-white font-bold'>Explore</h3>

                        {/* Sorting Dropdown on the Right */}
                        <div className='flex items-center'>

                            <h5 className='mr-2 text-white'>เรียงจาก :</h5>
                            <select className='text-black px-2 py-1 rounded-md' value={orderBy} onChange={handleSortChange}>

                                <option value="desc">หนังใหม่</option>
                                <option value="asc">หนังเก่า</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Movie list */}
                <div className='flex flex-wrap gap-4 align-center justify-center'>
                    {movies.length === 0 ? (
                        <div className='h-[50vh]'>
                        <p className='error'>
                            Movie not found
                            </p>
                        </div>
                    ) : (movies.map((movie, index) => (
                        <div key={index} className='flex flex-col w-[40%] md:w-[30%] xl:w-[24%] items-center justify-start '>
                            <div className=" w-4/5 relative flex flex-col items-center cursor-pointer">
                                <div className=' rounded-xl'>
                                    <img src={`/uploads/${movie.imageUrl}`} className='w-96 h-96 object-cover' alt={movie.movie_name} />
                                </div>


                            
                                <div onClick={(e) => handleClick(movie.movie_name)}>
                                    <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                                        <input type="button" value="ดูเพิ่มเติม" className='bg-gray-100 text-black w-4/6 rounded cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between w-4/5  mt-2 '>
                                <div className='w-full xl:w-1/2 '>
                                    <p className='text-[--gold] text-xs md:text-sm'>{new Date(movie.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                    <p className='text-white text-sm md:text-lg'>{movie.movie_name}</p>
                                </div>
                                <div className=' w-full xl:w-1/2'>
                                    <div className="flex items-center xl:justify-end text-xs md:text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="#FFFFFF" ><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                        <p className="ml-1 text-gray-600">{Math.floor(movie.duration / 60)} ชม {movie.duration % 60} นาที</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))
                    }
                </div>
                {/* Pagination */}
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default function HistoryPageWrapper() {
    return (
      <Suspense fallback={<Loading />}>
        <Explore />
      </Suspense>
    );
  }

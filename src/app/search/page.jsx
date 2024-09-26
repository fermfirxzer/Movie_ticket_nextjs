"use client"
import React from 'react'
import Link from 'next/link'
import Pagination from '@/component/Pagination';
import { useState, useEffect } from 'react';
const Explore = () => {
    const movies = [
        {
            title: 'Venom',
            releaseDate: '18 SEP 2024',
            imageUrl:
                'https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg',
            duration: '1 ชม. 45 นาที',
            rating: 'PG-13',
        },
        {
            title: 'Spider-Man: No Way Home',
            releaseDate: '17 DEC 2021',
            imageUrl:
                'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '2 ชม. 28 นาที',
            rating: 'PG-13',
        },
        {
            title: 'Avatar: The Way of Water',
            releaseDate: '16 DEC 2022',
            imageUrl:
                'https://th.bing.com/th?id=ODL.6466795199e92dcba0a833632dc054a4&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '3 ชม. 12 นาที',
            rating: 'PG-13',
        },
        {
            title: 'The Batman',
            releaseDate: '4 MAR 2022',
            imageUrl:
                'https://th.bing.com/th/id/OIP.Pcnh-i3HfSl-uFa5CQp5qAHaK-?rs=1&pid=ImgDetMain',
            duration: '2 ชม. 56 นาที',
            rating: 'PG-13',
        },
        {
            title: 'Dune',
            releaseDate: '22 OCT 2021',
            imageUrl:
                'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '2 ชม. 35 นาที',
            rating: 'PG-13',
        },
        {
            title: 'The Matrix Resurrections',
            releaseDate: '22 DEC 2021',
            imageUrl:
                'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '2 ชม. 28 นาที',
            rating: 'R',
        },
        {
            title: 'Dune',
            releaseDate: '22 OCT 2021',
            imageUrl:
                'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '2 ชม. 35 นาที',
            rating: 'PG-13',
        },
        {
            title: 'The Matrix Resurrections',
            releaseDate: '22 DEC 2021',
            imageUrl:
                'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
            duration: '2 ชม. 28 นาที',
            rating: 'R',
        },
    ];
    const totalItems = 100; // จำนวนข้อมูลทั้งหมด
    const itemsPerPage = 12;
    const isAdmin=true;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // ฟังก์ชันดึงข้อมูลตามหน้าปัจจุบัน
        const fetchData = async () => {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            console.log(`ดึงข้อมูลจาก ${start} ถึง ${end}`);
            // เขียนโค้ดสำหรับดึงข้อมูลจริง ๆ ที่นี่
        };
        fetchData();
    }, [currentPage]);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('');

    // Filter movies based on search query
    // const filteredMovies = movies.filter((movie) =>
    //   movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    return (
        <div>
            <div className=''>
                <div className="lg:mx-9 mt-6 flex justify-center px-24 md:px-0">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
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
                <div className='text-white'>
                    <button>เพิ่มหนัง</button>
                </div>
                <div className='search-body flex justify-between items-center px-24 md:px-48 lg:mx-9 my-6'>
                    {/* Title on the Left */}
                    <h3 className='text-3xl text-white font-bold'>Explore</h3>

                    {/* Sorting Dropdown on the Right */}
                    <div className='flex items-center'>
                        <h5 className='mr-2 text-white'>เรียงจาก :</h5>
                        <select className='text-black px-2 py-1 rounded-md' onChange={(e) => setOrderBy(e.target.value)}>
                            <option value="newest">OrderBy Starting</option>
                            <option value="oldest">OrderBy Ending</option>
                        </select>
                    </div>
                </div>


                <div className='flex flex-wrap gap-4 justify-center'>
                    {movies.map((movie, index) => (
                        <div key={index} className='flex flex-col w-[40%] md:w-[30%] lg:w-[20%] items-center justify-start' >
                            <div className="relative flex flex-col items-center w-full">
                                <img src={movie.imageUrl} className='w-4/5  rounded-xl' alt={movie.title} />
                                <Link href={isAdmin?"editmovie":"showtime"}>
                                    <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                                        <input type="button" value="ดูเพิ่มเติม" className='bg-gray-100 text-black w-4/6 rounded cursor-pointer' />
                                    </div>
                                </Link>
                            </div>
                            <div className='flex justify-between w-4/5 mt-2'>
                                <div className='w-1/2'>
                                    <p className='text-[--gold] text-xs md:text-sm '>{movie.releaseDate}</p>
                                    <p className='text-sm md:text-lg lg:text-xl'>{movie.title}</p>
                                </div>
                                <div className='flex justify-end  w-1/2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 " height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                    <p className='text-xs md:text-sm '>{movie.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default Explore

'use client'

import React, { useEffect, useState } from 'react';
import SwiperDate from '@/component/SwiperDate.jsx';
import Loading from '@/component/Loading.jsx';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
export default function Showtime({ params }) {

    const searchParams = useSearchParams();

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const { data: session, status } = useSession();
    const [userTier, setUserTier] = useState('');
    const [movies, setMovies] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const { moviename } = params;
    const [loading, setLoading] = useState(true);

    const [selectedShowtime, setSelectedShowtime] = useState({
        Theater: '',
        Time: '',
        Sub: '',
        Showid: '',
    });
    useEffect(() => {

        const time = searchParams.get('time');
        const urlDate = searchParams.get('date');

        if (time) {
            setSelectedShowtime((prev) => ({
                ...prev, Time: time,
            }))
        }
        if (urlDate) {
            setDate(urlDate);
        }
    }, [searchParams]);
    useEffect(() => {
        const theater_name = searchParams.get('theater_name');
        const selectedTheater = showtimes.find(theater => theater.theater_name === theater_name);

        if (selectedTheater) {
            setSelectedShowtime({
                ...selectedShowtime, // Keep other properties
                Showid: selectedTheater._id,
                Sub: selectedTheater.Sub,
                Theater: selectedTheater.theater_name,
            });
        }
    }, [searchParams, showtimes])
    const handleDateSelect = (date) => {
        const selectedDate = new Date(date).toISOString().split('T')[0];
        setDate(selectedDate);
        setSelectedSeats([]);
        setTotalprice(0);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`/api/movie/${moviename}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        const fetchUserTier = async () => {
            if (!session?.user?.username) return;
            try {
                const response = await fetch(`/api/promotionTier/getTieruser?username=${session.user.username}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUserTier(data.userTier[0])


            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        if (status === "authenticated") {
            fetchUserTier();
        }
        fetchMovies();


    }, [moviename, session, status]);

    useEffect(() => {
        const fetchShowtime = async () => {
            if (!date || !movies.movie_name) return;

            try {
                const response = await fetch(`/api/moviebydate/?moviename=${movies.movie_name}&date=${date}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setShowtimes(data);

            } catch (error) {
                console.error('Error fetching showtimes:', error);
            }
        };
        if (movies.movie_name) {
            fetchShowtime();
        }


    }, [date, movies.movie_name]);


    const handleShowtimeClick = (theater_name, time, Sub, show_id) => {

        setSelectedSeats('');
        setSelectedShowtime({
            Theater: theater_name,
            Time: time,
            Sub: Sub,
            Showid: show_id,
        })
        setTotalprice(0);
    };

    useEffect(() => {
        if (selectedShowtime) {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }

        }
    }, [selectedShowtime]);

    const seats = [];
    const letters = 'LKJIHGFEDCBA'
    for (let i = 0; i < 12; i++) {
        const row = [];
        for (let j = 0; j < 16; j++) {
            const seatLabel = `${letters[i]}${j + 1}`
            row.push(seatLabel)
        }
        seats.push(row)
    }


    const [selectedSeats, setSelectedSeats] = useState({});
    const toggleSeat = (seat) => {

        let price = movies.price;
        if (seat.startsWith("A") || seat.startsWith("B") || seat.startsWith("C")) {
            price += 40;
        } else if (seat.startsWith("D") || seat.startsWith("E") || seat.startsWith("F") || seat.startsWith("G") || seat.startsWith("H") || seat.startsWith("I")) {
            price += 20;
        }
        if (selectedSeats[seat]) {
            const updatedSeats = { ...selectedSeats };
            setTotalprice(totalprice - updatedSeats[seat]);
            delete updatedSeats[seat];
            setSelectedSeats(updatedSeats);
        } else {
            if (Object.keys(selectedSeats).length >= 6) {
                window.alert(`You can purchase a maximum of 6 seats at a time!`);
                return;
            }
            if (userTier) {
                const discount = parseInt(userTier.discount, 10);
                const discountAmount = (discount / 100) * price;
                price = price - parseInt(discountAmount);
            }
            setSelectedSeats(prevSeats => ({
                ...prevSeats,
                [seat]: price, // Add the seat with its price
            }));
            setTotalprice(totalprice + price);
        }

    };
    const [bookedSeats, setBookedSeats] = useState([]);
    useEffect(() => {
        const fetchSeat = async () => {

            try {
                const response = await fetch(`/api/booking/?theater_name=${selectedShowtime.Theater}&date=${date}&time=${selectedShowtime.Time}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setBookedSeats(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching showtimes:', error);
            }
        }
        if (selectedShowtime.Theater && selectedShowtime.Time && date) {
            fetchSeat();
            setTotalprice(0);
        }
    }, [date, selectedShowtime.Theater, selectedShowtime.Time]);
    const isSeatBooked = (seat) => {
        return bookedSeats.some(
            (bookedSeat) => bookedSeat.seat_id === seat
        );
    };
    const [totalprice, setTotalprice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleConfirmPurchase = async (e) => {
        e.preventDefault();
        if (!session?.user?.username) {
            window.alert('Please Login before buying a ticket');
            return;
        }
        const body = { date, theater: selectedShowtime.Theater, showid: selectedShowtime.Showid, time: selectedShowtime.Time, moviename, username: session.user.username, selectedSeats, total_amount: totalprice };
        try {
            const response = await fetch(`/api/checkout/seat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No checkout URL returned');
            }

        } catch (error) {
            console.error('There was a problem with the purchase:', error);
        }
    };
    if (loading) {
        return <Loading />
    }
    return (
        <main className="mt-16 min-h-screen duration-200 ">
            <div className="flex my-12 bg-bggray w-full py-6">
                <div className="flex justify-start md:justify-start items-start mx-2  md:mx-12 w-2/5 md:w-auto">
                    <div className="flex flex-col justify-start">
                        <div className="w-36 md:w-60 rounded-2xl  my-6">
                            <Image
                                src={`/uploads/${movies.imageUrl}`}
                                alt={movies.movie_name}
                                width={240}
                                height={240}
                                className="rounded-2xl"
                            />
                        </div>
                        {movies.Age && (
                            <div
                                className={`self-center ${movies.Age !== "ทั่วไป" && movies.Age !== "13+"
                                    ? 'text-red-500'
                                    : 'text-white'
                                    }`}
                            >
                                เรทหนัง : {movies.Age}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-3/5 md:w-1/2 lg:w-1/3 text-sm lg:text-[16px] text-white font-Kanit mt-4 mr-4 ">
                    <p className="text-[--gold] text-[10px] md:text-[12px]"> {movies.startDate} - {movies.endDate}</p>
                    <p className="text-[14px] font-blod md:text-2xl"> {movies.movie_name} </p>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                        <p className="mx-1 text-[10px] md:text-[12px]">{Math.floor(movies.duration / 60)} ชม. {movies.duration % 60} นาที</p>
                        <p className="mx-1 text-[10px] md:text-[12px]">ราคา : {movies.price} บาท</p>
                    </div>

                    <div className="mt-6  line-clamp-8 font-sans">
                        <p className="font-Kanit mb-2 text-[12px] md:text-[14px]">เรื่องย่อ</p>
                        <p className='text-left overflow-wrap text-[12px] md:text-[14px] break-words'>{movies.desc}</p>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        {movies.Tag && movies.Tag.map((item, index) => (
                            <div key={index} className='text-[10px] md:text-[12px] text-white p-1.5 border-white rounded-2xl border-[2px]'>
                                {item}
                            </div>
                        ))}

                    </div>
                    {movies.Sub && <div className='mt-2 md:mt-4'>
                        <h3>Avalible Sub:</h3>
                        <div className='mt-2 md:mt-4 flex gap-4 '>
                            {movies.Sub.map((item, index) => (
                                <div key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div>


            <div className='mx-6 my-2 lg:mx-16'>
                <h1 className='text-white font-Kanit text-2xl'>รอบภาพยนตร์</h1>
            </div>
            <SwiperDate onDateSelect={handleDateSelect} selectedDate={date}></SwiperDate>

            {showtimes.length === 0 &&
                <div className="text-center text-xl mt-12">
                    No showtimes available.
                </div>
            }
            <div className='mx-5 my-8 font-Kanit md:mx-20'>
                {showtimes.map((showtime, index) => (
                    <div key={showtime.theater_name} className="my-4 font-bold text-black">
                        <div className="text-xl text-white ">{showtime.theater_name}
                            {showtime.Sub && <span className='ml-4'>Sub : {showtime.Sub}</span>}
                        </div>
                        <div className="flex flex-wrap">
                            {showtime.show_time.map((time) => {
                                const isSelected = showtime.theater_name === selectedShowtime.Theater && selectedShowtime.Time === time;
                                return (
                                    <div key={time} className={`mx-2 my-2 flex justify-center  hover:bg-[--gold] duration-200 p-2 w-16 md:w-24 rounded 
                                        font-bold text-sm md:text-lg cursor-pointer ${isSelected ? "bg-gold" : "bg-white"} `}
                                        onClick={() => handleShowtimeClick(showtime.theater_name, time, showtime.Sub, showtime._id)}>
                                        {time}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                ))}
            </div>



            {selectedShowtime && showtimes.length !== 0 && (
                <div className=" my-20 font-Kanit md:mx-16">
                    <hr className="border-t-2 border-gray-300 my-4" />

                    <div className="flex flex-col xl:flex-row items-center font-Kanit  w-full " id="booking">

                        <div className=' flex flex-col items-center w-full xl:w-2/3 mt-20 text-white'>
                            <div className='flex  w-full p-1 justify-center md:justify-end md:mr-96 mb-5'>
                                <div className='flex items-end text-[12px] md:text-md'>
                                    <div className='flex items-center '>
                                        <h3>ราคา : ปกติ</h3>
                                        <div className={`cursor-pointer text-center rounded mr-1 md:m-1 w-8 h-8 md:h-10 md:w-10  text-white rounded-t-2xl bg-red-700`}></div>
                                    </div>
                                    <div className='flex items-center'>
                                        <h3>ราคา : +20</h3>
                                        <div className={`cursor-pointer text-center rounded mr-1 md:m-1 w-8 h-8 md:h-10 md:w-10  text-white rounded-t-2xl bg-blue-700`}></div>
                                    </div>
                                    <div className='flex items-center'>
                                        <h3>ราคา : +40</h3>
                                        <div className={`cursor-pointer text-center rounded mr-1 md:m-1 w-8 h-8 md:h-10 md:w-10  text-white rounded-t-2xl bg-purple-700`}></div>
                                    </div>
                                </div>
                            </div>
                            {userTier && <div>

                                {userTier.tier} ส่วนลด : {userTier.discount} %
                            </div>}
                            <div className='w-full xl:w-2/3  h-10 bg-black border-2 border-[--gold] text-white text-2xl items-center justify-center flex mb-12'>
                                SCREEN
                            </div>

                            {seats.map((rowSeats, rowIndex) => (
                                <div key={rowIndex} className="flex mb-4 justify-center text-white  w-full ">
                                    <span className='mx-1 md:mx-2'>{letters[rowIndex]}</span>
                                    {rowSeats.map((seat) => (
                                        <div key={seat} id={seat} onClick={!isSeatBooked(seat) ? () => toggleSeat(seat) : undefined}
                                            className={`cursor-pointer text-center rounded mr-1 md:m-1 w-8 h-6 md:h-10 md:w-10  text-white rounded-t-2xl
                                                ${isSeatBooked(seat) ? 'bg-gray-900 cursor-not-allowed'
                                                    : selectedSeats[seat] != null ? 'bg-[--gold]'
                                                        : rowIndex <= 2 ? 'bg-red-700'
                                                            : rowIndex <= 8 ? 'bg-blue-700'
                                                                : 'bg-purple-700'}`}>

                                        </div>

                                    ))}
                                    <span className='mx-1'>{letters[rowIndex]}</span>
                                </div>
                            ))}
                        </div>
                        <div className='w-[80%] md:w-3/4 xl:w-[30%] border  text-white p-2 md:p-6 my-12 text-sm md:text-lg '>
                            {userTier && <h6 className='text-sm text-red-500'>**ส่วนลด : {userTier.discount} % สำหรับสมาชิก {userTier.name}</h6>}
                            <h1 className='font-bold mx-2  text-lg '>SUMMARY</h1>
                            <div className='flex'>
                                <img src={`/uploads/${movies.imageUrl}`} className='w-40 m-2'></img>
                                <div className='flex flex-col mt-2 mx-2'>
                                    <p className='font-bold text-xl'>{movies.movie_name}</p>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                        <p className="mx-1">{Math.floor(movies.duration / 60)} ชม. {movies.duration % 60} นาที</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p >{selectedShowtime.Theater}</p>
                                        <div className="flex justify-center items-center bg-[--gold]  p-2 w-12 h-7 md:w-24 md:h-10 rounded font-bold  md:text-lg text-black " >
                                            {selectedShowtime.Time}
                                        </div>
                                        <div className=" mt-4" >
                                            {date}
                                        </div>
                                        <div className='mt-4'>
                                            {selectedShowtime.Sub && <h3>Sub : {selectedShowtime.Sub}</h3>}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {Object.keys(selectedSeats).length === 0 ? (null) : (

                                <div className='flex flex-wrap mx-2 text-sm md:text-lg duration-500'>
                                    <div className='w-1/2 flex flex-wrap '>
                                        <div className='w-full'>ที่นั่ง : </div>
                                        {Object.entries(selectedSeats).map(([seat, price]) => (
                                            <div key={seat} className='mr-1'>{`${seat}: ${price}฿,`}</div>
                                        ))}
                                    </div>
                                    <div className='w-1/2 text-end'>
                                        <p className=''>ราคา</p>
                                        <span>{totalprice}</span>
                                    </div>
                                    <div onClick={() => setIsModalOpen(true)} className='w-full mx-6 bg-[--gold] h-8 text-black items-center justify-center flex font-bold mt-4 rounded-sm cursor-pointer' > ซื้อตั๋ว</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}



            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center font-Kanit">
                    <div className="bg-black text-white p-6 rounded-xl shadow-lg max-w-md md:max-w-3xl w-full">
                        <h2 className="text-xl font-bold mb-4 lg:text-2xl">ยืนยันการซื้อ</h2>

                        <div className='w-full  border  text-white p-2 text-sm md:text-lg '>
                            <h1 className='font-bold mx-2'></h1>
                            <div className='flex '>

                                <img src={`/uploads/${movies.imageUrl}`} className='m-2 w-40'></img>
                                <div className='flex flex-col mt-2 mx-4 w-full justify-between'>
                                    <div>
                                        <p className='font-bold text-lg'>{movies.movie_name}</p>

                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
                                            <p className="mx-1">{Math.floor(movies.duration / 60)} ชม. {movies.duration % 60} นาที</p>
                                        </div>
                                    </div>

                                    <div className='mt-2'>
                                        <p>{selectedShowtime.Theater}</p>
                                        <div className="flex justify-center items-center bg-white  p-2 w-12 h-8 md:w-24 md:h-10 rounded font-bold  md:text-lg text-black " >
                                            {selectedShowtime.Time}
                                        </div>
                                        <div className="text-sm mt-4" >
                                            {date}
                                            {selectedShowtime.Sub && <span className='ml-4'>
                                                Sub : {selectedShowtime.Sub}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap   duration-500   mt-2'>
                                        <div className='w-3/4 flex flex-wrap '>
                                            <span className='w-full'>ที่นั่ง : </span>
                                            {Object.keys(selectedSeats).map((selectedseat) => (
                                                <div key={selectedseat} className='mr-1'>{selectedseat},</div>
                                            ))}
                                        </div>
                                        <div className='w-1/4 text-end'>
                                            <p className=''>{totalprice} บาท</p>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="flex justify-end my-5">
                            <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-4" onClick={() => setIsModalOpen(false)}>
                                ยกเลิก
                            </button>
                            <button type="submit" className="bg-[--gold] text-black py-2 px-4 rounded" onClick={handleConfirmPurchase}>
                                ซื้อตั๋ว
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}






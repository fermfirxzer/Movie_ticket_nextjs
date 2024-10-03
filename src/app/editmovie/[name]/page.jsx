'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Insertmovie from '@/component/insertmovie'


export default function Edit({ params }) {
    const [errfetchshowtime, setErrfetchshowtime] = useState("");
    const router = useRouter();
    const { name } = params;
    const [Moviename, setMoviename] = useState(name || null);
    const [Showtime, setShowtime] = useState(null);
    useEffect(() => {
        const fetchShowtime = async () => {
            try {
                const response = await fetch(`/api/showtime/${Moviename}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setShowtime(data);
                // setLoading(false);

            } catch (error) {
                console.log(error.Message)
                setErrfetchshowtime("Failed to fetch showtime!");
            }

        };
        if (Moviename) {
            fetchShowtime();
        }
    }, [Moviename]);

    console.log(Showtime);

    //Dropdown 
    const [showForm, setShowForm] = useState(false);
    const [Date, setDate] = useState({
        startDate: '',
        endDate: '',
    })
    const handleDateChange=(e)=>{
        const { name, value } = e.target;
        setDate({
            ...Date,
            [name]: value,
        });
        console.log(Date)
    }
    const [availableTheater, setavailableTheater] = useState(null);
    useEffect(() => {
        const fetchTheater = async () => {
            try {
                const response = await fetch(`/api/showtime`, {
                    method: 'POST', // Specify the POST method
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                    body: JSON.stringify({ startDate: date.startDate, endDate: date.endDate }), // Send the date in the body
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setavailableTheater(data);


            } catch (error) {
                console.log(error.Message)
            }
        };
        fetchTheater();
    }, [Date.startDate, Date.endDate])
    const [selectedTheaters, setSelectedTheaters] = useState([]); // Array to hold selected theater IDs and their times

    const handleTheaterChange = (index, theaterId) => {
        const updatedTheaters = [...selectedTheaters];
        updatedTheaters[index] = theaterId; // Update the specific index with the selected theater ID
        setSelectedTheaters(updatedTheaters);
    };

    const addNewSelect = () => {
        setSelectedTheaters([...selectedTheaters, null]); // Add a new select with a null value
    };
    return (
        <main className='min-h-screen font-Kanit bg-black'>

            <Insertmovie moviename={Moviename} />
            <div className='container mx-auto'>
                <h4 className='text-2xl font-bold'>รอบการฉายของหนัง : {decodeURIComponent(Moviename)}</h4>
                <h3>{errfetchshowtime && (errfetchshowtime)}</h3>
                <div className='w-[100%] flex flex-col gap-12 mx-auto font-bold text-lg mt-4'>
                    {Showtime && Showtime.map((showtimeGroup, groupIndex) => (
                        <div key={groupIndex} className='border-white border-2 p-5'>
                            <div className='flex gap-4'>
                                From: <p>{showtimeGroup.startDate.toLocaleDateString('en-Us')}</p>
                                to: <p>{showtimeGroup.endDate.toLocaleDateString('en-Us')}</p>
                            
                            </div>


                            {showtimeGroup.showtimes.map((showtime, index) => (
                                <div key={showtime._id}>
                                    <h4>{showtime.theater_name}</h4>
                                    <div className='flex gap-8 p-3 '>
                                        {showtime.show_time.map((time, timeIndex) => (
                                            <button key={timeIndex} className="text-white my-2 mx-1 border-2 border-gray-600 duration-200 p-2 w-14 md:w-24 rounded font-bold text-sm md:text-lg cursor-pointer">
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {showForm && (
                    <div className='w-[100%] flex flex-col gap-12 mx-auto font-bold text-lg mt-4'>
                        <div>
                        <h3 className='text-white'>เพิ่มรอบฉาย :</h3>
                        <div className='flex gap-10'>
                            <input type="date" name="startDate" className='px-2 py-2 border rounded'
                                onChange={handleDateChange} />
                            <input type="date" name="endDate" className='px-2 py-2 border rounded'
                                onChange={handleDateChange} // Update endDate
                            />
                        </div>
                        </div>
                        <div>
                            <h3>โรงหนัง :</h3>
                            {selectedTheaters.map((theaterId, index) => ( 
                                <div key={index} className="flex flex-col mb-4">
                                    <select
                                        onChange={(e) => handleTheaterChange(index, e.target.value)}
                                        value={theaterId || ''}
                                    >
                                        <option value="" disabled>Select a theater</option>
                                        {availableTheater.map((theater) => (
                                            <option key={theater._id} value={theater._id}>
                                                {theater.theater_name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Display available times for the selected theater */}
                                    {theaterId && (
                                        <div className="available-times">
                                            <h4>Available Times:</h4>
                                            <ul>
                                                {availableTheater.find(t => t._id === theaterId)?.available_times.map((time, idx) => (
                                                    <li key={idx}>{time}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                className='text-white'
                                onClick={addNewSelect}
                            >
                                Add new select
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex justify-center'>
                    <div className='flex flex-wrap justify-center my-6' onClick={() => setShowForm(!showForm)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff" className='w-full'>
                            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                        <div className='text-white'>{!showForm ? "เพิ่มรอบฉาย" : "ยกเลิก"}</div>
                    </div>
                </div>
            </div>
        </main>

    );


}
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Insertmovie from '@/component/insertmovie'
import Swal from 'sweetalert2';
import Loading from '@/component/Loading';
import { useSession } from 'next-auth/react';
import useCheckAdmin from '@/app/utils/checkadmin';
export default function Edit({ params }) {
    const [errfetchshowtime, setErrfetchshowtime] = useState("");
    const { data: session, status } = useSession(); // Access session and loading status
    useCheckAdmin();
    // const router = useRouter();
    // useEffect(() => {
    //     if (session.user.isAdmin==false||status === 'unauthenticated') {
    //         router.push('/');
    //     }
    // }, [status, router]); //
    const { name } = params;
    const [Moviename, setMoviename] = useState(name || null);
    const [Showtime, setShowtime] = useState(null);
    const [Errdate, setErrDate] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchShowtime = async () => {
            try {
                const response = await fetch(`/api/showtime/${Moviename}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setShowtime(data);
                setLoading(false);

            } catch (error) {
                console.log(error.Message)
                setErrfetchshowtime("Failed to fetch showtime!");
            }

        };
        if (Moviename) {
            fetchShowtime();
        }
    }, [Moviename]);

    const [showForm, setShowForm] = useState(false);
    const [showDate, setshowDate] = useState({
        startDate: '',
        endDate: '',
    })
    const handleDateChange = (e) => {
        setErrDate(null);
        const { name, value } = e.target;
        setshowDate((prevDate) => ({
            ...prevDate,
            [name]: value,
        }));

    }
    const [movieStart, setMovieStart] = useState('');
    const [movieEnd, setMovieEnd] = useState('');
    const [availableTheater, setavailableTheater] = useState(null);
    useEffect(() => {
        const fetchTheater = async () => {
            try {
                const response = await fetch(`/api/showtime?startDate=${showDate.startDate}&endDate=${showDate.endDate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
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
        setErrDate(null);
        setavailableTheater([]);
        setAvailableTime([]);
        if (showDate.startDate && showDate.endDate && movieStart <= showDate.startDate && movieEnd >= showDate.endDate && showDate.startDate <= showDate.endDate) {
            fetchTheater();
            setErrDate("date ถูกต้อง");
        } else if (!showDate.startDate || !showDate.endDate) {
            setErrDate("กรุณากรอกวันที่")
        } else if (showDate.startDate > showDate.endDate) {
            setErrDate("วันที่เริ่ม show ต้องมากกว่าวันที่จบ show");
        } else {
            setErrDate("show ต้องอยู่ในช่วงเวลาของหนัง")
        }
    }, [showDate.startDate, showDate.endDate, movieStart, movieEnd])



    const [selectedTheaters, setSelectedTheaters] = useState({
        Theater: '',
        time: [],
    });
    const [availableTime, setAvailableTime] = useState([]);

    const handleTheaterChange = (e) => {
        setAvailableTime([]);
        const theaterName = e.target.value;
        setSelectedTheaters((prevState) => ({
            ...prevState,
            Theater: theaterName,
            time: [],
        }));
        const theater = availableTheater.find((theater) => theater.theater_name === theaterName);
        if (theater) {
            setAvailableTime(theater.available_times);
        }
    };

    console.log(availableTheater);

    const handleshowForm = () => {
        setShowForm(!showForm);
        setSelectedTheaters({
            Theater: '',
            time: [],
        });
    }
    const [Errshowtime, setErrshowtime] = useState(null);
    const addTime = (time) => {
        setSelectedTheaters((prev) => {
            const currentTime = prev.time || []; // Ensure prev.time is an array (fallback to empty array if undefined)
            const isTimeSelected = currentTime.includes(time); // Check if the time is already selected
            return {
                ...prev,
                time: isTimeSelected
                    ? currentTime.filter(t => t !== time) // Remove the time if it's already selected
                    : [...currentTime, time], // Add the time if it's not selected
            };
        });
    };
    const handleAddshowtime = async (e) => {
        e.preventDefault();
        setErrshowtime(null);
        try {
            const response = await fetch(`/api/showtime`, {
                method: 'POST', // Specify the POST method
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify({ showDate, selectedTheaters, Moviename }), // Send the date in the body
            });
            if (!response.ok) {

                const errorData = await response.json();
                setErrshowtime(errorData.Message);
                return;
            }
            setErrshowtime("Add showtime success!")
            setTimeout(() => {
                window.location.reload(); // Reload the page
            }, 2000);
        } catch (error) {
            setErrshowtime(error.Message);
            console.log(error.Message);
        }
    }
    const DeleteShowtime = async (showtime) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You will delete the showtime for ${showtime.theater_name}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            // Perform the delete operation
            try {
                const response = await fetch(`/api/showtime`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(showtime),
                });

                if (response.ok) {
                    Swal.fire('Deleted!', 'Your showtime has been deleted.', 'success');
                    setTimeout(() => {
                        window.location.reload(); // Reload the page
                    }, 2000); // 2-second delay
                } else {
                    const errorData = await response.json();
                    Swal.fire('Error!', errorData.Message, 'error');
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    };
    if (loading) {
        return <Loading />
    }
    return (
        <main className='min-h-screen font-Kanit bg-black'>

            <Insertmovie moviename={Moviename} setMovieStart={setMovieStart} setMovieEnd={setMovieEnd} />
            <div className='container mx-auto'>
                <h4 className='text-2xl font-bold'>รอบการฉายของหนัง : {decodeURIComponent(Moviename)}</h4>
                <h3>{errfetchshowtime && (errfetchshowtime)}</h3>
                <div className='w-[100%] flex flex-col gap-12 mx-auto font-bold text-lg mt-4'>
                    {Showtime && Showtime.map((showtimeGroup, groupIndex) => (
                        <div key={groupIndex} className='border-white border-2 p-5'>
                            <div className='flex gap-4'>
                                From :<p>{showtimeGroup.startDate}</p>
                                To :<p>{showtimeGroup.endDate}</p>
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
                                    <div className="flex justify-end" onClick={() => DeleteShowtime(showtime)}>
                                        <button className='bg-red-900 text-white p-2 w-22  rounded-lg flex justify-center hover:scale-90' onClick={() => setShowForm(!showForm)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </button>
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
                                <input type="date" name="startDate" value={showDate.startDate} className='px-2 py-2 border rounded'
                                    onChange={handleDateChange} />
                                <input type="date" name="endDate" value={showDate.endDate} className='px-2 py-2 border rounded'
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>

                        {Errdate && <p className="text-red-500">*{Errdate}</p>}
                        {Errdate == "date ถูกต้อง" && <div>
                            <h3>โรงหนัง :</h3>

                            <div className="flex flex-col mb-4 text-black">
                                <select onChange={handleTheaterChange}>
                                    <option value="">Select a theater</option>
                                    {availableTheater && availableTheater.map((theater) => (
                                        <option key={theater._id} value={theater.theater_name}>
                                            {theater.theater_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">

                                {availableTime.length > 0 ? (
                                    availableTime.map((time, index) => (
                                        <button
                                            key={index}
                                            className={`my-2 mx-1 duration-200 p-2 w-14 md:w-24 rounded font-bold text-sm md:text-lg cursor-pointer ${selectedTheaters.time?.includes(time) ? "bg-blue-500 text-white" : "bg-gray-200"
                                                }`}
                                            onClick={() => addTime(time)} // Handle time selection
                                        >
                                            {time}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No available times for this theater.</p>
                                )}
                            </div>
                        </div>}

                        <div className='flex justify-end mt-6'>
                            {Errshowtime && <p className='self-start flex-grow'>{Errshowtime}</p>}
                            <button className='bg-white  p-2 w-22  rounded-lg flex justify-center mx-4 font-bold hover:scale-90' onClick={handleAddshowtime} >
                                เพิ่มรอบฉาย
                            </button>
                            <button className='bg-red-900 text-white p-2 w-22  rounded-lg flex justify-center hover:scale-90' onClick={() => setShowForm(!showForm)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex justify-center'>

                    <div className='flex flex-wrap justify-center my-6' onClick={handleshowForm}>
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

'use client'
import React, { useState, useEffect } from 'react';
import { useMovie } from '@/context/Moviecontext';
export default function Edit() {
    const [errmovie, setErrmovie] = useState("");
    const currentMovieId = 1;
    const theaters = {
        1: ['12:30', '15:30', '18:30', '21:30', '22:30'],
        2: ['12:00', '15:00', '18:00', '21:00', '22:00'],
        3: ['16:00', '19:00', '22:00', '1:00'],
        4: ['9:30', '12:30', '15:30', '18:30', '21:30', '22:30'],
        5: ['9:00', '12:00', '15:00', '18:00', '21:00', '22:00', '1:00', '4:00'],
    }
    const showtimemovie = [
        {
            ShowtimeId: 1, MovieId: 1
            , tt1: ['12:30', '18:30']
            , tt2: []
            , tt3: ['22:00', '1:00']
            , tt4: []
            , tt5: ['12:00', '21:00']

        },
        {
            ShowtimeId: 2, MovieId: 2
            , tt1: ['21:30']
            , tt2: ['18:00']
            , tt3: ['16:00']
            , tt4: ['9:30', '12:30',]
            , tt5: ['1:00', '4:00']

        }
        , {
            ShowtimeId: 3, MovieId: 3
            , tt1: []
            , tt2: []
            , tt3: []
            , tt4: []
            , tt5: ['15:00']

        }
    ];
    const insertMovie = async (e) => {
        e.preventDefault();
        setErrmovie(null);
        console.log(currentMovieInfo)
        if (!currentMovieInfo.imageFile) {
            setErrmovie("Image required");
            return;
        }
        const formData = new FormData();
        formData.append('image', currentMovieInfo.imageFile);
        try {
            const imageResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            // console.log(imageResponse.json())
            const imageData = await imageResponse.json();
            console.log(imageData.imageUrl);
            setCurrentMovieInfo({
                ...currentMovieInfo,
                imageUrl: imageData.imageUrl,
            });
            const movieResponse = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentMovieInfo),
            });
            const movieData = await movieResponse.json()
            setErrmovie(movieData.Message);

        } catch (error) {
            console.log(error.Message);
            setErrmovie('An error occurred while uploading the image');
        }
    };
    const { movieId, setMovieId } = useMovie();
    useEffect(() => {
        if (movieId) { // Remove after fetching
            // Fetch movie data using movieId
            const fetchMovie = async () => {
                try {
                    const response = await fetch(`/api/movie/${movieId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie');
                    }
                    const data = await response.json();
                    setCurrentMovieInfo(data);
                    setLoading(false);

                } catch (error) {
                    console.log(error.Message)
                    setErrmovie(error.Message);
                }

            };
            fetchMovie();
        }
    }, [movieId]);

    const [currentMovieInfo, setCurrentMovieInfo] = useState({
        movie_id: '',
        movie_name: '',
        startDate: '',
        endDate: '',
        imageUrl: '',
        duration: '',
        desc: '',
        price: '',
        imageFile: null,
        imagePath: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentMovieInfo({
            ...currentMovieInfo,
            [name]: value,
        });
        console.log(currentMovieInfo)
    };
    const handleClick = () => {
        document.getElementById('fileInput').click();
    };
    const [imagecount, setImagecount] = useState(1);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            const ChangeimageUrl = URL.createObjectURL(file);
            setCurrentMovieInfo({
                ...currentMovieInfo,
                [name]: ChangeimageUrl,
                imageFile: file,
            });
        }
        setImagecount(0);
    };
    //edit each theater
    const [editTheaterIds, setEditTheaterIds] = useState({
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,

    });
    const toggleEdit = (theaterId) => {
        setEditTheaterIds((prev) => ({
            ...prev,
            [theaterId]: !prev[theaterId],
        }));
        console.log(editTheaterIds)
    };


    //Dropdown 
    const [selectedTheater, setSelectedTheater] = useState('');
    const handleTheaterChange = (e) => {

        setEditTheaterIds((prev) => ({
            ...prev,
            [e.target.value]: true,
        }));

        setSelectedTheater(e.target.value);
    };


    //Find movieid in showtime
    const [currentMovieShowtimes, setCurrentMovieShowtimes] = useState(showtimemovie.find(movie => movie.MovieId === currentMovieId) || {});

    //Edit showtime 
    const handleSetShowtimes = (theaterId, time) => {
        if (editTheaterIds[theaterId]) {
            setCurrentMovieShowtimes(prevShowtimes => {
                const theaterKey = `tt${theaterId}`;
                const theaterShowtimes = prevShowtimes[theaterKey] || [];
                console.log(theaterShowtimes)
                // Check if the time is already selected 
                if (theaterShowtimes.includes(time)) {
                    // Remove
                    return {
                        ...prevShowtimes,
                        [theaterKey]: theaterShowtimes.filter(t => t !== time)
                    };
                } else {
                    //Add
                    return {
                        ...prevShowtimes,
                        [theaterKey]: [...theaterShowtimes, time]
                    };
                }
            });

        }


    };
    const handleDeleteShowtimes = (theaterId) => {
        setCurrentMovieShowtimes(prevShowtimes => {
            const theaterKey = `tt${theaterId}`;


            const theaterShowtimes = prevShowtimes[theaterKey] || [];
            console.log("Current showtimes for Theater", theaterId, theaterShowtimes);


            if (theaterShowtimes.length > 0) {
                return {
                    ...prevShowtimes,
                    [theaterKey]: []
                };
            }
            return prevShowtimes;
        });
    };

    // check showtime is used by the current movie or other movie
    const isCurrentMovieShowtime = (theaterId, time) => {
        return currentMovieShowtimes[`tt${theaterId}`]?.includes(time);
    };
    const isTimeUsedByOtherMovie = (theaterId, time) => {
        return showtimemovie.some(movie => {
            if (movie.MovieId !== currentMovieId) {
                return movie[`tt${theaterId}`]?.includes(time);
            }
            return false;
        });
    };

    //check currentmovie have showtime in any theater
    let count = 1;
    let MAX;
    const isHaveShowtime = (theaterId) => {
        if (currentMovieShowtimes[`tt${theaterId}`]?.length > 0) {
            MAX = count == Object.keys(theaters).length;
            count++;

            return true;
        }
        return false;
    }
    //check have theater already
    const isHaveTheater = (theaterId) => {
        return !currentMovieShowtimes[`tt${theaterId}`]?.length > 0
    }


    //add button
    const [addTheater, setAddTheater] = useState(false);
    const addClick = () => {
        if (addTheater == false) {
            setAddTheater(true);
        }
    };


    const saveShowtime = (TheaterId) => {
        setCurrentMovieShowtimes(prevShowtimes => ({
            ...prevShowtimes,
            ...tempShowtimes
        }));

        setTempShowtimes({});

        setSelectedTheater('');

        setAddTheater(false);

        setEditTheaterIds((prev) => ({
            ...prev,
            [TheaterId]: false,
        }));

    };

    //Add showtime
    const [tempShowtimes, setTempShowtimes] = useState({});
    const handleSetNewTheater = (theaterId, time) => {
        setTempShowtimes(prevShowtimes => {
            const theaterKey = `tt${theaterId}`;
            const theaterShowtimes = prevShowtimes[theaterKey] || [];

            if (theaterShowtimes.includes(time)) {
                return {
                    ...prevShowtimes,
                    [theaterKey]: theaterShowtimes.filter(t => t !== time)
                };
            } else {
                return {
                    ...prevShowtimes,
                    [theaterKey]: [...theaterShowtimes, time]
                };
            }
        });
    };
    const isTempShowtimeSelected = (theaterId, time) => {
        return tempShowtimes[`tt${theaterId}`]?.includes(time);
    };
    const updateMovie = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            if (currentMovieInfo.imagePath!=null&&currentMovieInfo.imageFile) {
                const formData = new FormData();
                formData.append('image', currentMovieInfo.imageFile);
                const imageResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                // console.log(imageResponse.json())
                const imageData = await imageResponse.json();
                console.log(imageData.imageUrl);
                setCurrentMovieInfo({
                    ...currentMovieInfo,
                    imageUrl: imageData.imageUrl,
                });
            }
            const response = await fetch(`/api/movie/${currentMovieInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentMovieInfo),
            });
            if (response.ok) {

                setErrmovie('Movie updated successfully');
            } else {
                setErrmovie('Failed to update movie');
            }
        } catch (error) {
            setErrmovie(error.Message);
        }
    };
    const deleteMovie = async (e) => {
        console.log("delete",movieId);
        e.preventDefault();
    }
    return (
        <main className='min-h-screen font-Kanit bg-black'>

            <div className="xl:flex xl:flex-wrap   bg-bggray py-12 justify-center md:justify-start p-2 md:mx-40 ">
                <div className='flex w-full p-10'>
                    <p className='text-white mt-5 w-80 md:w-full mx-10 text-3xl font-bold'>ข้อมูลหนัง</p>
                    {currentMovieInfo._id && (<button type="submit" className='bg-white hover:scale-90 w-16 p-2 rounded-md mx-2' onClick={deleteMovie}>ลบ</button>)}
                </div>
                <div className='flex flex-wrap  xl:w-full justify-center lg:justify-start'>

                    <div className=" mx-6 mt-6 mb-2 w-80 h-80 ">
                        <div onClick={handleClick} className="cursor-pointer w-full  h-full bg-black p-1 rounded-xl ">

                            <img
                                src={
                                    currentMovieInfo.imageUrl && movieId && imagecount
                                        ? `/uploads/${currentMovieInfo.imageUrl}`
                                        : currentMovieInfo.imagePath
                                            ? currentMovieInfo.imagePath
                                            : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"
                                }
                                alt="Movie Image"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                        <input id="fileInput" type="file" accept="image/*" className='hidden' name="imagePath" onChange={handleImageChange} />
                    </div>
                    <form className="w-4/5 md:w-2/3 lg:w-1/2 mx-6 my-6" onSubmit={updateMovie}>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Name</label>
                            <input type="text" name="movie_name" value={currentMovieInfo.movie_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Description</label>
                            <textarea name="desc" value={currentMovieInfo.desc} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" rows="4" required />
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 ">Price</label>
                                <input type="number" name="price" value={currentMovieInfo.price} onChange={handleInputChange} className="w-full py-2 border rounded" required />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 ">Duration</label>
                                <input type="text" name="duration" value={currentMovieInfo.duration} onChange={handleInputChange} className="w-full py-2 border rounded" required />
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 ">Starting Date</label>
                                <input type="date" name="startDate" value={currentMovieInfo.startDate} onChange={handleInputChange} className="w-full px-2 py-2 border rounded" required />
                            </div>
                            <div className="w-1/2 ">
                                <label className="block text-gray-700">End Date</label>
                                <input type="date" name="endDate" value={currentMovieInfo.endDate} onChange={handleInputChange} className="w-full px-2 py-2 border rounded" required />
                            </div>
                        </div>
                        <div className=' my-6 text-end  font-bold'>
                            <button type="submit" className='bg-white hover:scale-90  w-16 p-2 rounded-md mx-2'>ยืนยัน</button>
                            <button className='bg-red-900 text-white  hover:scale-90  w-16 p-2 rounded-md'>ยกเลิก</button>
                        </div>
                    </form>

                </div>
                {errmovie &&
                    <div className='text-red-600 text-center'>
                        {errmovie}
                    </div>
                }

                <div className="my-8 mx-10 w-4/5 md:w-full ">
                    <span className="block text-white font-bold text-3xl ">กำหนดรอบฉาย</span>
                    <div className='md:w-4/5'>
                        {Object.keys(theaters).map(theaterId => (
                            isHaveShowtime(theaterId) && (
                                <div key={theaterId} className=" border border-white p-6 rounded-lg my-5">
                                    <h3 className="text-xl text-white font-bold mx-1 ">Theater {theaterId}</h3>
                                    <div className='flex items-center justify-between  '>
                                        <div className="flex flex-wrap ">

                                            {theaters[theaterId].map((time, index) => (


                                                <div
                                                    key={index}
                                                    className={`my-2 mx-1 flex justify-center duration-200 p-2 w-14 md:w-24 rounded font-bold text-sm md:text-lg cursor-pointer
                                                                    ${isCurrentMovieShowtime(theaterId, time) ? 'bg-[--gold]' : isTimeUsedByOtherMovie(theaterId, time) ? 'bg-bggray cursor-not-allowed text-white border border-gray-600' : 'bg-white'} `}
                                                    onClick={!isTimeUsedByOtherMovie(theaterId, time) ? () => handleSetShowtimes(theaterId, time) : null}

                                                >
                                                    {time}
                                                </div>

                                            ))}

                                        </div>

                                    </div>
                                    <div className='flex justify-end mt-10 font-bold'>

                                        <button className={` hover:scale-90 p-2 w-14  rounded-lg flex justify-center mx-2 ${editTheaterIds[theaterId] ? 'bg-green-600 text-white' : 'bg-white '} `}
                                            onClick={() => toggleEdit(theaterId)}>
                                            {editTheaterIds[theaterId] ? 'บันทึก' : 'แก้ไข'}
                                        </button>
                                        <button className='hover:scale-90 bg-red-900 text-white p-2 w-14  rounded-lg flex justify-center ' onClick={() => handleDeleteShowtimes(theaterId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </button>
                                    </div>
                                </div>

                            )))}

                        {addTheater && (
                            <div className='border border-white p-6 rounded-lg my-5 '>
                                <select value={selectedTheater} onChange={handleTheaterChange} className='text-xl mx-1'>
                                    <option value="">เลือกโรงภาพยนต์</option>
                                    {Object.keys(theaters).map((theaterId) => (
                                        isHaveTheater(theaterId) && (
                                            <option key={theaterId} value={theaterId} >
                                                Theater {theaterId}
                                            </option>
                                        )

                                    ))}
                                </select>
                                {/* Display Available Showtimes for Selected Theater */}
                                <div className='mt-2  '>
                                    {selectedTheater && (

                                        <div className=" flex flex-wrap ">
                                            <h3 className="text-xl text-white font-bold mx-1 w-full">Theater {selectedTheater}</h3>
                                            <div className="flex flex-wrap">
                                                {theaters[selectedTheater].map((time, index) => (


                                                    <div
                                                        key={index}
                                                        className={`my-2 mx-1 flex justify-center duration-200 p-2 w-14 md:w-24 rounded font-bold text-sm md:text-lg cursor-pointer
                                                                    ${isTempShowtimeSelected(selectedTheater, time) ? 'bg-[--gold]' : isTimeUsedByOtherMovie(selectedTheater, time) ? 'bg-bggray cursor-not-allowed text-white border border-gray-600' : 'bg-white'} `}
                                                        onClick={!isTimeUsedByOtherMovie(selectedTheater, time) ? () => handleSetNewTheater(selectedTheater, time) : null}
                                                    >
                                                        {time}
                                                    </div>

                                                ))}
                                            </div>


                                        </div>
                                    )}

                                    <div className='flex justify-end mt-6'>
                                        <button className='bg-white  p-2 w-22  rounded-lg flex justify-center mx-4 font-bold hover:scale-90' onClick={() => saveShowtime(selectedTheater)} >
                                            เพิ่มรอบฉาย
                                        </button>
                                        <button className='bg-red-900 text-white p-2 w-22  rounded-lg flex justify-center hover:scale-90' onClick={() => handleDeleteShowtimes(selectedTheater)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                        </button>
                                    </div>

                                </div>


                            </div>
                        )}

                        <div className=' my-6 text-end  font-bold '>
                            <button className='bg-white hover:scale-90  w-16 p-2 rounded-md mx-2'>ยืนยัน</button>
                        </div>
                        {
                            !addTheater && !MAX &&
                            <div className='flex justify-center ' >

                                <div className='flex flex-wrap justify-center my-6 ' onClick={addClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff" className='w-full'><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                    <div className='text-white'>เพิ่มรอบฉาย</div>
                                </div>

                            </div>
                        }


                    </div>


                </div>
            </div>



        </main>

    );


}


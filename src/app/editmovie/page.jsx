
'use client'
import React, { useState, useEffect } from 'react';

export default function Edit() {
    const [errmovie, setErrmovie] = useState("");
    const currentMovieId = 1;
    const [loading, setLoading] = useState(false||localStorage.getItem('movieId') );
    const theaters = {
        1: ['12:30', '15:30', '18:30', '21:30', '22:30'],
        2: ['12:00', '15:00', '18:00', '21:00', '22:00'],
        3: ['16:00', '19:00', '22:00', '1:00'],
        4: ['9:30', '12:30', '15:30', '18:30', '21:30', '22:30'],
        5: ['9:00', '12:00', '15:00', '18:00', '21:00', '22:00', '1:00', '4:00'],
    }
    const [movieId,setmovieId]=useState(localStorage.getItem('movieId')||null);
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
    const movie = {
        name: '',
        startDate: null,
        endDate: null,
        imageUrl: '',
        duration: '',
        desc: ''
        , price: null,
    };
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
    useEffect(() => {
        if (movieId) {
            localStorage.removeItem('movieId'); // Remove after fetching
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
                    setError(error.message || 'Unknown error');
                }

            };
            fetchMovie();
        }
    }, []);
    
    // const movie = {
    //     MovieId:1,
    //     name: 'Spider-Man: No Way Home',
    //     startDate:new Date('2024-09-18'),
    //     endDate:new Date('2024-12-30'),
    //     imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    //     duration: '2 ชม. 28 นาที',
    //     desc: 'Eddie  กาลครั้งหนึ่ง..เมื่อถึงยุคมืดที่ดนตรีไทยถูกสั่งห้ามเล่นโดยไม่ได้รับอนุญาติ เพราะท่านผู้นำต้องการที่จะสร้างบ้านเมืองให้เป็นอารยฯ ใครผ่าฝืนจะถูกจัดการอย่างเด็ดขาด ผู้พันเผ่า(เก้า จิรายุ)ได้รับมอบหมายให้นำกำลังออกกวาดล้างปิดทุกสำนักดนตรีไทยที่ไม่ได้รับอนุญาติ รวมถึงสำนักของเซียนขาวผู้ที่เคยสร้างปมแค้นในใจเมื่อตอนวัยเด็กให้กับผู้พันเผ่า การกวาดล้างครั้งนี้จึงถือเป็นการล้างปมแค้นไปในตัว แต่ผู้พันเผ่าดันพลั้งมือในตอนกวาดล้างสำนักดนตรีไทยของเซีนขาว ทำให้เซียนขาวบาดเจ็บปางตาย ด้วยเหตุนี้ จึงทำให้ เชิด(พีท พชร)ที่เปรียบเสมือนผู้สืบทอดสำนักต่อจากเซียนขาวผู้เป็นพ่อ แต่เรื่องราวมันกลับตาลปัตรเพราะเชิดเอาแต่สนใจดนตรีฝรั่งไม่ยอมทำตามสิ่งที่บรรพบุรุษสืบทอดกันมา เมื่อเกิดเหตุการณ์ที่เซียนขาวเกือบตายเพราะถูกผู้มีอำนาจกดขี่ดนตรีไทยด้วยกฎหมายที่ไม่เป็นธรรม ทำให้เชิดต้องหันกลับมาเล่นดนตรีไทยอีกครั้ง และเหล่าลูกศิษย์ของเซียนขาว กลั่น(เจแปน ภาณุพรรณ) พวง(นิกกี้ ณฉัตร) สิงห์(เติ้ล) จึงรวมตัวตั้งแก๊งที่มีชื่อว่า“ค้างคาวกินกล้วย” เพื่อล้างแค้นให้กับเซียนขาว และออกทวงคืนดนตรีไทยให้กลับมาเป็นของทุกคนอีกครั้ง โดยมีแก้วตา(โจริน 4EVE) สาวสวยผู้เป็นมือซ้อแห่งสำนักเซียนดำ ผู้หญิงที่ทำให้ผู้พันเผ่าหลงรัก แต่ดันไปช่วยเหลือเชิดและก๊วนค้างคาวกินกล้วยให้แข็งข้อต่อท่านผู้นำ ยิ่งทำให้ผู้พันเผ่าไม่พอใจเป็นอย่างมาก จนกลายเป็นสงครามระหว่างเพื่อนที่มีดนตรีไทยมรดกของชาติเป็นเดิมพัน ศึกรบและศึกรัก ศึกค้างคาวกินกล้วยจะจบลงอย่างไร เชิดแก๊งค้างคาวกินกล้วยจะทำให้ดนตรีไทยกลับมาเป็นของทุกคนอีกครั้งได้หรือไม่ ติดตามในภาพยนตร์กวนๆที่จะชวนทุกคนมา เฮฮา ดราม่า น้ำตาซึม ระเบิดภูเขา เผากระท่อม ไปด้วยกันand Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddies last danc'
    //     ,price:120, 
    // };
    // const movie=null;
    const [currentMovieInfo, setCurrentMovieInfo] = useState({
        movie_id: '',
        movie_name: movie?.name || '',
        startDate: movie?.startDate ? new Date(movie.startDate).toISOString().split('T')[0] : '',
        endDate: movie?.endDate ? new Date(movie.endDate).toISOString().split('T')[0] : '',
        imageUrl: movie?.imageUrl || '',
        imagePath: movie?.imagePath || '',
        duration: movie?.duration || '',
        desc: movie?.desc || '',
        price: movie?.price || '',
        imageFile: null,
    });
    console.log(currentMovieInfo)
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
    const updateMovie = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch(`/api/movie/${currentMovieInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentMovieInfo),
            });
            if (response.ok) {
                // Handle success (e.g., navigate or show success message)
                console.log('Movie updated successfully');
            } else {
                throw new Error('Failed to update movie');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteMovie = async (e) => {
        console.log("delete");
        e.preventDefault();
    }




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
    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }
    return (
        <main className='min-h-screen font-Kanit bg-black'>

            <div className="xl:flex xl:flex-wrap   bg-bggray py-12 justify-center md:justify-start p-2 md:mx-40 ">
                <div className='flex w-full p-10'>
                    <p className='text-white mt-5 w-80 md:w-full mx-10 text-3xl font-bold'>ข้อมูลหนัง</p>
                    {currentMovieInfo._id&& (<button type="submit" className='bg-white hover:scale-90 w-16 p-2 rounded-md mx-2' onClick={deleteMovie}>ลบ</button>)}
                </div>
                <div className='flex flex-wrap  xl:w-full justify-center lg:justify-start'>

                    <div className=" mx-6 mt-6 mb-2 w-80 h-80 ">
                        <div onClick={handleClick} className="cursor-pointer w-full  h-full bg-black p-1 rounded-xl ">

                            {currentMovieInfo.imagePath ? (
                                <img src={currentMovieInfo.imagePath} alt="Uploaded" className="w-full h-full object-contain rounded-lg" />
                            ) : (
                                <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png" alt="Upload" className="w-full h-full object-contain rounded-lg" />
                            )}

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


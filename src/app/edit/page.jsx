
'use client'
import React, { useState } from 'react';



export default function Edit(){
  
    const currentMovieId = 1; 

    const theaters = {
        1:['12:30','15:30','18:30','21:30','22:30'],
        2:['12:00','15:00','18:00','21:00','22:00'],
        3:['16:00','19:00','22:00','1:00'],
        4:['9:30','12:30','15:30','18:30','21:30','22:30'],
        5:['9:00','12:00','15:00','18:00','21:00','22:00','1:00','4:00'],
    }
    
    const showtimemovie = [
        { ShowtimeId: 1, MovieId: 1 
            ,  tt1:['12:30','18:30']
            ,  tt2:[]
            ,  tt3:['22:00','1:00']
            ,  tt4:[]
            ,  tt5:['12:00','21:00'] 
                                   
        },
        { ShowtimeId: 2, MovieId: 2
            ,  tt1:['21:30']
            ,  tt2:['18:00']
            ,  tt3:['16:00']
            ,  tt4:['9:30','12:30',]
            ,  tt5:['1:00','4:00'] 
            
        }
        ,{ ShowtimeId: 3, MovieId: 3
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
    ];
 

    // const movie = {
    //     name: '',
    //     startDate:new Date(''),
    //     endDate:new Date(''),
    //     imageUrl: '',
    //     duration: '',
    //     desc:''
    //     ,price:null,
       
    // };
    const movie = {
        name: 'Spider-Man: No Way Home',
        startDate:new Date('2024-09-18'),
        endDate:new Date('2024-12-30'),
        imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
        duration: '2 ชม. 28 นาที',
        desc: 'Eddie  กาลครั้งหนึ่ง..เมื่อถึงยุคมืดที่ดนตรีไทยถูกสั่งห้ามเล่นโดยไม่ได้รับอนุญาติ เพราะท่านผู้นำต้องการที่จะสร้างบ้านเมืองให้เป็นอารยฯ ใครผ่าฝืนจะถูกจัดการอย่างเด็ดขาด ผู้พันเผ่า(เก้า จิรายุ)ได้รับมอบหมายให้นำกำลังออกกวาดล้างปิดทุกสำนักดนตรีไทยที่ไม่ได้รับอนุญาติ รวมถึงสำนักของเซียนขาวผู้ที่เคยสร้างปมแค้นในใจเมื่อตอนวัยเด็กให้กับผู้พันเผ่า การกวาดล้างครั้งนี้จึงถือเป็นการล้างปมแค้นไปในตัว แต่ผู้พันเผ่าดันพลั้งมือในตอนกวาดล้างสำนักดนตรีไทยของเซีนขาว ทำให้เซียนขาวบาดเจ็บปางตาย ด้วยเหตุนี้ จึงทำให้ เชิด(พีท พชร)ที่เปรียบเสมือนผู้สืบทอดสำนักต่อจากเซียนขาวผู้เป็นพ่อ แต่เรื่องราวมันกลับตาลปัตรเพราะเชิดเอาแต่สนใจดนตรีฝรั่งไม่ยอมทำตามสิ่งที่บรรพบุรุษสืบทอดกันมา เมื่อเกิดเหตุการณ์ที่เซียนขาวเกือบตายเพราะถูกผู้มีอำนาจกดขี่ดนตรีไทยด้วยกฎหมายที่ไม่เป็นธรรม ทำให้เชิดต้องหันกลับมาเล่นดนตรีไทยอีกครั้ง และเหล่าลูกศิษย์ของเซียนขาว กลั่น(เจแปน ภาณุพรรณ) พวง(นิกกี้ ณฉัตร) สิงห์(เติ้ล) จึงรวมตัวตั้งแก๊งที่มีชื่อว่า“ค้างคาวกินกล้วย” เพื่อล้างแค้นให้กับเซียนขาว และออกทวงคืนดนตรีไทยให้กลับมาเป็นของทุกคนอีกครั้ง โดยมีแก้วตา(โจริน 4EVE) สาวสวยผู้เป็นมือซ้อแห่งสำนักเซียนดำ ผู้หญิงที่ทำให้ผู้พันเผ่าหลงรัก แต่ดันไปช่วยเหลือเชิดและก๊วนค้างคาวกินกล้วยให้แข็งข้อต่อท่านผู้นำ ยิ่งทำให้ผู้พันเผ่าไม่พอใจเป็นอย่างมาก จนกลายเป็นสงครามระหว่างเพื่อนที่มีดนตรีไทยมรดกของชาติเป็นเดิมพัน ศึกรบและศึกรัก ศึกค้างคาวกินกล้วยจะจบลงอย่างไร เชิดแก๊งค้างคาวกินกล้วยจะทำให้ดนตรีไทยกลับมาเป็นของทุกคนอีกครั้งได้หรือไม่ ติดตามในภาพยนตร์กวนๆที่จะชวนทุกคนมา เฮฮา ดราม่า น้ำตาซึม ระเบิดภูเขา เผากระท่อม ไปด้วยกันand Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddies last danc'
        ,price:120, 
       
    };
    const [name, setName] = useState(movie.name || '');
    const [desc, setDesc] = useState(movie.desc || '');
    const [price, setPrice] = useState(movie.price || '');
    const [startDate, setStartDate] = useState(() => {
        const date = movie?.startDate ? new Date(movie.startDate) : null;
        return date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
    });

    const [endDate, setEndDate] = useState(() => {
        const date = movie?.endDate ? new Date(movie.endDate) : null;
        return date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
    });
    const [duration, setDuration] = useState(movie.duration || '');
    const [imageURL, setImageURL] = useState(movie.imageUrl || '');
    
   
   
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setImageURL(imageUrl);
        }
       
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };


    
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = { name, desc, price, startDate, endDate, duration, imageURL, showtimes };
        onSubmit(updatedMovie);
    };




    const [selectedTheater, setSelectedTheater] = useState('');

    const handleTheaterChange = (e) => {
       
        setEditTheaterIds((prev) => ({
            ...prev,
            [e.target.value]: true, 
        }));
      
        setSelectedTheater(e.target.value);
    };

    // Find showtimes already assigned to the current movie
    const [currentMovieShowtimes,setCurrentMovieShowtimes] = useState(showtimemovie.find(movie => movie.MovieId === currentMovieId) || {});
   
    const handleSetShowtimes = (theaterId, time) => {
        if ( editTheaterIds[theaterId]) {
            setCurrentMovieShowtimes(prevShowtimes => {
                const theaterKey = `tt${theaterId}`;
                const theaterShowtimes = prevShowtimes[theaterKey] || [];
                console.log(theaterShowtimes)
                // Check if the time is already selected (exists in the array)
                if (theaterShowtimes.includes(time)) {
                    console.log("remove")
                    // Remove
                    return {
                        ...prevShowtimes,
                        [theaterKey]: theaterShowtimes.filter(t => t !== time)
                    };
                } else {
                    // Select 
                    console.log("add")
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
   
    // Function to check if a showtime is used by the current movie
    const isCurrentMovieShowtime = (theaterId,time) => {
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
   
   
    let count = 1;
    let MAX;
       
    const isHaveShowtime = (theaterId) => {
       
        if(currentMovieShowtimes[`tt${theaterId}`]?.length > 0){
            MAX =  count == Object.keys(theaters).length;
            count++;
            
            return true;
        }
        return false;
        // return currentMovieShowtimes[`tt${theaterId}`]?.length > 0;
        // return showtimemovie.some(movie => {
           
        //     if (movie.MovieId === currentMovieId) {
        //         return movie[`tt${theaterId}`]?.length > 0;
        //     }
            
        // });
    }

    const isHaveTheater = (theaterId) =>{
        return !currentMovieShowtimes[`tt${theaterId}`]?.length > 0
        // return showtimemovie.some(movie => {
        //     if (movie.MovieId === currentMovieId ) {
        //         return !(movie[`tt${theaterId}`]?.length > 0) ;
        //     }
          
            
           
        // });
    }

    const [addTheater,setAddTheater] = useState(false);
    
    const addClick = () => {
       
        if(addTheater == false){
            setAddTheater(true);
        }
       
        
      
    };

    
    const saveShowtime = (TheaterId) => {
        setCurrentMovieShowtimes(prevShowtimes => ({
            ...prevShowtimes,
            ...tempShowtimes
        }));
        setSelectedTheater('');
       
        setAddTheater(false);
        
        setEditTheaterIds((prev) => ({
            ...prev,
            [TheaterId]: false, 
        }));
      
    };

    

    const [editTheaterIds, setEditTheaterIds] = useState({
        '1':false,
        '2':false,
        '3':false,
        '4':false,
        '5':false,

    });

    const toggleEdit = (theaterId) => {
        setEditTheaterIds((prev) => ({
            ...prev,
            [theaterId]: !prev[theaterId], 
        }));
        console.log(editTheaterIds)
    };
    
      

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
    
    return(
        <main className='min-h-screen font-Kanit bg-black'>
           
             <div className="xl:flex xl:flex-wrap   bg-bggray py-12 justify-center md:justify-start p-2 md:mx-40 ">
                <div className='flex flex-wrap  xl:w-full justify-center lg:justify-start'>
                    <p className='text-white mt-5 w-80 md:w-full mx-10  text-3xl font-bold'>ข้อมูลหนัง</p>
                    <div className=" mx-6 mt-6 mb-2 w-80 h-80">
                        <div onClick={handleClick} className="cursor-pointer w-full  h-full bg-black p-1 rounded-xl ">
                        
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain rounded-lg" />
                            ) : movie.imageUrl ? (
                                <img src={movie.imageUrl} alt="Movie" className="w-full h-full object-contain rounded-lg " />
                            ) : (
                                <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png" alt="Upload" className="w-full h-full object-contain rounded-lg" />
                            )}
                        
                        </div>
                        <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange}/>
                    </div>
                    <form onSubmit={handleSubmit} className="w-4/5 md:w-2/3 lg:w-1/2 mx-6 my-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white">Description</label>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4" required />
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 text-white">Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full py-2 border rounded" required />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-white">Duration</label>
                                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full py-2 border rounded" required />
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 text-white">Starting Date</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-2 py-2 border rounded" required />
                            </div>
                            <div className="w-1/2 ">
                                <label className="block text-gray-700 text-white">End Date</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-2 py-2 border rounded" required />
                            </div>
                        </div>
                        
                    </form>    
                </div>
               
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
                                                                    ${ isCurrentMovieShowtime(theaterId,time) ? 'bg-[--gold]' : isTimeUsedByOtherMovie(theaterId, time) ? 'bg-bggray cursor-not-allowed text-white border border-gray-600' : 'bg-white'} `}
                                                        onClick={!isTimeUsedByOtherMovie(theaterId, time) ? () => handleSetShowtimes(theaterId, time) : null}

                                                    >
                                                        {time}
                                                    </div>
                                                
                                            ))}
                                        
                                        </div>
                                        
                                    </div>
                                    <div className='flex justify-end mt-2 font-bold'>
                                      
                                        <button className={` hover:scale-90 p-2 w-14  rounded-lg flex justify-center mx-2 ${ editTheaterIds[theaterId] ? 'bg-green-600 text-white' : 'bg-white '} `}
                                        onClick={() => toggleEdit(theaterId)}>
                                            {editTheaterIds[theaterId] ?  'บันทึก' : 'แก้ไข' }
                                        </button>
                                        <button className='hover:scale-90 bg-red-900 text-white p-2 w-14  rounded-lg flex justify-center ' onClick ={() => handleDeleteShowtimes(theaterId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>    
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
                                                                    ${ isTempShowtimeSelected(selectedTheater,time) ? 'bg-[--gold]' : isTimeUsedByOtherMovie(selectedTheater, time) ? 'bg-bggray cursor-not-allowed text-white border border-gray-600' : 'bg-white'} `}
                                                        onClick={!isTimeUsedByOtherMovie(selectedTheater, time) ? () => handleSetNewTheater(selectedTheater, time) : null}
                                                    >
                                                        {time}
                                                    </div>
                                                
                                                ))}
                                            </div>


                                        </div>
                                      )}
                                    <div  className='flex justify-end mt-6'>
                                        <button className='bg-white  p-2 w-22  rounded-lg flex justify-center mx-4 font-bold hover:scale-90'  onClick={() => saveShowtime(selectedTheater)} >
                                            เพิ่มรอบฉาย
                                        </button>
                                        <button className='bg-red-900 text-white p-2 w-22  rounded-lg flex justify-center hover:scale-90' onClick ={() => handleDeleteShowtimes(selectedTheater)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>    
                                        </button>
                                    </div>
                                  
                                </div>
                               
                                
                            </div>
                            )}
                        {
                            !addTheater && !MAX &&
                            <div className='flex justify-center ' >
                                <div className='flex flex-wrap justify-center my-6 ' onClick={addClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff" className='w-full'><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
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

         
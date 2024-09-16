
'use client'
import React, { useState } from 'react';



export default function Edit(){
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };


    


    const movie = {
        name: 'Spider-Man: No Way Home',
        startDate: '17/DEC/2021',
        endDate: '30/DEC/2021',
        imageUrl: '',
        duration: '2 ชม. 28 นาที',
        desc: 'Eddie  กาลครั้งหนึ่ง..เมื่อถึงยุคมืดที่ดนตรีไทยถูกสั่งห้ามเล่นโดยไม่ได้รับอนุญาติ เพราะท่านผู้นำต้องการที่จะสร้างบ้านเมืองให้เป็นอารยฯ ใครผ่าฝืนจะถูกจัดการอย่างเด็ดขาด ผู้พันเผ่า(เก้า จิรายุ)ได้รับมอบหมายให้นำกำลังออกกวาดล้างปิดทุกสำนักดนตรีไทยที่ไม่ได้รับอนุญาติ รวมถึงสำนักของเซียนขาวผู้ที่เคยสร้างปมแค้นในใจเมื่อตอนวัยเด็กให้กับผู้พันเผ่า การกวาดล้างครั้งนี้จึงถือเป็นการล้างปมแค้นไปในตัว แต่ผู้พันเผ่าดันพลั้งมือในตอนกวาดล้างสำนักดนตรีไทยของเซีนขาว ทำให้เซียนขาวบาดเจ็บปางตาย ด้วยเหตุนี้ จึงทำให้ เชิด(พีท พชร)ที่เปรียบเสมือนผู้สืบทอดสำนักต่อจากเซียนขาวผู้เป็นพ่อ แต่เรื่องราวมันกลับตาลปัตรเพราะเชิดเอาแต่สนใจดนตรีฝรั่งไม่ยอมทำตามสิ่งที่บรรพบุรุษสืบทอดกันมา เมื่อเกิดเหตุการณ์ที่เซียนขาวเกือบตายเพราะถูกผู้มีอำนาจกดขี่ดนตรีไทยด้วยกฎหมายที่ไม่เป็นธรรม ทำให้เชิดต้องหันกลับมาเล่นดนตรีไทยอีกครั้ง และเหล่าลูกศิษย์ของเซียนขาว กลั่น(เจแปน ภาณุพรรณ) พวง(นิกกี้ ณฉัตร) สิงห์(เติ้ล) จึงรวมตัวตั้งแก๊งที่มีชื่อว่า“ค้างคาวกินกล้วย” เพื่อล้างแค้นให้กับเซียนขาว และออกทวงคืนดนตรีไทยให้กลับมาเป็นของทุกคนอีกครั้ง โดยมีแก้วตา(โจริน 4EVE) สาวสวยผู้เป็นมือซ้อแห่งสำนักเซียนดำ ผู้หญิงที่ทำให้ผู้พันเผ่าหลงรัก แต่ดันไปช่วยเหลือเชิดและก๊วนค้างคาวกินกล้วยให้แข็งข้อต่อท่านผู้นำ ยิ่งทำให้ผู้พันเผ่าไม่พอใจเป็นอย่างมาก จนกลายเป็นสงครามระหว่างเพื่อนที่มีดนตรีไทยมรดกของชาติเป็นเดิมพัน ศึกรบและศึกรัก ศึกค้างคาวกินกล้วยจะจบลงอย่างไร เชิดแก๊งค้างคาวกินกล้วยจะทำให้ดนตรีไทยกลับมาเป็นของทุกคนอีกครั้งได้หรือไม่ ติดตามในภาพยนตร์กวนๆที่จะชวนทุกคนมา เฮฮา ดราม่า น้ำตาซึม ระเบิดภูเขา เผากระท่อม ไปด้วยกันand Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddies last danc'
        ,price:120,
       
    };
    const [name, setName] = useState(movie.name || '');
    const [desc, setDesc] = useState(movie.desc || '');
    const [price, setPrice] = useState(movie.price || '');
    const [startingDate, setStartingDate] = useState(movie.startDate || '');
    const [endDate, setEndDate] = useState(movie.endDate || '');
    const [duration, setDuration] = useState(movie.duration || '');
    const [imageURL, setImageURL] = useState(movie.imageUrl || '');
    // const [showtimes, setShowtimes] = useState(movie.showtimes || []);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMovie = { name, desc, price, startingDate, endDate, duration, imageURL, showtimes };
        onSubmit(updatedMovie);
    };
    return(
        <main className='min-h-screen font-Kanit'>
             <div className="flex flex-wrap my-12 bg-[#141414] w-full justify-center">
                
                <div className="w-2/3 mx-6 mt-6 mb-2">
                    <div onClick={handleClick} className="cursor-pointer">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Uploaded" className="w-80 h-80 object-cover rounded-lg" />
                        ) : movie.imageUrl ? (
                            <img src={imageURL} alt="Movie" className="w-80 h-80 object-cover rounded-lg" />
                        ) : (
                            <img src="https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png" alt="Upload" className="w-80 h-80 object-cover rounded-lg" />
                        )}
                    </div>
                    <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange}/>
                </div>
               
                <div className="w-3/5 md:w-1/2 lg:w-1/3 text-sm lg:text-[16px] text-white font-Kanit  mx-6">
                    <p className="text-[--gold]"> {movie.startDate} - {movie.endDate}</p>
                    <p className="text-xl lg:text-2xl"> {movie.title} </p>
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center mt-1" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>

                        <p>{movie.duration}</p>
                    </div>
                    <div className="mt-6 line-clamp-4 md:line-clamp-8 font-sans">
                        <p className="font-Kanit mb-2">เรื่องย่อ</p>
                        <p>{movie.desc}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows="4"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Starting Date</label>
                <input
                    type="date"
                    value={startingDate}
                    onChange={(e) => setStartingDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Duration (minutes)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

          

            <div className="mb-4">
                {/* <label className="block text-gray-700">Showtimes</label>
                {showtimes.map((showtime, index) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <input
                            type="text"
                            value={showtime.ShowtimeId}
                            onChange={(e) => {
                                const newShowtimes = [...showtimes];
                                newShowtimes[index].ShowtimeId = e.target.value;
                                setShowtimes(newShowtimes);
                            }}
                            placeholder="Showtime ID"
                            className="w-1/4 px-3 py-2 border rounded"
                        />
                        <input
                            type="time"
                            value={showtime.Time}
                            onChange={(e) => {
                                const newShowtimes = [...showtimes];
                                newShowtimes[index].Time = e.target.value;
                                setShowtimes(newShowtimes);
                            }}
                            placeholder="Time"
                            className="w-3/4 px-3 py-2 border rounded"
                        />
                    </div>
                ))} */}
                {/* <button
                    type="button"
                    onClick={addShowtime}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Showtime
                </button> */}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded"
                >
                    {movie ? 'Update Movie' : 'Add Movie'}
                </button>
            </div>
        </form>
                        
            </div>
          
            
        
        </main>
    
    );
   

}

      
         
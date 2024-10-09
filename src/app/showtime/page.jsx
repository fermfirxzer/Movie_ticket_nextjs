import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
// 'use client'

// import React, { useEffect,useState } from 'react';
// import SwiperDate from '@/component/SwiperDate.jsx';
// import { loadStripe } from '@stripe/stripe-js';
// export default function Showtime() {

    

//     const movies = {
//         title: 'Spider-Man: No Way Home',
       
//         startDate:new Date('2024-09-18'),
//         endDate:new Date('2024-12-30'),
    
//         imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
//         duration: '2 ชม. 28 นาที',
//         desc: 'Eddie  กาลครั้งหนึ่ง..เมื่อถึงยุคมืดที่ดนตรีไทยถูกสั่งห้ามเล่นโดยไม่ได้รับอนุญาติ เพราะท่านผู้นำต้องการที่จะสร้างบ้านเมืองให้เป็นอารยฯ ใครผ่าฝืนจะถูกจัดการอย่างเด็ดขาด ผู้พันเผ่า(เก้า จิรายุ)ได้รับมอบหมายให้นำกำลังออกกวาดล้างปิดทุกสำนักดนตรีไทยที่ไม่ได้รับอนุญาติ รวมถึงสำนักของเซียนขาวผู้ที่เคยสร้างปมแค้นในใจเมื่อตอนวัยเด็กให้กับผู้พันเผ่า การกวาดล้างครั้งนี้จึงถือเป็นการล้างปมแค้นไปในตัว แต่ผู้พันเผ่าดันพลั้งมือในตอนกวาดล้างสำนักดนตรีไทยของเซีนขาว ทำให้เซียนขาวบาดเจ็บปางตาย ด้วยเหตุนี้ จึงทำให้ เชิด(พีท พชร)ที่เปรียบเสมือนผู้สืบทอดสำนักต่อจากเซียนขาวผู้เป็นพ่อ แต่เรื่องราวมันกลับตาลปัตรเพราะเชิดเอาแต่สนใจดนตรีฝรั่งไม่ยอมทำตามสิ่งที่บรรพบุรุษสืบทอดกันมา เมื่อเกิดเหตุการณ์ที่เซียนขาวเกือบตายเพราะถูกผู้มีอำนาจกดขี่ดนตรีไทยด้วยกฎหมายที่ไม่เป็นธรรม ทำให้เชิดต้องหันกลับมาเล่นดนตรีไทยอีกครั้ง และเหล่าลูกศิษย์ของเซียนขาว กลั่น(เจแปน ภาณุพรรณ) พวง(นิกกี้ ณฉัตร) สิงห์(เติ้ล) จึงรวมตัวตั้งแก๊งที่มีชื่อว่า“ค้างคาวกินกล้วย” เพื่อล้างแค้นให้กับเซียนขาว และออกทวงคืนดนตรีไทยให้กลับมาเป็นของทุกคนอีกครั้ง โดยมีแก้วตา(โจริน 4EVE) สาวสวยผู้เป็นมือซ้อแห่งสำนักเซียนดำ ผู้หญิงที่ทำให้ผู้พันเผ่าหลงรัก แต่ดันไปช่วยเหลือเชิดและก๊วนค้างคาวกินกล้วยให้แข็งข้อต่อท่านผู้นำ ยิ่งทำให้ผู้พันเผ่าไม่พอใจเป็นอย่างมาก จนกลายเป็นสงครามระหว่างเพื่อนที่มีดนตรีไทยมรดกของชาติเป็นเดิมพัน ศึกรบและศึกรัก ศึกค้างคาวกินกล้วยจะจบลงอย่างไร เชิดแก๊งค้างคาวกินกล้วยจะทำให้ดนตรีไทยกลับมาเป็นของทุกคนอีกครั้งได้หรือไม่ ติดตามในภาพยนตร์กวนๆที่จะชวนทุกคนมา เฮฮา ดราม่า น้ำตาซึม ระเบิดภูเขา เผากระท่อม ไปด้วยกันand Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddies last danc'
//         ,price:120
//     }
//     ;

//     const option = { day: 'numeric', month: 'short', year: 'numeric' };
//     const formattedstartDate = new Intl.DateTimeFormat('en-US', option).format(movies.startDate);
//     const formattedendDate = new Intl.DateTimeFormat('en-US', option).format(movies.endDate);
        
   


//     //DATE
//     const today = new Date();
//     const options = { month: 'short', day: 'numeric' };
//     const formattedToday = new Intl.DateTimeFormat('en-US', options).format(today);
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const dates = [];

//     for (let i = 0; i < 30; i++) {
//         const date = new Date(tomorrow);
//         date.setDate(tomorrow.getDate() + i);
//         const options = { month: 'short', day: 'numeric' };
//         const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
//         dates.push(formattedDate); // Format the date
//     }


//     //SHOWTIME by movieID
//     const showtimes = [
//         { ShowtimeId: 1, TheaterId: 1, Time: '16:30' },
//         { ShowtimeId: 2, TheaterId: 1, Time: '19:30' },
//         { ShowtimeId: 3, TheaterId: 1, Time: '22:30' },
//         { ShowtimeId: 4, TheaterId: 2, Time: '13:30' },
//         { ShowtimeId: 5, TheaterId: 2, Time: '16:30' },
//         { ShowtimeId: 6, TheaterId: 2, Time: '19:30' },
//         { ShowtimeId: 7, TheaterId: 2, Time: '22:30' },
        
       
//     ];
//     // Group showtimes by TheaterId
//     const groupedShowtimes = showtimes.reduce((acc, showtime) => {
//         if (!acc[showtime.TheaterId]) {
//             acc[showtime.TheaterId] = [];
//         }
//         acc[showtime.TheaterId].push(showtime);
//         return acc;
//     }, {});

//     // Update the selected showtime and Scroll to booking
//     const [selectedShowtime, setSelectedShowtime] = useState(null);
//     const handleShowtimeClick = (showtime) => {
//         setSelectedShowtime(showtime);
//     };

//     useEffect(() => {
//         if (selectedShowtime) {
//             const bookingSection = document.getElementById('booking');
//             if (bookingSection) {
//                 bookingSection.scrollIntoView({ behavior: 'smooth' });
//             }

//         }
//     }, [selectedShowtime]); // Run effect whenever selectedShowtime changes


//     //SEAT
//     const seats = [];

//     const letters = 'LKJIHGFEDCBA'

//     for (let i = 0; i < 12; i++) {
//         const row = [];
//         for (let j = 0; j < 16; j++) {
//             const seatLabel = `${letters[i]}${j + 1}`
//             row.push(seatLabel)
//         }
//         seats.push(row)
//     }
//     seats.forEach(row => {
//         // console.log(row.join(' | '));
//     });

//     const [selectedSeats, setSelectedSeats] = useState([]);
//     const toggleSeat = (seat) => {
//         if (selectedSeats.includes(seat)) {
//             setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Deselect seat
//         } else {
//             setSelectedSeats([...selectedSeats, seat]); // Select seat
//         }
//         console.log(selectedSeats)
//     };

//     //SEAT same show, theater, date
//     const seatdatabase = [
//         { seatId: 'A1', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' }, { seatId: 'F8', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' },
//         { seatId: 'A2', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' }, { seatId: 'F9', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' },
//         { seatId: 'A3', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' }, { seatId: 'F10', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' },
//         { seatId: 'K11', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' }, { seatId: 'K15', showtimeID: 1, theaterId: 1, date: '17 DEC 2024' },
//     ];
//     const isSeatBooked = (seat) => {
//         return seatdatabase.some(
//             (bookedSeat) => bookedSeat.seatId === seat
//         );
//     };
//     //purchase
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const stripePromise = loadStripe(
//         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//       );
//       const handleConfirmPurchase = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await fetch(`/api/seat`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(null),
//             });
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.statusText}`);
//             }
//             const data = await response.json();
//             console.log(data);  
//             if (data.url) {
//              window.location.href = data.url; // Redirect to the session URL
//               } else {
//                 console.error('No checkout URL re    turned');
//               }
            
//         } catch (error) {
//             console.error('There was a problem with the purchase:', error);
//         }
    
//         console.log("This is confirmPurchase");
//     };
    
//     return (
//         <main className="mt-16 min-h-screen duration-200 ">
//             {/* movie detail  */}
//             <div className="flex  my-12 bg-bggray w-full  ">
//                 <div className="flex justify-center items-center mx-2  md:mx-12">
//                     <img src={movies.imageUrl} className='w-80 rounded-2xl mx-2 my-6' alt={movies.title}></img>
//                 </div>
//                 <div className="w-3/5 md:w-1/2 lg:w-1/3 text-sm lg:text-[16px] text-white font-Kanit mt-12 mr-2">
//                     <p className="text-[--gold]"> {formattedstartDate} - {formattedendDate}</p>
//                     <p className="text-xl lg:text-2xl"> {movies.title} </p>
//                     <div className="flex">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center mt-1" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>

//                         <p>{movies.duration}</p>
//                     </div>
//                     <div className="mt-6 line-clamp-4 md:line-clamp-8 font-sans">
//                         <p className="font-Kanit mb-2">เรื่องย่อ</p>
//                         <p>{movies.desc}</p>
//                     </div>
//                 </div>
//             </div>


//             <div className='mx-6 my-2 lg:mx-16'>
//                 <h1 className='text-white font-Kanit text-2xl'>รอบภาพยนตร์</h1>
//             </div>
//             {/* slide date */}  
//             <SwiperDate></SwiperDate>


//             {/* showtime */}
//             <div className='mx-5 my-8 font-Kanit md:mx-16'>

//                 {Object.keys(groupedShowtimes).map((theaterId) => (
//                     <div key={theaterId}>
//                         <h3 className='text-white md:text-xl'>Theater {theaterId}</h3>
//                         <div className="flex flex-wrap  my-2">
//                             {groupedShowtimes[theaterId].map((showtime) => (
//                                 <div key={showtime.ShowtimeId}  onClick={() => handleShowtimeClick(showtime)} className="mx-2 my-2 flex justify-center bg-white hover:bg-[--gold] duration-200 p-2 w-16 md:w-24 rounded font-bold text-sm md:text-lg cursor-pointer">
//                                     {showtime.Time}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>


//             {/* booking and  summary */}
//             {selectedShowtime && (
//                 <div className="mx-5 my-20 font-Kanit md:mx-16">
//                     <hr className="border-t-2 border-gray-300 my-4" />
//                     <div className="flex flex-col xl:flex-row items-center font-Kanit  w-full " id="booking">

//                         <div className=' flex flex-col items-center w-5/6 xl:w-2/3 mt-20'>


//                             <div className='w-full xl:w-2/3  h-10 bg-black border-2 border-[--gold] text-white text-2xl items-center justify-center flex mb-12'>
//                                 SCREEN
//                             </div>
//                             {seats.map((rowSeats, rowIndex) => (
//                                 <div key={rowIndex} className="flex mb-4 justify-center text-white  w-full ">
//                                     <span className='mx-1 md:mx-2'>{letters[rowIndex]}</span>
//                                     {rowSeats.map((seat) => (
//                                         <div key={seat} id={seat} onClick={!isSeatBooked(seat) ? () => toggleSeat(seat) : undefined}
//                                             className={`cursor-pointer text-center rounded mr-1 md:m-1 w-8 h-6 md:h-10 md:w-10  text-white rounded-t-2xl
//                                             ${isSeatBooked(seat) ? 'bg-gray-900 cursor-not-allowed' : selectedSeats.includes(seat) ? 'bg-[--gold]' : 'bg-red-900 '}`}
//                                         ></div>
//                                     ))}
//                                     <span className='mx-1'>{letters[rowIndex]}</span>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='w-3/4 xl:w-1/4 border  text-white p-2 md:p-6 my-12 text-sm md:text-lg '>
//                             <h1 className='font-bold mx-2  text-lg '>SUMMARY</h1>
//                             <div className='flex'>
//                                 <img src={movies.imageUrl} className='w-16 m-2 md:w-40'></img>
//                                 <div className='flex flex-col mt-2 mx-2'>
//                                     <p className='font-bold'>{movies.title}</p>
//                                     <div className='flex items-center'>
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center " height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
//                                         <p>{movies.duration}</p>
//                                     </div>
//                                     <div className='mt-2'>
//                                         <p >Theater {selectedShowtime.TheaterId}</p>
//                                         <div className="flex justify-center items-center bg-[--gold]  p-2 w-12 h-7 md:w-24 md:h-10 rounded font-bold  md:text-lg text-black " >
//                                             {selectedShowtime.Time}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                             {selectedSeats.length === 0 ? (null) : (
//                                 <div className='flex flex-wrap mx-2 text-sm md:text-lg duration-500'>
//                                     <div className='w-1/2 flex flex-wrap '>
//                                         <div className='w-full'>ที่นั่ง : </div>
//                                         {selectedSeats.map((selectedseat) => (
//                                             <div className='mr-1'>{selectedseat},</div>

//                                 ))}
//                             </div>
//                             <div  className='w-1/2 text-end'>
//                                 <p className=''>ราคา</p>
//                                 <span>{selectedSeats.length * movies.price}</span>
//                             </div>
//                             <div onClick={() => setIsModalOpen(true)} className='w-full mx-6 bg-[--gold] h-8 text-black items-center justify-center flex font-bold mt-4 rounded-sm' > ซื้อตั๋ว</div>
//                         </div>
//                         )}  
//                     </div>
//                 </div>
//             </div>
//             )}





//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center font-Kanit">
//                     <div className="bg-black text-white p-6 rounded-xl shadow-lg max-w-md md:max-w-3xl w-full">
//                         <h2 className="text-xl font-bold mb-4 lg:text-2xl">ยืนยันการซื้อ</h2>
                       
//                         <div className='w-full  border  text-white p-2 text-sm md:text-lg '>
//                             <h1 className='font-bold mx-2'></h1>
//                             <div className='flex '>
//                                 <img src={movies.imageUrl} className='w-16 m-2 md:w-40'></img>
//                                 <div className='flex flex-col mt-2 mx-2'>
//                                     <p className='font-bold text-lg'>{movies.title}</p>
//                                     <div className='flex items-center'>
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center " height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
//                                         <p>{movies.duration}</p>
//                                     </div>
//                                     <div className='mt-2'>
//                                         <p>Theater {selectedShowtime.TheaterId}</p>
//                                         <div className="flex justify-center items-center bg-white  p-2 w-12 h-8 md:w-24 md:h-10 rounded font-bold  md:text-lg text-black " >
//                                             {selectedShowtime.Time}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex flex-wrap mx-2  duration-500'>
//                                 <div className='w-1/2 flex flex-wrap '>
//                                     <div className='w-full'>ที่นั่ง : </div>
//                                     {selectedSeats.map((selectedseat) => (
//                                         <div key={selectedSeats} className='mr-1'>{selectedseat},</div>
//                                     ))}
//                                 </div>
//                                 <div className='w-1/2 text-end'>
//                                     <p className=''>ราคา</p>
//                                     <span>{selectedSeats.length * movies.price}</span>
//                                 </div>
//                             </div>

//                         </div>
//                         <div className="flex justify-end my-5">
//                             <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-4" onClick={() => setIsModalOpen(false)}>
//                                 ยกเลิก
//                             </button>
//                             <button type="submit" className="bg-[--gold] text-black py-2 px-4 rounded" onClick={handleConfirmPurchase}>
//                                 ซื้อตั๋ว
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </main>
//     );
// }

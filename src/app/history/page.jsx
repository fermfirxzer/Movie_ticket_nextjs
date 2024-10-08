"use client"
import React, { useState, useEffect } from 'react';
import Loading from '@/component/Loading';
const HistoryPage = () => {
  const movies = {
    title: 'Spider-Man: No Way Home',
    startDate: '17 DEC 2021',
    endDate: '30 DEC 2021',
    imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
    desc: 'Eddie and Venom are on the run...',
    price: 120
  };

  const selectedSeats = [
    "L8",
    "L1",
    "L2",
    "L3",
    "L4",
    "L5",
    "H12",
    "H11",
    "H10",
    "H15",
    "J15",
    "J16"
  ];
  const purchaseHistory = [{
    title: 'Spider-Man: No Way Home',
    startDate: '17 DEC 2021',
    endDate: '30 DEC 2021',
    imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
    desc: 'Eddie and Venom are on the run...',
    price: 120
  }, {
    title: 'Spider-Man: No Way Home',
    startDate: '17 DEC 2021',
    endDate: '30 DEC 2021',
    imageUrl: 'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
    desc: 'Eddie and Venom are on the run...',
    price: 120
  }
  ]
  const [purchase, setpurchase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("66f7e6c337fee75a371303a0");
  useEffect(() => {
    const fetchhistory = async () => {
      try {
        const response = await fetch(`/api/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setpurchase(data.history);
        console.log(data.history);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }finally {
        setIsLoading(false); // Stop loading
      }
    }
    fetchhistory();
  }, [userId])
  if (isLoading) {
    return <Loading />; // Show loading while fetching data
  }
  return (

    <div className=''>
      <div className="font-Kanit p-6 min-h-screen">
        <div className="flex flex-col justify-center font-Kanit">
          <h3 className="text-center text-2xl mb-3">ประวัติการซื้อ</h3>

          {purchase && purchase.map((purchase, index) => (
            <div key={index} className='mx-auto'>
              <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full mb-5">
                <div className='w-full border text-white p-2 text-sm md:text-lg'>
                  <h1 className='font-bold mx-2'>{purchase.title}</h1>
                  <div className='flex'>
                    <img src={`/uploads/${purchase.imageUrl}`} className='m-2 w-40' alt={purchase.movie} />
                    <div className='flex flex-col mt-2 mx-2'>
                      <p className='font-bold text-lg'>{purchase.movie}</p>
                      <div className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF">
                          <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                        </svg>
                        <p>{Math.floor(purchase.duration / 60)}h {purchase.duration % 60}m</p>
                      </div>
                      <div className='mt-2'>
                        <p>Theater</p>
                        <div className="flex justify-center items-center bg-white p-2 w-24 h-10 rounded font-bold md:text-lg text-black">
                          {purchase.theater_name || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap mx-2 duration-500'>
                    <div className='w-1/2 flex flex-wrap'>
                      <div className='w-full'>ที่นั่ง :</div>
                      {purchase.seats.map((selectedSeat, seatIndex) => (
                        <div key={seatIndex} className='mr-1'>{selectedSeat},</div>
                      ))}
                    </div>
                    <div className='w-1/2 text-end'>
                      <p>ราคา</p>
                      <span>{purchase.total_amount} บาท</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  Purchase Time: {new Date(purchase.purchase_time).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                     // e.g., October
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true, // Optional: Show time in 12-hour format (AM/PM)
                  })}
                </p>
              </div>
              
              <hr className='w-full md:w-[48rem]'></hr>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

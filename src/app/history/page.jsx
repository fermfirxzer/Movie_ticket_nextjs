"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Loading from '@/component/Loading';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
const HistoryPage = () => {

  const [purchase, setpurchase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (session && session.user) {
  //     setUsername(session.user.username);
  //   }
  // }, [session]);
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';
  const [showMessage, setShowMessage] = useState(success || canceled);
  useEffect(() => {
    if (status != "loading" && session && session.user) {
      setUsername(session.user.username);
    }
  }, [status, session]);
  useEffect(() => {
    const fetchhistory = async () => {
      try {
        const response = await fetch(`/api/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setpurchase(data.historyData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
    if (username) {
      fetchhistory();
    } else {
      setIsLoading(false);
    }
  }, [username, status, session])
  if (isLoading) {
    return <Loading />;
  }
  const handleClose = () => {
    setShowMessage(false);
  };
  console.log(purchase)
  return (

    <div className=''>
      <div className="font-Kanit p-6 min-h-screen">
        <div className="flex flex-col justify-center font-Kanit">
          <h3 className="text-center text-2xl mb-5">ประวัติการซื้อ</h3>
          {showMessage && (
            <div className={`${success ? 'bg-green-700' : 'bg-red-700'} text-white p-4 w-[45%] flex justify-between rounded-md mx-auto items-center mb-12`}>
              <span>{success ? "You buy ticket success!" : "Please Try again you payment is failed!"}</span>
              <button onClick={handleClose} className="ml-4 bg-red-600 px-2 py-1 rounded">
                Close
              </button>
            </div>
          )}

          {purchase && purchase.map((purchase, index) => (
            <div key={index} className='mx-auto'>
              <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full mb-5">
                <div className='w-full border text-white p-2 text-sm md:text-lg md:flex-nowrap'>
                  <h1 className='font-bold mx-2'>{purchase.title}</h1>
                  <div className='flex flex-wrap justify-between'>

                    <div className='w-1/2 flex gap-8'>

                      <img src={`/uploads/${purchase.imageUrl}`} className='m-2 w-40' alt={purchase.movie} />
                    
                    <div className='flex flex-col items-end text-end w-1/2 md:w-1/3 md:items-start md:text-start'>
                      <p className='font-bold text-lg'>{purchase.movie}</p>
                      <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 flex items-center" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF">
                          <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                        </svg>
                        <p>{Math.floor(purchase.duration / 60)}h {purchase.duration % 60}m</p>
                      </div>
                      <div>
                        <p>Theater</p>
                        <div className="flex justify-center items-center bg-white  w-24 h-10 rounded font-bold md:text-lg text-black">
                          {purchase.theater_name || 'N/A'}
                        </div>
                        {purchase.sub&&<p className='mt-2'>Sub : {purchase.sub}</p>}
                      </div>
                      </div>
                    </div>
                    <div className='w-full ml-2 mt-4 md:mx-0 md:mt-0 md:w-1/3 md:justify-start md:items-end flex flex-col'>
                    <div>
                      {purchase.qrcode && <div className={`${purchase.qrcode_isscan ? 'opacity-10' : ''}`}>
                        <img src={purchase.qrcode} className="w-[110px] md:w-[150px]" alt="QR Code" />

                      </div>}
                      {purchase.qrcode_isscan && <p className='text-sm text-red-600'>* Ticket Already User!</p>}
                      </div>
                    </div>

                  </div>
                  <div className='flex flex-wrap mx-2'>
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
                  <div className='text-sm mx-2 mt-2'>
                    วันที่ : {purchase.show_date} เวลา :{purchase.show_time}
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  Purchase Time: {new Date(purchase.purchase_time).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',

                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
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

export default function HistoryPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <HistoryPage />
    </Suspense>
  );
}

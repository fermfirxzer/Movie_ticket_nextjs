'use client'

import Loading from "@/component/Loading";
import SwiperComponent from "@/component/SwiperComponent";
import React, { useState, useEffect } from 'react';

export default function Mainpage(){
    const [upcomingmovies,setUpcomingmovies] = useState([]);
    const [ongoingmovies,setOngoingmovies] = useState([]);
    const [loading,setLoading]=useState(true);
    const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    // check privacy acceptance on client side
    useEffect(() => {
        const accepted = localStorage.getItem('privacyAccepted');
        if (!accepted) {
            setShowPrivacyPopup(true);
        }
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`/api/mainpage?date=${today}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                setUpcomingmovies(data.upcomingmovies); 
                setOngoingmovies(data.ongoingmovies);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [today]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
          {showPrivacyPopup && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">นโยบายความเป็นส่วนตัว</h3>
                <p className="text-sm">กรุณาอ่านและยอมรับ <a href="/privacy" className="text-blue-400 underline hover:text-blue-300">นโยบายความเป็นส่วนตัว</a> ก่อนใช้งาน</p>
              </div>
              <button
                className="ml-4 px-6 py-2 bg-blue-600 white rounded hover:bg-blue-700 flex-shrink-0"
                onClick={() => {
                  localStorage.setItem('privacyAccepted', '1');
                  setShowPrivacyPopup(false);
                }}
              >
                ยอมรับ
              </button>
            </div>
          )}
          <main className="bg-black text-white font-Kanit min-h-screen">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
                {/* section: ongoing movies */}
                <section className="mb-12">
                    <header className="flex items-center justify-start mb-4 -ml-3.5">
                        <h1 className="text-3xl font-bold">กำลังฉาย</h1>
                    </header>
                    {ongoingmovies && ongoingmovies.length > 0 ? (
                        <div className="mt-6">
                            <SwiperComponent movies={ongoingmovies} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">ไม่มีข้อมูลหนังที่กำลังฉาย</p>
                    )}
                </section>

                {/* section: upcoming movies */}
                <section>
                    <header className="flex items-center justify-start mb-4 -ml-3.5">
                        <h1 className="text-3xl font-bold">โปรแกรมหน้า</h1>
                    </header>
                    {upcomingmovies && upcomingmovies.length > 0 ? (
                        <div className="mt-6">
                            <SwiperComponent movies={upcomingmovies} />
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">ไม่มีข้อมูลหนังโปรแกรมหน้า</p>
                    )}
                </section>
            </div>
        </main>
      </>
    );
}
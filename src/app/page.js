'use client'

import Loading from "@/component/Loading";
import SwiperComponent from "@/component/SwiperComponent";
import React, { useState, useEffect } from 'react';

export default function Mainpage(){
    const [upcomingmovies,setUpcomingmovies] = useState([]);
    const [ongoingmovies,setOngoingmovies] = useState([]);
    const [loading,setLoading]=useState(true);
    const today = new Date().toISOString().split('T')[0];

    

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

    if(loading){
        return <Loading/>
    }


    return(
        <main className="bg-black  text-white font-Kanit ml-2 h-[100vh]">
            <div className="md:mx-12 ">
                <div className="md:px-12 px-3 text-bold">
                    <h1 className="text-3xl mx-5 my-6 lg:mx-9">กำลังฉาย</h1>
                    {ongoingmovies&&ongoingmovies.length>0&&<SwiperComponent movies={ongoingmovies}></SwiperComponent>}
                </div>
                <div className="md:px-12 px-4 text-bold mt-8 md:mt-0">
                    <h1 className="text-3xl mx-5 my-6 lg:mx-9">โปรแกรมหน้า</h1>
                    {upcomingmovies&&upcomingmovies.length>0&&<SwiperComponent movies={upcomingmovies}></SwiperComponent>}
                </div>
            </div>
        </main>
        
    );



}


'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState, useEffect } from 'react';

export default function SwiperDate({ onDateSelect , selectedDate }){

    const [selectedIndex, setSelectedIndex] = useState(-1);

   


    const handleDateSelect = (date,index) => {
        setSelectedIndex(index);
        onDateSelect(date); // Call the callback with the selected date
    };

    //DATE
    const isToday = selectedIndex === -1;
    const today = new Date();
    const options = { month: 'short', day: 'numeric' };
    const formattedToday = new Intl.DateTimeFormat('en-US', options).format(today);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dates = [];

    for (let i = 0; i < 30; i++) {
        const date = new Date(tomorrow);
        date.setDate(tomorrow.getDate() + i);
        dates.push(date); 
    }

    let matchIndex ;
    useEffect(() => {
        if (selectedDate) {
            matchIndex = dates.findIndex(date => date.toISOString().split('T')[0] === selectedDate);
            setSelectedIndex(matchIndex);
        } else {
            setSelectedIndex(-1); 
        }
    }, [selectedDate]);

   
    
    const newMonth = (date) => {
       let d = date.split(" ");
    
       if(d[1] === '1' ){
            
            return(
                <div className='text-gold absolute mb-16  text-center w-12 md:w-16 font-bold'>
                    {d[0]}
                </div>
            )
       }
    }
   

    return(
   
        <main>
             <div className='flex lg:w-4/5 font-Kanit '>
                
                <div className="flex  mx-6 my-6 md:mx-16 justify-start w-12 md:w-16" onClick={() => handleDateSelect(today ,-1)}>
                    <div className={`flex items-center justify-center text-sm w-12 md:w-16 h-12 font-bold border  rounded-lg  cursor-pointer border-gold  ${isToday ? 'bg-gold ' : 'bg-black text-gold'}`}>{formattedToday}</div>
                </div>

                <Swiper 
                    className="mx-0 my-0 w-4/5 md:w-full " 
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={5} // Default view for small screens
                    navigation
                    scrollbar={{ draggable: true }}
                    
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        
                    }}
                    breakpoints={{
                        640: { slidesPerView: 7 },
                      
                        1024: {slidesPerView: 8},
                        1280: {slidesPerView: 11},
                        1400: {slidesPerView: 13},
                    }}
                >

                    {dates.map((date, index) => {
                        const options = { month: 'short', day: 'numeric' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
                        const isSelected = selectedIndex === index || (matchIndex === index); 
                        return (
                            <SwiperSlide key={index}  onClick={() => handleDateSelect(date,index)}>
                                {newMonth(formattedDate )}
                                <div 
                                
                                className={`relative flex items-center justify-center border w-12 h-12 my-6 md:w-16 m-0 rounded-lg cursor-pointer duration-300 font-bold
                                    ${isSelected ? 'bg-gold text-black border-black'  : 'border-gold text-gold hover:bg-gold hover:text-black'}`}
                                >
                                    <p className="text-center text-sm ">{formattedDate }</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </main>


    )

}
'use client'

// components/SwiperComponent.js
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules from Swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const SwiperComponent = ({movies}) => {
  
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]} // Pass modules array
      spaceBetween={0} // Space between slides
      slidesPerView={2} // Number of slides to show per view
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination bullets
      scrollbar={{ draggable: true }} // Enable scrollbar
      loop = {false}
      style = {{
        '--swiper-navigation-color' : '#fff',
        '--swiper-pagination-color' : '#fff',
       
      }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: {slidesPerView: 3 },
        1024: {slidesPerView: 4},
        1280: {slidesPerView: 5},
        1500: {slidesPerView: 6},
      }}

    
    >
   
      {movies.map((movie, index) => {
       

        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center'>
              <div className="relative flex flex-col items-center w-full" id="movie-card">
                <img src={`uploads/${movie.imageUrl}`} className='w-4/5 rounded-xl' alt={movie.movie_name} />
                <Link href={`showtime/${movie.movie_name}`} id="hover-container">
                  <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                    <input type="button" value="ดูเพิ่มเติม" className='bg-gray-100 text-black w-4/6 rounded cursor-pointer' />
                  </div>
                </Link>
              </div>
              <div className='flex justify-between w-4/5 mt-2'>
                <div className='w-1/2'>
                  <p className='text-[--gold] text-xs md:text-sm'>{movie.startDate}</p> {/* Display the formatted date here */}
                  <p className='text-sm md:text-lg lg:text-xl'>{movie.movie_name}</p>
                </div>
                <div className='flex justify-end w-1/2'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF">
                    <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
                  </svg>
                  <p className='text-xs md:text-sm'>{movie.duration}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}

    </Swiper>
   
  );
};

export default SwiperComponent;

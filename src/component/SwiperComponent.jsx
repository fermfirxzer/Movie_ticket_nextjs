'use client'

// components/SwiperComponent.js
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import './css/swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef } from 'react';
// Import required modules from Swiper
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const SwiperComponent = ({ movies }) => {
  const swiperRef = useRef(null);

  return (
    <div className="relative">
      <div onClick={() => swiperRef.current?.slidePrev()} className="swiper-button-prev !top-[165px] !left-[-20px] !text-[#595959] hover:!text-white" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-5f2d314efc736a51" aria-disabled="false">

      </div>
      <div onClick={() => swiperRef.current?.slideNext()} className="swiper-button-next !top-[165px] !right-[-20px] !text-[#595959] hover:!text-white !text-white" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-5f2d314efc736a51" aria-disabled="false">

      </div>
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={2}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Save Swiper instance for navigation control
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1500: { slidesPerView: 6 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center w-full" id="movie-card">
                <div className="relative w-4/5 h-72">
                  <Image src={`/uploads/${movie.imageUrl}`} className="rounded-xl" fill={true} alt={movie.movie_name} />
                </div>
                <Link href={`showtime/${movie.movie_name}`} id="hover-container">
                  <div className="opacity-0 hover:opacity-100 absolute inset-0 bg-black bg-opacity-70 text-white transition-opacity duration-300 flex flex-col justify-center items-center">
                    <input type="button" value="ดูเพิ่มเติม" className="bg-gray-100 text-black w-4/6 rounded cursor-pointer" />
                  </div>
                </Link>
              </div>
              <div className="flex justify-between w-4/5 mt-2">
                <div className="w-1/2">
                  <p className="text-[--gold] text-xs md:text-sm">{movie.startDate}</p>
                  <div className='flex justify-between'>
                    <p className="text-sm md:text-lg lg:text-xl">{movie.movie_name.length > 15 ? movie.movie_name.slice(0, 15) + "..." : movie.movie_name}</p>

                  </div>
                </div>
                <div className="flex flex-col flex-warp items-end w-1/2">
                  <div className='flex '>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" height="16px" viewBox="0 -960 960 960" width="16px" fill="#FFFFFF">
                      <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                    </svg>

                    <p className="text-xs md:text-sm text-gray-300">{Math.floor(movie.duration / 60)} ชม. {movie.duration % 60} นาที</p>
                  </div>
                    {movie.Age && <p className={`${movie.Age!=="ทั่วไป"&&movie.Age!=="13+"?'text-red-500':"text-white"}`}>{movie.Age}</p>}

                </div>
              </div>

              <div className='w-4/5 text-black text-sm flex flex-wrap gap-4 mt-2'>
                {movie.Tag && movie.Tag.map((item, index) => (
                  <div className='rounded-xl text-center p-1.5 bg-white' key={index}>{item}</div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;

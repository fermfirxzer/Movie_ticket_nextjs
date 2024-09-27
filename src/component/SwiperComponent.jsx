'use client'

// components/SwiperComponent.js
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules from Swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const movies = [
  {
    title: 'Venom',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg',
    duration: '1 ชม. 45 นาที',
  },
  {
    title: 'Spider-Man: No Way Home',
    startDate:new Date('2024-12-30'),
    endDate:new Date('2024-12-31'),
    imageUrl:
      'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
  },
  {
    title: 'Avatar: The Way of Water',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th?id=ODL.6466795199e92dcba0a833632dc054a4&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '3 ชม. 12 นาที',
   
  },
  {
    title: 'The Batman',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th/id/OIP.Pcnh-i3HfSl-uFa5CQp5qAHaK-?rs=1&pid=ImgDetMain',
    duration: '2 ชม. 56 นาที',
   
  },
  {
    title: 'Dune',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 35 นาที',
  
  },
  {
    title: 'The Matrix Resurrections',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
  },
  {
    title: 'Dune',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 35 นาที',
  },
  {
    title: 'The Matrix Resurrections',
    startDate:new Date('2024-09-18'),
    endDate:new Date('2024-12-30'),
    imageUrl:
      'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
    duration: '2 ชม. 28 นาที',
  },
];



const SwiperComponent = () => {
  
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]} // Pass modules array
      spaceBetween={0} // Space between slides
      slidesPerView={2} // Number of slides to show per view
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination bullets
      scrollbar={{ draggable: true }} // Enable scrollbar
      loop = {true}
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
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(movie.startDate));

        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center'>
              <div className="relative flex flex-col items-center w-full">
                <img src={movie.imageUrl} className='w-4/5 rounded-xl' alt={movie.title} />
                <Link href='showtime'>
                  <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                    <input type="button" value="ดูเพิ่มเติม" className='bg-gray-100 text-black w-4/6 rounded cursor-pointer' />
                  </div>
                </Link>
              </div>
              <div className='flex justify-between w-4/5 mt-2'>
                <div className='w-1/2'>
                  <p className='text-[--gold] text-xs md:text-sm'>{formattedDate}</p> {/* Display the formatted date here */}
                  <p className='text-sm md:text-lg lg:text-xl'>{movie.title}</p>
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

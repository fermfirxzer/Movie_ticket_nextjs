'use client'
import SwiperDate from "@/component/SwiperDate"
import Link from 'next/link';
export default function Admin(){
    const movies = [
        {
          title: 'Venom',
          MovieId:1,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg',
          duration: '1 ชม. 45 นาที',
        },
        {
          title: 'Spider-Man: No Way Home',
          MovieId:2,
          startDate:new Date('2024-12-30'),
          endDate:new Date('2024-12-31'),
          imageUrl:
            'https://th.bing.com/th?id=OIP.6_208hkN2fO_hurqMskt_AHaK-&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '2 ชม. 28 นาที',
        },
        {
          title: 'Avatar: The Way of Water',
          MovieId:3,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th?id=ODL.6466795199e92dcba0a833632dc054a4&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '3 ชม. 12 นาที',
         
        },
        {
          title: 'The Batman',
          MovieId:4,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th/id/OIP.Pcnh-i3HfSl-uFa5CQp5qAHaK-?rs=1&pid=ImgDetMain',
          duration: '2 ชม. 56 นาที',
         
        },
        {
          title: 'Dune',
          MovieId:5,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '2 ชม. 35 นาที',
        
        },
        {
          title: 'The Matrix Resurrections',
          MovieId:6,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '2 ชม. 28 นาที',
        },
        {
          title: 'Dune',
          MovieId:7,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '2 ชม. 35 นาที',
        },
        {
          title: 'The Matrix Resurrections',
          MovieId:8,
          startDate:new Date('2024-09-18'),
          endDate:new Date('2024-12-30'),
          imageUrl:
            'https://th.bing.com/th?id=ODL.debbf746710055e9ed3ad6880cc289b1&w=135&h=201&c=10&rs=1&qlt=90&o=6&dpr=1.3&pid=13.1',
          duration: '2 ชม. 28 นาที',
        },
      ];
    
    
    
    const showtimemovie = [
        { ShowtimeId: 1, MovieId:1 
            ,  tt1:['12:30','18:30','22:00','12:30','18:30','22:00']
            ,  tt2:['22:00','1:00']
            ,  tt3:['22:00','1:00']
            ,  tt4:['22:00','1:00']
            ,  tt5:['12:00','21:00'] 
                                   
        },
        { ShowtimeId: 3, MovieId:3
            ,  tt1:['21:30']
            ,  tt2:['18:00']
            ,  tt3:['16:00']
            ,  tt4:['9:30','12:30',]
            ,  tt5:['1:00','4:00'] 
            ,  tt6:['9:30','12:30',]
            ,  tt7:['1:00','4:00']
            ,  tt8:['1:00','4:00'] 
            ,  tt9:['9:30','12:30',]
            ,  tt10:['1:00','4:00']
            ,  tt11:['1:00','4:00'] 
            ,  tt12:['9:30','12:30',]
          
        }
        ,{ ShowtimeId: 2, MovieId:2
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
        ,{ ShowtimeId: 4, MovieId:4
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
        ,{ ShowtimeId: 5, MovieId:5
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
        ,{ ShowtimeId: 6, MovieId:6
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        } ,{ ShowtimeId: 7, MovieId:7
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
        ,{ ShowtimeId: 8, MovieId:8
            ,  tt1:[]
            ,  tt2:[]
            ,  tt3:[]
            ,  tt4:[]
            ,  tt5:['15:00'] 
            
        }
    ];
  
  
    return(
        <main className="my-12 mx-2  md:mx-20 ">
         
            <h1 className='mx-6 my-2  text-white font-Kanit text-3xl'>รอบฉายหนัง</h1>
            <SwiperDate></SwiperDate>
            <div className="m-6">
                <div>
                    {movies.map((movie) => {
                        const showtimes = showtimemovie.find(showtime => showtime.MovieId === movie.MovieId);
                        const options = { day: 'numeric', month: 'short', year: 'numeric' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(movie.startDate));
                        return(
                            <div className="mb-20 md:flex ">
                                <div className=" md:w-2/5 xl:w-1/5 mr-2   text-xl md:text-2xl ">
                                 
                                        <img src={movie.imageUrl} className='w-48 md:w-60 rounded-xl ' alt={movie.title} />
                                        <div className="flex justify-between md:block my-2" >
                                            <div className="w-full">
                                              <div className="text-gold text-lg font-Kanit  w-full md:w-60 ">{formattedDate}</div>
                                              <div className="text-white font-Kanit  w-full md:w-60 ">{movie.title}</div>
                                            </div>
                                           
                                            <div className="font-bold w-full text-end md:text-start w-full">
                                                <Link href='edit '>
                                                    <button className="bg-gold w-14 p-1 rounded-md text-lg hover:scale-90">
                                                        Edit
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                   
                                       
                                   
                                   
                                </div>
                                
                                <div className="w-full font-bold font-Kanit text-md md:text-lg mb-5 xl:flex  xl:flex-wrap h-full">
                                {Object.keys(showtimes)
                                    .filter(key => key.startsWith('tt') && showtimes[key].length > 0)
                                    .map((key) => (
                                        <div key={key} className="text-white bg-bggray mb-2 p-4 rounded-md md:w-4/5 lg:w-4/5 md:mx-12  xl:w-1/3  ">
                                            <div className="mx-1 md:text-xl">Theater {key.split('tt')}</div>
                                            <div className="flex flex-wrap">
                                                {showtimes[key].map((time, index) => (
                                                    <div key={index} className="m-2 bg-white text-black p-2 w-20  text-center rounded-md hover:bg-gold duration-300 cursor-pointer">
                                                                              {/* bg-none text-white border border-white */}
                                                        {time}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        
                        );
                      

                    })}
                </div>
            </div>
          
        </main>


    )

}
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCheckAdmin from '@/app/utils/checkadmin';
import Image from 'next/image';
import Tag from '@/component/Movie_Tag';
import Sub from '@/component/Movie_Sub';
export default function Edit() {
    useCheckAdmin();
    const router = useRouter();
    const [errmovie, setErrmovie] = useState("");

    const insertMovie = async (e) => {
        e.preventDefault();
        setErrmovie(null);
        if (!currentMovieInfo.imageFile) {
            setErrmovie("Image required");
            return;
        }
        if (currentMovieInfo.startDate > currentMovieInfo.endDate) {
            setErrmovie("startDate ของหนังต้องมากกว่า endDate");
        }
        const formData = new FormData();
        formData.append('image', currentMovieInfo.imageFile);
        console.log(currentMovieInfo)
        try {
            const imageResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const imageData = await imageResponse.json();
            const updatedMovieInfo = {
                ...currentMovieInfo,
                imageUrl: imageData.imageUrl,
            };
            const movieResponse = await fetch('/api/movie/insertmovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovieInfo),
            });
            const movieData = await movieResponse.json()
            setErrmovie(movieData.Message);
            if (movieResponse.ok) {
                setTimeout(() => {
                    router.push('/search');
                }, 3000);
            }
        } catch (error) {
            console.log(error.Message);
            setErrmovie('An error occurred while uploading the image');
        }
    };

    const [currentMovieInfo, setCurrentMovieInfo] = useState({
        movie_id: '',
        movie_name: '',
        startDate: '',
        endDate: '',
        imageUrl: '',
        imagePath: '',
        duration: '',
        desc: '',
        price: '',
        imageFile: null,
        Sub: [],
        Age: '',
        Tags: [],
    });
    console.log(currentMovieInfo)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentMovieInfo({
            ...currentMovieInfo,
            [name]: value,
        });
        console.log(currentMovieInfo)

    };
    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            const ChangeimageUrl = URL.createObjectURL(file);
            setCurrentMovieInfo({
                ...currentMovieInfo,
                [name]: ChangeimageUrl,
                imageFile: file,
            });
        }

    };
    
    return (
        <main className='min-h-screen font-Kanit bg-black'>

            <div className="xl:flex xl:flex-wrap bg-bggray py-12 justify-center lg:justify-start p-2 mx-12 md:mx-20 ">
                <div className='flex w-full p-10'>
                    <p className='text-white mt-5 w-80 md:w-full mx-10 text-3xl font-bold'>ข้อมูลหนัง</p>
                    {currentMovieInfo._id && (<button type="submit" className='bg-white hover:scale-90 w-16 p-2 rounded-md mx-2' onClick={deleteMovie}>ลบ</button>)}
                </div>
                <div className='flex flex-wrap  w-full justify-center lg:justify-start'>
                    <div className=" mx-6 mt-6 mb-2 w-80 h-80">
                        <div onClick={handleClick} className="cursor-pointer w-full  h-full bg-black p-1 rounded-xl ">
                            <div className='relative w-full h-full object-contain rounded-lg'>
                                <Image src={currentMovieInfo.imagePath
                                    ? currentMovieInfo.imagePath
                                    : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"} fill={true} alt="movieImage" />
                            </div>

                        </div>
                        <input id="fileInput" type="file" accept="image/*" className='hidden' name="imagePath" onChange={handleImageChange} />
                    </div>
                    <form className="w-4/5 md:w-2/3 lg:w-1/2 mx-6 my-6" onSubmit={insertMovie}>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Name</label>
                            <input type="text" name="movie_name" value={currentMovieInfo.movie_name} onChange={handleInputChange} className="movie-input" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 ">Description</label>
                            <textarea name="desc" value={currentMovieInfo.desc} onChange={handleInputChange} className="movie-input" rows="4" required />
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 ">Price</label>
                                <input type="number" name="price" value={currentMovieInfo.price} onChange={handleInputChange} className="movie-input" required />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 ">Duration</label>
                                <input type="text" name="duration" value={currentMovieInfo.duration} onChange={handleInputChange} className="movie-input" required />
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 ">Starting Date</label>
                                <input type="date" name="startDate" value={currentMovieInfo.startDate} onChange={handleInputChange} className="movie-input" required />
                            </div>
                            <div className="w-1/2 ">
                                <label className="block text-gray-700">End Date</label>
                                <input type="date" name="endDate" value={currentMovieInfo.endDate} onChange={handleInputChange} className="movie-input" required />
                            </div>
                        </div>
                        <Sub selectedSub={currentMovieInfo.Sub} setSelectedSub={(newSub) => setCurrentMovieInfo({ ...currentMovieInfo, Sub: newSub })}
                            selectedAge={currentMovieInfo.Age} setselectedAge={(newAge) => setCurrentMovieInfo({ ...currentMovieInfo, Age: newAge })} />
                        <div className=' my-6 text-end  font-bold'>
                            <button type="submit" className='bg-white text-black hover:scale-90  w-16 p-2 rounded-md mx-2'>ยืนยัน</button>
                            <button className='bg-red-900 text-white  hover:scale-90  w-16 p-2 rounded-md'>ยกเลิก</button>
                        </div>
                        {errmovie &&
                            <div className='text-red-600 text-xl text-center'>
                                {errmovie}
                            </div>
                        }
                    </form>
                    

                </div>





            </div>

        </main>

    );


}
"use client"
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loading from '@/component/Loading';
const Insertmovie = ({ moviename, setMovieStart, setMovieEnd }) => {
    const [errmovie, setErrmovie] = useState("test");
    
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [Moviename, setMoviename] = useState(moviename  || null);
    
    useEffect(() => {
        if (Moviename) {
            const fetchMovie = async () => {
                try {
                    const response = await fetch(`/api/movie/${Moviename}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch movie');
                    }
                    const data = await response.json();
                    setCurrentMovieInfo(data);
                    setMovieStart(data.startDate);  
                    setMovieEnd(data.endDate);
                    setLoading(false);

                } catch (error) {
                    console.log(error.Message)
                    setErrmovie(error.Message);
                }

            };
            fetchMovie();
        }
    }, [Moviename, setMovieStart, setMovieEnd]);

    const [currentMovieInfo, setCurrentMovieInfo] = useState({
        movie_id: '',
        movie_name: '',
        startDate: '',
        endDate: '',
        imageUrl: '',
        duration: '',
        desc: '',
        price: '',
        imageFile: null,
        imagePath: '',
    });

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
    const [imagecount, setImagecount] = useState(1);
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
        setImagecount(0);
    };
    console.log(currentMovieInfo)
    const updateMovie = async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        try {
            let updatedMovieInfo = { ...currentMovieInfo };

            // If there's an image file to upload, upload it first
            if (currentMovieInfo.imagePath && currentMovieInfo.imageFile) {
                const formData = new FormData();
                formData.append('image', currentMovieInfo.imageFile);
                if (currentMovieInfo.imageUrl) {
                    formData.append('currentImage', currentMovieInfo.imageUrl); // Send current image URL to delete
                }
                const imageResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await imageResponse.json();
                console.log(imageData.imageUrl);

                // Update the movie info with the new image URL
                updatedMovieInfo = {
                    ...updatedMovieInfo,
                    imageUrl: imageData.imageUrl,
                };
            }

            // Now proceed with updating the movie information
            const response = await fetch(`/api/movie`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovieInfo), // Use the updated movie info with the image URL
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setErrmovie('Movie updated successfully');
                setTimeout(() => {
                    router.push(`/editmovie/${data.movie_name}`);
                }, 3000);
            } else {
                setErrmovie('Failed to update movie');
            }
        } catch (error) {
            setErrmovie(error.Message);
        }
    };
    const deleteMovie = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/movie/${currentMovieInfo.movie_name}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(currentMovieInfo),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        Swal.fire(
                            'Deleted!',
                            'Your movie has been deleted.',
                            'success'
                        );
                        setTimeout(() => {
                            router.push('/search');
                        }, 3000);
                    } else {
                        setErrmovie('Failed to delete movie');
                    }
                } catch (error) {
                    setErrmovie(error.Message);
                }
            }
        });

    }
    if (loading) {
        return <Loading/>
    }
    return (
        <div>

            <div className="xl:flex xl:flex-wrap   bg-bggray py-12 justify-center md:justify-start p-2 md:mx-40 ">
                <div className='flex w-full p-10'>
                    <p className='text-white mt-5 w-80 md:w-full mx-10 text-3xl font-bold'>ข้อมูลหนัง</p>
                    {currentMovieInfo._id && (<button type="submit" className='delete-btn hover:scale-90 w-16 p-2 rounded-md mr-0 2xl:mr-36' onClick={deleteMovie}>ลบ</button>)}
                </div>
                <div className='flex flex-wrap  xl:w-full justify-center lg:justify-start'>

                    <div className=" mx-6 mt-6 mb-2 w-80 h-80 ">
                        <div onClick={handleClick} className="cursor-pointer w-full  h-full bg-black p-1 rounded-xl ">
                            <img src={currentMovieInfo.imageUrl && imagecount ? `/uploads/${currentMovieInfo.imageUrl}`
                                : currentMovieInfo.imagePath ? currentMovieInfo.imagePath : "https://1146890965.rsc.cdn77.org/web/newux/assets/images/default-newArticle@3x.png"}
                                alt="Movie Image"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                        <input id="fileInput" type="file" accept="image/*" className='hidden' name="imagePath" onChange={handleImageChange} />
                    </div>
                    <form className="w-4/5 md:w-2/3 lg:w-1/2 mx-6 my-6" onSubmit={updateMovie}>
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
                        <div className=' my-6 text-end  font-bold'>
                            <button type="submit" className='bg-white hover:scale-90  w-16 p-2 rounded-md mx-2 '>ยืนยัน</button>
                            <button className='bg-red-900 text-white  hover:scale-90  w-16 p-2 rounded-md'>ยกเลิก</button>
                        </div>
                    </form>
                    

                </div>
                
                {errmovie &&
                        <div className='error text-center mx-auto'>
                            {errmovie}
                        </div>
                    }
                
            </div>
        </div>

    )
}

export default Insertmovie
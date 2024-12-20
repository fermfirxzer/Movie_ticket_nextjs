import React, { useState, useRef, useEffect } from 'react'
import Swal from "sweetalert2";
const Tag = ({ selectedTags, setSelectedTags, moviename }) => {

    const [tags, setTags] = useState(["แอคชั่น", "ผจญภัย", "แฟนตาซี", "โรแมนติก", "คอมเมดี้", "สยองขวัญ", "อนิเมะ", "โลกอนาคต"]);
    const tagMap = {
        "แอคชั่น": ["ระทึกขวัญ", "สงคราม", "ซูเปอร์ฮีโร่"],
        "ผจญภัย": ["โลกอนาคต", "การเดินทางข้ามเวลา", "สัตว์ประหลาด"],
        "แฟนตาซี": ["โรงเรียนเวทมนตร์", "เทพเจ้า", "โลกอนาคต"],
        "โรแมนติก": ["ดราม่า", "มิตรภาพ", "ครอบครัว"],
        "คอมเมดี้": ["การ์ตูน", "ครอบครัว", "วัยรุ่น"],
        "สยองขวัญ": ["ระทึกขวัญ", "สัตว์ประหลาด", "ความลับในอดีต"],
        "อนิเมะ": ["โรงเรียน", "แฟนตาซี", "มิตรภาพ"],
        "โลกอนาคต": ["ไซไฟ", "อวกาศ", "หุ่นยนต์"],
        "โรงเรียน": ["มิตรภาพ", "การเดินทางข้ามเวลา", "วัยรุ่น"],
        "ซูเปอร์ฮีโร่": ["แอคชั่น", "สงคราม", "แฟนตาซี"],
        "3D": ["IMAX", "4DX", "Dolby Atmos"],
        "หนังฟอร์มยักษ์": ["IMAX", "3D", "ระบบตัวร้าย"],
    };
    // useEffect(() => {
    //     const fetchTag = async () => {
    //         try {
    //             const response = await fetch(`/api/movie/fetchAllTagmovie?moviename=${moviename}`);
    //             const data = await response.json();
    //             if (!response.ok) {
    //                 throw new Error(data.Message || "Failed to fetch movie tags");
    //             }
    //             setSelectedTags(data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     if (moviename) {
    //         fetchTag();
    //     }
    // }, [setSelectedTags, moviename]);
    const insertTag = async (tag, movieName) => {
        try {
            const payload = { 
                Tag:selectedTags, 
                movie_name: movieName 
            };
            const response = await fetch(`/api/movie/insertmovie/inserTag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                throw new Error(errorData.Message || 'Failed to insert tag');
            }
            const data = await response.json();
            Swal.fire({
                icon:'success',
                title:'Success',
                text:data.Message,
            })
    
        
        } catch (error) {
            console.error('Error inserting tag:', error.message);
           
            alert(error.message);
        }
    };
    

    const [InputTag, setInputTag] = useState('');
    const inputRef = useRef(null);
    const addTag = (value) => {
        const newTag = value.trim();
        if (newTag == '') {
            return;
        }
        if (selectedTags.includes(newTag)) {
            removeTag(newTag);
            return;
        }
        if (selectedTags.length >= 3) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tag ของหนังมีได้ไม่เกิน 3 Tag",

            });
            return;
        }

        if (newTag && !selectedTags.includes(newTag)) {
            setSelectedTags([...selectedTags, newTag]);
            setInputTag('');
            if (tagMap[newTag]) {
                // Collect all related tags that are not already in `tags`
                const relatedTags = tagMap[newTag].filter(
                    (relatedTag) => !tags.includes(relatedTag)
                );

                // Update the `tags` state with the new related tags
                setTags([...tags, ...relatedTags]);
            }
        }

    };

    const removeTag = (Removetag) => {
        setSelectedTags(selectedTags.filter(tag => tag !== Removetag))
    }
    const handleUlClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();

        }
    };
    
    return (
        <div className='w-full px-8 py-4'>
            <h3>Tag ที่เลือก</h3>
            <div className=''>
                <ul onClick={handleUlClick} className='h-32 flex gap-2 bg-white text-black border-2 rounded-lg mt-2 text-md p-3'>
                    {selectedTags && selectedTags.map((selectedTag, index) => (
                        <li className='h-10 bg-gold rounded-xl p-2' key={index}>{selectedTag}
                            <button onClick={() => removeTag(selectedTag)} className='top-[-10] relative ml-[10px]'>x</button>
                        </li>
                    ))}
                    <li className='border-none p-2 text-black '>
                        <input
                            type='text'
                            ref={inputRef}
                            className='outline-none'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTag(InputTag);
                                }
                            }}
                            onChange={(e) => setInputTag(e.target.value)}
                            value={InputTag}
                            placeholder='Add a tag...'
                        />
                    </li>
                </ul>
            </div>
            {tags && (
                <select className='mt-10 px-2 text-black rounded-lg text-xl' onChange={(e) => { addTag(e.target.value) }}>
                    <option value=''>เลือก Tag</option>
                    {tags
                        .filter(tag => !selectedTags.includes(tag))
                        .map((tag, index) => (
                            <option key={index} value={tag}>{tag}</option>
                        ))}
                </select>
            )}
            <div className='flex gap-2 mt-4 flex-wrap'>

                {tags && tags.map((tag, index) => (
                    <div key={index} onClick={(e) => addTag(tag)} className={`${selectedTags.includes(tag) ? 'bg-gold' : 'bg-black'} border-none text-white p-3 hover:bg-gold border-2 rounded-2xl cursor-pointer`}>
                        {tag}
                    </div>
                ))}
            </div>
            {moviename && <div className=''>
                <button className='btn mt-5' onClick={(e)=>insertTag(selectedTags,moviename)}>บันทึก Tag</button>
                </div>}
        </div >
    );
}

export default Tag
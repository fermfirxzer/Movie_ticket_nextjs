import React, { useEffect, useState } from 'react'
const Sub = ({ selectedSub, setSelectedSub, selectedAge,setselectedAge }) => {

    const [Subs, setSub] = useState([]);
    const [Ages, setAge] = useState([]);
    useEffect(() => {
        const fetchAvalibleSub = async () => {
            try {
                const response = await fetch("/api/movie/fetchAllAvalibleSub");
                if (!response.ok) {
                    throw new Error("failed to fetch Movie Sub and Age")
                }
                const data = await response.json();
                setSub(data.sub);
                setAge(data.age);
            } catch (err) {
                console.log(err.Message);
            }
        }
        fetchAvalibleSub();
    }, [])
    const handleSubChange = (e) => {
        const SubChange = e.target.value;
        if (SubChange && !selectedSub.includes(SubChange)) {
            const updatedSub = [...selectedSub, SubChange];
            
            updatedSub.sort();
    
            setSelectedSub(updatedSub);
        }
    };
    
    const handleAgeChange = (e) => {
        const AgeChange = e.target.value;
        setselectedAge(AgeChange);
    }
    const removeSub=(value)=>{

        setSelectedSub(selectedSub.filter(selectedSub=>selectedSub!=value));
    }
    return (

        <div className='flex flex-col  w-full'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col'>
                    <label className='text-red-600  font-medium text-xl'>เรทหนัง : <b className='text-2xl'>{selectedAge}</b></label>
                    <div className='flex mt-4'>
                    <select   type="select" className='w-48 h-8 text-black rounded-md' onChange={handleAgeChange}>
                        
                        <option value=''>เลือก เรทหนัง ที่ต้องการ</option>
                        {Ages && Ages.map((item, index) => (
                            <option key={index} selected={item.age==selectedAge?true:false} value={item.age}>{item.age}</option>
                        ))}
                    </select>
                    </div>
                </div>
                <select selected={selectedSub} type="select" className='w-48 h-12 text-black rounded-md' onChange={handleSubChange}>
                    <option value=''>เลือก Sub ที่ต้องการ</option>
                    {Subs && Subs.map((item, index) => (
                        <option key={index} value={item.sub} onClick={(e) => selectedSub.includes(item.sub)}>{item.sub}</option>
                    ))}
                </select>

            </div>

            <div className='mt-4'>
                <h3>ซับที่เพิ่ม :</h3>
                <div className='flex flex-wrap gap-4'>

                
                {selectedSub && selectedSub.map((item, index) => (
                    <div key={index} className='text-black p-3 border-white bg-gold w-24 rounded-md flex  relative justify-start'>
                        <div className='self-center'>{item}</div>
                        <button type="button" className='self-end absolute top-[2px] right-[10px]' onClick={()=>removeSub(item)} >x</button>
                    </div>

                ))}
                </div>
            </div>
        </div>
    )
}

export default Sub; 
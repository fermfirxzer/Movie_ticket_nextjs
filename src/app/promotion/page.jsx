
'use client'

import { useState } from 'react';
import Swal from 'sweetalert2';


export default function Promotion() {



    const point = 6;
    const subscriptionTiers = [
        { name: 'Bronze', price: '98 bath', promotion: '5% off' },
        { name: 'Silver', price: '198 bath', promotion: '10% off' },
        { name: 'Gold', price: '298 bath', promotion: '15% off' },
        { name: 'Platinum', price: '398 bath', promotion: '20% off' },
    ];
    const rewards = [
        { id: 1, name: 'Popcorn M 1 กล่อง', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },
        { id: 2, name: 'Soda M 1 แก้ว', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },
        { id: 3, name: 'Popcorn M 1 กล่อง', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },
        { id: 4, name: 'Soda M 1 แก้ว', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },
        { id: 5, name: 'Popcorn M 1 กล่อง', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },
        { id: 6, name: 'Soda M 1 แก้ว', points: 3, imageUrl: 'https://media.istockphoto.com/id/497857462/photo/popcorn-in-bucket.jpg?s=612x612&w=0&k=20&c=16mUWDBsQt4EpO-k3C-OqLiDfuigkawrxS1C6Y0cQuM=' },

    ];
    const [selectedSub, setSelectedSub] = useState(null);
    const [selectedRewards, setSelectedRewards] = useState([]);
    const [ShowNeedpoint, setShowNeedpoint] = useState(false);
    const [total, setTotal] = useState(0); 
    const handleRewardSelect = (rewardId,rewardPoint) => {
      
        console.log(total);
        setSelectedRewards((prev) => {
            const newTotal = prev.includes(rewardId) ? total - rewardPoint : total + rewardPoint;

            if (newTotal > point) {
                Swal.fire({
                    icon: 'error',
                    title: 'แต้มไม่เพียงพอ',
                    text: 'คุณไม่สามารถเลือกของรางวัลนี้ได้เพราะแต้มของคุณไม่เพียงพอ!',
                    confirmButtonText: 'ตกลง',
                });
                setShowNeedpoint(true); // Show warning
                return prev; // Do not update selection
            } else {
                setShowNeedpoint(false); // Hide warning
                setTotal(newTotal); // Update total points
                if (prev.includes(rewardId)) {
                    // Remove the reward if already selected
                    return prev.filter((id) => id !== rewardId);
                } else {
                    // Add the reward
                    return [...prev, rewardId];
                }
            }
        });
    };
    return (
        <main className="min-h-screen ">
            <div className="font-Kanit justify-center flex flex-wrap" > 
                
                <div className="flex flex-wrap w-4/5 gap-4 text-white">
                    <h1 className="w-full text-3xl  mt-12 ">ระดับสมัครสมาชิก</h1>
                    {subscriptionTiers.map((tier, index) => (
                        <div key={index} className={`duration-300 w-full md:w-[22%] p-2 shadow-lg ${selectedSub === tier.name ? 'shadow-gold' : 'shadow-gray-500/50' } hover:shadow-gold h-64 cursor-pointer`}
                        onClick={() => setSelectedSub(tier.name)}>
                            <div className="bg-red-900 flex w-full rounded-lg p-4 text-white justify-center items-center" >
                                <h2>{tier.name}</h2>
                                {selectedSub === tier.name && (
                                    <div className="mt-1 mx-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="20px"
                                            viewBox="0 -960 960 960"
                                            width="20px"
                                            fill="white"
                                        >
                                            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="border-b mb-4">
                                    <h2>Monthly Price</h2>
                                    <h2>{tier.price}</h2>
                                </div>
                                <div className="border-b">
                                    <h2>Promotion</h2>
                                    <h2>{tier.promotion}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-full md:w-[90%] flex justify-center mt-12">
                        <div className="bg-red-900  font-bold w-80 p-4 rounded-lg text-center cursor-pointer">
                            สมัครสมาชิก
                        </div>
                       
                    </div>
                </div>
              
                <div className="flex flex-wrap w-4/5 gap-8 text-white text-lg justify-center md:justify-start">
                    <div className="w-[85%] flex justify-between">
                        <h1 className="text-3xl mt-12">แลกของรางวัล</h1>
                        <h1 className="text-3xl mt-12">{point} points</h1>
                    </div>
                    {rewards.map((reward) => (
                        <div key={reward.id} className={`duration-200 w-60 lg:w-1/4 xl:w-1/5 p-2 shadow-lg shadow-gray-500/50 cursor-pointer ${selectedRewards.includes(reward.id) ? 'opacity-50' : ''}`}
                           >
                            <div className="p-4">
                                <img className="" src={reward.imageUrl} alt={reward.name} />
                                <div className="my-4 flex justify-between">
                                    <h2 className="w-4/5">{reward.name}</h2>
                                    <h2>{reward.points} แต้ม</h2>
                                </div>
                                <div
                                    className={`bg-red-900 rounded-lg p-2 text-white text-center cursor-pointer ${selectedRewards.includes(reward.id) ? 'opacity-50' : ''}`}
                                    onClick={() => handleRewardSelect(reward.id,reward.points)}
                                >
                                    {selectedRewards.includes(reward.id) ? 'เลือกแล้ว' : 'เลือก'}
                                </div>
                            </div>
                        </div>
                    ))}
                     <div className="w-full md:w-[90%] flex justify-center mt-12">
                        <div className="bg-red-900  font-bold w-80 p-4 rounded-lg text-center cursor-pointer ">
                            แลกรับของรางวัล
                        </div>
                       
                    </div>
                </div>
                {/* {ShowNeedpoint && 
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center font-Kanit ">
                        <div className= "bg-white w-1/3 h-80 flex justify-center items-center text-2xl">
                            <h1>แต้มไม่เพียงพอ</h1>
                            <h1></h1>
                        </div>
                       
                    </div>
                
                
                } */}
            
            
            </div>
        </main>
       
    )
}
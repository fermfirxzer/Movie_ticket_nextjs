'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '@/component/Loading';
import { useSession } from 'next-auth/react';

export default function Promotion() {

    const [Item, setItem] = useState(null);
    const { data: session, status } = useSession();
    const [Tier, setTier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [point, setPoint] = useState(0);
    const [History, setHistory] = useState('');
    const [userTier, setuserTier] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch promotion items
                const itemRes = await fetch(`/api/promotionItem`);
                if (!itemRes.ok) {
                    throw new Error('Failed to fetch items.');
                }
                const itemData = await itemRes.json();
                setItem(itemData.Item);
                setTier(itemData.Tier);

                // Now fetch user-specific data if they are logged in
                if (session?.user?.username) {
                    const [pointRes, historyRes, userTierRes] = await Promise.all([
                        fetch(`/api/promotionTier/getpointuser?username=${session.user.username}`),
                        fetch(`/api/promotionhistory?username=${session.user.username}`),
                        fetch(`/api/promotionTier/getTieruser?username=${session.user.username}`),
                    ]);

                    if (!pointRes.ok || !historyRes.ok || !userTierRes.ok) {
                        throw new Error('Failed to fetch promotion data.');
                    }

                    const pointData = await pointRes.json();
                    const historyData = await historyRes.json();
                    const userTier = await userTierRes.json();
                    setPoint(pointData.point);
                    setHistory(historyData.History);
                    setuserTier(userTier.userTier[0]);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };


        if (status != "loading") {
            fetchData();
        }
    }, [session, status]);
    const [selectedSub, setSelectedSub] = useState([]);
    const [selectedRewards, setSelectedRewards] = useState([]);

    const [total, setTotal] = useState(0);
    const handleRewardSelect = (rewardId, rewardPoint, rewardName) => {

        setSelectedRewards((prev) => {
            const newTotal = prev.includes(rewardId) ? total - rewardPoint : total + rewardPoint;
            console.log(newTotal)
            if (newTotal > point) {
                Swal.fire({
                    icon: 'error',
                    title: 'แต้มไม่เพียงพอ',
                    text: 'คุณไม่สามารถเลือกของรางวัลนี้ได้เพราะแต้มของคุณไม่เพียงพอ!',
                    confirmButtonText: 'ตกลง',
                });

                return prev; // Do not update selection
            } else {

                // Update total points

                if (prev.some(reward => reward.rewardId === rewardId)) {
                    // Remove the reward if already selected
                    setTotal(total - rewardPoint);
                    return prev.filter(reward => reward.rewardId !== rewardId);
                } else {
                    setTotal(newTotal);
                    // Add the reward (store both rewardId and rewardName)
                    return [...prev, { rewardId, rewardName }];
                }
            }
        });
    };
    const handleitemPurchase = async (e) => {
        e.preventDefault();
        if (!session?.user?.username) {
            window.alert('Please Login before buying a Items!');
            return;
        }
        if (selectedRewards.length === 0) {
            return;
        }
        try {
            const response = await fetch(`/api/promotionItem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: selectedRewards, username: session.user.username, total: total }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            window.alert(`Success! You've purchased the item with Point`);
            fetchHistory();

        } catch (error) {
            console.error('There was a problem with the purchase:', error);
        }
    };
    const fetchHistory = async () => {
        if (!session?.user?.username) return;
        try {
            const response = await fetch(`/api/promotionhistory?username=${session.user.username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch promotion history.');
            }
            const historyData = await response.json();
            setHistory(historyData.History); // Update the history state with new data
        } catch (error) {
            console.error('Error fetching history:', error.message);
        }
    };


    const handleTierPurchase = async (e) => {
        e.preventDefault();

        if (!session?.user?.username) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Login',
                text: 'Please Login before buying a Tier!',
            });
            return;
        }

        if (!selectedSub) {
            return;
        }

        // Check if userTier is not null and prompt for confirmation
        if (userTier !== null) {
            const result = await Swal.fire({
                title: 'คุณมีสมาชิกอยู่แล้ว',
                text: 'ต้องการซื้อใหม่ใช่หรือไม่',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, purchase',
                cancelButtonText: 'Cancel',
            });

            if (!result.isConfirmed) {
                return; // Exit if user cancels
            }
        }

        try {
            const response = await fetch(`/api/checkout/tier`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: session.user.username,
                    name: selectedSub.name,
                    price: selectedSub.price,
                    id: selectedSub.id,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // Redirect to the session URL
            } else {
                console.error('No checkout URL returned');
            }

        } catch (error) {
            console.error('There was a problem with the purchase:', error);
        }
    };


    if (loading) {
        return <Loading />
    }

    return (
        <main className="min-h-screen text-white">
            <div className="font-Kanit justify-center flex flex-wrap w-4/5 mx-auto" >

                <div className="flex flex-wrap gap-4 text-white">
                    <h1 className="w-full text-3xl  mt-12 ">User : {session?.user?.username}</h1>
                    {userTier && <div><p> ระดับสมัครสมาชิก : {userTier.tier} ส่วนลด : {userTier.discount}</p>
                        <p>
                            หมดอายุ :{' '}
                            {new Date(userTier.tier_expiration_date).toLocaleDateString('en-EN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}{' '}
                            {new Date(userTier.tier_expiration_date).toLocaleTimeString('en-EN', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>}

                    <h1 className="w-full text-3xl  mt-12 ">ระดับสมัครสมาชิก</h1>
                    {Tier && Tier.map((tier, index) => (
                        <div key={index} className={`duration-300 w-full md:w-[22%] p-2 shadow-lg ${selectedSub.name === tier.name ? 'shadow-gold' : 'shadow-gray-500/50'} hover:shadow-gold h-64 cursor-pointer`}
                            onClick={() => setSelectedSub({ name: tier.name, price: tier.price, discount: tier.promotion, id: tier.id })}>
                            <div className="bg-red-900 flex w-full rounded-lg p-4 text-white justify-center items-center" >
                                <h2>{tier.name}</h2>
                                {selectedSub.name === tier.name && (
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
                                    <h2>ราคาต่อเดือน :</h2>
                                    <h2>{tier.price}</h2>
                                </div>
                                <div className="border-b">
                                    <h2>ส่วนลด :</h2>
                                    <h2>{tier.discount} %</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-full md:w-[90%] flex justify-center mt-12" >
                        <div className="bg-red-900  font-bold w-80 p-4 rounded-lg text-center cursor-pointer" onClick={handleTierPurchase}>
                            สมัครสมาชิก
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-8 text-white text-lg justify-center md:justify-start">
                    <div className="w-[85%] mx-auto flex justify-between">
                        <h1 className="text-3xl mt-12">แลกของรางวัล</h1>
                        <h1 className="text-3xl mt-12">{point} points</h1>
                    </div>
                    <div className='mx-auto flex flex-wrap justify-center md:justify-start'>
                        {Item && Item.map((reward) => (
                            <div key={reward.id} className={`duration-200 w-60 lg:w-1/4 xl:w-1/5 p-2 shadow-lg shadow-gray-500/50 cursor-pointer ${selectedRewards.some(selected => selected.rewardId === reward.id) ? 'opacity-50' : ''}`}>
                                <div className="p-4">
                                    <img className="" src={reward.imageUrl} alt={reward.name} />
                                    <div className="my-4 flex justify-between">
                                        <h2 className="w-4/5">{reward.name}</h2>
                                        <h2>{reward.points} แต้ม</h2>
                                    </div>
                                    <div
                                        className={`bg-red-900 rounded-lg p-2 text-white text-center cursor-pointer ${selectedRewards.some(selected => selected.rewardId === reward.id) ? 'opacity-50' : ''}`}
                                        onClick={() => handleRewardSelect(reward.id, reward.points, reward.name)}
                                    >
                                        {selectedRewards.some(selected => selected.rewardId === reward.id) ? 'เลือกแล้ว' : 'เลือก'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center mt-12">
                        <div onClick={handleitemPurchase} className="bg-red-900  font-bold w-80 p-4 rounded-lg text-center cursor-pointer ">
                            แลกรับของรางวัล
                        </div>

                    </div>
                </div>

                <div className='mt-12 w-[75%] mx-auto text-md'>
                    <div className='text-2xl font-bold mb-4'>
                        <h3>History</h3>
                        <hr className="mt-2"></hr>
                    </div>
                    <div>
                        {History && History.map((history, index) => (
                            <div key={index} className='text-xl'>
                                <div>
                                    <h3>Order : {index + 1}</h3>
                                    {history.items && history.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className='flex justify-between'>
                                            <p>{item.name}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    ))}
                                    <div className='mt-2'>
                                        <p className='text-sm'>Purchase Time: {new Date(history.purchaseTime).toLocaleString()}</p>
                                        <p className='text-sm'>Total: {history.Total} {history.type === "Item" ? "points" : "bath"}</p>
                                    </div>
                                </div>
                                <hr className="mt-4 mb-4"></hr>
                            </div>
                        ))}

                    </div>


                </div>
            </div>
        </main>

    )
}
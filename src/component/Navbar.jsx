"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { signOut , useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const { data : session } = useSession();
    // State to control the visibility of the mobile nav
    const [isMobileNavVisible, setMobileNavVisible] = useState(false);
    const [islogin, setLogin] = useState(false);
    const [showuser, setShowuser] = useState(false)
    // Refs for mobile nav and burger icon
    const [isAdmin,setAdmin]=useState(true);
    const mobileNavRef = useRef(null);
    const burgerRef = useRef(null);
    const router = useRouter();
    const userRef=useRef(null);
    const usericon=useRef(null);
    const toggleMobileNav = () => {
        setMobileNavVisible(prev => !prev);
    };

    // Function to handle clicks outside of mobile nav
    const handleClickOutside = (event) => {
        if (
            mobileNavRef.current &&
            !mobileNavRef.current.contains(event.target) &&
            burgerRef.current &&
            !burgerRef.current.contains(event.target)
        ) {
            setMobileNavVisible(false);
            
        }
    
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const [Search,setSearch]=useState('');
    const handlesearch=(e)=>{
        if (e.key === 'Enter') {
            setMobileNavVisible(false);
            setShowuser(false);
            router.push(`/search?moviename=${Search}`);
            setSearch('')
        }
    }
    return (
        <nav id="navbar" className='mx-auto'>
            <div className='p-5 px-12 flex justify-between items-center'>
                <div className='flex gap-6 items-center'>
                    <Link href="/" className='cursor-pointer text-2xl mr-3'>Movie Ticket</Link>
                    <Link href="/" className='cursor-pointer text-sm hover:underline underline-offset-4 decoration-4 md:block hidden'>หน้าแรก</Link>
                    <Link href="/moviebydate" className='cursor-pointer text-sm hover:underline underline-offset-4 decoration-4 md:block hidden'>หนังที่ฉายวันนี้</Link>
                    <Link href="/search" className='cursor-pointer text-sm hover:underline underline-offset-4 decoration-4 md:block hidden'>ค้นหา</Link>
                    <div className='search-box items-center  border-white border-0.25 rounded-md bg-black gap-1 px-3 hidden md:flex ml-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='white' /></svg>
                        <input type="text" className='search text-white opacity-100 p-1 w-64 focus:outline-none bg-black' value={Search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handlesearch}></input>
                    </div>
                </div>
                <div className='search hidden md:hidden f:flex f:justify-start'>
                    <div className='search-box items-center  border-white border-0.25 rounded-md bg-black gap-1 px-3 flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='white' /></svg>
                        <input type="text" className='search text-white opacity-100 p-1 w-64 focus:outline-none bg-black' value={Search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handlesearch}></input>
                    </div>
                </div>
                <div className='burger md:hidden'
                    onClick={toggleMobileNav} ref={burgerRef}>
                    <ul className='flex gap-1 flex-col cursor-pointer'>
                        <li className='border-white border-b-2 w-5'></li>
                        <li className='border-white border-b-2 w-5'></li>
                        <li className='border-white border-b-2 w-5'></li>
                    </ul>
                </div>
                {isMobileNavVisible && (
                    <div className='fixed top-0 right-0 h-screen w-[350px] z-[999] bg-black md:hidden opacity-100 font-bold text-xl' ref={mobileNavRef}>
                        <div className='flex flex-col justify-start text-white p-6 gap-5'>
                            <div className='self-end cursor-pointer' onClick={(e) => setMobileNavVisible(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-6 h-6' fill="currentColor"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg></div>
                            <Link href="/" onClick={(e)=>setMobileNavVisible(false)}  className='cursor-pointer text-sm hover:underline underline-offset-4 decoration-4 flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4 h-3' fill="currentColor"><path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" /></svg>หน้าแรก</Link>

                            <Link href="/moviebydate" onClick={(e)=>setMobileNavVisible(false)} className='cursor-pointer text-sm hover:underline underline-offset-4 decoration-4 flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4 h-3' fill="currentColor"><path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" /></svg>หนังที่ฉายวันนี้</Link>

                            <div className='search-box items-center border-white border-2 rounded-md bg-white gap-1 px-1.5 flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 bg-white'><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                                <input type="text" className='search text-black p-1 md:w-56 focus:outline-none  rounded-md border-white border-0.5' onChange={(e) => setSearch(e.target.value)} onKeyDown={handlesearch} ></input>
                            </div>

                            {session ? (<div className='user-box'>
                                <h3 className='text-xl font-bold'>User</h3>

                                <div className='flex flex-col mt-3 gap-3'>
                                    <Link href="/history" className='hover:underline underline-offset-4 decoration-4'>History</Link>
                                    <Link href="/promotion" className='hover:underline underline-offset-4 decoration-4'>Promotion</Link>
                                    <Link href="/" onClick={() => signOut()} className='hover:underline underline-offset-4 decoration-4'>Logout</Link>
                                    {session.user.isAdmin&&<Link href="/scanner">Scanner</Link>}
                                </div>
                            </div>) : (
                                <Link href="/login" onClick={(e)=>setMobileNavVisible(false)}>
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
                
                <div className='hidden md:flex md:gap-8 '>
                    {session ? (
                        <div className='relative '>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-7 h-7 cursor-pointer' fill="currentColor" onClick={() => setShowuser(!showuser) }><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" /></svg>
                            {showuser && (
                                <div className="absolute bg-white text-black mt-2 right-0 shadow-md rounded z-[999] p-2">
                                    <div className='flex p-3 items-center justify-start hover:bg-gray-200'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-8 h-7 cursor-pointer' fill="currentColor"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" /></svg>
                                        <span className='self-end' id="username">{session?.user?.username}</span>
                                    </div>
                                    <hr className='border-gray-700 '></hr>
                                    <ul className='mt-3 cursor-pointer'>
                                    <Link href="/history"><li className="py-1 px-2 hover:bg-gray-200">History</li></Link>
                                    <Link href="/promotion"><li className="py-1 px-2 hover:bg-gray-200">Promotion</li></Link>
                                        <li className="py-1 px-2  hover:bg-gray-200" onClick={()=>signOut()}>Logout</li>
                                    {session?.user?.isAdmin&&<Link href="/scanner"><li className="py-1 px-2 hover:bg-gray-200">Scanner</li></Link>}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ul>
                            <Link href="/login">Sign in</Link>
                        </ul>

                    )}
                </div>

            </div>
        </nav>
    );
}

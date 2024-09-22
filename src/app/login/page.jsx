"use client"
import { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState(true);
    const [showpass, Setshowpass] = useState(null);

    return (
        <main className="bg-black h-screen flex justify-center items-center font-Kanit">

            <div className="bg-black border border-white h-[54rem] w-full md:w-3/4 lg:w-2/4 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 ">
                <div className="text-center mb-9">
                    <h1 className="text-red-600 text-9xl">M</h1>
                    <h1 className="text-red-600 text-2xl">Movie Ticket</h1>
                </div>

                <form className="text-white bg-[#1b181a] rounded-2xl h-3/4 w-full md:w-full lg:w-3/4">


                    <div className="flex justify-center w-full">
                        <span className={`w-1/2 h-9 p-6 flex justify-center items-center rounded-lg ${login ? 'bg-black' : ''}`} onClick={(e) => { setLogin(true) }}>
                            เข้าสู่ระบบ
                        </span>
                        <span className={`w-1/2 h-9 p-6 flex justify-center items-center ${!login ? 'bg-black' : ' '}`} onClick={(e) => { setLogin(false) }}>
                            สมัครสมาชิก
                        </span>
                    </div>
                    <div className="flex flex-col justify-center">

                        {login ? (
                            <>
                                <label className="mx-6 mt-6 mb-2">Username</label>
                                <input type="text" className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white "></input>
                                <label className="mx-6 mb-2">password</label>
                                <input type="password" className="border  mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"></input>

                                <button type="submit" className="bg-red-900 rounded-2xl w-[90%] py-1 mx-6 mt-5">เข้าสู่ระบบ</button>
                            </>
                        ) : (<>

                            <label className="mx-6 mt-6 mb-2">Username</label>
                            <input type="text" className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white "></input>

                            <label className="mx-6 mb-2">email</label>
                            <input type="email" className="border  mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"></input>
                            <label className="mx-6 mb-2">Confirm-password</label>
                            <input type={showpass ? 'tcxt' : 'password'} className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"></input>
                            <label className="mx-6 mb-2">password</label>
                            <input type={showpass ? 'text' : 'password'} className="border mx-6 mb-4 bg-bgsoft rounded-2xl p-1.5 border-white"></input>
                            <div className="mx-6">
                                <input type="checkbox" value="showpassword" onChange={(e) => Setshowpass(e.target.checked)}></input>
                                <label className="ml-4">ShowPassword</label>
                            </div>

                            <button type="submit" className="bg-red-900 rounded-2xl w-[90%] py-1 mx-6 mt-5">สมัครสมาชิก</button>
                        </>)}

                    </div>

                </form>
            </div>
        </main>
    );
}
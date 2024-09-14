

export default function Login(){


    return(

        <main className="bg-black h-screen flex justify
        
        -center items-center font-Kanit">
            
            <div className="bg-black border border-white h-[54rem] w-full md:w-3/4 lg:w-2/4 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 ">
                <div className="text-center mb-9">
                    <h1 className="text-red-600 text-9xl">M</h1>
                    <h1 className="text-red-600 text-2xl">Movie Ticket</h1>
                </div>
                <form className="text-white bg-[#1b181a] rounded-2xl h-3/4 w-full md:w-full lg:w-3/4  px-2">
            
                    <div className="flex justify-between">
                        <span className="w-1/2 h-9 p-6  flex justify-center items-center">
                            เข้าสู่ระบบ   
                        </span>
                        <span className="w-1/2 h-9 p-6 flex justify-center items-center">
                            สมัครมสาชิก
                        </span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="mx-6 mt-6 mb-2">ชื่อ</label>
                        <input type="text" className="border border-black mx-6 mb-4 bg-[#1b181a] rounded-2xl p-1.5 border-white "></input>
                        <label className="mx-6 mb-2">นามสกุล</label>
                        <input type="text" className="border border-black mx-6 mb-4 bg-[#1b181a] rounded-2xl p-1.5 border-white"></input>
                        <label className="mx-6 mb-2">email</label>
                        <input type="email" className="border border-black mx-6 mb-4 bg-[#1b181a] rounded-2xl p-1.5 border-white"></input>
                        <label className="mx-6 mb-2">password</label>  
                        <input type="password" className="border border-black mx-6 mb-4 bg-[#1b181a] rounded-2xl p-1.5 border-white"></input>
                        
                        <input type="submit" value="เข้าสู่ระบบ" className="bg-red-900 rounded-2xl w-[90%] py-1 mx-6 mt-12"></input>
                    </div>
                    
                </form>
            </div>
        </main>
    
       
    );
}
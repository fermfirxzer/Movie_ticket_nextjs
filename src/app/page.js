'use client'

import SwiperComponent from "@/component/SwiperComponent";

export default function Mainpage(){

    return(
        <main className="bg-black  text-white font-Kanit ml-2  ">
            <div className="md:mx-20">
                <div className="mb-4 mt-10">
                    <h1 className="text-3xl mx-5 my-6 lg:mx-9 ">ภาพยนตร์แนะนำ</h1>
                    <SwiperComponent></SwiperComponent>
                </div>
                <div>
                    <h1 className="text-3xl mx-5 my-6 lg:mx-9">กำลังฉาย</h1>
                    <SwiperComponent></SwiperComponent>
                </div>
                <div>
                    <h1 className="text-3xl mx-5 my-6 lg:mx-9">โปรแกรมหน้า</h1>
                    <SwiperComponent></SwiperComponent>
                </div>
            </div>
          
          


            
        </main>
        
    );



}


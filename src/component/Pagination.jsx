"use client"
import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };
    // เก็บสถานะหน้าปัจจุบัน
    // const [currentPage, setCurrentPage] = useState(1);

    // // ฟังก์ชันสำหรับเปลี่ยนหน้า
    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    //     onPageChange(pageNumber);
    // };

    // // ฟังก์ชันสำหรับเลื่อนไปหน้าก่อนหน้า
    // const goToPreviousPage = () => {
    //     if (currentPage > 1) {
    //         handlePageChange(currentPage - 1);
    //     }
    // };

    // // ฟังก์ชันสำหรับเลื่อนไปหน้าถัดไป
    // const goToNextPage = () => {
    //     if (currentPage < totalPages) {
    //         handlePageChange(currentPage + 1);
    //     }
    // };

    return (
        <div className="flex items-center justify-center mt-4 text-white">
            <button
                className="px-3 py-2 mx-1 bg-gray-600 rounded hover:bg-gray-400 text-xl"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>


            <span className="mx-3">
                หน้า {currentPage} จาก {totalPages === 0 ? 1 : totalPages}
            </span>


            <button
                className="px-3 py-2 mx-1 bg-gray-600 rounded hover:bg-gray-400 text-xl"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;

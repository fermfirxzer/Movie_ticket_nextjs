import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-10 text-white py-8 px-8">
      <hr className='bold border-t-4'></hr>
      <div className="mx-auto mt-10">
        <div className="flex flex-wrap justify-center items-center px-4">
          <div className="w-3/6 md:w-1/4 mb-6 flex items-center flex-col">
            <div>
              <h3 className="font-bold text-xl mb-4">Movie Ticket</h3>
              <ul className='flex flex-col gap-3 text-md'>
                <li><a href="/" className="hover:underline underline-offset-2 decoration-2">หน้าแรก</a></li>
                <li><a href="/moviebydate" className="hover:underline underline-offset-2 decoration-2">หนังที่ฉายวันนี้</a></li>
                <li><a href="/search" className="hover:underline underline-offset-2 decoration-2">ค้นหา</a></li>
              </ul>
            </div>
          </div>
          <div className="w-3/6 md:w-1/4 mb-6 flex items-center flex-col">
            <div>

              <h3 className="font-bold text-xl mb-4">Support</h3>
              <ul className='flex flex-col gap-3'>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">Help Center</a></li>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">FAQs</a></li>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="w-3/6 md:w-1/4 mb-6 flex items-center flex-col">
            <div>
              <h3 className="font-bold text-xl mb-4">Legal</h3>
              <ul className='flex flex-col gap-3 text-md'>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">Terms of Service</a></li>
                <li><a href="#" className="hover:underline underline-offset-2 decoration-2">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="w-3/6 md:w-1/4 mb-6 flex items-center md:items-start justify-center flex-col">
            <div className=''>
              <h3 className="font-bold text-xl mb-4 w-full">Follow Us</h3>
            
              <div className="flex flex-col gap-3 md:flex-row">
                <a href="#" aria-label="Facebook" className="hover:underline underline-offset-2 decoration-2">Facebook</a>
                <a href="#" aria-label="Twitter" className="hover:underline underline-offset-2 decoration-2">Twitter</a>
                <a href="#" aria-label="Instagram" className="hover:underline underline-offset-2 decoration-2">Instagram</a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 MovieTicket.</p>
        </div>
      </div>
    </footer>

  )
}

export default Footer
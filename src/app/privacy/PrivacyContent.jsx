'use client';

import { useState } from 'react';

export default function PrivacyContent() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="bg-black text-white font-Kanit min-h-screen px-4 md:px-8 lg:px-12 py-8">
      <h1 className="text-4xl font-bold mb-6">นโยบายความเป็นส่วนตัว &amp; PDPA</h1>
      <section className="prose prose-invert max-w-none mb-8">
        <p>
          ขอบคุณที่ใช้บริการ Movie Ticket การปกป้องข้อมูลส่วนบุคคลของคุณเป็นสิ่งสำคัญสำหรับเรา นโยบายความเป็นส่วนตัวนี้จะอธิบายว่าคุณข้อมูลถูกเก็บ รักษา และใช้ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย
        </p>
        <h2>ข้อมูลที่เก็บรวบรวม</h2>
        <p>
          เราอาจเก็บข้อมูลต่อไปนี้เมื่อคุณสมัครสมาชิกหรือใช้บริการ:
        </p>
        <ul>
          <li>ชื่อ-สกุล</li>
          <li>หมายเลขโทรศัพท์</li>
          <li>อีเมล</li>
          <li>ประวัติการซื้อและการชมหนัง</li>
        </ul>
        <h2>การใช้ข้อมูล</h2>
        <p>
          เราใช้ข้อมูลเพื่อปรับปรุงประสบการณ์ของคุณ ส่งการแจ้งเตือนเกี่ยวกับการจอง และให้บริการตามคำขอของคุณ
        </p>
        <h2>การเปิดเผยข้อมูล</h2>
        <p>
          เราจะไม่เปิดเผยข้อมูลของคุณให้บุคคลที่สาม ยกเว้นตามที่กฎหมายกำหนด หรือเมื่อคุณยินยอมเป็นลายลักษณ์อักษร
        </p>
        <h2>สิทธิ์ของผู้ใช้</h2>
        <p>
          คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณ และสามารถติดต่อเราที่ <a href="mailto:privacy@example.com" className="text-blue-400 hover:underline">privacy@example.com</a>
        </p>
        <h2>การยอมรับ</h2>
        <p>
          โดยการยอมรับนโยบายนี้ (ด้านล่าง) คุณตกลงว่าข้อมูลที่เราเก็บจะถูกใช้อย่างที่อธิบายไว้และเป็นไปตาม PDPA
        </p>
      </section>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="acceptPDPA"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <label htmlFor="acceptPDPA">ฉันยอมรับนโยบายความเป็นส่วนตัว</label>
      </div>
      <button
        disabled={!accepted}
        className="px-6 py-2 bg-blue-600 rounded disabled:bg-gray-600"
        onClick={() => {
          localStorage.setItem('privacyAccepted','1');
          alert('ขอบคุณที่ยอมรับนโยบายของเรา');
        }}
      >
        ยืนยัน
      </button>
    </main>
  );
}

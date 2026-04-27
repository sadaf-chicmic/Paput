import React from 'react';
import images from '../../assets/images';

const OrderFooter = () => {
  return (
    <footer className="mt-auto pt-32 pb-10 flex flex-col items-center gap-6">
      <div className="relative">
        <img
          src={images.orderPng}
          alt="Avatar"
          className="h-24 w-24 rounded-full object-contain"
        />
      </div>
      <a
        data-cursor
        href="https://instagram.com"
        className="rounded-full hover:scale-110 transition-transform shadow-sm"
      >
        <img src={images.instaFooter} alt="" className="w-10 rounded-[80px]" />
      </a>
      <div className="flex flex-col items-center gap-2 text-[10px] font-bold text-[#0a4635]/30 uppercase tracking-[0.2em] mt-2">
        <p>©2026 Paput. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default OrderFooter;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import images from '../../assets/images';
import { ROUTES } from '../../constants/routes';

const OrderHeader = ({ activeTab, setActiveTab, setIsLoginModalOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white z-[5000] px-4 md:px-6 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center">
        <img
          src={images.orderFav}
          alt="Logo"
          data-cursor
          className="cursor-pointer w-[50%]"
          onClick={() => navigate(ROUTES.LANDING)}
        />
      </div>

      <div className="flex gap-8 items-center">
        <button
          data-cursor
          onClick={() => setActiveTab('ORDER')}
          className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
            activeTab === 'ORDER'
              ? 'text-[#0a4635]'
              : 'text-[#0a4635]/50 hover:text-[#0a4635]'
          }`}
        >
          Order
          {activeTab === 'ORDER' && (
            <motion.div
              layoutId="headerTab"
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
            />
          )}
        </button>
        <button
          data-cursor
          onClick={() => setActiveTab('LOCATIONS')}
          className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
            activeTab === 'LOCATIONS'
              ? 'text-[#0a4635]'
              : 'text-[#0a4635]/50 hover:text-[#0a4635]'
          }`}
        >
          Locations
          {activeTab === 'LOCATIONS' && (
            <motion.div
              layoutId="headerTab"
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
            />
          )}
        </button>
      </div>

      <button
        data-cursor
        onClick={() => setIsLoginModalOpen(true)}
        className="bg-[#0a4635] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase hover:bg-opacity-90 transition-all"
      >
        Login
      </button>
    </header>
  );
};

export default OrderHeader;

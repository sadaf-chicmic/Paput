import React from 'react';
import { motion } from 'framer-motion';
import images from '../../assets/images';

const StoreInfoPanel = ({ selectedStore, setShowStoreInfo }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0, width: 0 }}
      animate={{ x: 0, opacity: 1, width: 380 }}
      exit={{ x: -20, opacity: 0, width: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full bg-white p-5 border-r border-gray-100 overflow-y-auto flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-bold uppercase tracking-tight text-[#2c2b2b]">
          {selectedStore.name}
        </h2>
        <button
          data-cursor
          onClick={() => setShowStoreInfo(false)}
          className="p-2 hover:bg-[#f4f3e6] rounded-full transition-colors"
        >
          <img
            src={images.close}
            alt="Close"
            className="w-4 h-4 opacity-40 hover:opacity-100"
          />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-bold text-[#0a4635] uppercase">
          Order for later
        </p>
        <p className="text-gray-400 text-[15px] ">{selectedStore.address}</p>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
        <h3 className="text-[16px] font-bold uppercase text-[#2c2b2b]">
          Store hours
        </h3>
        <p className="text-[15px] text-gray-400">{selectedStore.hours}</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          data-cursor
          onClick={() => window.open('skype:+34666666666?call')}
          className="w-full h-12 font-bold tracking-wider rounded-[10px] bg-[#ffc62d] text-white text-[16px] uppercase shadow-sm hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
        >
          Call store
        </button>
        <button
          data-cursor
          onClick={() =>
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                selectedStore.address + ', Mahon, Menorca',
              )}`,
            )
          }
          className="w-full h-12 font-bold tracking-wider rounded-[10px] bg-[#ffc62d] text-white text-[16px] uppercase shadow-sm hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
        >
          Get directions
        </button>
      </div>
    </motion.div>
  );
};

export default StoreInfoPanel;

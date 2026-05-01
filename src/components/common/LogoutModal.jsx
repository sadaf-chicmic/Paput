import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import images from '../../assets/images';
import { AUTH_TEXTS } from '../../constants/texts';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#ffc629]/60 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[400px] bg-white rounded-[20px] p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              data-cursor
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <img
                src={images.close}
                alt="Close"
                className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </button>

            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <LogOut size={32} />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[24px] font-bold text-[#0a4635] uppercase tracking-tight">
                  {AUTH_TEXTS.LOGOUT_CONFIRM_TITLE}
                </h2>
                <p className="text-gray-500 font-medium text-[16px]">
                  {AUTH_TEXTS.LOGOUT_CONFIRM_SUBTITLE}
                </p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <button
                  data-cursor
                  onClick={onConfirm}
                  className="w-full h-12 bg-red-500 text-white rounded-[10px] font-bold uppercase text-[15px] tracking-widest hover:bg-red-600 transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-0"
                >
                  {AUTH_TEXTS.LOGOUT_BUTTON}
                </button>
                <button
                  data-cursor
                  onClick={onClose}
                  className="w-full h-12 bg-gray-100 text-[#0a4635] rounded-[10px] font-bold uppercase text-[15px] tracking-widest hover:bg-gray-200 transition-all"
                >
                  {AUTH_TEXTS.CANCEL_BUTTON}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;

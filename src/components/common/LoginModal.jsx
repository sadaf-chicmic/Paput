import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import images from '../../assets/images';

const LoginModal = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-[550px] h-[300px] bg-white rounded-[20px] p-6 shadow-2xl overflow-hidden"
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
              />
            </button>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <h2 className="text-[26px] font-bold text-[#0a4635] uppercase tracking-tight">
                  Su cuenta
                </h2>
                <p className="text-gray-500 font-medium text-[16px]">
                  Inicie sesión o regístrese para comenzar.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[14px] font-bold text-[#0a4635] uppercase tracking-wider ml-1">
                    Correo electrónico
                  </label>
                  <input
                    data-cursor
                    type="email"
                    placeholder="Ingrese correo electrónico"
                    className="w-full h-12 px-6 rounded-[10px] border border-gray-200 bg-[#fbfbfb] focus:border-[#0a4635]/40 outline-none transition-all text-[15px] font-bold placeholder:text-gray-300"
                  />
                </div>

                <button
                  data-cursor
                  className="w-full h-12 bg-[#0a4635] text-white rounded-[10px] font-bold uppercase text-[15px] tracking-widest hover:bg-[#0a4635]/90 transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-0"
                >
                  Acceso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

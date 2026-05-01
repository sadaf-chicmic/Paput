import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import images from '../../assets/images';
import { ROUTES } from '../../constants/routes';
import { SHARED_TEXTS, ORDER_TEXTS } from '../../constants/texts';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import LogoutModal from '../common/LogoutModal';

const OrderHeader = ({ activeTab, setActiveTab, setIsLoginModalOpen }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const handleLogout = () => {
    signOut();
    setIsLogoutModalOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white z-[5000] px-4 md:px-6 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center">
        <img
          src={images.orderFav}
          alt="Logo"
          data-cursor
          className="cursor-pointer w-[50%]"
          onClick={() => navigate(ROUTES.LANDING)}
          loading="eager"
        />
      </div>

      <div className="flex gap-8 items-center">
        <button
          data-cursor
          onClick={() => setActiveTab(ORDER_TEXTS.TABS.ORDER)}
          className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
            activeTab === ORDER_TEXTS.TABS.ORDER
              ? 'text-[#0a4635]'
              : 'text-[#0a4635]/50 hover:text-[#0a4635]'
          }`}
        >
          {SHARED_TEXTS.ORDER}
          {activeTab === ORDER_TEXTS.TABS.ORDER && (
            <motion.div
              layoutId="headerTab"
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
            />
          )}
        </button>
        <button
          data-cursor
          onClick={() => setActiveTab(ORDER_TEXTS.TABS.LOCATIONS)}
          className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
            activeTab === ORDER_TEXTS.TABS.LOCATIONS
              ? 'text-[#0a4635]'
              : 'text-[#0a4635]/50 hover:text-[#0a4635]'
          }`}
        >
          {SHARED_TEXTS.LOCATIONS}
          {activeTab === ORDER_TEXTS.TABS.LOCATIONS && (
            <motion.div
              layoutId="headerTab"
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
            />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[12px] font-bold text-[#0a4635] truncate max-w-[150px]">
                {user.email}
              </span>
              <button
                data-cursor
                onClick={() => setIsLogoutModalOpen(true)}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
              >
                {SHARED_TEXTS.LOGOUT}
              </button>
            </div>
            <button
              data-cursor
              onClick={() => setIsLogoutModalOpen(true)}
              className="sm:hidden p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            data-cursor
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-[#0a4635] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase hover:bg-opacity-90 transition-all"
          >
            {SHARED_TEXTS.LOGIN}
          </button>
        )}
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default OrderHeader;

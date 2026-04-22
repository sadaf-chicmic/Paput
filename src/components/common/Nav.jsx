import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../../assets/images';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router';
import { staggerVariants, navFadeInUp } from '../../constants/utils';
import { MENU_ITEMS, NAV_SOCIAL_ICONS } from '../../constants/nav';
import { HACER_PEDIDO } from '../../constants/strings';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-10 py-5 z-[40] ">
        <img
          src={images.paputGreen}
          alt="paputGreen"
          className="h-10 cursor-pointer"
          data-cursor
          onClick={() => navigate(ROUTES.ABOUT)}
        />

        <div className="flex gap-8">
          <motion.button
            data-cursor
            variants={navFadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(ROUTES.LARGE_ORDERS)}
            className="h-15 bg-[#ffc62d] text-[#0a4635] font-extrabold hover:bg-[#0a4635] hover:text-[#ffc62d] text-xl lg:text-xl px-6 rounded-full shadow-xl uppercase tracking-tight flex items-center justify-center transition-transform"
          >
            {HACER_PEDIDO}
          </motion.button>
          <button
            data-cursor
            onClick={() => setOpen(true)}
            className="cursor-hover h-15 w-15 flex items-center justify-center rounded-full"
          >
            <img src={images.hamburger} alt="hamburger" className="w-12 h-12" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] bg-[#f6be32] flex flex-col p-8 md:p-16 h-svh overflow-y-auto"
          >
            {/* Top Close Button */}
            <div className="flex justify-end pt-4">
              <button
                data-cursor
                onClick={() => setOpen(false)}
                className="cursor-hover text-[#06482f] hover:scale-110 transition-transform"
              >
                <img src={images.close} alt="close" className="w-12 h-12" />
              </button>
            </div>

            {/* Menu Links */}
            <motion.div
              className="flex flex-col gap-2 mt-8 flex-1 justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {MENU_ITEMS.map((item, idx) => (
                <motion.a
                  data-cursor
                  key={idx}
                  href={item.href}
                  variants={staggerVariants}
                  onClick={() => setOpen(false)}
                  className="text-5xl md:text-6xl lg:text-[6rem] font-black uppercase text-[#06482f] hover:text-[#e54d3a] hover:underline decoration-[#e54d3a] hover:underline-offset-4 leading-[0.9] transition-colors w-max "
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Social Icons */}
              <motion.div
                data-cursor
                variants={staggerVariants}
                className="flex gap-6 mt-8"
              >
                {NAV_SOCIAL_ICONS.map((item, idx) => (
                  <SocialIcon key={idx} item={item} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SocialIcon({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      data-cursor
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-hover h-16 w-16 flex items-center justify-center hover:bg-transparent hover:text-[#06482f] transition-all"
    >
      <img
        src={isHovered ? item.hover : item.default}
        alt={item.alt}
        className="w-16 h-16 transition-all duration-300"
      />
    </a>
  );
}

import { useState, useEffect } from 'react';
import images from '../../assets/images';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router';
import { MENU_ITEMS, NAV_SOCIAL_ICONS } from '../../constants/nav';
import OrderButton from './OrderButton';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-10 py-5 z-[40] bg-[var(--_colors---blanco)]">
        <img
        data-cursor
          src={images.paputGreen}
          alt="paputGreen"
          className="h-9 cursor-pointer"
          onClick={() => navigate(ROUTES.LANDING)}
        />

        <div className="flex gap-8 items-center">
          <OrderButton className="h-15 text-xl px-6 tracking-tight" />

          <button
          data-cursor
            onClick={() => setOpen(true)}
            className="h-15 w-15 flex items-center justify-center rounded-full"
          >
            <img src={images.hamburger} alt="menu" className="w-12 h-12" />
          </button>
        </div>
      </nav>

      {/* OVERLAY MENU */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#f6be32] flex flex-col px-6 md:px-10 py-5 h-svh overflow-y-auto">
          {/* TOP BAR (MATCHES NAV EXACTLY) */}
          <div className="flex justify-between items-center w-full">
            <img data-cursor onClick={() => navigate(ROUTES.LANDING)} src={images.paputGreen} alt="logo" className="h-10" />

            <button
            data-cursor
              onClick={() => setOpen(false)}
              className="h-15 w-15 flex items-center justify-center"
            >
              <img src={images.close} alt="close" className="w-12 h-12" />
            </button>
          </div>

          {/* MENU */}
          <div className="flex flex-col gap-2 mt-12 flex-1 justify-center">
            {MENU_ITEMS.map((item, idx) => (
              <a
              data-cursor
                key={idx}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-5xl md:text-4xl lg:text-[5rem] font-black uppercase text-[#06482f] hover:text-[#e54d3a] hover:underline decoration-[#e54d3a] hover:underline-offset-4 leading-[0.9] w-max"
              >
                {item.name}
              </a>
            ))}

            {/* SOCIAL */}
            <div className="flex gap-6 mt-8">
              {NAV_SOCIAL_ICONS.map((item, idx) => (
                <SocialIcon key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
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
      className="h-16 w-16 flex items-center justify-center"
    >
      <img
        src={isHovered ? item.hover : item.default}
        alt={item.alt}
        className="w-16 h-16 transition-all duration-300"
      />
    </a>
  );
}

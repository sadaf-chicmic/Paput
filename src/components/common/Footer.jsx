import { useState } from 'react';
import images from '../../assets/images';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

export default function Footer() {
  const navigate = useNavigate();
  const orderLinks = [
    { name: 'PEDIDOS GRANDES', href: ROUTES.LARGE_ORDERS },
    { name: 'DELIVERY', href: ROUTES.DELIVERY },
    { name: 'TIENDA', href: ROUTES.SHOP },
    { name: 'EVENTOS', href: ROUTES.EVENTS },
  ];

  const socialIcons = [
    {
      default: images.instaFooter,
      hover: images.instaFooterY,
      alt: 'Instagram',
      href: 'https://www.instagram.com',
    },
    {
      default: images.wpFooter,
      hover: images.wpFooterY,
      alt: 'WhatsApp',
      href: 'https://wa.me/34666666666',
    },
    {
      default: images.vehicleFooter,
      hover: images.bikeFooterY,
      alt: 'Delivery',
      href: ROUTES.DELIVERY,
    },
    {
      default: images.musFooter,
      hover: images.musFooterY,
      alt: 'TikTok',
      href: 'https://www.tiktok.com',
    },
  ];

  return (
    <footer className="bg-[var(--_colors---verde)] text-[var(--_colors---amarillo)] py-[60px] md:py-[100px] px-5 sm:px-10 lg:px-[60px] w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr] gap-[48px] md:gap-[60px] lg:gap-[80px]">
        {/* Brand Column */}
        <div className="flex flex-col gap-6 items-start">
          <img
            src={images.paputYellow}
            alt="PAPUT"
            className="w-[180px] mb-6"
          />
          <div className="flex gap-4">
            {socialIcons.map((social, idx) => (
              <SocialIcon key={idx} social={social} />
            ))}
          </div>
        </div>

        {/* Orders Column */}
        <div className="flex flex-col gap-6">
          {orderLinks.map((link, idx) => (
            <a
              key={idx}
              onClick={() => navigate(link.href)}
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[24px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Locations Column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)] hover:underline"
              data-cursor
            >
              CHIRINGUITO
            </a>
            <p className="text-[14px] leading-relaxed text-[var(--_colors---amarillo)] max-w-[320px]">
              Andén de poniente S/N, Puerto de Mahón, Menorca
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)] hover:underline"
              data-cursor
            >
              DELIVERY / TAKE AWAY / DINE IN
            </a>
            <p className="text-[14px] leading-relaxed text-[var(--_colors---amarillo)] max-w-[320px]">
              Avinguda de Josep A. Clavé, 35, Mahón, Menorca
            </p>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 mb-8">
            <h4 className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)]">
              CONTACTO
            </h4>
            <a
              href="mailto:hola@paputmenorca.com"
              className="text-[var(--_colors---amarillo)] no-underline  text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:opacity-70 lowercase hover:underline"
              data-cursor
            >
              hola@paputmenorca.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              COOKIES
            </a>
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              POLÍTICA DE PRIVACIDAD
            </a>
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              TODO LEGAL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ social }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={social.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=" rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden group"
      data-cursor
    >
      <img
        src={isHovered ? social.hover : social.default}
        alt={social.alt}
        className="w-16 h-16 transition-all duration-300"
      />
    </a>
  );
}

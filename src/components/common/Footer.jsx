import { useState } from 'react';
import images from '../../assets/images';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { ORDER_LINKS, FOOTER_SOCIAL_ICONS } from '../../constants/nav';
import { FOOTER_TEXTS as S } from '../../constants/texts';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[var(--_colors---verde)] text-[var(--_colors---amarillo)] py-[60px] md:py-[100px] px-5 sm:px-10 lg:px-[60px] w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr] gap-[48px] md:gap-[60px] lg:gap-[80px]">
        {/* Brand Column */}
        <div className="flex flex-col gap-6 items-start">
          <img
            src={images.paputYellow}
            alt="PAPUT"
            className="w-[180px] mb-6 cursor-pointer"
            data-cursor
            onClick={() => navigate(ROUTES.LANDING)}
          />
          <div className="flex gap-4">
            {FOOTER_SOCIAL_ICONS.map((social, idx) => (
              <SocialIcon key={idx} social={social} />
            ))}
          </div>
        </div>

        {/* Orders Column */}
        <div className="flex flex-col gap-6">
          {ORDER_LINKS.map((link, idx) => (
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.CHIRINGUITO_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)] hover:underline"
              data-cursor
            >
              {S.CHIRINGUITO}
            </a>
            <p className="text-[14px] leading-relaxed text-[var(--_colors---amarillo)] max-w-[320px]">
              {S.CHIRINGUITO_ADDRESS}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.DELIVERY_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)] hover:underline"
              data-cursor
            >
              {S.DELIVERY_LOCATION}
            </a>
            <p className="text-[14px] leading-relaxed text-[var(--_colors---amarillo)] max-w-[320px]">
              {S.DELIVERY_ADDRESS}
            </p>
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 mb-8">
            <h4 className="text-[24px] font-black mb-2 tracking-[0.05em] text-[var(--_colors---amarillo)]">
              {S.CONTACT}
            </h4>
            <a
              href={`mailto:${S.EMAIL}`}
              className="text-[var(--_colors---amarillo)] no-underline  text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:opacity-70 lowercase hover:underline"
              data-cursor
            >
              {S.EMAIL}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              {S.COOKIES}
            </a>
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              {S.PRIVACY}
            </a>
            <a
              href="#"
              className="text-[var(--_colors---amarillo)] no-underline font-black text-[18px] tracking-[0.02em] transition-opacity duration-200 hover:underline"
              data-cursor
            >
              {S.LEGAL}
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
      target={social.href.startsWith('http') ? '_blank' : undefined}
      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

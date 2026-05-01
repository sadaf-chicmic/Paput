import images from '../../assets/images';
import { LANDING_TEXTS } from '../../constants/texts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrderButton from '../common/OrderButton';
import { useEffect, useRef } from 'react';

const { HERO: HERO_STRINGS } = LANDING_TEXTS;
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef=useRef();
  const buttonRef=useRef();
  const contentRef=useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      });

      // TEXT
      tl.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
      })

        // BUTTON (overlapping, not delayed)
        .from(
          buttonRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          '-=0.6',
        ); // <-- THIS is key
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.heroBg}
          alt={HERO_STRINGS.HERO_ALT}
          className="w-full h-full object-cover object-center opacity-95 brightness-70"
          loading="eager"
        />
        {/* Subtle overlay to make text pop if needed, though the image seems dark enough in the screenshot */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="flex flex-col items-center">
        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center text-center px-6 mt-20"
        >
          <p className="text-[#f4f3e6] text-lg md:text-xl lg:text-xl font-medium mb-7">
            {HERO_STRINGS.SUBTITLE}
          </p>

          <h1 className="text-[#f4f3e6] text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] uppercase">
            {HERO_STRINGS.TITLE_PRIMARY}
          </h1>

          <h1 className="text-[#f4f3e6] text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] uppercase mb-10">
            {HERO_STRINGS.TITLE_SECONDARY}
          </h1>
        </div>
        <div ref={buttonRef}>
          <OrderButton className="h-16 md:h-20 text-xl md:text-2xl px-12 tracking-tight" />
        </div>
      </div>
    </section>
  );
}

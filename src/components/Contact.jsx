import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SHARED_TEXTS, ABOUT_TEXTS } from '../constants/texts';
import images from '../assets/images';

gsap.registerPlugin(ScrollTrigger);

const { CONTACT_US } = SHARED_TEXTS;
const { IMAGE_ALTS: CONTACT_STRINGS, ...S } = ABOUT_TEXTS;

export default function Contact() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // INITIAL STATES
      gsap.set(textRef.current, {
        x: -60,
        opacity: 0,
      });

      gsap.set(buttonRef.current, {
        x: -80,
        opacity: 0,
      });

      gsap.set(imageRef.current, {
        scale: 0.8,
        opacity: 0,
      });

      // TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // TEXT (left → right + fade)
      tl.to(textRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out', 
      })

        .to(
          buttonRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.8',
        )

        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
          },
          '-=1', 
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-auto flex flex-col md:flex-row justify-between items-center bg-[#ffc62d] text-[#0a4635] px-[40px] py-50 overflow-hidden"
    >
      {/* TEXT BLOCK */}
      <div
        ref={textRef}
        className="flex flex-col max-w-full md:max-w-[55%] z-10 translate-y-[140px]"
      >
        <h2
          className="text-[55px] sm:text-[70px] md:text-[80px] font-black uppercase leading-[1] mb-6"
          dangerouslySetInnerHTML={{ __html: S.JOIN_HEADING }}
        />

        <p className="text-[18px] md:text-[20px] leading-tight font-medium  mb-8">
          {S.JOIN_DESCRIPTION_PREFIX}
          <span data-cursor onClick={() => window.open(`mailto:${S.JOIN_EMAIL}`)} className="font-black underline decoration-2 underline-offset-4">
            {S.JOIN_EMAIL}
          </span>
          {S.JOIN_DESCRIPTION_SUFFIX}
        </p>

        {/* BUTTON */}
        <button
          ref={buttonRef}
          onClick={() => window.open(`mailto:${S.JOIN_EMAIL}`)}
          className="h-14 px-10 bg-transparent text-[#0a4635] font-black text-lg border-2 border-[#0a4635] w-fit rounded-full uppercase tracking-tight hover:bg-[#0a4635] hover:text-[#ffc62d] transition-colors duration-300"
        >
          {CONTACT_US}
        </button>
      </div>

      {/* IMAGE BLOCK */}
      <div className="absolute bottom-0 right-15 h-full w-full md:w-1/2 flex justify-end items-end pointer-events-none select-none">
        <img
          ref={imageRef}
          src={images.aboutImg}
          alt={CONTACT_STRINGS.ABOUT_IMG_ALT}
          className="max-w-[80%] w-full object-contain object-bottom "
        />
      </div>
    </section>
  );
}

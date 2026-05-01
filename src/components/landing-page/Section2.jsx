import { useEffect, useRef, useState } from 'react';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrderButton from '../common/OrderButton';
import { LANDING_TEXTS } from '../../constants/texts';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_2: SECTION2_STRINGS } = LANDING_TEXTS;

export default function Section2() {
  const sectionRef = useRef(null);
  const carousel = useRef(null);
  const nastrasRef = useRef(null);
  const buttonRef = useRef(null);

  const burgers = [
    { ...SECTION2_STRINGS.BURGERS[0], src: images.burger1 },
    { ...SECTION2_STRINGS.BURGERS[1], src: images.burger2 },
    { ...SECTION2_STRINGS.BURGERS[2], src: images.burger3 },
    { ...SECTION2_STRINGS.BURGERS[3], src: images.burger4 },
    { ...SECTION2_STRINGS.BURGERS[4], src: images.burger5 },
    { ...SECTION2_STRINGS.BURGERS[5], src: images.burger6 },
    { ...SECTION2_STRINGS.BURGERS[6], src: images.burger7 },
    { ...SECTION2_STRINGS.BURGERS[7], src: images.burger8 },
    { ...SECTION2_STRINGS.BURGERS[8], src: images.burger9 },
  ];

useEffect(() => {
  const ctx = gsap.context(() => {
    const items = carousel.current.querySelectorAll('.burger-item');

    const ACTIVE = 1;

    gsap.set(nastrasRef.current, { opacity: 0 });

    gsap.set(items, (i) => {
      if (i === ACTIVE) {
        return { opacity: 0, scale: 1.2, y: 40 };
      }

      if (i === 0) {
        return { opacity: 0, scale: 1.2, y: 40 };
      }

      return { opacity: 0, scale: 0.45, y: 40 };
    });

    gsap.set(buttonRef.current, {
      opacity: 0,
      y: 60,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(nastrasRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    })

      .to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })

      .to(items, {
        scale: 0.9,
        duration: 0.6,
        ease: 'power2.out',
      })

      .to(
        items[ACTIVE],
        {
          scale: 1.2,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5',
      )

      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="py-10 pt-20 overflow-hidden bg-[#f4f3e6]">
      {/* NASTRAS IMAGE */}
      <div className="flex justify-center">
        <img
          ref={nastrasRef}
          src={images.nastras}
          alt={SECTION2_STRINGS.OUR_BURGERS_ALT}
          className="max-w-[28vw] mb-12"
        />
      </div>

      {/* CAROUSEL */}
      <div ref={carousel}>
        <div className="flex gap-8 px-10">
          {burgers.map((burger, index) => (
            <div
              key={index}
              className="burger-item min-w-[300px] md:min-w-[400px] flex flex-col items-center text-center"
            >
              <div className="w-full h-[300px] flex items-center justify-center mb-6">
                <img
                  src={burger.src}
                  alt={burger.title}
                  className="max-w-full max-h-full object-contain"
                  draggable="false"
                />
              </div>

              <h3 className="text-3xl font-black text-[#1a3a2a] mb-2">
                {burger.title}
              </h3>

              <p className="text-[#1a3a2a] text-sm max-w-[250px] font-medium leading-relaxed">
                {burger.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div ref={buttonRef} className="flex justify-center mt-20">
        <OrderButton className="px-12 py-5 text-xl" />
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrderButton from '../common/OrderButton';
import { LANDING_TEXTS } from '../../constants/texts';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_2: SECTION2_STRINGS } = LANDING_TEXTS;

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

export default function Section2() {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null); // the overflow-x div
  const nastrasRef = useRef(null);
  const buttonRef = useRef(null);

  // Which card index is currently "active" (closest to center)
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Active card detection on scroll ──────────────────────────────────
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;

      // Find the card whose center is closest to the scroller's center
      let closest = 0;
      let closestDist = Infinity;

      scroller.querySelectorAll('.burger-card').forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - scrollerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount so card 0 starts scaled up
    onScroll();

    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  // ── GSAP entrance — fires only when section enters the viewport ───────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start both hidden
      gsap.set(nastrasRef.current, { opacity: 0 });
      gsap.set(buttonRef.current, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // fires when section top reaches 80% down the screen
            once: true,
          },
        })
        .to(nastrasRef.current, {
          opacity: 1,
          duration: 1.6,
          ease: 'power2.out',
        })
        .to(
          buttonRef.current,
          { opacity: 1, duration: 3, ease: 'power1.out' },
          '-=0.8',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-20 pb-10 bg-[#f4f3e6] overflow-hidden select-none"
    >
      {/* Heading image */}
      <div className="flex justify-center mt-8 mb-4">
        <img
          ref={nastrasRef}
          src={images.nastras}
          alt={SECTION2_STRINGS.OUR_BURGERS_ALT}
          className="max-w-[28vw] pointer-events-none"
        />
      </div>

      {/* Carousel — native browser horizontal scroll */}
      <div
        ref={scrollerRef}
        className="
          overflow-x-auto overflow-y-hidden
          scroll-smooth
          cursor-grab active:cursor-grabbing
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
        style={{ touchAction: 'pan-x' }}
      >
        <div className="flex gap-8 pl-10 pr-150  w-max">
          {burgers.map((burger, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                className={`
                  burger-card
                  flex flex-col items-center text-center shrink-0
                  w-[400px] md:w-[520px]
                  pointer-events-none
                  transition-transform duration-500 ease-out
                  ${isActive ? 'scale-100' : 'scale-[0.82]'}
                `}
              >
                {/* Burger image */}
                <div className="w-full h-[320px] md:h-[420px] flex items-center justify-center mb-6">
                  <img
                    src={burger.src}
                    alt={burger.title}
                    draggable="false"
                    className="max-w-full max-h-full object-contain pointer-events-none"
                  />
                </div>

                {/* Name */}
                <h3 className="text-2xl md:text-3xl font-black text-[#1a3a2a] uppercase tracking-tight mb-3 leading-tight">
                  {burger.title}
                </h3>

                {/* Description */}
                <p className="text-[#1a3a2a] text-base font-medium leading-relaxed max-w-[300px]">
                  {burger.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA button */}
      <div ref={buttonRef} className="flex justify-center mt-8">
        <OrderButton className="px-8 py-4 text-xl" />
      </div>
    </section>
  );
}

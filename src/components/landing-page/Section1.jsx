import { useEffect, useRef, useState } from 'react';
import { LANDING_TEXTS } from '../../constants/texts';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_1: SECTION1_STRINGS, SOCIAL } = LANDING_TEXTS;
const { INSTAGRAM: INSTAGRAM_LINK } = SOCIAL;

export default function Section1() {
  const [hovered, setHovered] = useState(false);

  const sectionRef = useRef(null);
  const textBlockRef = useRef(null);
  const grillRef = useRef(null);
  const slidingRef = useRef(null);

  const line3Parts = SECTION1_STRINGS.DESCRIPTION.split(
    SECTION1_STRINGS.BURGERS_KEYWORD,
  );
  const prefix = line3Parts[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          toggleActions: 'play none none none',
        },
      });

      t1.from(grillRef.current, {
        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }).from(
        textBlockRef.current.children,
        {
          x: -80,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.7',
      );

const el = slidingRef.current;

const trigger = ScrollTrigger.create({
  trigger: el,
  start: 'bottom bottom',

  onEnter: runAnimation,
  onEnterBack: runAnimation,
});

function runAnimation() {
  // stop any running animation on element
  gsap.killTweensOf(el);

  // reset state cleanly
  gsap.set(el, {
    x: 120,
    opacity: 0.5,
  });

  // entrance animation (no from(), use to())
  gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
  });
}

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f4f3e6] w-full overflow-x-hidden pt-15 lg:px-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="flex flex-col">
          <div ref={textBlockRef} className="justify-center">
            <h1 className="text-[clamp(40px,12vw,80px)] font-black text-[#ffc62d] uppercase leading-[1] mb-4">
              {SECTION1_STRINGS.HEADING_1}
            </h1>

            <p className="text-xl lg:text-[20px] text-[#0a4635] font-medium leading-[1]">
              {prefix}{' '}
              <span className="font-bold">
                {SECTION1_STRINGS.BURGERS_KEYWORD}.
              </span>
            </p>
          </div>

          {/* INSTAGRAM TAG */}
          <div className="w-full flex relative z-50">
            <img
              data-cursor
              onClick={() => window.open(INSTAGRAM_LINK, '_blank')}
              src={hovered ? images.tagGreen : images.tag}
              alt={SECTION1_STRINGS.INSTAGRAM_TAG}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-[240px] md:w-[240px] -rotate-10 pt-12 translate-x-110"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div
            ref={grillRef}
            className="rounded-[20px] overflow-hidden aspect-square"
          >
            <img
              src={images.grill}
              alt={SECTION1_STRINGS.GRILL_ALT}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            ref={slidingRef}
            className="rounded-[20px] overflow-hidden aspect-square"
            style={{ willChange: 'transform' }}
          >
            <img
              src={images.slidingImg}
              alt={SECTION1_STRINGS.SLIDING_IMG_ALT}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

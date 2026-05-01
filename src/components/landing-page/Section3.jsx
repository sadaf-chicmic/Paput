import { useEffect, useRef } from 'react';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundPattern from './BackgroundPattern.jsx';
import OrderButton from '../common/OrderButton';
import { LANDING_TEXTS } from '../../constants/texts';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_3: SECTION3_STRINGS } = LANDING_TEXTS;

export default function Section3() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const shirtRef = useRef(null);
  const mottoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(shirtRef.current, { y: 80, opacity: 0 });
      gsap.set(mottoRef.current, { y: 60, opacity: 0 });
      gsap.set(buttonRef.current, { y: 60, opacity: 0 });

      gsap
        .to(shirtRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: shirtRef.current,
            start: 'top 90%',
            once: true,
          },
        });

      gsap.to(mottoRef.current, {
        y: 0,
        opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mottoRef.current,
              start: 'bottom bottom',
              once: true,
            },
          },
        )

      gsap.to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'bottom bottom',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f3e6] overflow-visible">
      <div className="relative flex-col items-center justify-center overflow-visible">
        <BackgroundPattern />

        <div className="px-3 pt-2 flex flex-col items-center gap-8">
          <img
            ref={shirtRef}
            src={images.mainShirt}
            alt={SECTION3_STRINGS.SHIRT_ALT}
            className="mt-44 w-full max-w-[450px] aspect-square object-cover rounded-[30px]"
          />
          <p
            ref={mottoRef}
            className="text-[4.5vw] md:text-[3.5vw] lg:text-[40px] font-black text-center leading-[1] max-w-[80vw] uppercase"
          >
            {SECTION3_STRINGS.MOTTO}
          </p>

          <div ref={buttonRef} className="pb-20">
            <OrderButton
              label={SECTION3_STRINGS.STORE_BUTTON_LABEL}
              onClick={() => navigate(ROUTES.SHOP)}
              className="px-12 py-5 text-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrderButton from '../common/OrderButton';
import BackgroundPattern from './BackgroundPattern.jsx';
import { LANDING_TEXTS } from '../../constants/texts';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_3: SECTION3_STRINGS, SECTION_4: SECTION4_STRINGS } =
  LANDING_TEXTS;

export default function Section3And4() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);

  const shirtRef = useRef(null);
  const mottoRef = useRef(null);
  const buttonRef = useRef(null);

  const mottoDivRef = useRef(null);


  const iconRefs = useRef([]);
  const textRefs = useRef([]);
  const footerRef = useRef(null);

  const items = [
    {
      icon: images.icon1,
      title: 'CHIRINGUITO / RESTAURANTE',
      location: 'Andén de poniente S/N, Puerto de Mahón',
      description:
        'Domingo a Jueves 12:00H a 22:30H <br/> Viernes y sábado 12:00H a 23:30H',
    },
    {
      icon: images.icon2,
      title: 'DELIVERY / TAKE AWAY / DINE IN',
      location: 'Avinguda de Josep A. Clavé, 35, Mahón',
      description: 'Todos los días de 19:30H a 23:00H',
    },
  ];

  const setIconRef = (el, i) => {
    iconRefs.current[i] = el;
  };

  const setTextRef = (el, i) => {
    textRefs.current[i] = el;
  };

useEffect(() => {
  const ctx = gsap.context(() => {
    // ---------------- INITIAL STATES ----------------
    gsap.set(shirtRef.current, { y: 80, opacity: 0 });

    gsap.set(mottoRef.current, { y: 60, opacity: 0 });
    gsap.set(buttonRef.current, { y: 60, opacity: 0 });

    gsap.set(iconRefs.current, {
      y: '-100vh',
      opacity: 0,
    });

    gsap.set(textRefs.current, {
      y: 50,
      opacity: 0,
    });

    gsap.set(footerRef.current, {
      y: 40,
      opacity: 0,
    });

    // ---------------- SINGLE MASTER TIMELINE ----------------
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // SECTION 3
    tl.to(shirtRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })

      .to(
        mottoRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6',
      )

      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.4',
      )

      // SECTION 4 ICONS
      .to(iconRefs.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'bounce.out',
      })

      // TEXT BLOCK
      .to(textRefs.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })

      // FOOTER
      .to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f3e6] overflow-visible">
      <div className="relative flex-col items-center justify-center overflow-visible">
        <BackgroundPattern />

        <div className="px-3 pt-2 flex flex-col items-center gap-12">
          <img
            ref={shirtRef}
            src={images.mainShirt}
            alt={SECTION3_STRINGS.SHIRT_ALT}
            className="mt-44 w-full max-w-[500px] aspect-square object-cover rounded-[30px]"
          />
          <p
            ref={mottoRef}
            className="text-[4.5vw] md:text-[3.5vw] lg:text-[40px] font-black text-center leading-[1] max-w-[80vw] mt-6 uppercase"
          >
            {SECTION3_STRINGS.MOTTO}
          </p>

          <div ref={buttonRef} className='pb-30'>
            <OrderButton
              label={SECTION3_STRINGS.STORE_BUTTON_LABEL}
              onClick={() => navigate(ROUTES.SHOP)}
              className="px-12 py-5 text-xl"
            />
          </div>
        </div>
  
        <div className="flex flex-col items-center">
          {/* ICONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full mb-16 px-4 md:px-10 pt-20">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div ref={(el) => setIconRef(el, index)} className="mb-8 z-30">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-20 w-auto object-contain"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    ref={(el) => setTextRef(el, index * 3)}
                    className="text-[30px] font-black uppercase"
                  >
                    {item.title}
                  </h3>

                  <p
                    ref={(el) => setTextRef(el, index * 3 + 1)}
                    className="text-[18px] opacity-80"
                  >
                    {item.location}
                  </p>

                  <div
                    ref={(el) => setTextRef(el, index * 3 + 2)}
                    className="text-[22px] font-bold leading-[1.2]"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <p
            ref={footerRef}
            className="text-center text-[20px] opacity-80 px-4 pb-20"
          >
            {SECTION4_STRINGS.FOOTER_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import images from '../../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LANDING_TEXTS } from '../../constants/texts';

gsap.registerPlugin(ScrollTrigger);

const { SECTION_4: SECTION4_STRINGS } = LANDING_TEXTS;

export default function Section4() {
  const sectionRef = useRef(null);
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

      // ---------------- TIMELINE ----------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          once: true,
        },
      });

      tl.to(iconRefs.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'bounce.out',
      })
        .to(textRefs.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, '-=0.8')
        .to(footerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f3e6] overflow-visible  mt-50">
      <div className="relative flex flex-col items-center justify-center overflow-visible">
        {/* ICONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full mb-16 px-4 md:px-10">
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
    </section>
  );
}

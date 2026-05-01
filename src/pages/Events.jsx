import { useEffect, useRef } from 'react';
import images from '../assets/images';
import { EVENTS_TEXTS } from '../constants/texts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { EVENTS_LIST: EVENTS_DATA } = EVENTS_TEXTS;

export default function Events() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const eventsRef = useRef([]);

  eventsRef.current = [];

  const addToRefs = (el) => {
    if (el && !eventsRef.current.includes(el)) {
      eventsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER stays same
      gsap.from([headerRef.current, lineRef.current], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // EACH EVENT animates when it enters view
      eventsRef.current.forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events = EVENTS_DATA.map((e, i) => ({
    ...e,
    image: [images.event1, images.event2, images.event3, images.event4, images.event5, images.event6, images.event7, images.event8][i],
  }));

  return (
    <main
      ref={sectionRef}
      className="w-full min-h-screen py-32 px-4 md:px-12 flex flex-col items-center"
    >
      <section className="w-full max-w-[90vw]">
        {/* HEADER */}
        <div className="flex justify-center mb-16">
          <img
            ref={headerRef}
            src={images.eventos}
            alt="Eventos"
            className="w-full max-w-[400px]"
          />
        </div>

        {/* EVENTS */}
        <div className="flex flex-col w-full ">
          {events.map((event, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="flex flex-col md:flex-row items-center justify-between py-10 border-t gap-8 md:gap-16 last:border-b"
            >
              <div className="flex flex-col gap-2 w-full md:w-[60%]">
                <p className="text-[25px] font-medium">{event.date}</p>

                <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-[var(--_colors---verde)] tracking-tight">
                  {event.title}
                </h2>

                <p className="text-[25px] font-bold">{event.description}</p>
              </div>

              {event.image && (
                <div className="w-full md:w-[20%] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

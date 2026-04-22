import images from '../assets/images';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp2 } from '../constants/utils.js';

export default function Events() {
  const events = [
    {
      date: 'TBA → TBA',
      title: 'TEMPORADA 2026',
      description: 'TBA',
      image: images.event1,
    },
    {
      date: 'TBA',
      title: 'PRÓXIMAMENTE',
      description: 'TBA',
    },
  ];

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      viewport={{ once: false, margin: '-100px' }}
      className="w-full min-h-screen py-32 px-4 md:px-12 flex flex-col items-center"
    >
      <motion.section variants={fadeInUp2} className="w-full max-w-[90vw]">
        <div className="flex justify-center mb-16">
          <img
            src={images.eventos}
            alt="Eventos"
            className="w-full max-w-[400px] h-auto"
          />
        </div>

        <hr className="w-full border-t border-[var(--_colors---verde)]" />

        <div className="flex flex-col w-full">
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={fadeInUp2}
              className="flex flex-col md:flex-row items-center justify-between py-10 md:py-10 border-b border-[var(--_colors---verde)] gap-8 md:gap-16 last:border-b-0"
            >
              <div className="flex flex-col gap-2 w-full md:w-[60%]">
                <p className="text-[25px] font-medium">
                  {event.date}
                </p>
                <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-[var(--_colors---verde)] tracking-tight">
                  {event.title}
                </h2>
                <p className="text-[25px] font-bold ">
                  {event.description}
                </p>
              </div>

              {event.image && (
                <div className="w-full md:w-[20%] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-cover grayscale-0"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}

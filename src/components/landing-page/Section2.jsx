import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import images from '../../assets/images';
import { fadeInUp, staggerContainer, fadeZoom } from '../../constants/utils';
import OrderButton from '../common/OrderButton';
import { SECTION2_STRINGS } from '../../constants/strings';

export default function Section2() {
  const [width, setWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const carousel = useRef();
  const x = useMotionValue(0);

  const burgers = [
    {
      ...SECTION2_STRINGS.BURGERS[0],
      src: images.burger1,
    },
    {
      ...SECTION2_STRINGS.BURGERS[1],
      src: images.burger2,
    },
    {
      ...SECTION2_STRINGS.BURGERS[2],
      src: images.burger3,
    },
    {
      ...SECTION2_STRINGS.BURGERS[3],
      src: images.burger4,
    },
    {
      ...SECTION2_STRINGS.BURGERS[4],
      src: images.burger5,
    },
    {
      ...SECTION2_STRINGS.BURGERS[5],
      src: images.burger6,
    },
    {
      ...SECTION2_STRINGS.BURGERS[6],
      src: images.burger7,
    },
    {
      ...SECTION2_STRINGS.BURGERS[7],
      src: images.burger8,
    },
    {
      ...SECTION2_STRINGS.BURGERS[8],
      src: images.burger9,
    },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        const totalScrollWidth = carousel.current.scrollWidth;
        const offsetWidth = carousel.current.offsetWidth;
        setWidth(totalScrollWidth - offsetWidth);

        const firstItem = carousel.current.querySelector('.burger-item');
        if (firstItem) {
          // 32 is the gap (gap-8 = 2rem = 32px)
          setItemWidth(firstItem.offsetWidth + 32);
        }
      }
    };

    updateWidth();
    // Use a small timeout to ensure DOM is fully rendered
    const timer = setTimeout(updateWidth, 100);

    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, []);

  useMotionValueEvent(x, 'change', (latest) => {
    if (itemWidth) {
      const index = Math.round(Math.abs(latest) / itemWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (!itemWidth) return;

      if (e.key === 'ArrowRight') {
        const nextIndex = Math.min(activeIndex + 1, burgers.length - 1);
        const newX = -nextIndex * itemWidth;
        animate(x, Math.max(newX, -width), {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        });
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = Math.max(activeIndex - 1, 0);
        const newX = -prevIndex * itemWidth;
        animate(x, Math.min(newX, 0), {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        });
      }
    },
    [width, x, activeIndex, itemWidth, burgers.length],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 overflow-hidden bg-[#f4f3e6]"
    >
      <motion.div variants={fadeZoom} className="flex justify-center mb-16">
        <img
          src={images.nastras}
          alt={SECTION2_STRINGS.NUESTRAS_BURGERS_ALT}
          className="max-w-[40vw]"
        />
      </motion.div>

      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing overflow-visible"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{
            power: 0.2,
            timeConstant: 200,
            modifyTarget: (target) => {
              if (!itemWidth) return target;
              return Math.round(target / itemWidth) * itemWidth;
            },
          }}
          style={{ x }}
          className="flex gap-8 px-10"
        >
          {burgers.map((burger, index) => (
            <motion.div
              key={index}
              variants={fadeInUp2}
              animate={{
                scale: activeIndex === index ? 1.05 : 0.95,
                opacity: activeIndex === index ? 1 : 0.7,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="burger-item min-w-[300px] md:min-w-[400px] flex flex-col items-center text-center"
            >
              <div className="w-full h-[300px] flex items-center justify-center mb-6">
                <img
                  src={burger.src}
                  alt={burger.title}
                  className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500 cursor-pointer"
                  draggable="false"
                />
              </div>
              <h3 className="text-3xl font-black text-[#1a3a2a] mb-2">
                {burger.title}
              </h3>
              <p className="text-[#1a3a2a] text-sm max-w-[250px] font-medium leading-relaxed">
                {burger.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-center mt-20">
        <OrderButton className="px-12 py-5 text-xl" />
      </motion.div>
    </motion.section>
  );
}

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import images from '../../assets/images';

export default function Section2() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const burgers = [
    {
      title: 'LA CLÁSICA',
      description: 'Lechuga, tomate, cheddar y mayonesa.',
      src: images.burger1,
    },
    {
      title: 'BACON CHEESE',
      description: 'Cheddar, bacon y mayonesa.',
      src: images.burger2,
    },
    {
      title: 'MCATOL',
      description: 'Doble cheddar, bacon, pepinillos y salsa Macatol.',
      src: images.burger3,
    },
    {
      title: 'FORA FÚA (VEGANA)',
      description:
        'Burger de Heura, cheddar vegano, lechuga, tomate, cebolla morada y salsa Bahiana vegana.',
      src: images.burger4,
    },
    {
      title: 'MARCO PAQUETTI',
      description: 'Rúcula, scamorza, guanciale, tomate seco y mayo pesto.',
      src: images.burger5,
    },
    {
      title: 'TRUFA MEL·LA',
      description:
        'Queso provolone fundido, champiñones salteados, cebolla caramelizada y mayo trufa.',
      src: images.burger6,
    },
    {
      title: 'PAPUT',
      description: 'Lechuga, queso de Mahón, sobrasada, miel y mayo romero.',
      src: images.burger7,
    },
    {
      title: 'GUIRIGALL',
      description:
        'Cheddar, mermelada de bacon y mayonesa de cebolla caramelizada.',
      src: images.burger8,
    },
    {
      title: 'BIG PONS',
      description:
        'Contramuslo de pollo rebozado, lechuga, cheddar y mayo sweet chili.',
      src: images.burger9,
    },
  ];

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-20 px-4 md:px-10 bg-[#f4f3e6] overflow-hidden">
      <div className="flex justify-center mb-16">
        <img
          src={images.nastras}
          alt="Nuestras Burgers"
          className="w-10 max-w-[30vw]"
        />
      </div>

      <motion.div
        ref={carousel}
        className="cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-8 md:gap-12"
        >
          {burgers.map((burger, index) => (
            <motion.div
              key={index}
              className="min-w-[280px] md:min-w-[400px] flex flex-col items-center text-center group"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative w-full aspect-square mb-6">
                <motion.img
                  src={burger.src}
                  alt={burger.title}
                  className="w-full h-full object-contain"
                  layoutId={`burger-${index}`}
                />
              </div>
              <h2 className="text-[#1a4d2e] text-2xl md:text-3xl font-black mb-3 uppercase tracking-tighter">
                {burger.title}
              </h2>
              <p className="text-[#1a4d2e] text-sm md:text-base max-w-[250px] font-medium leading-tight">
                {burger.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

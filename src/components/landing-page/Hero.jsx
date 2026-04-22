import { motion } from 'framer-motion';
import images from '../../assets/images';
import { HERO_STRINGS } from '../../constants/strings';
import { ROUTES } from '../../constants/routes';

import { navFadeInUp, staggerContainer } from '../../constants/utils';
import OrderButton from '../common/OrderButton';

export default function Hero() {
  return (
    <section className="relative h-svh w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={images.heroBg}
          alt="Paput Hero"
          className="w-full h-full object-cover object-center opacity-95 brightness-70"
        />
        {/* Subtle overlay to make text pop if needed, though the image seems dark enough in the screenshot */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center text-center px-6 mt-20"
      >
        <motion.p
          variants={navFadeInUp}
          className="text-[#f4f3e6] text-lg md:text-xl lg:text-xl font-medium mb-7"
        >
          {HERO_STRINGS.LINE1}
        </motion.p>

        <motion.h1
          variants={navFadeInUp}
          className="text-[#f4f3e6] text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] uppercase"
        >
          {HERO_STRINGS.LINE2}
        </motion.h1>

        <motion.h1
          variants={navFadeInUp}
          className="text-[#f4f3e6] text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] uppercase mb-10"
        >
          {HERO_STRINGS.LINE3}
        </motion.h1>

        <OrderButton
          variants={navFadeInUp}
          className="h-16 md:h-20 text-xl md:text-2xl px-12 tracking-tight"
        />
      </motion.div>
    </section>
  );
}

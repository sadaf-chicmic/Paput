import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInUp,
  fadeZoom,
  fadeInLeft,
  fadeInRight,
} from '../constants/animations';
import { SHARED_TEXTS, ABOUT_TEXTS } from '../constants/texts';
const { CONTACT_US } = SHARED_TEXTS;
const { IMAGE_ALTS: CONTACT_STRINGS, ...S } = ABOUT_TEXTS;
import images from '../assets/images';

export default function Contact() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative flex flex-col md:flex-row items-center bg-[#ffc62d] text-[#0a4635] px-10 md:px-32 py-24 md:py-40 min-h-[500px] md:min-h-[75vh] overflow-hidden"
    >
      <motion.div
        variants={fadeInLeft}
        className="flex flex-col gap-6 md:gap-4 max-w-full md:max-w-[50%] z-10"
      >
        <h2
          className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[115px] font-black uppercase leading-[0.8] "
          dangerouslySetInnerHTML={{ __html: S.JOIN_HEADING }}
        />
        <p className="text-[17px] md:text-[22px] leading-tight font-medium max-w-[90%] mt-6">
          {S.JOIN_DESCRIPTION_PREFIX}
          <span
            className="font-black underline decoration-2 underline-offset-4"
            data-cursor
          >
            {S.JOIN_EMAIL}
          </span>
          {S.JOIN_DESCRIPTION_SUFFIX}
        </p>
        <motion.button
          data-cursor
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('mailto:[EMAIL_ADDRESS]')}
          className="h-14 px-10 bg-transparent text-[#0a4635] font-black text-lg border-[2px] border-[#0a4635] w-fit rounded-full uppercase tracking-tight hover:bg-[#0a4635] hover:text-[#ffc62d] transition-colors duration-300 mt-10"
        >
          {CONTACT_US}
        </motion.button>
      </motion.div>
      <motion.div
        variants={fadeInRight}
        className="absolute bottom-0 right-0 w-[70%] md:w-[50%] lg:w-[45%] flex justify-end items-end pointer-events-none select-none "
      >
        <motion.img
          variants={fadeZoom}
          src={images.aboutImg}
          alt={CONTACT_STRINGS.ABOUT_IMG_ALT}
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.section>
  );
}

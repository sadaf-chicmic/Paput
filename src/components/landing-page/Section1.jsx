import { useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING_TEXTS } from '../../constants/texts';
const { SECTION_1: SECTION1_STRINGS, SOCIAL } = LANDING_TEXTS;
const { INSTAGRAM: INSTAGRAM_LINK } = SOCIAL;
import { fadeInLeft, fadeInRight } from '../../constants/animations';
import images from '../../assets/images';

export default function Section1() {
  const [hovered, setHovered] = useState(false);

  // Split DESCRIPTION for bolding
  const line3Parts = SECTION1_STRINGS.DESCRIPTION.split(
    SECTION1_STRINGS.BURGERS_KEYWORD,
  );
  const prefix = line3Parts[0];

  return (
    <section className="bg-[#f4f3e6] pt-15 pb-12 lg:pt-15 lg:pb-24 px-8 lg:px-10 selection:bg-[#ffc62d] selection:text-[#0a4635]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px', duration: 2 }}
          variants={fadeInLeft}
          className="flex flex-col"
        >
          <div className="flex flex-col -space-y-3 lg:-space-y-10 mb-4 lg:mb-6">
            <h1 className="text-[12vw] lg:text-[90px] font-black text-[#ffc62d] leading-[0.75] pb-14 uppercase">
              {SECTION1_STRINGS.HEADING_1}
            </h1>
            <h1 className="text-[12vw] lg:text-[90px] font-black text-[#ffc62d] leading-[0.75] uppercase">
              {SECTION1_STRINGS.HEADING_2}
            </h1>
          </div>

          <div className="mb-8 lg:mb-15">
            <p className="text-xl lg:text-[22px] text-[#0a4635] font-medium">
              {prefix}{' '}
              <span className="font-bold">
                {SECTION1_STRINGS.BURGERS_KEYWORD}.
              </span>
            </p>
          </div>

          <div
            className="w-fit transition-transform duration-300 hover:scale-102"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              data-cursor
              onClick={() => window.open(INSTAGRAM_LINK, '_blank')}
              src={hovered ? images.tagGreen : images.tag}
              alt={SECTION1_STRINGS.INSTAGRAM_TAG}
              className="w-[280px] ml-150 -rotate-18"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Right Images */}
        <div className="flex  md:flex-row gap-3 lg:gap-3 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="flex-[1] overflow-hidden rounded-[20px] w-full aspect-[4/5] lg:h-[500px] group shadow-sm"
          >
            <img
              src={images.grill}
              alt={SECTION1_STRINGS.GRILL_ALT}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInRight}
            className="flex-1 overflow-hidden rounded-[20px] w-full aspect-[4/5] lg:h-[500px] group shadow-sm"
          >
            <img
              src={images.slidingImg}
              alt={SECTION1_STRINGS.SLIDING_IMG_ALT}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

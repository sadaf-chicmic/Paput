import images from '../assets/images';
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeZoom,
} from '../constants/animations';
import { motion } from 'framer-motion';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router';
import { ABOUT_TEXTS as S } from '../constants/texts';
import OrderButton from '../components/common/OrderButton';
import Contact from '../components/Contact';

const Polaroid = ({ src, alt, rotation = 'rotate-0', className = '' }) => (
  <div
    className={`p-3 inline-block transition-transform duration-300  max-w-[300px] ${rotation} ${className}`}
  >
    <img src={src} alt={alt} className=" w-full object-cover" loading="lazy" />
  </div>
);

export default function About() {
  return (
    <>
      <div className="mx-auto pb-32 px-40 flex flex-col gap-32 overflow-x-hidden font-['Roc_Grotesk'] text-[#0a4635] pt-[18vh]">
        {/* Section 1 */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            className="flex-1 text-[30px]  leading-[1.1] max-w-[38vw]"
            variants={fadeInLeft}
          >
            {S.INTRO}
            <span className=" font-black mt-2">{S.INTRO_BOLD}</span>
          </motion.p>
          <motion.div
            variants={fadeInRight}
            className="flex-1 flex justify-center md:justify-end pr-10"
          >
            <Polaroid src={images.image1} alt="Burgers" rotation="rotate-8" />
          </motion.div>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            className="flex-1 text-[30px]  leading-[1.1] max-w-[38vw]"
            variants={fadeInRight}
          >
            {S.DJ_SECTION}
            <span className=" font-black mt-2">{S.DJ_BOLD}</span>
            {S.DJ_SUFFIX}
          </motion.p>
          <motion.div
            variants={fadeInLeft}
            className="flex-1 flex justify-center md:justify-start -space-x-12 md:-space-x-16"
          >
            <Polaroid src={images.image2} alt="People 1" rotation="rotate-8" />
            <Polaroid
              src={images.image3}
              alt="People 2"
              rotation="-rotate-6"
              className="mt-8"
            />
          </motion.div>
        </motion.section>

        {/* SOMOS TODO ESTO */}
        <motion.section
          className="flex flex-col items-center gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase ">
            {S.WE_ARE_ALL_THIS}
          </h2>
          <div className="flex justify-center -space-x-16 md:-space-x-12">
            <motion.section
              variants={fadeInLeft}
              className="-space-x-16 md:-space-x-12"
            >
              <Polaroid
                src={images.image4}
                alt="Info 1"
                rotation="-rotate-10"
                className="mt-12"
              />
              <Polaroid
                src={images.image5}
                alt="Info 2"
                rotation="rotate-2"
                className="-mt-12"
              />
            </motion.section>
            <motion.section
              variants={fadeInRight}
              className="-space-x-16 md:-space-x-12"
            >
              <Polaroid
                src={images.image6}
                alt="Info 3"
                rotation="-rotate-12"
                className="-mt-12"
              />
              <Polaroid
                src={images.image7}
                alt="Info 4"
                rotation="rotate-6"
                className="mt-12"
              />
            </motion.section>
          </div>
        </motion.section>

        {/* MUCHO DE ESTO */}
        <motion.section
          className="flex flex-col items-center gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase ">
            {S.A_LOT_OF_THIS}
          </h2>
          <div
            className="flex flex-nowrap justify-center items-center px-8 mt-12"
            style={{ gap: 0 }}
          >
            <div className="shrink-0 -mr-10 md:-mr-14 lg:-mr-16">
              <Polaroid
                src={images.image8}
                alt="Food 1"
                rotation="rotate-6"
                className="-mt-4"
              />
            </div>
            <motion.section
              variants={fadeInLeft}
              className="flex shrink-0 -mr-10 md:-mr-14 lg:-mr-16"
            >
              <div className="-mr-16 md:-mr-12">
                <Polaroid
                  src={images.image9}
                  alt="Food 2"
                  rotation="-rotate-6"
                  className="mt-6"
                />
              </div>
              <div>
                <Polaroid
                  src={images.image10}
                  alt="Food 3"
                  rotation="rotate-8"
                  className="-mb-6"
                />
              </div>
            </motion.section>
            <motion.section
              variants={fadeInRight}
              className="flex shrink-0 -mr-10 md:-mr-14 lg:-mr-16"
            >
              <div className="-mr-16 md:-mr-12">
                <Polaroid
                  src={images.image11}
                  alt="Food 4"
                  rotation="-rotate-6"
                  className="mb-14"
                />
              </div>
              <div>
                <Polaroid
                  src={images.image12}
                  alt="Food 5"
                  rotation="rotate-8"
                  className="mt-2"
                />
              </div>
            </motion.section>
            <div className="shrink-0">
              <Polaroid
                src={images.image13}
                alt="Food 6"
                rotation="-rotate-8"
                className="mt-0"
              />
            </div>
          </div>
        </motion.section>

        {/* Y SOBRETODO DE ESTOS */}
        <motion.section
          className="flex flex-col items-center gap-12 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase  text-center">
            {S.ESPECIALLY_THESE}
          </h2>
          <div className="flex flex-wrap justify-center -space-x-10 md:-space-x-3">
            <motion.section
              variants={fadeInLeft}
              className="-space-x-16 md:-space-x-8"
            >
              <Polaroid
                src={images.image14}
                alt="Pet 1"
                rotation="-rotate-12"
                className="-mt-8"
              />
              <Polaroid
                src={images.image15}
                alt="Pet 2"
                rotation="rotate-8"
                className="mt-8"
              />
            </motion.section>
            <motion.section
              variants={fadeInRight}
              className="-space-x-16 md:-space-x-12"
            >
              <Polaroid
                src={images.image16}
                alt="Pet 3"
                rotation="-rotate-9"
                className="-mt-8 text-center"
              />
              <Polaroid
                src={images.image17}
                alt="Pet 4"
                rotation="rotate-12"
                className="mt-12"
              />
            </motion.section>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.section
          className="flex flex-col items-center gap-12 text-center mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p
            className="flex-1 text-[30px]  leading-[1.1] max-w-[70vw]"
            variants={fadeInUp}
          >
            {S.FOOTER_DESCRIPTION}
          </motion.p>
          <OrderButton
            variants={fadeInUp}
            className="h-16 px-12 text-2xl tracking-tight"
          />
        </motion.section>
      </div>
      <Contact />
    </>
  );
}

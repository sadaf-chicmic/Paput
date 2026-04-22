import images from '../assets/images';
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeZoom,
} from '../constants/utils';
import { motion } from 'framer-motion';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router';
import {
  HACER_PEDIDO,
  CONTACTANOS,
  ABOUT_STRINGS as S,
} from '../constants/strings';

const Polaroid = ({ src, alt, rotation = 'rotate-0', className = '' }) => (
  <div
    className={`p-3 inline-block transition-transform duration-300  max-w-[300px] ${rotation} ${className}`}
  >
    <img src={src} alt={alt} className=" w-full object-cover" />
  </div>
);

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto pb-32 px-40 flex flex-col gap-32 overflow-x-hidden font-['Roc_Grotesk'] text-[#0a4635] pt-[18vh]">
        {/* Section 1 */}
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
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
          viewport={{ once: false, margin: '-100px' }}
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
          viewport={{ once: false, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase ">{S.SOMOS}</h2>
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
          viewport={{ once: false, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase ">{S.MUCHO}</h2>
          <div className="flex flex-nowrap justify-center -space-x-10 md:-space-x-14 lg:-space-x-16 px-8 mt-12">
            <Polaroid
              src={images.image8}
              alt="Food 1"
              rotation="rotate-6"
              className="-mt-4"
            />
            <motion.section
              variants={fadeInLeft}
              className="-space-x-16 md:-space-x-12"
            >
              <Polaroid
                src={images.image9}
                alt="Food 2"
                rotation="-rotate-6"
                className="mt-6"
              />
              <Polaroid
                src={images.image10}
                alt="Food 3"
                rotation="rotate-8"
                className="-mb-6"
              />
            </motion.section>
            <motion.section
              variants={fadeInRight}
              className="-space-x-16 md:-space-x-12"
            >
              <Polaroid
                src={images.image11}
                alt="Food 4"
                rotation="-rotate-6"
                className="mb-14"
              />
              <Polaroid
                src={images.image12}
                alt="Food 5"
                rotation="rotate-8"
                className="mt-2"
              />
            </motion.section>
            <Polaroid
              src={images.image13}
              alt="Food 6"
              rotation="-rotate-8"
              className="mt-0"
            />
          </div>
        </motion.section>

        {/* Y SOBRETODO DE ESTOS */}
        <motion.section
          className="flex flex-col items-center gap-12 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
        >
          <h2 className="text-[40px] font-black uppercase  text-center">
            {S.SOBRETODO}
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
          viewport={{ once: false, margin: '-100px' }}
        >
          <motion.p
            className="flex-1 text-[30px]  leading-[1.1] max-w-[70vw]"
            variants={fadeInUp}
          >
            {S.FOOTER_TEXT}
          </motion.p>
          <motion.button
            data-cursor
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(ROUTES.LARGE_ORDERS)}
            className="h-16 px-12 bg-[#ffc62d] text-[#0a4635] font-black text-2xl rounded-full shadow-2xl uppercase tracking-tight hover:bg-[#0a4635] hover:text-[#ffc62d] transition-colors duration-300"
          >
            {HACER_PEDIDO}
          </motion.button>
        </motion.section>
      </div>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-100px' }}
        className="relative flex flex-col md:flex-row items-center bg-[#ffc62d] text-[#0a4635] px-10 md:px-32 py-24 md:py-40 min-h-[500px] md:min-h-[75vh] overflow-hidden"
      >
        <motion.div
          variants={fadeInLeft}
          className="flex flex-col gap-6 md:gap-4 max-w-full md:max-w-[50%] z-10"
        >
          <h2 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[115px] font-black uppercase leading-[0.8] ">
            SI QUIERES UNIRTE <br /> AL EQUIPO
          </h2>
          <p className="text-[17px] md:text-[22px] leading-tight font-medium max-w-[90%] mt-6">
            {S.JOIN_DESC_PREFIX}
            <span
              className="font-black underline decoration-2 underline-offset-4"
              data-cursor
            >
              {S.JOIN_EMAIL}
            </span>
            {S.JOIN_DESC_SUFFIX}
          </p>
          <motion.button
            data-cursor
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 px-10 bg-transparent text-[#0a4635] font-black text-lg border-[2px] border-[#0a4635] w-fit rounded-full uppercase tracking-tight hover:bg-[#0a4635] hover:text-[#ffc62d] transition-colors duration-300 mt-10"
          >
            {CONTACTANOS}
          </motion.button>
        </motion.div>
        <motion.div
          variants={fadeInRight}
          className="absolute bottom-0 right-0 w-[70%] md:w-[50%] lg:w-[45%] flex justify-end items-end pointer-events-none select-none "
        >
          <motion.img
            variants={fadeZoom}
            src={images.aboutImg}
            alt="image-about"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </motion.section>
    </>
  );
}

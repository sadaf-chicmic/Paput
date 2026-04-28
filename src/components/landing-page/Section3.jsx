import { motion } from 'framer-motion';
import images from '../../assets/images';
import OrderButton from '../common/OrderButton';
import { ROUTES } from '../../constants/routes';
import BackgroundPattern from './BackgroundPattern.jsx';
import { fadeInUp2, staggerContainer } from '../../constants/animations';
import { LANDING_TEXTS } from '../../constants/texts';
import { useNavigate } from 'react-router';
const { SECTION_3: SECTION3_STRINGS } = LANDING_TEXTS;

export default function Section3() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full bg-[#f4f3e6] overflow-hidden flex items-center justify-center">
      <BackgroundPattern />

      <div className="px-3 pt-50 pb-10 flex flex-col items-center gap-12">
        {/* Image */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className=" z-0"
        >
          <motion.img
            src={images.mainShirt}
            alt={SECTION3_STRINGS.SHIRT_ALT}
            className="mt-50 w-full max-w-[500px] aspect-square object-cover rounded-[30px]"
            variants={fadeInUp2}
          />
        </motion.div>

        {/* Text + Button */}
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.p
            variants={fadeInUp2}
            className="text-[4.5vw] md:text-[3.5vw] lg:text-[40px] font-black  text-center leading-[1] max-w-[80vw] mt-6 uppercase"
          >
            {SECTION3_STRINGS.MOTTO}
          </motion.p>
          <motion.div variants={fadeInUp2}>
            <OrderButton
              label={SECTION3_STRINGS.STORE_BUTTON_LABEL}
              onClick={() => navigate(ROUTES.SHOP)}
              className="px-12 py-5 text-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

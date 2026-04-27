import { motion } from 'framer-motion';
import images from '../../assets/images';
import OrderButton from '../common/OrderButton';
import { ROUTES } from '../../constants/routes';
import BackgroundPattern from './BackgroundPattern.jsx';
import { fadeInUp2, staggerContainer } from '../../constants/utils';
import { SECTION3_STRINGS } from '../../constants/strings';

export default function Section3() {
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#0a4635] text-[40px] font-black uppercase leading-tight"
          >
            {SECTION3_STRINGS.TEXT}
          </motion.p>

          <OrderButton
            label={SECTION3_STRINGS.ORDER_BUTTON_LABEL}
            className="px-10 py-4 text-xl md:text-2xl"
            onClick={() => (window.location.href = ROUTES.SHOP)}
          />
        </div>
      </div>
    </section>
  );
}

import images from '../assets/images';
import ShopCard from '../components/ShopCard';
// import { motion } from 'framer-motion';
// import { staggerContainer, fadeInUp2 } from '../constants/animations.js';
import { SHOP_TEXTS } from '../constants/texts';
const { PRODUCTS: SHOP_PRODUCTS, ...S } = SHOP_TEXTS;

export default function Shop() {
  const products = SHOP_PRODUCTS.map((p, i) => ({
    ...p,
    imageSrc: [
      images.prod1,
      images.prod2,
      images.prod3,
      images.prod4,
      images.prod5,
      images.prod6,
      images.prod7,
    ][i],
  }));

  return (
    // // <motion.main
    // //   variants={staggerContainer}
    // //   initial="hidden"
    // //   animate="visible"
    // //   className="w-full min-h-screen pt-32 flex flex-col items-center"
    // //   viewport={{ once: true, margin: '-100px' }}
    // // >
    //   <motion.section
    //     variants={fadeInUp2}
    //     className="w-full flex flex-col items-center px-4 md:px-12"
    //     > 
    <main className="w-full min-h-screen pt-32 flex flex-col items-center">
      <section className="w-full flex flex-col items-center px-4 md:px-12">
        <div className="flex justify-center mb-8">
          <img
            src={images.shop}
            alt="Shop"
            className="w-[35vw]"
            loading="lazy"
          />
        </div>

        <p className="text-center text-lg md:text-xl font-medium text-[var(--_colors---verde)] mb-20">
          {S.INTRO}
        </p>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-[25px] pb-8 font-black tracking-wider"
        > */}
        <button className="text-[25px] pb-8 font-black tracking-wider">
          {S.COLLECTION}
        </button>
        {/* </motion.button> */}
      </section>
      {/* </motion.section> */}

      {/* <motion.div
        variants={staggerContainer} */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-[var(--_colors---verde)]"
      >
        {products.map((product, index) => (
          <ShopCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            fabric={product.fabric}
            year={product.year}
          />
        ))}
        </div>
        </main>
  );
  {/* </motion.div> */}
{/* </motion.main> */}
}

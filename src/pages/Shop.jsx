import images from '../assets/images';
import ShopCard from '../components/ShopCard';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp2 } from '../constants/utils.js';

export default function Shop() {
  const products = [
    {
      imageSrc: images.prod1,
      title: 'CAMISETA A POC A POC LIFE',
      fabric: '100% Algodón',
      year: '2026',
    },
    {
      imageSrc: images.prod2,
      title: 'CAMISETA CAP PEGA',
      fabric: '100% Algodón',
      year: '2026',
    },
    {
      imageSrc: images.prod3,
      title: 'CAMISETA FCKU PAPUT',
      fabric: '100% Algodón',
      year: '2026',
    },
    {
      imageSrc: images.prod4,
      title: 'CAMISETA PARET SECA CLUB',
      fabric: '100% Algodón',
      year: '2026',
    },
    {
      imageSrc: images.prod5,
      title: 'CAMISETA XIN XORIGUER CLASSIC',
      fabric: '100% Algodón, oversize',
      year: '2026',
    },
    {
      imageSrc: images.prod6,
      title: 'CAMISETA XINU XANU',
      fabric: '100% Algodón, oversize',
      year: '2026',
    },
    {
      imageSrc: images.prod7,
      title: 'CAMISETA XIN XORIGUER RETRO',
      fabric: '100% Algodón',
      year: '2026',
    },
  ];

  return (
    <motion.main
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full min-h-screen pt-32 flex flex-col items-center"
      viewport={{once:false,margin:'-100px'}}
    >
      <motion.section
        variants={fadeInUp2}
        className="w-full flex flex-col items-center px-4 md:px-12"
      >
        <div className="flex justify-center mb-8">
          <img src={images.shop} alt="Shop" className="w-[35vw]" />
        </div>

        <p className="text-center text-lg md:text-xl font-medium text-[var(--_colors---verde)] mb-20">
          Pronto abriremos tienda online. Mientras tanto puedes comprar nuestro
          merch en Paput Chiringuito y Paput Delivery.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-[25px] pb-8 font-black tracking-wider"
        >
          COLECCIÓN
        </motion.button>
      </motion.section>

      <motion.div
        variants={staggerContainer}
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
      </motion.div>
    </motion.main>
  );
}

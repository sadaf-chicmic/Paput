import images from '../assets/images';
import {
  fadeInUp,
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeInUp2,
} from '../constants/utils';
import { motion } from 'framer-motion';
import './About.css';

const Polaroid = ({ src, alt, rotation = 'rot-left', className = '' }) => (
  <motion.div
    variants={fadeInUp}
    className={`polaroid ${rotation} ${className}`}
    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
  >
    <div className="polaroid-img-wrapper" data-cursor>
      <img src={src} alt={alt} />
    </div>
  </motion.div>
);

export default function About() {
  return (
    <div className="about-container">
      {/* Section 1 */}
      <motion.section
        className="about-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="about-text" variants={fadeInLeft}>
          Paput es un restaurante chiringuito en el Puerto de Mahón, en la isla
          de Menorca. Desde 2016, nos dedicamos a lo que mejor sabemos hacer,{' '}
          <span className="emphasis">hamburguesas.</span>
        </motion.p>
        <div className="about-images">
          <Polaroid
            src={images.image1}
            alt="Burgers"
            rotation="rot-right-more"
          />
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="about-section reverse"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="about-text" variants={fadeInRight}>
          En temporada, lo celebramos todo, montamos fiestas e inventamos
          santos, con sesiones de <span className="emphasis">DJs en vivo</span>{' '}
          para ambientar el lugar con buena música y mejorar tu experiencia.
        </motion.p>
        <div className="about-images">
          <Polaroid src={images.image2} alt="People" rotation="rot-left" />
          <Polaroid src={images.image3} alt="Beach" rotation="rot-right" />
        </div>
      </motion.section>

      {/* SOMOS TODO ESTO */}
      <motion.section
        className="grid-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeInUp}>SOMOS TODO ESTO</motion.h2>
        <div className="polaroid-grid">
          <Polaroid src={images.image4} alt="Info 1" rotation="rot-left" />
          <Polaroid
            src={images.image5}
            alt="Info 2"
            rotation="rot-right-more"
          />
          <Polaroid src={images.image6} alt="Info 3" rotation="rot-left-more" />
          <Polaroid src={images.image7} alt="Info 4" rotation="rot-right" />
        </div>
      </motion.section>

      {/* MUCHO DE ESTO */}
      <motion.section
        className="grid-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeInUp}>MUCHO DE ESTO</motion.h2>
        <div className="polaroid-grid polaroid-grid-6">
          <Polaroid src={images.image8} alt="Food 1" rotation="rot-right" />
          <Polaroid src={images.image9} alt="Food 2" rotation="rot-left-more" />
          <Polaroid
            src={images.image10}
            alt="Food 3"
            rotation="rot-right-more"
          />
          <Polaroid src={images.image11} alt="Food 4" rotation="rot-left" />
          <Polaroid src={images.image12} alt="Food 5" rotation="rot-right" />
          <Polaroid
            src={images.image13}
            alt="Food 6"
            rotation="rot-left-more"
          />
        </div>
      </motion.section>

      {/* Y SOBRETODO DE ESTOS */}
      <motion.section
        className="grid-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeInUp}>Y SOBRETODO DE ESTOS</motion.h2>
        <div className="polaroid-grid">
          <Polaroid src={images.image14} alt="Pet 1" rotation="rot-left-more" />
          <Polaroid src={images.image15} alt="Pet 2" rotation="rot-right" />
          <Polaroid
            src={images.image16}
            alt="Pet 3"
            rotation="rot-right-more"
          />
          <Polaroid src={images.image17} alt="Pet 4" rotation="rot-left" />
        </div>
      </motion.section>

      {/* Footer text and button */}
      <motion.footer
        className="about-footer"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p className="about-footer-text" variants={fadeInUp2}>
          Paput no es solo un sitio para venir a comer, pasar el rato y escuchar
          buena música. Ahora también te lo llevamos a casa.
        </motion.p>
        <motion.button
          className="order-btn"
          data-cursor
          variants={fadeInUp2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          HACER PEDIDO
        </motion.button>
      </motion.footer>
    </div>
  );
}

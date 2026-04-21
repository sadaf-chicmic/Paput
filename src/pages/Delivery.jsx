import { motion } from 'framer-motion';
import images from '../assets/images';
import { fadeInUp, fadeInUp2, staggerContainer, fadeInLeft, fadeInRight } from '../constants/utils';

export default function Delivery() {
  return (
    <div className=" ">
      {/* Section 1: Brand & Map */}
      <div className="flex flex-col items-center w-full bg-[#f4f3e6] text-[#0a4635] pt-[15vh]">
        <div className="flex flex-col items-center w-[50vw]  overflow-x-hidden">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            // viewport={{ once: true, margin: '-100px' }}
            className="w-full flex flex-col items-center gap-12 px-6 mb-20"
          >
            <motion.img
              variants={fadeInUp}
              src={images.deliveryGreen}
              alt="DELIVERY"
              className="w-full max-w-[600px] h-auto object-contain"
            />

            <motion.button
              data-cursor
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-hover bg-[#ffc62d] text-[#0a4635] hover:bg-[#0a4635] hover:text-[#ffc62d] font-black text-4xl lg:text-5xl px-16 py-8 rounded-full shadow-xl uppercase transition-transform"
            >
              HACER PEDIDO
            </motion.button>

            <motion.div variants={fadeInUp} className="w-full">
              <img
                src={images.map}
                alt="Delivery Map"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section 2: Info & Vehicle */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        className="w-full flex flex-col items-start gap-15 px-6 md:px-12 lg:px-16 mx-auto"
      >
        <div className="w-full flex flex-col lg:flex-row justify-between items-start">
          <div className="flex flex-col gap-2 max-w-full ">
            <motion.p
              variants={fadeInLeft}
              className="text-[18px] lg:text-[30px] pb-6 font-black uppercase text-[#0a4635] leading-tight opacity-90"
            >
              SERVICIO EXCLUSIVO PARA MAHÓN, SANT CLIMENT, LLUCMAÇANES, SA
              MESQUIDA, CALA LLONGA, ES CASTELL, SANT LLUÍS DESDE PAPUT DELIVERY
            </motion.p>
            <p className="text-[44px] lg:text-[80px] font-black uppercase leading-[0.85] text-[#0a4635] underline decoration-[8px] ">
              AV. JOSÉ ANSELMO CLAVÉ 35, MAHÓN
            </p>
          </div>

          <motion.div variants={fadeInRight} className="relative shrink-0">
            <img
              src={images.img1}
              alt="Mascot"
              className="w-[100px] lg:w-[150px] h-auto object-contain"
            />
          </motion.div>
        </div>

        <motion.div variants={fadeInLeft} className="flex flex-col gap-2">
          <p className="text-[18px] lg:text-[30px] pb-6 font-black uppercase tracking-tight text-[#0a4635] opacity-90">
            HORARIO
          </p>
          <p className="text-[44px] lg:text-[80px] font-black uppercase leading-[0.85] text-[#0a4635]">
            TODOS LOS DÍAS DE 19:30 A 23:00
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true, amount: 0.2 }}
        className="w-full flex justify-center"
      >
        <motion.img
          variants={fadeInLeft}
          src={images.vehicle}
          alt="Vehicle"
          className="w-full max-w-[1000px] h-auto object-contain"
        />
      </motion.div>

      {/* Section 3: Options */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true, margin: '-100px' }}
        className="w-full flex flex-col gap-16 px-6 md:px-12 lg:px-16 mx-auto mb-40"
      >
        <motion.div variants={fadeInLeft} className="flex flex-col gap-2">
          <p className="text-[44px] lg:text-[80px] font-black uppercase leading-[0.85] text-[#0a4635] decoration-[8px]">
            OPCIONES DE SERVICIO
          </p>
          <motion.p
            variants={fadeInUp2}
            className="text-[18px] lg:text-[25px] pb-6 text-[#0a4635] leading-tight opacity-90"
          >
            Recoge tu pedido en el local <br className="hidden md:block" /> O
            recíbelo en casa cómodamente 🛵
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInLeft} className="flex flex-col gap-2">
          <p className="text-[44px] lg:text-[80px] font-black uppercase leading-[0.85] text-[#0a4635] decoration-[8px]">
            PIDE PAPUT A DOMICILIO FÁCIL Y RÁPIDO
          </p>
          <motion.p
            variants={fadeInUp2}
            className="text-[18px] lg:text-[25px] pb-6 text-[#0a4635] leading-tight opacity-90"
          >
            A través de nuestra web O por{' '}
            <a
              data-cursor
              href="#"
              className="underline decoration-[2px] underline-offset-4 hover:text-[#e54d3a] transition-colors"
            >
              WhatsApp aquí
            </a>{' '}
            🤳🏼
          </motion.p>
        </motion.div>

        <motion.div variants={fadeInLeft} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-[44px] lg:text-[80px] font-black uppercase leading-[0.85] tracking-tighter text-[#0a4635] decoration-[8px]">
              Y SI PREFIERES COMER EN EL LOCAL
            </p>
            <motion.p
              variants={fadeInUp2}
              className="text-[18px] lg:text-[25px] tracking-tight text-[#0a4635] leading-tight opacity-90"
            >
              Tenemos mesas para que disfrutes tu pedido en el momento 🍽️
            </motion.p>
            <motion.p
              variants={fadeInUp2}
              className="text-[18px] lg:text-[25px] text-[#0a4635] opacity-90"
            >
              *Solo para el nuevo local en Av. José Anselmo Clavé 35, Mahón.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

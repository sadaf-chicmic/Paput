import { motion } from 'framer-motion';
import images from '../../assets/images';
import { SECTION4_STRINGS } from '../../constants/strings';

export default function Section4() {
  const items = [
    {
      ...SECTION4_STRINGS.ITEMS[0],
      icon: images.icon1,
    },
    {
      ...SECTION4_STRINGS.ITEMS[1],
      icon: images.icon2,
    },
  ];

  const footerText = SECTION4_STRINGS.FOOTER_TEXT;

  const iconVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 15,
        mass: 1,
      },
    },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="bg-[var(--_colors---blanco)] my-15 py-20 px-6 md:px-20 text-[var(--_colors---verde)] overflow-hidden">
      <div className=" flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-50 w-full mb-16 px-4 md:px-10">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={iconVariants}
                className="mb-8"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-20 w-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={textVariants}
                className="flex flex-col gap-3"
              >
                <h3 className="text-[40px] font-black uppercase leading-[1.1] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[20px] opacity-80">{item.location}</p>
                <div
                  className="text-[30px] font-bold mt-1 leading-[1.2]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-[20px] opacity-80  px-4"
        >
          {footerText}
        </motion.p>
      </div>
    </section>
  );
}

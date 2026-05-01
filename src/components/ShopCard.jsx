import { motion } from 'framer-motion';

export default function ShopCard({ imageSrc, title, fabric, year }) {
  return (
    <motion.div
      className="flex flex-col md:[&:nth-child(3n)]:border-r-0"
    >
      <div className="w-full object-contain">
        <motion.img
          // whileHover={{ scale: 1.02 }}
          // whileTap={{ scale: 0.95 }}
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-2">
        <h2 className="text-xl md:text-[25px] font-black text-[var(--_colors---verde)] uppercase leading-none">
          {title}
        </h2>
        <div className="flex justify-between items-end mt-4">
          <p className="text-xs md:text-[16px] font-medium text-[var(--_colors---verde)] tracking-wider">
            {fabric}
          </p>
          <p className="text-xs md:text-[16px] font-medium text-[var(--_colors---verde)] tracking-wider">
            {year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

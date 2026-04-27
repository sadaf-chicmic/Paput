import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { HACER_PEDIDO } from '../../constants/strings';
import { ROUTES } from '../../constants/routes';

/**
 * Reusable Order Button component "HACER PEDIDO"
 * @param {Object} props
 * @param {string} props.className - Additional tailwind classes
 * @param {Object} props.variants - Framer motion variants for entrance animation
 * @param {string} props.label - Optional label override (defaults to HACER_PEDIDO)
 */
export default function OrderButton({
  className = '',
  variants,
  label = HACER_PEDIDO,
  ...props
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      data-cursor
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(ROUTES.ORDER)}
      className={`bg-[#ffc62d] text-[#0a4635] font-black hover:bg-[#0a4635] hover:text-[#ffc62d] rounded-full shadow-2xl uppercase transition-all duration-300 flex items-center justify-center ${className}`}
      {...props}
    >
      {label}
    </motion.button>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import DefaultSVG from './DefaultSVG';
import HoverSVG from './HoverSVG';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);

  // Spring settings for smooth movement
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      setHovered(!!target);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="cursor"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            key="hover"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <HoverSVG />
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <DefaultSVG />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

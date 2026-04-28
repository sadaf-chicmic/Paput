import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import DefaultSVG from './DefaultSVG';
import HoverSVG from './HoverSVG';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by 25px horizontally to mimic translate(-50%, 0%) for 50px width SVG.
      cursorX.set(e.clientX - 25);
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
      }}
    >
      {hovered ? <HoverSVG /> : <DefaultSVG />}
    </motion.div>
  );
}

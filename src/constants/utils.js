export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 }, // start from left
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 }, // start from right
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};
export const fadeZoom = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

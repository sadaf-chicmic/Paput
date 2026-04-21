export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInUp2 = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

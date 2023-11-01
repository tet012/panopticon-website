// animationVariants.ts

const AnimContStat = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
};

const AnimContDyna = {
    hidden: {
      opacity: 0,
      y:80,
    },
    show: {
      opacity: 1,
      y:0,
      transition: {
        staggerChildren: 0.25,
      },
    },
};

const fadeInSmooth = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, duration: 0.6 },
  },
};

const fadeInLinear = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 70, duration: 0.6 },
  },
};

const images1 = {
    hidden: {
      opacity: 0,
      y: 80,
      x: -160,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      y: 0,
      x: -160,
      scale: 0.8,
      transition: { type: "spring", damping: 12, duration: 0.6 },
    },
};

const images2 = {
    hidden: {
      opacity: 0,
      y: 160,
      scale: 0.8,
      x: 160,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 160,
      scale: 0.8,
      transition: { type: "spring", damping: 12, duration: 0.6 },
    },
};

export { AnimContStat, fadeInSmooth, fadeInLinear, images1, images2, AnimContDyna };

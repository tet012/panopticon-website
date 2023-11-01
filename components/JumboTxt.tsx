import React from 'react';
import { motion } from 'framer-motion'

const containerVariants = {
  hidden:{
    opacity: 0,
  },
  visible: {
      opacity: 1,
      transition: {
          staggerChildren: 0.1,
      },
  },
};

const letterVariants = {
  hidden: { y: 120, opacity: 0,},
  visible: {
      y: 0,
      opacity: 1,
      transition: {
          type: 'spring',
          // stiffness: 300,
          // damping: 40,
          duration: 0.8,
      },
  },
};


const JumboTxt = () => {
  const text = "Panopticon";
  const letters = Array.from(text);

  return (
      <motion.h1
          className="jumbo text-7xl drop-shadow-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
      >
          {letters.map((letter, index) => (
              <motion.span
                  key={index}
                  variants={letterVariants}
              >
                  {letter}
              </motion.span>
          ))}
      </motion.h1>
  );
};

export default JumboTxt;
import React from 'react';
import { motion } from 'framer-motion';
import { AnimContDyna, fadeInSmooth } from "../components/animations";

interface TokenInfoProps {
  text: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ text }) => {
  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      id="info"
      className="flex flex-col w-full items-center"
    >
      <div>{text}</div>
    </motion.div>
  );
};

export default TokenInfo;

// components/TextSection.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface TextSectionProps {
  title: string;
  text: string;
  textVariants: any;
}

const TextSection: React.FC<TextSectionProps> = ({ title, text, textVariants }) => (
  <div className="flex flex-col gap-4 w-full">
    <motion.h4 variants={textVariants}>{title}</motion.h4>
    <motion.p variants={textVariants} className="text-base/6 text-justify">{text}</motion.p>
  </div>
);

export default TextSection;

// components/ContentSection.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface ContentSectionProps {
  title: string;
  text: string;
  images: string[];
  colsVariants: any;
  imgVariants: any;
  isGrid?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  text,
  images,
  colsVariants,
  imgVariants,
  isGrid = false,
}) => {
  return (
    <motion.div
      variants={colsVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={isGrid ? "grid gap-1 w-1/2 grid-cols-2 max-md:w-auto" : "flex flex-col w-1/2 max-md:w-auto gap-8"}
    >
      <motion.h4 variants={imgVariants}>{title}</motion.h4>
      <motion.p variants={imgVariants} className="text-sm/7 text-justify">
        {text}
      </motion.p>
      {images.map((img, index) => (
        <motion.img key={index} variants={imgVariants} src={img}></motion.img>
      ))}
    </motion.div>
  );
};

export default ContentSection;

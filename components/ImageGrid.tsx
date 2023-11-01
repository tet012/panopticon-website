// components/ImageGrid.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface ImageGridProps {
  images: string[];
  imgVariants: any;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, imgVariants }) => (
  <motion.div className="grid gap-1  grid-cols-2 max-md:w-auto">
    {images.map((img, index) => (
      <motion.img key={index} className=' shadow-xl' variants={imgVariants} src={img}></motion.img>
    ))}
  </motion.div>
);

export default ImageGrid;

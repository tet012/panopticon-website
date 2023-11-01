// components/SingleImage.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface SingleImageProps {
  src: string;
  imgVariants: any;
}

const SingleImage: React.FC<SingleImageProps> = ({ src, imgVariants }) => (
  <motion.img variants={imgVariants} className=' shadow-xl' src={src}></motion.img>
);

export default SingleImage;

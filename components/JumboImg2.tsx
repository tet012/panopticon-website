// components/ImageComponent1.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ImageComponentProps {
  variants: any;
}

const JumboImg2: React.FC<ImageComponentProps> = ({ variants }) => (
  <motion.img
    className="jumboImg absolute"
    src="/img/panopticon/2.jpg"
    alt=""
    style={{ maxWidth:'40vw',  transform: "rotate(4deg) translateX(20%) scale(0.7)" }}
    variants={variants}
  />
);

export default JumboImg2;

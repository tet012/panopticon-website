// components/ImageComponent1.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ImageComponentProps {
  variants: any;
}

const JumboImg3: React.FC<ImageComponentProps> = ({ variants }) => (
  <motion.img
    className="jumboImg drop-shadow-2xl"
    src="/img/panopticon/3.jpg"
    alt=""
    variants={variants}
    style={{ maxWidth:'40vw'}}
  />
);

export default JumboImg3;

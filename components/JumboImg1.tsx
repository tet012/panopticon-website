// components/ImageComponent1.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ImageComponentProps {
  variants: any;
}

const JumboImg1: React.FC<ImageComponentProps> = ({ variants }) => (
  <motion.img
    style={{ maxWidth:'40vw'}}
    className="jumboImg absolute"
    src="/img/panopticon/1.jpg"
    alt=""
    variants={variants}

  />
);

export default JumboImg1;

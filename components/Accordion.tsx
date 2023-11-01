import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { title: "Item 1", content: "Content for item 1" },
  { title: "Item 2", content: "Content for item 2" },
  { title: "Item 3", content: "Content for item 3" }
];

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="border border-neutral-300 rounded-md">
          <div
            onClick={() => toggleItem(index)}
            className="cursor-pointer p-4 flex justify-between items-center"
          >
            {item.title}
            <span className='text-neutral-800'>
              {openIndex === index ? "▲" : "▼"}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default Accordion;

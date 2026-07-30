import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function GlobalScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D92243] via-[#F69D39] to-[#E0C375] z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

export const motionPresets = {
  springSmooth: {
    type: "spring",
    stiffness: 380,
    damping: 30
  },
  fadeIn: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
  },
  hoverLift: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 }
  },
  modalScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }
};

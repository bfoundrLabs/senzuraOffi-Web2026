import { AnimatePresence, Variants, motion } from "framer-motion";

export default function AnimatedLogo() {
  const pathVariant: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  };

  const fillVariant: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <AnimatePresence>
        <motion.svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f8d93" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Main G shape - filled */}
          <motion.path
            d="M 100 30 
               C 130 30, 155 45, 165 70
               L 145 80
               C 138 65, 120 45, 100 45
               C 70 45, 45 70, 45 100
               C 45 130, 70 155, 100 155
               C 125 155, 145 140, 150 115
               L 105 115
               L 105 95
               L 170 95
               L 170 110
               C 168 148, 137 170, 100 170
               C 61 170, 30 139, 30 100
               C 30 61, 61 30, 100 30 Z"
            fill="url(#gradient)"
            variants={fillVariant}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 1.5,
              delay: 2.5,
              ease: "easeOut"
            }}
            filter="url(#glow)"
          />

          {/* Stroke animation */}
          <motion.path
            d="M 100 30 
               C 130 30, 155 45, 165 70
               M 100 45
               C 70 45, 45 70, 45 100
               C 45 130, 70 155, 100 155
               C 125 155, 145 140, 150 115
               M 105 95
               L 170 95
               L 170 110
               C 168 148, 137 170, 100 170
               C 61 170, 30 139, 30 100
               C 30 61, 61 30, 100 30"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariant}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 2.5,
              ease: "easeInOut"
            }}
            filter="url(#glow)"
          />
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}
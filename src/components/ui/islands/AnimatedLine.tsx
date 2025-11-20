import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="absolute top-[32px] left-0 right-0 h-1 hidden lg:block z-0">
      <motion.div
        className="h-full w-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(to right, transparent 0%, #4A90E2 20%, #4A90E2 80%, transparent 100%)'
        }}
      />
    </div>
  );
}


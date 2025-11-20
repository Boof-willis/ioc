import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, Children, isValidElement } from 'react';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Wrap each child in a motion.div for stagger effect
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}


import { useInView } from '@/hooks/useInView';
import { useRef, Children, isValidElement } from 'react';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerChildrenProps) {
  const { ref, isInView } = useInView({ once: true, margin: '-50px' });
  const childrenArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return (
            <div
              key={index}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * staggerDelay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * staggerDelay}s`,
              }}
            >
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}

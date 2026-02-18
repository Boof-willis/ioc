import { useInView } from '@/hooks/useInView';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
}

const directionStyles: Record<string, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  up: {
    hidden: { opacity: 0, transform: 'translateY(30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  down: {
    hidden: { opacity: 0, transform: 'translateY(-30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  left: {
    hidden: { opacity: 0, transform: 'translateX(30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  right: {
    hidden: { opacity: 0, transform: 'translateX(-30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, transform: 'scale(0.9)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
};

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollAnimationProps) {
  const { ref, isInView } = useInView({ once: true, margin: '-100px' });
  const { hidden, visible } = directionStyles[direction];
  const style = {
    ...(isInView ? visible : hidden),
    transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

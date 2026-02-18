import { useInView } from '@/hooks/useInView';

export default function AnimatedLine() {
  const { ref, isInView } = useInView({ once: true, margin: '-100px' });

  return (
    <div ref={ref} className="absolute top-[32px] left-0 right-0 h-1 hidden lg:block z-0">
      <div
        className="h-full"
        style={{
          width: isInView ? '100%' : '0%',
          transition: 'width 1.5s ease-in-out',
          background: 'linear-gradient(to right, transparent 0%, #4A90E2 20%, #4A90E2 80%, transparent 100%)',
        }}
      />
    </div>
  );
}

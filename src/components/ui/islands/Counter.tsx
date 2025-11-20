import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  initialValue?: number;
  className?: string;
}

export default function Counter({ initialValue = 0, className }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className={cn('flex items-center gap-4 p-4 rounded-lg border bg-card', className)}>
      <button
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
      >
        -
      </button>
      <span className="text-2xl font-semibold min-w-[3rem] text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        +
      </button>
    </div>
  );
}


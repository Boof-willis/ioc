import { Clock as ClockIcon } from 'lucide-react';

export default function Clock({ className = "w-6 h-6" }: { className?: string }) {
  return <ClockIcon className={className} />;
}


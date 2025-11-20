import { CheckCircle2 } from 'lucide-react';

export default function CheckCircle({ className = "w-6 h-6" }: { className?: string }) {
  return <CheckCircle2 className={className} style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }} />;
}


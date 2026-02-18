import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function InteractiveCard({
  title,
  description,
  className,
}: InteractiveCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm',
        className
      )}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-secondary hover:bg-secondary/80'
          )}
        >
          <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          onClick={() => setIsStarred(!isStarred)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-md transition-colors',
            isStarred
              ? 'bg-yellow-500 text-white'
              : 'bg-secondary hover:bg-secondary/80'
          )}
        >
          <Star className={cn('w-4 h-4', isStarred && 'fill-current')} />
          <span>{isStarred ? 'Starred' : 'Star'}</span>
        </button>
      </div>
    </div>
  );
}

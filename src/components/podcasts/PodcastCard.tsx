import { Play, Clock } from 'lucide-react';
import { Podcast } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PodcastCardProps {
  podcast: Podcast;
  onPlay: (podcast: Podcast) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function PodcastCard({ podcast, onPlay, className, style }: PodcastCardProps) {
  return (
    <div
      className={cn(
        'group relative flex w-[180px] flex-shrink-0 flex-col overflow-hidden rounded-xl bg-secondary/50 transition-smooth hover:bg-secondary',
        className
      )}
      style={style}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={podcast.thumbnail_url}
          alt={podcast.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${podcast.youtube_id}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            className="h-10 w-10 rounded-full shadow-elevated"
            onClick={() => onPlay(podcast)}
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] backdrop-blur-sm">
          <Clock className="h-2.5 w-2.5" />
          <span>{podcast.duration}</span>
        </div>
      </div>

      <div className="p-2.5">
        <h3 className="line-clamp-2 text-xs font-medium leading-tight">
          {podcast.title}
        </h3>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { Headphones } from 'lucide-react';
import { Podcast } from '@/types';
import { PodcastCard } from './PodcastCard';
import { PodcastPlayerModal } from './PodcastPlayerModal';
import { cn } from '@/lib/utils';

interface PodcastCarouselProps {
  title: string;
  podcasts: Podcast[];
  className?: string;
}

export function PodcastCarousel({ title, podcasts, className }: PodcastCarouselProps) {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className={cn('px-4', className)}>
        {/* Container with rounded corners like reference */}
        <div className="rounded-2xl bg-card p-4">
          <div className="mb-4 flex items-center gap-2">
            <Headphones className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-heading text-lg font-semibold">{title}</h2>
          </div>

          {/* Horizontal scrollable area */}
          <div
            ref={scrollRef}
            className="scrollbar-hide -mx-2 flex gap-3 overflow-x-auto px-2 pb-2"
          >
            {podcasts.map((podcast, index) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlay={setSelectedPodcast}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      <PodcastPlayerModal
        podcast={selectedPodcast}
        isOpen={!!selectedPodcast}
        onClose={() => setSelectedPodcast(null)}
      />
    </>
  );
}

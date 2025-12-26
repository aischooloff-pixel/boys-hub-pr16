import { useRef } from 'react';
import { Article } from '@/types';
import { ArticleListCard } from './ArticleListCard';
import { cn } from '@/lib/utils';

interface ArticleCarouselProps {
  title: string;
  articles: Article[];
  className?: string;
}

export function ArticleCarousel({ title, articles, className }: ArticleCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className={cn('px-4', className)}>
      {/* Container matching the reference style */}
      <div className="rounded-2xl bg-card p-4">
        <h2 className="mb-4 font-heading text-lg font-semibold">{title}</h2>

        <div className="space-y-3">
          {articles.map((article, index) => (
            <ArticleListCard
              key={article.id}
              article={article}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

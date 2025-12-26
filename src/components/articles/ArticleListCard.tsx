import { Heart, MessageCircle, Bookmark, TrendingUp } from 'lucide-react';
import { Article } from '@/types';
import { cn } from '@/lib/utils';

interface ArticleListCardProps {
  article: Article;
  className?: string;
  style?: React.CSSProperties;
}

export function ArticleListCard({ article, className, style }: ArticleListCardProps) {
  return (
    <article
      className={cn(
        'group cursor-pointer rounded-full bg-secondary/50 px-4 py-3 transition-all hover:bg-secondary',
        className
      )}
      style={style}
    >
      <div className="flex items-center gap-3">
        {/* Author Avatar */}
        <img
          src={article.is_anonymous ? '/placeholder.svg' : article.author.avatar_url || '/placeholder.svg'}
          alt={article.is_anonymous ? 'Аноним' : article.author.first_name}
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{article.is_anonymous ? 'Аноним' : article.author.first_name}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {article.likes_count}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {article.comments_count}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bookmark className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}

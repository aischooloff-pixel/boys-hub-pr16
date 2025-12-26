import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ArticleListCard } from '@/components/articles/ArticleListCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Crown, FileText, Bookmark, History, Star } from 'lucide-react';
import { currentUser, mockArticles } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('articles');

  // Mock user articles and favorites
  const userArticles = mockArticles.filter((a) => a.author.id === currentUser.id);
  const favoriteArticles = mockArticles.slice(0, 3); // Mock favorites

  return (
    <div className="min-h-screen bg-background pb-24 pt-16">
      <Header />

      <main className="py-6">
        {/* Profile Header */}
        <section className="mb-6 px-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar_url || '/placeholder.svg'}
                alt={currentUser.first_name}
                className="h-20 w-20 rounded-full object-cover"
              />
              {currentUser.is_premium && (
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Crown className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-xl font-bold">
                {currentUser.first_name} {currentUser.last_name}
              </h1>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{currentUser.reputation} rep</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {currentUser.articles_count} статей
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Premium Banner (if not premium) */}
        {!currentUser.is_premium && (
          <section className="mb-6 px-4">
            <div className="rounded-2xl bg-gradient-to-r from-card to-card-foreground/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-semibold">Перейти на Premium</h3>
                  <p className="text-xs text-muted-foreground">
                    Безлимитные публикации и приоритетная модерация
                  </p>
                </div>
                <Button size="sm">Подробнее</Button>
              </div>
            </div>
          </section>
        )}

        {/* Tabs */}
        <section className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="articles" className="flex-1 gap-2">
                <FileText className="h-4 w-4" />
                Статьи
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex-1 gap-2">
                <Bookmark className="h-4 w-4" />
                Избранное
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 gap-2">
                <History className="h-4 w-4" />
                Активность
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="rounded-2xl bg-card p-4">
                <h2 className="mb-4 font-heading text-lg font-semibold">Мои статьи</h2>
                <div className="space-y-3">
                  {userArticles.length > 0 ? (
                    userArticles.map((article, index) => (
                      <ArticleListCard
                        key={article.id}
                        article={article}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">
                      У вас пока нет статей
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="rounded-2xl bg-card p-4">
                <h2 className="mb-4 font-heading text-lg font-semibold">Избранное</h2>
                <div className="space-y-3">
                  {favoriteArticles.length > 0 ? (
                    favoriteArticles.map((article, index) => (
                      <ArticleListCard
                        key={article.id}
                        article={article}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">
                      Нет избранных статей
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="rounded-2xl bg-card p-4">
                <h2 className="mb-4 font-heading text-lg font-semibold">История активности</h2>
                <div className="space-y-3">
                  <p className="py-8 text-center text-muted-foreground">
                    История пуста
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

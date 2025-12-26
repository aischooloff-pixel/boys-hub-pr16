import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { CategoryList } from '@/components/categories/CategoryList';
import { ArticleListCard } from '@/components/articles/ArticleListCard';
import { CreateArticleModal } from '@/components/articles/CreateArticleModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { mockArticles, mockCategories } from '@/data/mockData';
import { Category } from '@/types';

export default function Hub() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredArticles = selectedCategory
    ? mockArticles.filter((a) => a.category_id === selectedCategory.id)
    : mockArticles;

  return (
    <div className="min-h-screen bg-background pb-24 pt-16">
      <Header />

      <main className="py-6">
        {/* Page Title */}
        <section className="mb-6 flex items-center justify-between px-4">
          <h1 className="font-heading text-2xl font-bold">Хаб</h1>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Написать
          </Button>
        </section>

        {/* Categories */}
        <CategoryList
          categories={mockCategories}
          selectedId={selectedCategory?.id}
          onSelect={setSelectedCategory}
          className="mb-6"
        />

        {/* Articles Section */}
        <section className="px-4">
          <div className="rounded-2xl bg-card p-4">
            <h2 className="mb-4 font-heading text-lg font-semibold">Статьи</h2>
            <div className="space-y-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <ArticleListCard
                    key={article.id}
                    article={article}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  Нет статей в этой категории
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <BottomNav />

      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

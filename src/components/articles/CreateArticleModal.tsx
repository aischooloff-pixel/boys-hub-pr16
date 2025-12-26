import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCategories, mockTopics } from '@/data/mockData';
import { Send, Image, Link2 } from 'lucide-react';
import { toast } from 'sonner';

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateArticleModal({ isOpen, onClose }: CreateArticleModalProps) {
  const [formData, setFormData] = useState({
    category_id: '',
    topic_id: '',
    title: '',
    body: '',
    media_url: '',
    is_anonymous: false,
    sources: '',
    allow_comments: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error('Заполните заголовок и текст статьи');
      return;
    }

    // Mock submit
    toast.success('Статья отправлена на модерацию');
    onClose();
    setFormData({
      category_id: '',
      topic_id: '',
      title: '',
      body: '',
      media_url: '',
      is_anonymous: false,
      sources: '',
      allow_comments: true,
    });
  };

  const filteredTopics = formData.category_id
    ? mockTopics.filter((t) => t.category_id === formData.category_id)
    : mockTopics;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Новая статья</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div className="space-y-2">
            <Label>Категория</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) =>
                setFormData({ ...formData, category_id: value, topic_id: '' })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label>Тема</Label>
            <Select
              value={formData.topic_id}
              onValueChange={(value) => setFormData({ ...formData, topic_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тему" />
              </SelectTrigger>
              <SelectContent>
                {filteredTopics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Заголовок</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Введите заголовок статьи"
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label>Текст статьи</Label>
            <Textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Напишите вашу статью..."
              rows={6}
            />
          </div>

          {/* Media URL */}
          <div className="space-y-2">
            <Label>Медиа (опционально)</Label>
            <div className="flex gap-2">
              <Input
                value={formData.media_url}
                onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                placeholder="YouTube URL или ссылка на изображение"
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sources */}
          <div className="space-y-2">
            <Label>Источники (опционально)</Label>
            <Input
              value={formData.sources}
              onChange={(e) => setFormData({ ...formData, sources: e.target.value })}
              placeholder="Ссылки на источники через запятую"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4 rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Анонимная публикация</Label>
                <p className="text-xs text-muted-foreground">
                  Ваше имя не будет отображаться
                </p>
              </div>
              <Switch
                checked={formData.is_anonymous}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_anonymous: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Разрешить комментарии</Label>
                <p className="text-xs text-muted-foreground">
                  Другие пользователи смогут комментировать
                </p>
              </div>
              <Switch
                checked={formData.allow_comments}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, allow_comments: checked })
                }
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full gap-2">
            <Send className="h-4 w-4" />
            Отправить на модерацию
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

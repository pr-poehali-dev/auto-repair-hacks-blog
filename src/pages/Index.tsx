import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  comments: Comment[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const posts: Post[] = [
    {
      id: 1,
      title: 'Замена тормозных колодок на ВАЗ 2107',
      excerpt: 'Подробная инструкция по замене передних и задних тормозных колодок. Все нюансы и советы от опытных мастеров.',
      image: 'https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/62146f04-1246-4576-8e5e-2c1263cbc2be.jpg',
      date: '15 ноября 2025',
      author: 'Сергей Автолюбитель',
      category: 'Ремонт',
      comments: [
        { id: 1, author: 'Иван', text: 'Отличная инструкция! Помогла разобраться.', date: '16 ноября 2025' },
        { id: 2, author: 'Михаил', text: 'А какие колодки лучше брать?', date: '17 ноября 2025' }
      ]
    },
    {
      id: 2,
      title: 'Настройка карбюратора: пошаговый гайд',
      excerpt: 'Как правильно настроить карбюратор на классике. Регулировка холостого хода и качества смеси.',
      image: 'https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/20b3b5f4-ebff-4637-b4c3-8c1268f8dc9a.jpg',
      date: '10 ноября 2025',
      author: 'Дмитрий Механик',
      category: 'Лайфхаки',
      comments: []
    },
    {
      id: 3,
      title: 'Восстановление ВАЗ 2101: с чего начать',
      excerpt: 'История реставрации классической "копейки". От покупки до первого запуска двигателя.',
      image: 'https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/44c105f4-f3a4-46e2-bd3f-9cb80255e2a0.jpg',
      date: '5 ноября 2025',
      author: 'Алексей Реставратор',
      category: 'Проекты',
      comments: [
        { id: 3, author: 'Олег', text: 'Красавчик! Жду продолжения истории.', date: '6 ноября 2025' }
      ]
    }
  ];

  const handleAddComment = () => {
    if (!selectedPost || !newComment.author.trim() || !newComment.text.trim()) return;

    const updatedPost = {
      ...selectedPost,
      comments: [
        ...selectedPost.comments,
        {
          id: selectedPost.comments.length + 1,
          author: newComment.author,
          text: newComment.text,
          date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      ]
    };

    setSelectedPost(updatedPost);
    setNewComment({ author: '', text: '' });
  };

  const renderHome = () => (
    <div className="space-y-16">
      <section className="relative h-[500px] rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/62146f04-1246-4576-8e5e-2c1263cbc2be.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Гараж советских легенд
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Всё о ремонте и обслуживании ВАЗ 2101/2107. Делимся опытом, учимся вместе.
            </p>
            <Button size="lg" className="text-lg" onClick={() => setActiveSection('blog')}>
              <Icon name="Wrench" className="mr-2" />
              Перейти к статьям
            </Button>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <Card className="border-2 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="BookOpen" size={24} className="text-primary" />
            </div>
            <CardTitle>База знаний</CardTitle>
            <CardDescription>
              Сотни статей по ремонту и обслуживанию классических ВАЗов
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Users" size={24} className="text-secondary" />
            </div>
            <CardTitle>Сообщество</CardTitle>
            <CardDescription>
              Общайтесь с единомышленниками, делитесь опытом и советами
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Lightbulb" size={24} className="text-accent" />
            </div>
            <CardTitle>Лайфхаки</CardTitle>
            <CardDescription>
              Проверенные временем советы и хитрости от мастеров своего дела
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );

  const renderBlog = () => {
    if (selectedPost) {
      return (
        <div className="space-y-8">
          <Button variant="outline" onClick={() => setSelectedPost(null)} className="mb-4">
            <Icon name="ArrowLeft" className="mr-2" />
            Назад к статьям
          </Button>

          <Card className="overflow-hidden">
            <div className="h-[400px] overflow-hidden">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{selectedPost.category}</Badge>
                <span className="text-muted-foreground text-sm">{selectedPost.date}</span>
              </div>
              <CardTitle className="text-4xl">{selectedPost.title}</CardTitle>
              <CardDescription className="text-lg">{selectedPost.excerpt}</CardDescription>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <Icon name="User" size={16} />
                {selectedPost.author}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">
                В этой статье мы подробно разберём все этапы работы. Опытные механики делятся своим опытом и рассказывают о тонкостях, которые помогут вам избежать распространённых ошибок.
              </p>
              <p className="text-foreground leading-relaxed">
                Работа требует внимательности и аккуратности. Следуя нашим рекомендациям, вы сможете выполнить её самостоятельно, сэкономив время и деньги на посещении автосервиса.
              </p>

              <Separator className="my-8" />

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Комментарии ({selectedPost.comments.length})
                </h3>

                <div className="space-y-4 mb-8">
                  {selectedPost.comments.map(comment => (
                    <Card key={comment.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-foreground">{comment.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Добавить комментарий</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                      <Input
                        placeholder="Введите ваше имя"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Комментарий</label>
                      <Textarea
                        placeholder="Поделитесь своим мнением..."
                        rows={4}
                        value={newComment.text}
                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleAddComment} className="w-full">
                      <Icon name="Send" className="mr-2" />
                      Отправить
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Блог</h2>
          <p className="text-muted-foreground text-lg">Статьи, инструкции и советы по ремонту</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => setSelectedPost(post)}>
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="User" size={14} />
                  {post.author}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Icon name="MessageSquare" size={14} />
                  {post.comments.length}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">О нас</h2>
        <p className="text-muted-foreground text-lg">История проекта и наша команда</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="text-lg leading-relaxed">
            Мы — команда энтузиастов советского автопрома, влюблённых в классические модели ВАЗ. Наш проект родился в гараже, где друзья собирались, чтобы чинить свои "семёрки" и "копейки".
          </p>
          <p className="text-lg leading-relaxed">
            Сегодня наше сообщество объединяет тысячи автолюбителей по всей стране. Мы делимся опытом, помогаем друг другу и сохраняем культуру советского автомобилестроения.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Портфолио</h2>
        <p className="text-muted-foreground text-lg">Наши проекты по реставрации</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="h-64 overflow-hidden">
            <img src="https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/44c105f4-f3a4-46e2-bd3f-9cb80255e2a0.jpg" alt="Проект 1" className="w-full h-full object-cover" />
          </div>
          <CardHeader>
            <CardTitle>Реставрация ВАЗ 2101</CardTitle>
            <CardDescription>Полная реставрация кузова и салона классической "копейки"</CardDescription>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden">
          <div className="h-64 overflow-hidden">
            <img src="https://cdn.poehali.dev/projects/9db6fc14-5f94-455d-a853-6c66ac005cf9/files/62146f04-1246-4576-8e5e-2c1263cbc2be.jpg" alt="Проект 2" className="w-full h-full object-cover" />
          </div>
          <CardHeader>
            <CardTitle>Тюнинг ВАЗ 2107</CardTitle>
            <CardDescription>Модернизация двигателя и подвески "семёрки"</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Услуги</h2>
        <p className="text-muted-foreground text-lg">Чем мы можем помочь</p>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Wrench" />
              Консультации по ремонту
            </CardTitle>
            <CardDescription>
              Поможем разобраться в любой проблеме с вашим автомобилем
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Settings" />
              Диагностика неисправностей
            </CardTitle>
            <CardDescription>
              Определим причину поломки и подскажем пути решения
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" />
              Индивидуальные инструкции
            </CardTitle>
            <CardDescription>
              Создадим пошаговую инструкцию под вашу задачу
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-2">Контакты</h2>
        <p className="text-muted-foreground text-lg">Свяжитесь с нами</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start gap-3">
            <Icon name="Mail" className="text-primary mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground">info@vazgarage.ru</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Icon name="Phone" className="text-primary mt-1" />
            <div>
              <p className="font-semibold">Телефон</p>
              <p className="text-muted-foreground">+7 (900) 123-45-67</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <Icon name="MapPin" className="text-primary mt-1" />
            <div>
              <p className="font-semibold">Адрес</p>
              <p className="text-muted-foreground">г. Тольятти, ул. Гаражная, 15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                В
              </div>
              <span className="text-xl font-bold">ВАЗ Гараж</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'blog', label: 'Блог', icon: 'BookOpen' },
                { id: 'about', label: 'О нас', icon: 'Info' },
                { id: 'portfolio', label: 'Портфолио', icon: 'Briefcase' },
                { id: 'services', label: 'Услуги', icon: 'Settings' },
                { id: 'contacts', label: 'Контакты', icon: 'Phone' }
              ].map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSelectedPost(null);
                  }}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              ))}
            </div>

            <Button variant="outline" className="md:hidden">
              <Icon name="Menu" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'blog' && renderBlog()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'portfolio' && renderPortfolio()}
        {activeSection === 'services' && renderServices()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      <footer className="bg-secondary text-secondary-foreground mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ВАЗ Гараж</h3>
              <p className="text-secondary-foreground/80">
                Сообщество энтузиастов советского автопрома. Делимся опытом и знаниями.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Разделы</h3>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li className="hover:text-secondary-foreground cursor-pointer">Блог</li>
                <li className="hover:text-secondary-foreground cursor-pointer">О нас</li>
                <li className="hover:text-secondary-foreground cursor-pointer">Услуги</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="text-secondary-foreground/80">info@vazgarage.ru</p>
              <p className="text-secondary-foreground/80">+7 (900) 123-45-67</p>
            </div>
          </div>
          <Separator className="my-8 bg-secondary-foreground/20" />
          <p className="text-center text-secondary-foreground/60">
            © 2025 ВАЗ Гараж. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

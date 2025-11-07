import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, Clock, MapPin, Dot } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import galleryImage1 from "@/assets/figma-gallery-1.png";
import galleryImage2 from "@/assets/figma-gallery-2.png";
import galleryImage3 from "@/assets/figma-gallery-3.png";
import galleryImage4 from "@/assets/figma-gallery-4.png";
import galleryImage5 from "@/assets/figma-gallery-5.png";
import galleryImage6 from "@/assets/figma-gallery-6.png";

const galleryItems = [
  {
    id: 1,
    title: "Терраса частного дома",
    category: "Частные дома",
    description: "Установка мягких окон на террасе загородного дома площадью 35м²",
    image: galleryImage1,
    tags: ["Терраса", "35м²", "3 дня"],
    price: "42 000 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Ленина",
    details: {
      materials: "ПВХ высокого качества, алюминиевый профиль",
      features: ["Автоматический подъем", "Утепление", "Дистанционное управление"],
      client: "Частный клиент"
    }
  },
  {
    id: 2,
    title: "Летняя площадка кафе",
    category: "Кафе и рестораны",
    description: "Расширение летней площадки на 50 посадочных мест",
    image: galleryImage2,
    tags: ["Кафе", "50 м²", "5 дней"],
    price: "75 000 ₽",
    duration: "5 дней",
    location: "Челябинск, ул. Труда",
    details: {
      materials: "Премиум ПВХ, усиленный каркас",
      features: ["Полностью прозрачные", "Защита от ветра", "Быстросборная конструкция"],
      client: "Кафе 'Уютное место'"
    }
  },
  {
    id: 3,
    title: "Беседка в загородном клубе",
    category: "Коммерческие объекты",
    description: "Защита беседки для отдыха гостей клуба",
    image: galleryImage3,
    tags: ["Беседка", "20м²", "2 дня"],
    price: "26 000 ₽",
    duration: "2 дня",
    location: "Челябинск, п. Смолино",
    details: {
      materials: "Стандартный ПВХ, деревянный каркас",
      features: ["Защита от насекомых", "Легкий уход", "Долговечность"],
      client: "Загородный клуб 'Лесная поляна'"
    }
  },
  {
    id: 4,
    title: "Веранда коттеджа",
    category: "Частные дома",
    description: "Полное остекление веранды с автоматическим подъёмом",
    image: galleryImage4,
    tags: ["Веранда", "25м²", "3 дня"],
    price: "32 500 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Свердлова",
    details: {
      materials: "ПВХ высокого качества, стальной профиль",
      features: ["Полностью автоматизировано", "Герметичные швы", "Теплоизоляция"],
      client: "Частный клиент"
    }
  },
  {
    id: 5,
    title: "Ресторан с панорамным видом",
    category: "Кафе и рестораны",
    description: "Создание закрытой террасы с видом на озеро",
    image: galleryImage5,
    tags: ["Ресторан", "80м²", "7 дней"],
    price: "120 000 ₽",
    duration: "7 дней",
    location: "Челябинск, оз. Смолино",
    details: {
      materials: "Премиум ПВХ, алюминиевый профиль",
      features: ["Панорамный вид", "Усиленная конструкция", "Климат-контроль"],
      client: "Ресторан 'Озерный вид'"
    }
  },
  {
    id: 6,
    title: "Семейная беседка",
    category: "Частные дома",
    description: "Уютная беседка для семейных вечеров на даче",
    image: galleryImage6,
    tags: ["Беседка", "15м²", "1 день"],
    price: "19 500 ₽",
    duration: "1 день",
    location: "Челябинск, п. Первомайский",
    details: {
      materials: "Стандартный ПВХ, пластиковый профиль",
      features: ["Быстрая установка", "Простая эксплуатация", "Надежность"],
      client: "Частный клиент"
    }
  },
];

const GalleryCard = ({ item, index }: { item: typeof galleryItems[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          className={`group cursor-pointer overflow-hidden border-border/50 hover:premium-shadow transition-all duration-500 h-full flex flex-col relative premium-card ${isHovered ? 'scale-[1.02]' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Премиальный индикатор кликабельности */}
          <div className={`absolute top-2 right-2 z-10 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} md:hidden`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Смотреть
            </span>
          </div>
          <div className={`absolute top-2 right-2 z-10 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} hidden md:block`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Смотреть проект
            </span>
          </div>
          
          {/* Декоративный уголок */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-accent/20 border-r-[40px] border-r-transparent" />
          
          <div className="relative h-64 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}`}
            />
            {/* Улучшенный градиент с анимацией */}
            <div className={`absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-all duration-500 ${isHovered ? 'opacity-80' : 'opacity-60'}`} />
            
            {/* Категория с премиальным оформлением */}
            <div className={`absolute top-2 left-2 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm px-3 py-1.5 border border-accent/30 shadow-lg">
                {item.category}
              </Badge>
            </div>
            
            {/* Премиальная иконка увеличения при наведении */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="bg-gradient-to-r from-accent/90 to-primary/90 text-white p-4 rounded-full backdrop-blur-sm shadow-lg group-hover:animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            {/* Мобильный индикатор касания */}
            <div className="md:hidden absolute bottom-2 left-2 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <span>Нажмите для деталей</span>
            </div>
            
            {/* Анимированные частицы при наведении */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${25 + i * 15}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <CardContent className="p-6 flex-1 flex flex-col justify-between relative">
            {/* Декоративная линия */}
            <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            <div>
              <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
            </div>
            
            <div className="border-t border-border/50 pt-3 mt-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className={`text-xs px-2 py-1 transition-all duration-300 ${isHovered ? 'bg-accent/10 border-accent/30 text-accent' : ''}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Стоимость проекта:</span>
                <span className="text-lg font-bold text-accent transition-all duration-300 group-hover:scale-110">{item.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-auto bg-gradient-to-br from-background to-card/50">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl pr-8 md:pr-0 text-gradient">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 md:h-80 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="space-y-3 animate-slide-in-left">
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="p-1.5 rounded-full bg-accent/20">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground">{item.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="p-1.5 rounded-full bg-accent/20">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground">Срок выполнения: {item.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="p-1.5 rounded-full bg-accent/20">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground">Заказчик: {item.details.client}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="animate-slide-in-left">
              <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Описание проекта
              </h4>
              <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
            
            <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Технические детали
              </h4>
              <div className="bg-card/50 rounded-lg p-4 border border-border/30 hover:border-accent/30 transition-colors">
                <p className="text-sm mb-3"><strong>Материалы:</strong> {item.details.materials}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Особенности:</strong></p>
                  <ul className="space-y-2 ml-4">
                    {item.details.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                        <span className="group-hover/item:text-foreground transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <div>
                <p className="text-sm text-muted-foreground">Стоимость проекта</p>
                <p className="text-xl md:text-2xl font-bold text-accent transition-all duration-300 hover:scale-105">{item.price}</p>
              </div>
              <Badge variant="secondary" className="text-sm w-fit px-3 py-1.5 bg-accent/10 border-accent/30 text-accent">
                {item.category}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Gallery = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Автоскроллинг каждые 5 секунд
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      // Сбрасываем таймер при ручном переключении
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 relative transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Декоративный элемент заголовка */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="relative z-10">Наши работы</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h2>
          <p className={`text-xl text-muted-foreground font-sans max-w-2xl mx-auto transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Реализованные проекты для частных и коммерческих клиентов
          </p>
        </div>
        
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto relative"
        >
          {/* Декоративные элементы по бокам карусели */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-32 bg-gradient-to-r from-accent/20 to-transparent rounded-r-full blur-sm" />
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-32 bg-gradient-to-l from-accent/20 to-transparent rounded-l-full blur-sm" />
          
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            setApi={setApi}
          >
            <CarouselContent>
              {galleryItems.map((item, index) => (
                <CarouselItem key={item.id} className={`md:basis-1/2 lg:basis-1/3 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <GalleryCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-accent/10 hover:bg-accent/20 border-accent/30" />
            <CarouselNext className="hidden md:flex bg-accent/10 hover:bg-accent/20 border-accent/30" />
          </Carousel>
          
          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center mt-4 gap-1 md:hidden">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  index === current - 1
                    ? "w-8 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/30"
                    : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Индикаторы для десктопной версии */}
          <div className="hidden md:flex justify-center mt-6 gap-1 flex-wrap max-w-lg mx-auto">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  index === current - 1
                    ? "w-6 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/30 scale-110"
                    : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50 hover:scale-125"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className={`text-center mt-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-lg text-muted-foreground font-sans mb-6">
            Хотите такой же результат? Мы проконсультируем бесплатно!
          </p>
          <button
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl premium-button shimmer-effect relative overflow-hidden group"
          >
            <span className="relative z-10">Рассчитать стоимость проекта</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};
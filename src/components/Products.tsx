import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import privateHomeImage from "@/assets/figma-private-home.png";
import cafeImage from "@/assets/figma-cafe.png";
import gazeboImage from "@/assets/figma-gazebo.png";
import coversImage1 from "@/assets/figma-covers-1.png";
import coversImage2 from "@/assets/figma-covers-2.png";
import coversImage3 from "@/assets/figma-covers-3.png";

const products = [
  {
    title: "Для частных домов",
    description: "Защита террас и веранд с сохранением естественного освещения",
    image: privateHomeImage,
    price: "от 1 200 ₽/м²",
    features: ["Защита от ветра и осадков", "Сохранение тепла до 40%", "Срок службы до 15 лет"],
    installationTime: "1-2 дня"
  },
  {
    title: "Для кафе и ресторанов",
    description: "Расширение сезонных площадок для бизнеса",
    image: cafeImage,
    price: "от 1 500 ₽/м²",
    features: ["Увеличение посадочных мест", "Работа при -15°C", "Быстровозводимая конструкция"],
    installationTime: "2-3 дня"
  },
  {
    title: "Для беседок и террас",
    description: "Создание комфортного пространства для отдыха",
    image: gazeboImage,
    price: "от 1 300 ₽/м²",
    features: ["Полная прозрачность", "Защита от насекомых", "Легкий уход"],
    installationTime: "1 день"
  },
  {
    title: "Защитные ПВХ пленки",
    description: "Защитные ПВХ пленки для различных поверхностей",
    image: coversImage3,
    price: "от 1 500 ₽/м²",
    features: ["Простая установка", "Легкая очистка", "Долговечность до 10 лет"],
    installationTime: "3-5 дней",
    applications: [
      { area: "Использование на кухне", description: "Защита кухонных фасадов и столов от брызг и жира" },
      { area: "Столовая", description: "Сохранение чистоты обеденных зон" },
      { area: "Детские комнаты", description: "Защита стен и мебели от рисунков и повреждений" },
      { area: "Зоны присутствия животных", description: "Защита поверхностей от когтей и зубов" }
    ]
  },
  {
    title: "Чехлы и тенты на заказ",
    description: "Индивидуальные чехлы и тенты для автомобилей, включая кузова газелей",
    image: coversImage1,
    price: "от 2 000 ₽/м²",
    features: ["Влагостойкость", "УФ защита", "Износостойкость", "Легкий уход"],
    installationTime: "1-2 дня"
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
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
          <div className={`absolute top-2 right-2 z-10 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Подробнее
            </span>
          </div>
          
          {/* Декоративный уголок */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-accent/20 border-r-[40px] border-r-transparent" />
          
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}`}
            />
            {/* Улучшенный градиент с анимацией */}
            <div className={`absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-all duration-500 ${isHovered ? 'opacity-80' : 'opacity-60'}`} />
            
            {/* Премиальная иконка увеличения при наведении */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="bg-gradient-to-r from-accent/90 to-primary/90 text-white p-4 rounded-full backdrop-blur-sm shadow-lg group-hover:animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            
            {/* Анимированные частицы при наведении */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`
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
              <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-accent">{product.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-accent transition-all duration-300 group-hover:scale-110">{product.price}</span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs px-2 py-1 transition-all duration-300 ${isHovered ? 'bg-accent/10 border-accent/30 text-accent' : ''}`}
              >
                {product.installationTime}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-auto bg-gradient-to-br from-background to-card/50">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl pr-8 md:pr-0 text-gradient">{product.title}</DialogTitle>
        </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 md:h-64 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="space-y-4">
              <div className="animate-slide-in-left">
                <h4 className="font-bold mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Описание
                </h4>
                <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">{product.description}</p>
              </div>
              <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Преимущества
                </h4>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                <div>
                  <span className="text-xs text-muted-foreground">Стоимость</span>
                  <span className="text-xl md:text-2xl font-bold text-accent block transition-all duration-300 hover:scale-105">{product.price}</span>
                </div>
                <Badge variant="secondary" className="w-fit px-3 py-1.5 bg-accent/10 border-accent/30 text-accent">
                  {product.installationTime}
                </Badge>
              </div>
            </div>
          </div>
        {product.applications && (
          <div className="mt-4">
            <h4 className="font-bold mb-3 text-lg">Области применения</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {product.applications.map((app, idx) => (
                <Card key={idx} className="p-4">
                  <h5 className="font-bold mb-2 text-accent">{app.area}</h5>
                  <p className="text-sm text-muted-foreground font-sans">{app.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};


export const Products = () => {
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
          className={`text-center mb-16 relative transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Декоративный элемент заголовка */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="relative z-10">Наши решения</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h2>
          <p className={`text-xl text-muted-foreground font-sans max-w-2xl mx-auto transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Профессиональные мягкие окна для любых типов помещений
          </p>
        </div>
        
        {/* Все решения в одном слайдере */}
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto relative transition-all duration-700 delay-300"
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
              {products.map((product, index) => (
                <CarouselItem key={index} className={`md:basis-1/2 lg:basis-1/3 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <ProductCard product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex bg-accent/10 hover:bg-accent/20 border-accent/30" />
            <CarouselNext className="hidden lg:flex bg-accent/10 hover:bg-accent/20 border-accent/30" />
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
      </div>
    </section>
  );
};

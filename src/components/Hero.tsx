import { Button } from "@/components/ui/button";
import { Shield, ChevronDown, Calendar, Building2, Award, MapPin, Sparkles } from "lucide-react";
import heroImage from "@/assets/figma-hero-image.png";
import logo from "@/assets/logo.svg";
import { useState, useEffect } from "react";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Автоматические анимации для преимуществ в хиро секции
  const {
    activeIndex,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    startAnimationAfterScroll
  } = useSequentialAnimation(4, {
    interval: 1500,
    cycleInterval: 6000,
    startDelay: 2000,
    pauseOnHover: true,
    mobileClickToRestart: true,
    direction: 'left-to-right'
  });

  // Запускаем/останавливаем анимации при загрузке страницы
  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const stats = [
    { icon: Calendar, label: "9 лет опыта", description: "Работаем с 2015 года" },
    { icon: Building2, label: "3000+ объектов", description: "Довольных клиентов" },
    { icon: Award, label: "Гарантия", description: "На все работы" },
    { icon: MapPin, label: "Челябинск и область", description: "Зона обслуживания" },
  ];

  return (
    <section className="relative h-screen flex items-center overflow-hidden" aria-labelledby="hero-title">
      {/* Фоновое изображение с премиальными эффектами */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-pulse-glow"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        {/* Дополнительный градиент для премиального эффекта */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
      </div>
      
      {/* Анимированные частицы для премиального эффекта */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className={`mb-8 md:mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="relative inline-block">
            <img src={logo} alt="Прозрачный комфорт" className="h-16 md:h-24 w-auto relative z-10" />
            {/* Свечение вокруг логотипа */}
            <div className="absolute inset-0 bg-accent/20 blur-xl scale-150 animate-pulse-glow" />
          </div>
        </div>
        
        <div className={`max-w-2xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 id="hero-title" className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight relative">
            <span className="relative z-10">
              Прозрачный комфорт — уют и защита для вашего пространства
            </span>
            {/* Подсветка текста */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-muted-foreground font-sans animate-slide-in-left">
            Мягкие окна премиум-класса для террас, кафе и загородных домов
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
            <Button
              size="lg"
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl premium-button shimmer-effect relative overflow-hidden group"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Рассчитать стоимость мягких окон"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-bounce" />
                Рассчитать стоимость
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 hover:bg-secondary/50 transition-all duration-300 hover:scale-105 active:scale-95 premium-button glass-effect"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Посмотреть примеры работ в галерее"
            >
              Смотреть примеры
            </Button>
          </div>
          
          {/* Преимущества в hero секции в виде тегов - сетка 2x2 с премиальными эффектами и анимациями */}
          <div
            className="grid grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8 max-w-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={index}
                  ref={setElementRef(index)}
                  className={`bg-card/80 backdrop-blur-sm rounded-full px-2 py-1.5 md:px-3 md:py-2 flex items-center gap-1.5 md:gap-2 hover:bg-card/90 transition-all duration-500 hover:scale-105 hover-lift animate-fade-in-up premium-card group ${isActive ? 'scale-105 shadow-lg shadow-accent/20 border-accent/50' : ''}`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className={`relative transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${isActive ? 'rotate-6 scale-110' : ''}`}>
                    <Icon className={`w-3 h-3 md:w-4 md:h-4 text-primary transition-colors duration-300 group-hover:text-accent ${isActive ? 'text-accent' : ''}`} />
                    <div className={`absolute inset-0 bg-accent/20 rounded-full blur-sm animate-pulse transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs md:text-sm font-bold transition-colors duration-300 group-hover:text-accent ${isActive ? 'text-accent' : ''}`}>{stat.label}</span>
                    <span className="text-xs text-muted-foreground font-sans hidden md:block">{stat.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Индикатор прокрутки с улучшенным позиционированием для мобильных */}
      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center animate-bounce-soft z-20 px-4">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-all duration-300 group"
          aria-label="Прокрутить вниз к следующему разделу"
          title="Перейти к следующему разделу"
        >
          <span className="text-xs md:text-sm mb-1 md:mb-2 font-medium group-hover:text-accent">Далее</span>
          <div className="relative">
            <ChevronDown className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  );
};

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Clock, Hammer, Sparkles, Shield, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";

const benefits = [
  {
    icon: Globe,
    title: "Материалы высокого качества",
    description: "Высококачественный прозрачный ПВХ премиум-класса",
  },
  {
    icon: Clock,
    title: "Служат до 10 лет",
    description: "Устойчивы к температурам от -40°C до +70°C",
  },
  {
    icon: Hammer,
    title: "Монтаж за 1–2 дня",
    description: "Быстрая установка без нарушения комфорта",
  },
  {
    icon: Sparkles,
    title: "Аккуратная работа",
    description: "Без мусора, пыли и повреждений",
  },
  {
    icon: Shield,
    title: "Гарантия",
    description: "Полная ответственность за качество",
  },
  {
    icon: CheckCircle,
    title: "Точность размеров",
    description: "Профессиональный замер и изготовление",
  },
];

export const Benefits = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1 });
  
  // Автоматические анимации для преимуществ
  const {
    activeIndex,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    // startAnimationAfterScroll
  } = useSequentialAnimation(6, {
    interval: 1500,
    cycleInterval: 9000,
    startDelay: 2500,
    pauseOnHover: true,
    mobileClickToRestart: true,
    direction: 'left-to-right'
  });

  // Запускаем/останавливаем анимации при появлении/скрытии секции
  useEffect(() => {
    if (contentVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [contentVisible, startAnimation, stopAnimation]);

  return (
    <section className="py-20 bg-gradient-to-b from-card via-card/50 to-background relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/50 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-16 relative transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Декоративный элемент заголовка */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="relative z-10">Почему нас выбирают</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h2>
          <p className={`text-xl text-muted-foreground font-sans max-w-2xl mx-auto transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Качество и надёжность в каждой детали
          </p>
        </div>
        
        <div
          ref={contentRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isActive = activeIndex === index;
            const isVisible = contentVisible;
            const isEven = index % 2 === 0;
            
            return (
              <Card
                key={index}
                ref={setElementRef(index)}
                className={`group p-4 md:p-6 hover:premium-shadow transition-all duration-1000 border-border/50 premium-card relative overflow-hidden ${isEven ? 'hover:scale-[1.02]' : 'hover:scale-[1.03]'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isActive ? 'scale-105 shadow-lg shadow-accent/20 border-accent/50' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Декоративный уголок */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-accent/10" />
                
                {/* Анимированные частицы при наведении */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-accent/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${30 + i * 20}%`,
                        transitionDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
                
                <CardContent className="p-0 relative">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-1000 relative ${isEven ? 'group-hover:rotate-6' : 'group-hover:-rotate-6'} ${isActive ? 'from-accent/40 to-primary/40' + (isEven ? ' rotate-6' : ' -rotate-6') : ''}`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-primary relative z-10 transition-all duration-1000 ${isActive ? 'text-accent scale-110' : ''}`} />
                      {/* Свечение вокруг иконки */}
                      <div className={`absolute inset-0 bg-accent/20 rounded-full blur-md transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base md:text-xl font-bold mb-1 md:mb-2 transition-colors duration-1000 ${isActive ? 'text-accent' : 'group-hover:text-accent'}`}>{benefit.title}</h3>
                      <p className="text-muted-foreground font-sans text-xs md:text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Декоративная линия внизу */}
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Дополнительный декоративный элемент */}
        <div className={`mt-16 text-center transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">9 лет безупречной репутации</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

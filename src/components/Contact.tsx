import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import logo from "@/assets/logo.svg";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";
import { useEffect } from "react";

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (351) 000-00-00",
    action: "tel:+73510000000",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    action: "https://wa.me/73510000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@prozrachnycomfort.ru",
    action: "mailto:info@prozrachnycomfort.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Челябинск, ул. Примерная, д. 1",
    action: null,
  },
  {
    icon: Clock,
    label: "График работы",
    value: "Пн-Вс: 9:00 — 20:00",
    action: null,
  },
];

export const Contact = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({ threshold: 0.2 });
  
  // Автоматические анимации для контактных карточек
  const {
    activeIndex,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    // startAnimationAfterScroll
  } = useSequentialAnimation(5, {
    interval: 1000,
    cycleInterval: 7000,
    startDelay: 1000,
    pauseOnHover: true,
    mobileClickToRestart: true,
    direction: 'left-to-right'
  });

  // Запускаем/останавливаем анимации при появлении/скрытии секции
  useEffect(() => {
    if (rightVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [rightVisible, startAnimation, stopAnimation]);

  const handleCallRequest = () => {
    toast.success("Спасибо! Мы перезвоним вам в течение 15 минут");
  };

  return (
    <footer className="py-10 md:py-12 bg-gradient-to-b from-card via-secondary/10 to-secondary/20 relative overflow-hidden" role="contentinfo">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div
            ref={leftRef}
            className={`relative transition-all duration-700 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Декоративный уголок */}
            <div className="absolute top-0 left-0 w-0 h-0 border-r-[40px] border-r-transparent border-t-[40px] border-t-accent/10" />
            
            <div className="relative inline-block mb-4 md:mb-6">
              <img src={logo} alt="Прозрачный комфорт" className="h-12 md:h-16 w-auto relative z-10" />
              {/* Свечение вокруг логотипа */}
              <div className="absolute inset-0 bg-accent/20 blur-xl scale-150 animate-pulse-glow" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative">
              <span className="relative z-10">Свяжитесь с нами</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-sans mb-4 md:mb-6 leading-relaxed animate-slide-in-up">
              Готовы ответить на любые вопросы и помочь с выбором мягких окон для вашего объекта.
            </p>
            <Button
              onClick={() => window.open("tel:+73510000000")}
              size="lg"
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl text-base md:text-lg py-3 md:py-4 px-6 premium-button shimmer-effect relative overflow-hidden group"
              aria-label="Позвонить в компанию Прозрачный комфорт"
            >
              <span className="relative z-10 flex items-center">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-bounce" />
                Позвонить
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Button>
          </div>
          
          <div
            ref={rightRef}
            className={`space-y-3 md:space-y-4 transition-all duration-700 ${rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  ref={setElementRef(index)}
                  className={`border-border/50 hover:premium-shadow transition-all duration-1000 premium-card relative overflow-hidden group ${rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${activeIndex === index ? 'scale-105 shadow-lg shadow-accent/20 border-accent/50' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Декоративный уголок */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-accent/10" />
                  
                  {/* Анимированные частицы при наведении */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-accent/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          left: `${20 + i * 60}%`,
                          top: `${40 + i * 20}%`,
                          transitionDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                  
                  <CardContent className="p-3 md:p-4 relative">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-1000 relative ${index % 2 === 0 ? 'group-hover:rotate-6' : 'group-hover:-rotate-6'} ${activeIndex === index ? 'from-accent/40 to-primary/40' + (index % 2 === 0 ? ' rotate-6' : ' -rotate-6') : ''}`}>
                        <Icon className={`w-4 h-4 md:w-5 md:h-5 text-primary relative z-10 transition-all duration-1000 ${activeIndex === index ? 'text-accent scale-110' : ''}`} />
                        {/* Свечение вокруг иконки */}
                        <div className={`absolute inset-0 bg-accent/20 rounded-full blur-md transition-opacity duration-1000 ${activeIndex === index ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-muted-foreground font-sans">{info.label}</p>
                        {info.action ? (
                          <a
                            href={info.action}
                            className={`text-sm md:text-base text-foreground font-medium hover:text-primary transition-colors duration-1000 truncate block ${activeIndex === index ? 'text-accent' : 'group-hover:text-accent'}`}
                            target={info.action.startsWith('http') ? "_blank" : undefined}
                            rel={info.action.startsWith('http') ? "noopener noreferrer" : undefined}
                            aria-label={`${info.label}: ${info.value}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className={`text-sm md:text-base text-foreground font-medium truncate transition-colors duration-1000 ${activeIndex === index ? 'text-accent' : 'group-hover:text-accent'}`} aria-label={`${info.label}: ${info.value}`}>{info.value}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Декоративная линия внизу */}
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className={`border-t border-border/50 pt-2 md:pt-3 text-center text-xs md:text-sm text-muted-foreground font-sans relative transition-all duration-700 ${rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          {/* Декоративный элемент */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          <p className="mb-1">© 2025 Прозрачный комфорт. Все права защищены.</p>
          <p className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span>Мы не просто ставим окна — мы создаём комфорт, который видно.</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

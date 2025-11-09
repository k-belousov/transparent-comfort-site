import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";

interface AnimatedCardProps {
  index: number;
  totalItems: number;
  title: string;
  description: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  animationInterval?: number;
  animationCycleInterval?: number;
  animationStartDelay?: number;
  isVisible?: boolean;
  className?: string;
  contentClassName?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  index,
  totalItems,
  title,
  description,
  icon: Icon,
  children,
  animationInterval = 1500,
  animationCycleInterval = 8000,
 animationStartDelay = 2000,
  isVisible: externalVisible,
  className = "",
  contentClassName = ""
}) => {
  const { ref: cardRef, isVisible: scrollVisible } = useScrollReveal({ threshold: 0.1 });
  
  // Автоматические анимации для карточки
 const {
    activeIndex,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick
  } = useSequentialAnimation(1, {
    interval: animationInterval,
    cycleInterval: animationCycleInterval,
    startDelay: animationStartDelay,
    pauseOnHover: true,
    mobileClickToRestart: true,
    direction: 'left-to-right'
  });

  const isVisible = externalVisible !== undefined ? externalVisible : scrollVisible;

  // Запускаем/останавливаем анимации при появлении/скрытии секции
  useEffect(() => {
    if (isVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isVisible, startAnimation, stopAnimation]);

  const isActive = activeIndex === 0;

  return (
    <Card
      ref={(el) => {
        cardRef.current = el;
        setElementRef(0)(el);
      }}
      className={`group p-4 md:p-6 hover:premium-shadow transition-all duration-1000 border-border/50 premium-card relative overflow-hidden hover:scale-[1.02] ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isActive ? 'scale-105 shadow-lg shadow-accent/20 border-accent/50' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
      
      <CardContent className={`p-0 relative ${contentClassName}`}>
        <div className="flex items-start gap-3 md:gap-4">
          {Icon && (
            <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-1000 group-hover:rotate-6 ${isActive ? 'from-accent/40 to-primary/40 rotate-6' : ''}`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 text-primary relative z-10 transition-all duration-1000 ${isActive ? 'text-accent scale-110' : ''}`} />
              {/* Свечение вокруг иконки */}
              <div className={`absolute inset-0 bg-accent/20 rounded-full blur-md transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-base md:text-xl font-bold mb-1 md:mb-2 transition-colors duration-1000 ${isActive ? 'text-accent' : 'group-hover:text-accent'}`}>{title}</h3>
            <p className="text-muted-foreground font-sans text-xs md:text-sm leading-relaxed">
              {description}
            </p>
            {children}
          </div>
        </div>
        
        {/* Декоративная линия внизу */}
        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </CardContent>
    </Card>
  );
};
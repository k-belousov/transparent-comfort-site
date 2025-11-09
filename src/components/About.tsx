import { useEffect } from "react";
import craftsmanImage from "@/assets/figma-craftsman.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";

export const About = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({ threshold: 0.2 });
  
  // Автоматические анимации для преимуществ
  const {
    activeIndex,
    setElementRef,
    startAnimation,
    stopAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    startAnimationAfterScroll
  } = useSequentialAnimation(3, {
    interval: 2000,
    cycleInterval: 8000,
    startDelay: 3000,
    pauseOnHover: true,
    mobileClickToRestart: true,
    direction: 'left-to-right'
  });

  // Запускаем/останавливаем анимации при появлении/скрытии секции
  useEffect(() => {
    if (leftVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [leftVisible, startAnimation, stopAnimation]);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              ref={leftRef}
              className={`transition-all duration-700 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Надёжность в деталях
              </h2>
              <p className="text-lg text-muted-foreground mb-8 font-sans leading-relaxed">
                Мы работаем уже 9 лет и создаём мягкие окна, которые служат годами.
                Наши клиенты ценят аккуратность, точность и честность.
              </p>
              <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                Каждый проект мы выполняем с особым вниманием к деталям,
                используя только проверенные материалы высокого качества и современное оборудование.
              </p>
            </div>
            
            <div
              ref={rightRef}
              className={`relative transition-all duration-700 ${rightVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <img
                src={craftsmanImage}
                alt="Мастер на замере"
                className="rounded-2xl shadow-elevated w-full h-auto"
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {[0, 1, 2].map((index) => {
              const isActive = activeIndex === index;
              const isVisible = leftVisible;
              const titles = ['Индивидуальный подход', 'Качественные материалы', 'Профессиональная установка'];
              const descriptions = [
                'Разрабатываем решения под ваши задачи и бюджет',
                'Используем только сертифицированную ПВХ-пленку и фурнитуру',
                'Опытные мастера гарантируют идеальный результат'
              ];
              const delays = ['200ms', '400ms', '600ms'];
              
              return (
                <div
                  key={index}
                  ref={setElementRef(index)}
                  className={`bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isActive ? 'scale-105 shadow-lg shadow-accent/20 border-accent/50' : ''}`}
                  style={{ transitionDelay: delays[index] }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 transition-all duration-1000 ${isActive ? 'scale-150 animate-pulse' : ''}`} />
                    <div>
                      <h3 className={`font-bold mb-1 transition-colors duration-1000 ${isActive ? 'text-accent' : ''}`}>{titles[index]}</h3>
                      <p className="text-sm text-muted-foreground font-sans">
                        {descriptions[index]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

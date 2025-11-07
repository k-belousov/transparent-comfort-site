import craftsmanImage from "@/assets/figma-craftsman.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const About = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
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
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-500 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Индивидуальный подход</h3>
                    <p className="text-sm text-muted-foreground font-sans">
                      Разрабатываем решения под ваши задачи и бюджет
                    </p>
                  </div>
                </div>
              </div>
              <div className={`bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-500 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Качественные материалы</h3>
                    <p className="text-sm text-muted-foreground font-sans">
                      Используем только сертифицированную ПВХ-пленку и фурнитуру
                    </p>
                  </div>
                </div>
              </div>
              <div className={`bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-500 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">Профессиональная установка</h3>
                    <p className="text-sm text-muted-foreground font-sans">
                      Опытные мастера гарантируют идеальный результат
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
      </div>
    </section>
  );
};

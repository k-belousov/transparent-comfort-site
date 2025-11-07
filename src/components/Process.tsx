import { Card, CardContent } from "@/components/ui/card";
import { Phone, Ruler, Factory, Wrench, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Заявка",
    description: "Свяжитесь с нами удобным способом — позвоните или оставьте заявку на сайте",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Замер",
    description: "Наш специалист приедет, проведёт замеры и рассчитает точную стоимость",
  },
  {
    icon: Factory,
    number: "03",
    title: "Производство",
    description: "Изготавливаем окна по вашим размерам из высококачественных материалов",
  },
  {
    icon: Wrench,
    number: "04",
    title: "Монтаж",
    description: "Аккуратно устанавливаем окна за 1-2 дня без мусора и повреждений",
  },
  {
    icon: Award,
    number: "05",
    title: "Гарантия",
    description: "Остаёмся на связи для поддержки и обслуживания",
  },
];

export const Process = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="py-20 bg-gradient-to-b from-background via-card/30 to-card relative overflow-hidden">
      {/* Улучшенный фон с анимацией */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--accent))_25%,transparent_25%,transparent_75%,hsl(var(--accent))_75%)] bg-[length:20px_20px] animate-gradient-shift" />
      </div>
      
      {/* Анимированные декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-32 right-20 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '0.7s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-16 relative transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Декоративный элемент заголовка */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="relative z-10">Как всё происходит</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h2>
          <p className={`text-xl text-muted-foreground font-sans max-w-2xl mx-auto transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Простой и прозрачный процесс от заявки до установки
          </p>
        </div>
        
        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 relative"
        >
          {/* Соединяющая линия между шагами */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent transform -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-border/50 hover:premium-shadow transition-all duration-500 premium-card z-10 ${index % 2 === 0 ? 'hover:scale-[1.03]' : 'hover:scale-[1.02]'} ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Декоративный уголок */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[25px] border-l-transparent border-t-[25px] border-t-accent/10" />
                
                {/* Анимированные частицы при наведении */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-accent/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        left: `${30 + i * 40}%`,
                        top: `${40 + i * 20}%`,
                        transitionDelay: `${i * 150}ms`
                      }}
                    />
                  ))}
                </div>
                
                <CardContent className="p-3 md:p-6 text-center relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`text-6xl md:text-8xl font-bold text-accent/20 transition-all duration-500 group-hover:text-accent/30 ${index % 2 === 0 ? 'group-hover:rotate-6' : 'group-hover:-rotate-6'}`}>
                      {step.number}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className={`p-1.5 md:p-3 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 w-fit mx-auto mb-2 md:mb-4 group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300 relative ${index % 2 === 0 ? 'group-hover:rotate-12' : 'group-hover:-rotate-12'}`}>
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-primary relative z-10" />
                      {/* Свечение вокруг иконки */}
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                    </div>
                    <h3 className="text-base md:text-xl font-bold mb-1 md:mb-3 transition-colors duration-300 group-hover:text-accent">{step.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-sans line-clamp-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Декоративная линия внизу */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Дополнительный декоративный элемент */}
        <div className={`mt-16 text-center transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Весь процесс занимает от 3 до 7 дней</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

import craftsmanImage from "@/assets/figma-craftsman.png";

export const About = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
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
              <div className="bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-300">
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
              <div className="bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-300">
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
              <div className="bg-card/50 border border-border/30 rounded-lg p-4 hover:shadow-md transition-all duration-300">
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
          
          <div className="relative animate-scale-in">
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

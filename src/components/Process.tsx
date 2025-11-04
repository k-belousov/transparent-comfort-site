import { Card, CardContent } from "@/components/ui/card";
import { Phone, Ruler, Factory, Wrench, Award } from "lucide-react";

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
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,hsl(var(--accent))_25%,transparent_25%,transparent_75%,hsl(var(--accent))_75%)] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Как всё происходит
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Простой и прозрачный процесс от заявки до установки
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl font-bold text-accent/20 mb-4">
                    {step.number}
                  </div>
                  <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

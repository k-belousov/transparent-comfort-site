import { Card, CardContent } from "@/components/ui/card";
import { Globe, Clock, Hammer, Sparkles, Shield, CheckCircle } from "lucide-react";

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
  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Почему нас выбирают
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Качество и надёжность в каждой детали
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="group p-6 hover:shadow-lg transition-all duration-300 border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground font-sans text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

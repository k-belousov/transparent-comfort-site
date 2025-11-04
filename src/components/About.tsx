import { Card } from "@/components/ui/card";
import { Award, Building2, Calendar, MapPin } from "lucide-react";
import craftsmanImage from "@/assets/figma-craftsman.png";

const stats = [
  { icon: Calendar, label: "9 лет опыта", description: "Работаем с 2015 года" },
  { icon: Building2, label: "3000+ объектов", description: "Довольных клиентов" },
  { icon: Award, label: "Гарантия", description: "На все работы" },
  { icon: MapPin, label: "Челябинск и область", description: "Зона обслуживания" },
];

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
          </div>
          
          <div className="relative animate-scale-in">
            <img 
              src={craftsmanImage} 
              alt="Мастер на замере" 
              className="rounded-2xl shadow-elevated w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground font-sans">{stat.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

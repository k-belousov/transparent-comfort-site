import { Button } from "@/components/ui/button";
import { Shield, ChevronDown } from "lucide-react";
import heroImage from "@/assets/figma-hero-image.png";
import logo from "@/assets/logo.svg";

export const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mb-12">
          <img src={logo} alt="Прозрачный комфорт" className="h-24 w-auto" />
        </div>
        
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Прозрачный комфорт — уют и защита для вашего пространства
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground font-sans">
            Мягкие окна премиум-класса для террас, кафе и загородных домов
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-accent hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Рассчитать стоимость
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 hover:bg-secondary/50 transition-all duration-300"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Смотреть примеры
            </Button>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-6 py-4 w-fit">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">Гарантия на все работы</span>
          </div>
        </div>
      </div>
      
      {/* Индикатор прокрутки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          aria-label="Прокрутить вниз"
        >
          <span className="text-sm mb-2 font-medium">Далее</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

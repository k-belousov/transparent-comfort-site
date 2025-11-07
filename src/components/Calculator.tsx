import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const typePrices = {
  home: 1200,
  cafe: 1500,
  gazebo: 1300,
  covers: 1500,
  custom: 2000,
};

const materialPrices = {
  pvc: 1.0,
  premium: 1.3,
  japanese: 1.5,
};

const typeNames = {
  home: "Для частного дома",
  cafe: "Для кафе и ресторанов",
  gazebo: "Для беседок и террас",
  covers: "Защитные ПВХ пленки",
  custom: "Чехлы и тенты на заказ",
};

const materialNames = {
  pvc: "ПВХ стандарт",
  premium: "ПВХ премиум",
  japanese: "Материал высокого качества",
};

export const Calculator = () => {
  const [formData, setFormData] = useState({
    type: "",
    width: "",
    height: "",
    material: "",
  });
  
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculatePrice = () => {
    if (!formData.type || !formData.width || !formData.height || !formData.material) {
      toast.error("Пожалуйста, заполните тип, размеры и материал для расчета");
      return;
    }
    
    setIsCalculating(true);
    
    // Имитация расчета для визуального эффекта
    setTimeout(() => {
      const width = parseFloat(formData.width);
      const height = parseFloat(formData.height);
      const area = width * height;
      const basePrice = typePrices[formData.type as keyof typeof typePrices] || 8000;
      const materialMultiplier = materialPrices[formData.material as keyof typeof materialPrices] || 1.0;
      const price = Math.round(area * basePrice * materialMultiplier);
      
      setCalculatedPrice(price);
      setShowContactButtons(true);
      setIsCalculating(false);
      toast.success("Расчет выполнен успешно!");
    }, 1500);
  };

  const handleContact = (method: 'phone' | 'whatsapp' | 'email') => {
    const materialName = materialNames[formData.material as keyof typeof materialNames] || "Не указан";
    const message = `Здравствуйте! Я рассчитал(а) стоимость мягких окон для ${typeNames[formData.type as keyof typeof typeNames]} площадью ${formData.width}м × ${formData.height}м. Материал: ${materialName}. Примерная стоимость: ${calculatedPrice?.toLocaleString()} руб. Хотел(а) бы получить точный расчет.`;
    
    switch (method) {
      case 'phone':
        window.open('tel:+73510000000');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/73510000000?text=${encodeURIComponent(message)}`);
        break;
      case 'email':
        window.open(`mailto:info@prozrachnycomfort.ru?subject=Запрос на расчет мягких окон&body=${encodeURIComponent(message)}`);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.width || !formData.height || !formData.material) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    toast.success("Спасибо! Наш инженер свяжется с вами в ближайшее время");
    setFormData({ type: "", width: "", height: "", material: "" });
    setCalculatedPrice(null);
    setShowContactButtons(false);
  };

  const resetCalculator = () => {
    setCalculatedPrice(null);
    setShowContactButtons(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card via-card/50 to-background relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in relative">
            {/* Декоративный элемент заголовка */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
              <span className="relative z-10">Калькулятор стоимости</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
            </h2>
            <p className="text-xl text-muted-foreground font-sans animate-slide-in-up">
              Рассчитайте предварительную стоимость за 1 минуту
            </p>
          </div>
          
          <Card className="border-border/50 premium-shadow animate-scale-in premium-card relative overflow-hidden">
            {/* Декоративный уголок */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-accent/10" />
            
            <CardContent className="p-4 md:p-8 relative">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-2 animate-slide-in-left">
                  <Label htmlFor="type" className="flex items-center gap-2">
                    <span>Тип *</span>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => {
                    setFormData({ ...formData, type: value });
                    resetCalculator();
                  }}>
                    <SelectTrigger id="type" className="hover:border-accent/50 transition-colors">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent className="border-accent/20">
                      <SelectItem value="home">Для частного дома</SelectItem>
                      <SelectItem value="cafe">Для кафе и ресторанов</SelectItem>
                      <SelectItem value="gazebo">Для беседок и террас</SelectItem>
                      <SelectItem value="covers">Защитные ПВХ пленки</SelectItem>
                      <SelectItem value="custom">Чехлы и тенты на заказ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  <div className="space-y-2">
                    <Label htmlFor="width" className="flex items-center gap-2">
                      <span>Ширина (метры) *</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      placeholder="Например: 3.5"
                      value={formData.width}
                      onChange={(e) => {
                        setFormData({ ...formData, width: e.target.value });
                        resetCalculator();
                      }}
                      className="hover:border-accent/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <span>Высота (метры) *</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      placeholder="Например: 2.5"
                      value={formData.height}
                      onChange={(e) => {
                        setFormData({ ...formData, height: e.target.value });
                        resetCalculator();
                      }}
                      className="hover:border-accent/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="material" className="flex items-center gap-2">
                    <span>Материал *</span>
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  </Label>
                  <Select value={formData.material} onValueChange={(value) => {
                    setFormData({ ...formData, material: value });
                    resetCalculator();
                  }}>
                    <SelectTrigger id="material" className="hover:border-accent/50 transition-colors">
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent className="border-accent/20">
                      <SelectItem value="pvc">ПВХ стандарт - долговечный и практичный</SelectItem>
                      <SelectItem value="premium">ПВХ премиум - повышенная прочность</SelectItem>
                      <SelectItem value="japanese">Материал высокого качества - максимальная прозрачность</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Кнопка расчета стоимости */}
                <Button
                  type="button"
                  onClick={calculatePrice}
                  disabled={isCalculating}
                  className="w-full text-base md:text-lg py-4 md:py-6 bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl premium-button shimmer-effect relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    {isCalculating ? (
                      <>
                        <div className="w-4 h-4 md:w-5 md:h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Расчет...
                      </>
                    ) : (
                      <>
                        <CalcIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-bounce" />
                        Получить предварительный расчет
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Button>
                
                {/* Отображение рассчитанной стоимости */}
                {calculatedPrice !== null && (
                  <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4 md:p-6 text-center animate-fade-in premium-card relative overflow-hidden">
                    {/* Декоративные частицы */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-accent/50 rounded-full animate-pulse"
                          style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + i * 15}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    <p className="text-xs md:text-sm text-muted-foreground font-sans mb-2 animate-slide-in-up">
                      Это примерный расчет стоимости
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-accent mb-3 md:mb-4 transition-all duration-300 hover:scale-105 animate-zoom-in">
                      от {calculatedPrice.toLocaleString()} ₽
                    </p>
                    <p className="text-xs text-muted-foreground font-sans animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                      *Точная стоимость будет определена после замера инженером с учетом всех особенностей объекта
                    </p>
                  </div>
                )}
                
                {/* Кнопки для связи после расчета */}
                {showContactButtons && calculatedPrice !== null && (
                  <div className="space-y-3 animate-fade-in-up">
                    <p className="text-center text-xs md:text-sm text-muted-foreground font-sans">
                      Получите более точный расчет от нашего инженера:
                    </p>
                    <Button
                      type="button"
                      onClick={() => handleContact('phone')}
                      className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base py-3 md:py-4 premium-button"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Получить точный расчет
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleContact('whatsapp')}
                        className="hover:bg-accent/20 transition-all duration-300 text-sm md:text-base py-2 md:py-3 premium-button hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleContact('email')}
                        className="hover:bg-accent/20 transition-all duration-300 text-sm md:text-base py-2 md:py-3 premium-button hover:scale-105"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                )}
                
                
                <p className="text-xs text-muted-foreground text-center font-sans">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

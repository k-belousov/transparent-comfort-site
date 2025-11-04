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

  const calculatePrice = () => {
    if (!formData.type || !formData.width || !formData.height || !formData.material) {
      toast.error("Пожалуйста, заполните тип, размеры и материал для расчета");
      return;
    }
    
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    const area = width * height;
    const basePrice = typePrices[formData.type as keyof typeof typePrices] || 8000;
    const materialMultiplier = materialPrices[formData.material as keyof typeof materialPrices] || 1.0;
    const price = Math.round(area * basePrice * materialMultiplier);
    
    setCalculatedPrice(price);
    setShowContactButtons(true);
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
    <section id="calculator" className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Калькулятор стоимости
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              Рассчитайте предварительную стоимость за 1 минуту
            </p>
          </div>
          
          <Card className="border-border/50 shadow-elevated animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Тип *</Label>
                  <Select value={formData.type} onValueChange={(value) => {
                    setFormData({ ...formData, type: value });
                    resetCalculator();
                  }}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Для частного дома</SelectItem>
                      <SelectItem value="cafe">Для кафе и ресторанов</SelectItem>
                      <SelectItem value="gazebo">Для беседок и террас</SelectItem>
                      <SelectItem value="covers">Защитные ПВХ пленки</SelectItem>
                      <SelectItem value="custom">Чехлы и тенты на заказ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Ширина (метры) *</Label>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Высота (метры) *</Label>
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
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="material">Материал *</Label>
                  <Select value={formData.material} onValueChange={(value) => {
                    setFormData({ ...formData, material: value });
                    resetCalculator();
                  }}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
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
                  className="w-full text-lg py-6 bg-secondary hover:bg-secondary/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <CalcIcon className="w-5 h-5 mr-2" />
                  Получить предварительный расчет
                </Button>
                
                {/* Отображение рассчитанной стоимости */}
                {calculatedPrice !== null && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center animate-fade-in">
                    <p className="text-sm text-muted-foreground font-sans mb-2">
                      Это примерный расчет стоимости
                    </p>
                    <p className="text-3xl font-bold text-accent mb-4">
                      от {calculatedPrice.toLocaleString()} ₽
                    </p>
                    <p className="text-xs text-muted-foreground font-sans">
                      *Точная стоимость будет определена после замера инженером с учетом всех особенностей объекта
                    </p>
                  </div>
                )}
                
                {/* Кнопки для связи после расчета */}
                {showContactButtons && calculatedPrice !== null && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-center text-sm text-muted-foreground font-sans">
                      Получите более точный расчет от нашего инженера:
                    </p>
                    <Button 
                      type="button"
                      onClick={() => handleContact('phone')}
                      className="w-full bg-accent hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Получить точный расчет
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleContact('whatsapp')}
                        className="hover:bg-accent/20 transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleContact('email')}
                        className="hover:bg-accent/20 transition-all duration-300"
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

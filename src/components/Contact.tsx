import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import logo from "@/assets/logo.svg";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (351) 000-00-00",
    action: "tel:+73510000000",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    action: "https://wa.me/73510000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@prozrachnycomfort.ru",
    action: "mailto:info@prozrachnycomfort.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Челябинск, ул. Примерная, д. 1",
    action: null,
  },
  {
    icon: Clock,
    label: "График работы",
    value: "Пн-Вс: 9:00 — 20:00",
    action: null,
  },
];

export const Contact = () => {
  const handleCallRequest = () => {
    toast.success("Спасибо! Мы перезвоним вам в течение 15 минут");
  };

  return (
    <footer className="py-20 bg-gradient-to-b from-card to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <img src={logo} alt="Прозрачный комфорт" className="h-16 w-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground font-sans mb-6 leading-relaxed">
              Готовы ответить на любые вопросы и помочь с выбором мягких окон для вашего объекта.
            </p>
            <Button 
              onClick={handleCallRequest}
              size="lg"
              className="bg-accent hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Заказать звонок
            </Button>
          </div>
          
          <div className="space-y-4 animate-fade-in-up">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={index}
                  className="border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-sans">{info.label}</p>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-foreground font-medium hover:text-primary transition-colors"
                            target={info.action.startsWith('http') ? "_blank" : undefined}
                            rel={info.action.startsWith('http') ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground font-sans">
          <p>© 2025 Прозрачный комфорт. Все права защищены.</p>
          <p className="mt-2">Мы не просто ставим окна — мы создаём комфорт, который видно.</p>
        </div>
      </div>
    </footer>
  );
};

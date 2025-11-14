import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Quote, Calendar, MapPin, CheckCircle, Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useCarouselAnimation } from "@/hooks/use-carousel-animation";

const reviews = [
  {
    id: 1,
    name: "Александр Петров",
    avatar: "АП",
    project: "Терраса частного дома",
    rating: 5,
    date: "Октябрь 2024",
    text: "Отличная работа! Мастер приехал вовремя, всё замерил подробно. Установили за 2 дня, качество на высоте. Теперь даже в плохую погоду можем сидеть на террасе и наслаждаться видом.",
    tags: ["Частный дом", "Терраса", "35м²", "42 000 ₽"],
    price: "42 000 ₽",
    duration: "2 дня",
    location: "Челябинск, ул. Ленина",
    details: {
      materials: "ПВХ высокого качества, алюминиевый профиль",
      features: ["Автоматический подъем", "Утепление", "Дистанционное управление"],
      service: "Гарантийное обслуживание 1 год"
    }
  },
  {
    id: 2,
    name: "Мария Иванова",
    avatar: "МИ",
    project: "Летняя площадка кафе",
    rating: 5,
    date: "Сентябрь 2024",
    text: "Обратились в компанию для расширения летней площадки. Очень довольны результатом! Гости теперь могут сидеть на улице даже при прохладной погоде. Посещаемость выросла на 30%.",
    tags: ["Кафе", "Летняя площадка", "50 мест", "75 000 ₽"],
    price: "75 000 ₽",
    duration: "5 дней",
    location: "Челябинск, ул. Труда",
    details: {
      materials: "Премиум ПВХ, усиленный каркас",
      features: ["Полностью прозрачные", "Защита от ветра", "Быстросборная конструкция"],
      service: "Сезонное обслуживание"
    }
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    avatar: "ДС",
    project: "Беседка на даче",
    rating: 5,
    date: "Август 2024",
    text: "Установили мягкие окна на беседку. Качество материалов отличное, всё сделано аккуратно. Теперь семья может собираться на природе в любую погоду. Рекомендую!",
    tags: ["Дача", "Беседка", "20м²", "26 000 ₽"],
    price: "26 000 ₽",
    duration: "2 дня",
    location: "Челябинск, п. Смолино",
    details: {
      materials: "Стандартный ПВХ, деревянный каркас",
      features: ["Защита от насекомых", "Легкий уход", "Долговечность"],
      service: "Гарантия"
    }
  },
  {
    id: 4,
    name: "Елена Козлова",
    avatar: "ЕК",
    project: "Веранда коттеджа",
    rating: 5,
    date: "Июль 2024",
    text: "Искали надежную компанию для остекления веранды. Прозрачный комфорт превзошел все ожидания! Профессиональный подход, качественные материалы, соблюдение сроков.",
    tags: ["Коттедж", "Веранда", "25м²", "32 500 ₽"],
    price: "32 500 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Свердлова",
    details: {
      materials: "ПВХ высокого качества, стальной профиль",
      features: ["Полностью автоматизировано", "Герметичные швы", "Теплоизоляция"],
      service: "Выездная диагностика"
    }
  },
  {
    id: 5,
    name: "Игорь Николаев",
    avatar: "ИН",
    project: "Ресторан с панорамным видом",
    rating: 5,
    date: "Июнь 2024",
    text: "Большой проект для нашего ресторана. Команда справилась отлично! Теперь у нас есть дополнительное посадочное место даже в холодное время года. Клиенты в восторге.",
    tags: ["Ресторан", "Терраса", "80м²", "120 000 ₽"],
    price: "120 000 ₽",
    duration: "7 дней",
    location: "Челябинск, оз. Смолино",
    details: {
      materials: "Премиум ПВХ, алюминиевый профиль",
      features: ["Панорамный вид", "Усиленная конструкция", "Климат-контроль"],
      service: "Круглосуточная поддержка"
    }
  },
  {
    id: 6,
    name: "Ольга Морозова",
    avatar: "ОМ",
    project: "Семейная беседка",
    rating: 5,
    date: "Май 2024",
    text: "Хотели создать уютное место для отдыха на даче. Мягкие окна стали идеальным решением! Дети могут играть на свежем воздухе в любую погоду. Спасибо за качественную работу!",
    tags: ["Дача", "Беседка", "15м²", "19 500 ₽"],
    price: "19 500 ₽",
    duration: "1 день",
    location: "Челябинск, п. Первомайский",
    details: {
      materials: "Стандартный ПВХ, пластиковый профиль",
      features: ["Быстрая установка", "Простая эксплуатация", "Надежность"],
      service: "Сезонное обслуживание"
    }
  },
  {
    id: 7,
    name: "Сергей Волков",
    avatar: "СВ",
    project: "Защитные ПВХ пленки для кухни",
    rating: 4,
    date: "Апрель 2024",
    text: "Заказал защитные пленки для кухонного фасада. Качество хорошее, установка быстрая. Теперь не боюсь брызг жира и влаги. Единственный минус - пришлось подождать материал 3 дня.",
    tags: ["Защитные пленки", "Кухня", "10м²", "15 000 ₽"],
    price: "15 000 ₽",
    duration: "1 день",
    location: "Челябинск, ул. Блюхера",
    details: {
      materials: "ПВХ премиум",
      features: ["Влагостойкость", "Легкая очистка", "Долговечность"],
      service: "Гарантия 2 года"
    }
  },
  {
    id: 8,
    name: "Татьяна Белова",
    avatar: "ТБ",
    project: "Чехол на автомобиль Газель",
    rating: 5,
    date: "Март 2024",
    text: "Нужен был качественный чехол для перевозки продуктов. Сделали идеально! Материал плотный, швы ровные. Защищает от дождя и снега. Очень довольна качеством!",
    tags: ["Чехол", "Автомобиль", "Газель", "25 000 ₽"],
    price: "25 000 ₽",
    duration: "2 дня",
    location: "Челябинск, ул. Революции",
    details: {
      materials: "Влагостойкий материал",
      features: ["УФ защита", "Износостойкость", "Легкий уход"],
      service: "Гарантия 1 год"
    }
  },
  {
    id: 9,
    name: "Андрей Смирнов",
    avatar: "АС",
    project: "Мягкие окна для бассейна",
    rating: 5,
    date: "Февраль 2024",
    text: "Закрыли бассейн на зиму мягкими окнами. Получилось отличное помещение для отдыха даже в холодное время. Качество на высоте, все точно по размерам.",
    tags: ["Бассейн", "Закрытие", "45м²", "67 500 ₽"],
    price: "67 500 ₽",
    duration: "4 дня",
    location: "Челябинск, п. Ашинский",
    details: {
      materials: "Премиум ПВХ",
      features: ["Полная герметичность", "Защита от осадков", "Долговечность"],
      service: "Круглогодичное обслуживание"
    }
  },
  {
    id: 10,
    name: "Наталья Новикова",
    avatar: "НН",
    project: "Летняя веранда загородного клуба",
    rating: 4,
    date: "Январь 2024",
    text: "Остеклили веранду в нашем загородном клубе. Клиенты остались довольны - теперь можно отдыхать на свежем воздухе даже зимой. Работа выполнена качественно.",
    tags: ["Клуб", "Веранда", "60м²", "90 000 ₽"],
    price: "90 000 ₽",
    duration: "5 дней",
    location: "Челябинск, п. Миасское",
    details: {
      materials: "ПВХ высокого качества",
      features: ["Теплоизоляция", "Защита от ветра", "Быстросборная конструкция"],
      service: "Сезонное обслуживание"
    }
  },
  {
    id: 11,
    name: "Виктор Орлов",
    avatar: "ВО",
    project: "Защитный тент для парковки",
    rating: 5,
    date: "Декабрь 2023",
    text: "Установили защитный тент для открытой парковки. Теперь автомобили защищены от осадков и палящего солнца. Конструкция надежная, выдерживает сильный ветер.",
    tags: ["Тент", "Парковка", "100м²", "200 000 ₽"],
    price: "200 000 ₽",
    duration: "7 дней",
    location: "Челябинск, ул. Танкистов",
    details: {
      materials: "Прочный брезент",
      features: ["УФ защита", "Влагостойкость", "Усиленный каркас"],
      service: "Гарантия 3 года"
    }
  },
  {
    id: 12,
    name: "Ирина Лебедева",
    avatar: "ИЛ",
    project: "Мягкие окна для детской площадки",
    rating: 5,
    date: "Ноябрь 2023",
    text: "Закрыли детскую площадку в детском саду. Теперь дети могут гулять в любую погоду! Материал безопасный, прозрачный, хорошо защищает от ветра. Родители в восторге!",
    tags: ["Детская площадка", "Детский сад", "30м²", "45 000 ₽"],
    price: "45 000 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Космонавтов",
    details: {
      materials: "Безопасный ПВХ",
      features: ["Защита от ветра", "Полная прозрачность", "Безопасность для детей"],
      service: "Гарантийное обслуживание"
    }
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review, index, showIndicator }: { review: typeof reviews[0], index: number, showIndicator: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Индикаторы появляются только при наведении

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          className={`group cursor-pointer hover:premium-shadow transition-all duration-500 border-border/50 h-full flex flex-col relative premium-card ${isHovered ? 'scale-[1.02]' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Премиальный индикатор кликабельности - при наведении и автопереключении */}
          <div className={`absolute top-2 right-2 z-10 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${(isHovered || showIndicator) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} md:hidden`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Читать отзыв
            </span>
          </div>
          <div className={`absolute top-2 right-2 z-10 bg-gradient-to-r from-accent/80 to-primary/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${(isHovered || showIndicator) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} hidden md:block`}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Читать отзыв
            </span>
          </div>
          
          {/* Декоративный уголок */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-accent/20 border-r-[40px] border-r-transparent" />
          
          <CardContent className="p-6 flex-1 flex flex-col relative">
            {/* Декоративная линия */}
            <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Удален мобильный индикатор касания */}
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-accent font-bold transition-all duration-300 ${isHovered ? 'scale-110 shadow-lg shadow-accent/30' : ''}`}>
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-bold transition-colors duration-300 group-hover:text-accent">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.project}</p>
                </div>
              </div>
              <Quote className={`w-5 h-5 text-primary/20 transition-all duration-300 ${isHovered ? 'text-accent/40 scale-110' : ''}`} />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={review.rating} />
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            
            <p className="text-muted-foreground font-sans mb-4 leading-relaxed line-clamp-3 flex-1 transition-colors duration-300 group-hover:text-foreground">
              "{review.text}"
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {review.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="outline"
                  className={`text-xs px-2 py-1 transition-all duration-300 ${isHovered ? 'bg-accent/10 border-accent/30 text-accent' : ''}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-auto bg-gradient-to-br from-background to-card/50">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl pr-8 md:pr-0 text-gradient">Отзыв от {review.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4 animate-slide-in-left">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-accent font-bold text-lg md:text-2xl shadow-lg">
                {review.avatar}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">{review.name}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{review.project}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Отзыв
              </h4>
              <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                <p className="text-muted-foreground font-sans leading-relaxed italic text-sm md:text-base">
                  "{review.text}"
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Информация о проекте
              </h4>
              <div className="bg-card/50 rounded-lg p-4 space-y-3 border border-border/30 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                  <div className="p-1.5 rounded-full bg-accent/20">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{review.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                  <div className="p-1.5 rounded-full bg-accent/20">
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground">Срок выполнения: {review.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm p-2 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                  <div className="p-1.5 rounded-full bg-accent/20">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{review.details.service}</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Технические детали
              </h4>
              <div className="bg-card/50 rounded-lg p-4 border border-border/30 hover:border-accent/30 transition-colors">
                <p className="text-sm mb-3"><strong>Материалы:</strong> {review.details.materials}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Особенности:</strong></p>
                  <ul className="space-y-2 ml-4">
                    {review.details.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                        <span className="group-hover/item:text-foreground transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/50 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <div>
                <p className="text-sm text-muted-foreground">Стоимость проекта</p>
                <p className="text-xl md:text-2xl font-bold text-accent transition-all duration-300 hover:scale-105">{review.price}</p>
              </div>
              <Badge variant="secondary" className="text-sm w-fit px-3 py-1.5 bg-accent/10 border-accent/30 text-accent">
                {review.tags[0]}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ConsultationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleContact = (method: 'phone' | 'whatsapp' | 'email') => {
    const message = "Здравствуйте! Я хотел(а) бы получить бесплатную консультацию по мягким окнам.";
    
    switch (method) {
      case 'phone':
        window.open('tel:+7XXXXXXXXXX');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/73510000000?text=${encodeURIComponent(message)}`);
        break;
      case 'email':
        window.open(`mailto:example@email.com?subject=Запрос на консультацию&body=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl premium-button shimmer-effect relative overflow-hidden group"
      >
        <span className="relative z-10">Получить бесплатную консультацию</span>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </button>
      
      {/* Раскрывающийся скрытый блок с премиальными эффектами */}
      <div className={`mt-4 overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-lg p-4 shadow-lg max-w-md mx-auto animate-scale-in">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Выберите удобный способ связи
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => handleContact('phone')}
              className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl premium-button"
            >
              <Phone className="w-4 h-4 mr-2" />
              Позвонить
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleContact('whatsapp')}
                className="hover:bg-accent/20 transition-all duration-300 hover:scale-105 premium-button"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => handleContact('email')}
                className="hover:bg-accent/20 transition-all duration-300 hover:scale-105 premium-button"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Reviews = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1 });

  // Используем новый хук для анимаций карусели
  const {
    current,
    showIndicator,
    handleManualSwitch
  } = useCarouselAnimation(api, reviews.length, {
    interval: 5000,
    showIndicatorDuration: 2000,
    indicatorDelay: 500
  });

  const handleDotClick = (index: number) => {
    // Предотвращаем многократные вызовы при быстром клике
    if (current !== index) {
      handleManualSwitch(index);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background" aria-labelledby="reviews-title">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 relative transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Декоративный элемент заголовка */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <h2 id="reviews-title" className="text-4xl md:text-5xl font-bold mb-4 relative">
            <span className="relative z-10">Отзывы клиентов</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-xl -z-10" />
          </h2>
          <p className={`text-xl text-muted-foreground font-sans max-w-2xl mx-auto transition-all duration-700 delay-300 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Более 3000 довольных клиентов доверяют нам уже 9 лет
          </p>
        </div>
        
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto relative"
        >
          {/* Декоративные элементы по бокам карусели */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-32 bg-gradient-to-r from-accent/20 to-transparent rounded-r-full blur-sm" />
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-32 bg-gradient-to-l from-accent/20 to-transparent rounded-l-full blur-sm" />
          
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            setApi={setApi}
            role="region"
            aria-roledescription="Карусель отзывов"
            aria-label="Отзывы клиентов о наших работах"
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={review.id} className={`md:basis-1/2 lg:basis-1/3 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <ReviewCard review={review} index={index} showIndicator={showIndicator && index === current} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex bg-accent/10 hover:bg-accent/20 border-accent/30" aria-label="Предыдущий отзыв" />
            <CarouselNext className="hidden xl:flex bg-accent/10 hover:bg-accent/20 border-accent/30" aria-label="Следующий отзыв" />
          </Carousel>
          
          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center mt-4 gap-1 md:hidden" role="tablist" aria-label="Навигация по отзывам">
            {Array.from({ length: Math.min(reviews.length, 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  index === current
                    ? "w-8 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/30"
                    : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
                }`}
                role="tab"
                aria-selected={index === current}
                aria-controls={`review-slide-${index}`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Индикаторы для десктопной версии */}
          <div className="hidden md:flex justify-center mt-6 gap-1 flex-wrap max-w-lg mx-auto" role="tablist" aria-label="Навигация по отзывам">
            {Array.from({ length: reviews.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 ${
                  index === current
                    ? "w-6 h-2 bg-gradient-to-r from-accent to-primary rounded-full shadow-lg shadow-accent/30 scale-110"
                    : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50 hover:scale-125"
                }`}
                role="tab"
                aria-selected={index === current}
                aria-controls={`review-slide-${index}`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className={`text-center mt-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-lg text-muted-foreground font-sans mb-6">
            Хотите стать нашим следующим довольным клиентом?
          </p>
          <ConsultationDialog />
        </div>
      </div>
    </section>
  );
};
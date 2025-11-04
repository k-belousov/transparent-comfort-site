import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Quote, Calendar, MapPin, CheckCircle } from "lucide-react";

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

const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer hover:shadow-elevated transition-all duration-300 border-border/50 h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.project}</p>
                </div>
              </div>
              <Quote className="w-5 h-5 text-primary/20" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={review.rating} />
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            
            <p className="text-muted-foreground font-sans mb-4 leading-relaxed line-clamp-3 flex-1">
              "{review.text}"
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {review.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Отзыв от {review.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl">
                {review.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold">{review.name}</h3>
                <p className="text-muted-foreground">{review.project}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Отзыв</h4>
              <p className="text-muted-foreground font-sans leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-3">Информация о проекте</h4>
              <div className="bg-card/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{review.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Срок выполнения: {review.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{review.details.service}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Технические детали</h4>
              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm mb-3"><strong>Материалы:</strong> {review.details.materials}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Особенности:</strong></p>
                  <ul className="space-y-1 ml-4">
                    {review.details.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Стоимость проекта</p>
                <p className="text-2xl font-bold text-accent">{review.price}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {review.tags[0]}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Reviews = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Отзывы клиентов
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Более 3000 довольных клиентов доверяют нам уже 9 лет
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <ReviewCard review={review} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground font-sans mb-6">
            Хотите стать нашим следующим довольным клиентом?
          </p>
          <button
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-primary text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Получить бесплатную консультацию
          </button>
        </div>
      </div>
    </section>
  );
};
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, Clock, MapPin } from "lucide-react";
import galleryImage1 from "@/assets/figma-gallery-1.png";
import galleryImage2 from "@/assets/figma-gallery-2.png";
import galleryImage3 from "@/assets/figma-gallery-3.png";
import galleryImage4 from "@/assets/figma-gallery-4.png";
import galleryImage5 from "@/assets/figma-gallery-5.png";
import galleryImage6 from "@/assets/figma-gallery-6.png";

const galleryItems = [
  {
    id: 1,
    title: "Терраса частного дома",
    category: "Частные дома",
    description: "Установка мягких окон на террасе загородного дома площадью 35м²",
    image: galleryImage1,
    tags: ["Терраса", "35м²", "3 дня"],
    price: "42 000 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Ленина",
    details: {
      materials: "ПВХ высокого качества, алюминиевый профиль",
      features: ["Автоматический подъем", "Утепление", "Дистанционное управление"],
      client: "Частный клиент"
    }
  },
  {
    id: 2,
    title: "Летняя площадка кафе",
    category: "Кафе и рестораны",
    description: "Расширение летней площадки на 50 посадочных мест",
    image: galleryImage2,
    tags: ["Кафе", "50 м²", "5 дней"],
    price: "75 000 ₽",
    duration: "5 дней",
    location: "Челябинск, ул. Труда",
    details: {
      materials: "Премиум ПВХ, усиленный каркас",
      features: ["Полностью прозрачные", "Защита от ветра", "Быстросборная конструкция"],
      client: "Кафе 'Уютное место'"
    }
  },
  {
    id: 3,
    title: "Беседка в загородном клубе",
    category: "Коммерческие объекты",
    description: "Защита беседки для отдыха гостей клуба",
    image: galleryImage3,
    tags: ["Беседка", "20м²", "2 дня"],
    price: "26 000 ₽",
    duration: "2 дня",
    location: "Челябинск, п. Смолино",
    details: {
      materials: "Стандартный ПВХ, деревянный каркас",
      features: ["Защита от насекомых", "Легкий уход", "Долговечность"],
      client: "Загородный клуб 'Лесная поляна'"
    }
  },
  {
    id: 4,
    title: "Веранда коттеджа",
    category: "Частные дома",
    description: "Полное остекление веранды с автоматическим подъёмом",
    image: galleryImage4,
    tags: ["Веранда", "25м²", "3 дня"],
    price: "32 500 ₽",
    duration: "3 дня",
    location: "Челябинск, ул. Свердлова",
    details: {
      materials: "ПВХ высокого качества, стальной профиль",
      features: ["Полностью автоматизировано", "Герметичные швы", "Теплоизоляция"],
      client: "Частный клиент"
    }
  },
  {
    id: 5,
    title: "Ресторан с панорамным видом",
    category: "Кафе и рестораны",
    description: "Создание закрытой террасы с видом на озеро",
    image: galleryImage5,
    tags: ["Ресторан", "80м²", "7 дней"],
    price: "120 000 ₽",
    duration: "7 дней",
    location: "Челябинск, оз. Смолино",
    details: {
      materials: "Премиум ПВХ, алюминиевый профиль",
      features: ["Панорамный вид", "Усиленная конструкция", "Климат-контроль"],
      client: "Ресторан 'Озерный вид'"
    }
  },
  {
    id: 6,
    title: "Семейная беседка",
    category: "Частные дома",
    description: "Уютная беседка для семейных вечеров на даче",
    image: galleryImage6,
    tags: ["Беседка", "15м²", "1 день"],
    price: "19 500 ₽",
    duration: "1 день",
    location: "Челябинск, п. Первомайский",
    details: {
      materials: "Стандартный ПВХ, пластиковый профиль",
      features: ["Быстрая установка", "Простая эксплуатация", "Надежность"],
      client: "Частный клиент"
    }
  },
];

const GalleryCard = ({ item, index }: { item: typeof galleryItems[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-300 h-full flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {item.category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-3 line-clamp-2">{item.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto mb-3">
              {item.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Стоимость проекта:</span>
                <span className="text-lg font-bold text-accent">{item.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Срок выполнения: {item.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Заказчик: {item.details.client}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-3">Описание проекта</h4>
              <p className="text-muted-foreground font-sans">{item.description}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Технические детали</h4>
              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm mb-3"><strong>Материалы:</strong> {item.details.materials}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Особенности:</strong></p>
                  <ul className="space-y-1 ml-4">
                    {item.details.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Стоимость проекта</p>
                <p className="text-2xl font-bold text-accent">{item.price}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {item.category}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Gallery = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Наши работы
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Реализованные проекты для частных и коммерческих клиентов
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {galleryItems.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <GalleryCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground font-sans mb-6">
            Хотите такой же результат? Мы проконсультируем бесплатно!
          </p>
          <button
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-primary text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Рассчитать стоимость проекта
          </button>
        </div>
      </div>
    </section>
  );
};
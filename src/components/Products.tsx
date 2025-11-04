import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import privateHomeImage from "@/assets/figma-private-home.png";
import cafeImage from "@/assets/figma-cafe.png";
import gazeboImage from "@/assets/figma-gazebo.png";
import coversImage1 from "@/assets/figma-covers-1.png";
import coversImage2 from "@/assets/figma-covers-2.png";
import coversImage3 from "@/assets/figma-covers-3.png";

const products = [
  {
    title: "Для частных домов",
    description: "Защита террас и веранд с сохранением естественного освещения",
    image: privateHomeImage,
    price: "от 1 200 ₽/м²",
    features: ["Защита от ветра и осадков", "Сохранение тепла до 40%", "Срок службы до 15 лет"],
    installationTime: "1-2 дня"
  },
  {
    title: "Для кафе и ресторанов",
    description: "Расширение сезонных площадок для бизнеса",
    image: cafeImage,
    price: "от 1 500 ₽/м²",
    features: ["Увеличение посадочных мест", "Работа при -15°C", "Быстровозводимая конструкция"],
    installationTime: "2-3 дня"
  },
  {
    title: "Для беседок и террас",
    description: "Создание комфортного пространства для отдыха",
    image: gazeboImage,
    price: "от 1 300 ₽/м²",
    features: ["Полная прозрачность", "Защита от насекомых", "Легкий уход"],
    installationTime: "1 день"
  },
  {
    title: "Защитные ПВХ пленки",
    description: "Защитные ПВХ пленки для различных поверхностей",
    image: coversImage3,
    price: "от 1 500 ₽/м²",
    features: ["Простая установка", "Легкая очистка", "Долговечность до 10 лет"],
    installationTime: "3-5 дней",
    applications: [
      { area: "Использование на кухне", description: "Защита кухонных фасадов и столов от брызг и жира" },
      { area: "Столовая", description: "Сохранение чистоты обеденных зон" },
      { area: "Детские комнаты", description: "Защита стен и мебели от рисунков и повреждений" },
      { area: "Зоны присутствия животных", description: "Защита поверхностей от когтей и зубов" }
    ]
  },
  {
    title: "Чехлы и тенты на заказ",
    description: "Индивидуальные чехлы и тенты для автомобилей, включая кузова газелей",
    image: coversImage1,
    price: "от 2 000 ₽/м²",
    features: ["Влагостойкость", "УФ защита", "Износостойкость", "Легкий уход"],
    installationTime: "1-2 дня"
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer overflow-hidden border-border/50 hover:shadow-elevated transition-all duration-300 h-full flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-3 line-clamp-2">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-bold text-accent">{product.price}</span>
              <Badge variant="outline" className="text-xs">
                {product.installationTime}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">Описание</h4>
                <p className="text-muted-foreground font-sans">{product.description}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Преимущества</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-2xl font-bold text-accent">{product.price}</span>
                <Badge variant="secondary">{product.installationTime}</Badge>
              </div>
            </div>
          </div>
        {product.applications && (
          <div className="mt-4">
            <h4 className="font-bold mb-3">Области применения</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {product.applications.map((app, idx) => (
                <Card key={idx} className="p-4">
                  <h5 className="font-bold mb-2 text-accent">{app.area}</h5>
                  <p className="text-sm text-muted-foreground font-sans">{app.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};


export const Products = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Наши решения
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Профессиональные мягкие окна для любых типов помещений
          </p>
        </div>
        
        {/* Все решения в одном слайдере */}
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <ProductCard product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Сколько служат мягкие окна?",
    answer: "При правильной эксплуатации мягкие окна служат от 7 до 10 лет. Мы используем высококачественные материалы премиум-класса, которые устойчивы к перепадам температур, УФ-излучению и механическим воздействиям.",
  },
  {
    question: "Можно ли использовать зимой?",
    answer: "Да, наши мягкие окна выдерживают температуру от -40°C до +70°C. Они сохраняют прозрачность и эластичность даже в морозы. Многие клиенты используют их круглый год для защиты веранд и террас.",
  },
  {
    question: "Сколько стоит монтаж?",
    answer: "Стоимость монтажа зависит от площади окон, сложности конструкции и удалённости объекта. В среднем монтаж составляет 15-20% от стоимости изделия. Точную цену назовёт специалист после замера.",
  },
  {
    question: "Делаете ли нестандартные размеры?",
    answer: "Да, мы изготавливаем окна любых размеров и форм — арочные, треугольные, панорамные. Каждое изделие производится индивидуально по вашим размерам после профессионального замера.",
  },
  {
    question: "Есть ли гарантия?",
    answer: "Мы даём гарантию на все работы и материалы. В течение гарантийного срока бесплатно устраняем любые дефекты производства или монтажа.",
  },
  {
    question: "Почему окна после установки мятые?",
    answer: "После установки мягкие окна могут иметь складки и морщины — это нормально. В течение нескольких дней на солнце при комнатной температуре материал полностью расправится и приобретёт идеально гладкую поверхность. Этот процесс называется терморелаксацией и является естественным для ПВХ материалов.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Частые вопросы
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              Ответы на популярные вопросы о мягких окнах
            </p>
          </div>
          
          <Accordion type="single" collapsible className="animate-fade-in-up">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-sans leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackGoal } from "@/components/YandexMetrika";

const faqs = [
  {
    question: "Что такое мягкие окна?",
    answer: "Мягкие окна — это современная альтернатива традиционным стеклопакетам. Они представляют собой каркас с натянутым на него специальным ПВХ-материалом. Такие окна обеспечивают прозрачность, герметичность и теплоизоляцию, при этом остаются гибкими и легкими.",
  },
  {
    question: "Можно ли использовать зимой?",
    answer: "Да, наши мягкие окна выдерживают температуру от -40°C до +70°C. Они сохраняют прозрачность и эластичность даже в морозы. Многие клиенты используют их круглый год для защиты веранд и террас.",
  },
  {
    question: "Какой срок службы у мягких окон?",
    answer: "При правильной эксплуатации мягкие окна служат от 7 до 10 лет. Мы используем высококачественные материалы премиум-класса, которые устойчивы к перепадам температур, УФ-излучению и механическим воздействиям.",
  },
  {
    question: "Чем мягкие окна лучше стеклопакетов?",
    answer: "Мягкие окна легче в 5-7 раз, чем стеклопакеты, что снижает нагрузку на конструкцию. Они не требуют капитального фундамента, легко монтируются и демонтируются. Также они устойчивы к перепадам температур, не бьются и не трескаются, как стекло. По стоимости мягкие окна обходятся на 30-40% дешевле традиционных стеклопакетов аналогичных размеров.",
  },
  {
    question: "Как проходит установка?",
    answer: "Установка мягких окон занимает 1-2 дня. Наши специалисты приезжают с готовыми изделиями и аккуратно монтируют их на вашу конструкцию без мусора и повреждений.",
  },
  {
    question: "В каких городах вы работаете?",
    answer: "Мы оказываем услуги по всей Челябинской области, включая Челябинск, Златоуст, Миасс, Копейск, Магнитогорск и другие города. Также возможна работа в соседних областях по запросу.",
  },
  {
    question: "Какая толщина пленки у ваших мягких окон?",
    answer: "Мы используем ПВХ-пленку толщиной от 0.5 мм до 1.2 мм в зависимости от требований проекта. Более толстые пленки применяются для крупных конструкций и регионов с суровыми климатическими условиями.",
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
  {
    question: "В чём разница между мягкими окнами и стеклопакетами?",
    answer: `
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-border/50 rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-muted/30">
              <th class="border border-border/50 p-3 text-left">Параметр</th>
              <th class="border border-border/50 p-3 text-left">Мягкие окна</th>
              <th class="border border-border/50 p-3 text-left">Стеклопакеты</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border/50 p-3">Вес</td>
              <td class="border border-border/50 p-3">Легкие (в 5-7 раз легче)</td>
              <td class="border border-border/50 p-3">Тяжелые</td>
            </tr>
            <tr class="bg-muted/20">
              <td class="border border-border/50 p-3">Цена</td>
              <td class="border border-border/50 p-3">На 30-40% дешевле</td>
              <td class="border border-border/50 p-3">Дороже</td>
            </tr>
            <tr>
              <td class="border border-border/50 p-3">Монтаж</td>
              <td class="border border-border/50 p-3">Простой и быстрый</td>
              <td class="border border-border/50 p-3">Требует специалистов и времени</td>
            </tr>
            <tr class="bg-muted/20">
              <td class="border border-border/50 p-3">Прочность</td>
              <td class="border border-border/50 p-3">Ударопрочные, не бьются</td>
              <td class="border border-border/50 p-3">Хрупкие, могут треснуть</td>
            </tr>
            <tr>
              <td class="border border-border/50 p-3">Температурный режим</td>
              <td class="border border-border/50 p-3">От -40°C до +70°C</td>
              <td class="border border-border/50 p-3">От -20°C до +60°C</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background" aria-labelledby="faq-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 id="faq-title" className="text-4xl md:text-5xl font-bold mb-4">
              Частые вопросы
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              Ответы на популярные вопросы о мягких окнах
            </p>
          </div>
          
          <Accordion type="single" collapsible className="animate-fade-in-up" role="region" aria-label="Часто задаваемые вопросы">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger
                  className="text-left text-lg font-semibold hover:text-primary transition-colors"
                  aria-controls={`faq-answer-${index}`}
                  aria-expanded="false"
                  onClick={() => {
                    trackGoal('FAQ_QUESTION_OPEN', {
                      question: faq.question,
                      index: index
                    });
                  }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  id={`faq-answer-${index}`}
                  className="text-muted-foreground font-sans leading-relaxed"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  {typeof faq.answer === 'string' && !faq.answer.includes('<') ? (
                    <>{faq.answer}</>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

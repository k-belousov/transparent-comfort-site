import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackGoal } from "@/components/YandexMetrika";

type FAQItem = {
  question: string;
  answer: string;
  schemaAnswer?: string;
};

const faqs: FAQItem[] = [
  {
    question: "Что такое мягкие окна?",
    answer: `
      Мягкие окна — это прозрачные ПВХ-панели для защиты веранд, террас и беседок от ветра, дождя и снега.
      <br/><br/>
      <strong>Характеристики:</strong>
      <ul class="list-disc pl-5 space-y-1 mt-2">
        <li>Материал: прозрачный ПВХ</li>
        <li>Толщина: 0.5–1.2 мм</li>
        <li>Температура: от -40°C до +70°C</li>
        <li>Срок службы: 7–10 лет</li>
      </ul>
    `,
    schemaAnswer:
      "Мягкие окна — это прозрачные ПВХ-панели для защиты веранд, террас и беседок от ветра, дождя и снега. Срок службы 7–10 лет.",
  },
  {
    question: "Можно ли использовать мягкие окна зимой?",
    answer:
      "Да, мягкие окна выдерживают температуру от -40°C до +70°C и сохраняют эластичность даже в морозы. Подходят для круглогодичного использования.",
  },
  {
    question: "Какой срок службы у мягких окон?",
    answer:
      "Срок службы мягких окон составляет 7–10 лет. Используются устойчивые к УФ-излучению и перепадам температур материалы.",
  },
  {
    question: "Чем мягкие окна лучше стеклопакетов?",
    answer: `
      Мягкие окна легче стеклопакетов, не требуют капитального монтажа и стоят дешевле.
      <br/><br/>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-border/50 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr class="bg-muted/30">
              <th class="border border-border/50 p-3 text-left">Параметр</th>
              <th class="border border-border/50 p-3 text-left">Мягкие окна</th>
              <th class="border border-border/50 p-3 text-left">Стеклопакеты</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3">Вес</td>
              <td class="border p-3">Легкие (в 5–7 раз легче)</td>
              <td class="border p-3">Тяжелые</td>
            </tr>
            <tr class="bg-muted/20">
              <td class="border p-3">Цена</td>
              <td class="border p-3">На 30–40% дешевле</td>
              <td class="border p-3">Дороже</td>
            </tr>
            <tr>
              <td class="border p-3">Монтаж</td>
              <td class="border p-3">1 день</td>
              <td class="border p-3">3–7 дней</td>
            </tr>
            <tr class="bg-muted/20">
              <td class="border p-3">Прочность</td>
              <td class="border p-3">Ударопрочные, не бьются</td>
              <td class="border p-3">Хрупкие, могут треснуть</td>
            </tr>
            <tr>
              <td class="border p-3">Температурный режим</td>
              <td class="border p-3">-40°C до +70°C</td>
              <td class="border p-3">-20°C до +60°C</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    schemaAnswer:
      "Мягкие окна легче стеклопакетов, дешевле на 30–40% и устанавливаются быстрее.",
  },
  {
    question: "Сколько стоит монтаж?",
    answer:
      "Стоимость монтажа зависит от площади, сложности конструкции и удалённости объекта. В среднем монтаж составляет 15–20% от стоимости изделия.",
  },
  {
    question: "Делаете ли нестандартные размеры?",
    answer:
      "Да, мы изготавливаем окна любых форм: арочные, треугольные, панорамные. Каждое изделие производится индивидуально по вашим размерам после профессионального замера.",
  },
  {
    question: "Есть ли гарантия?",
    answer:
      "Мы даём гарантию на все работы и материалы. В течение гарантийного срока устраняем любые дефекты бесплатно.",
  },
  {
    question: "Почему окна после установки могут быть мятыми?",
    answer:
      "После установки мягкие окна могут иметь складки — это нормально. В течение нескольких дней материал расправляется под воздействием температуры (терморелаксация).",
  },
  {
    question: "Как проходит установка?",
    answer:
      "Установка занимает 1–2 дня. Специалисты привозят готовые изделия и монтируют без мусора и повреждений.",
  },
  {
    question: "В каких районах и городах Челябинска вы работаете?",
    answer: `
      <ul class="list-disc pl-5 space-y-1">
        <li>Калининский район</li>
        <li>Ленинский район</li>
        <li>Центральный район</li>
        <li>Металлургический район</li>
        <li>Советский район</li>
        <li>Тракторозаводский район</li>
        <li>Целиноградский район</li>
      </ul>
      <p class="mt-2">Также обслуживаем крупные города Челябинской области: Магнитогорск, Златоуст, Миасс, Копейск, Сатка, Кыштым, Аша.</p>
    `,
    schemaAnswer:
      "Мы работаем по всей Челябинской области, включая Челябинск, Магнитогорск, Златоуст, Миасс, Копейск, Сатка, Кыштым, Ашу и соседние города.",
  },
  {
    question: "Какая толщина пленки у ваших мягких окон?",
    answer:
      "ПВХ-пленка имеет толщину от 0.5 мм до 1.2 мм в зависимости от проекта и климатических условий.",
  },
];

export const FAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.schemaAnswer || faq.answer.replace(/<[^>]*>?/gm, ""),
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как устанавливаются мягкие окна",
    step: [
      { "@type": "HowToStep", text: "Заявка — свяжитесь с нами удобным способом" },
      { "@type": "HowToStep", text: "Замер — специалист приедет и рассчитает точную стоимость" },
      { "@type": "HowToStep", text: "Производство — изготавливаем окна по вашим размерам" },
      { "@type": "HowToStep", text: "Монтаж — аккуратно устанавливаем за 1-2 дня без мусора" },
      { "@type": "HowToStep", text: "Гарантия — остаёмся на связи для поддержки" },
    ],
    estimatedCost: { "@type": "MonetaryAmount", currency: "RUB", value: "от 1200 ₽/м²" },
    totalTime: "P2D",
    supply: "ПВХ-панели, каркас, монтажные материалы",
    tool: "Специализированный монтажный инструмент",
    stepCount: 5,
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Прозрачный комфорт",
    url: "https://xn----7sbujgmdfgbbmci4a3a8b8d.xn--p1ai/",
    logo: "https://xn----7sbujgmdfgbbmci4a3a8b8d.xn--p1ai/favicon.svg",
    sameAs: [
      "https://vk.com/transparentcomfort",
      "https://telegram.me/transparentcomfort",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+73510000000",
      contactType: "customer service",
      areaServed: [
        "RU-CHE", // Челябинск
        "RU-CHE-MG", // Магнитогорск
        "RU-CHE-ZL", // Златоуст
        "RU-CHE-MI", // Миасс
        "RU-CHE-KO", // Копейск
        "RU-CHE-SA", // Сатка
        "RU-CHE-KY", // Кыштым
        "RU-CHE-AS", // Аша
        "RU-CHE-CH", // Чебаркуль
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://xn----7sbujgmdfgbbmci4a3a8b8d.xn--p1ai/",
      },
    ],
  };

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

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="animate-fade-in-up"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger
                  className="text-left text-lg font-semibold hover:text-primary transition-colors"
                  onClick={() =>
                    trackGoal("FAQ_QUESTION_OPEN", {
                      question: faq.question,
                      index,
                    })
                  }
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground font-sans leading-relaxed space-y-3">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* JSON-LD для SEO / LLM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </section>
  );
};
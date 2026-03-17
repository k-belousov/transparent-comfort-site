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
      <p>Мы работаем в Челябинске и в радиусе 150 км от города. Это позволяет нам быстро выезжать на замеры и монтаж без завышенных цен за выезд.</p>
      <br/>
      <strong>Районы Челябинска:</strong><br/>
      <ul class="list-disc pl-5 space-y-1">
        <li>Калининский район</li>
        <li>Ленинский район</li>
        <li>Центральный район</li>
        <li>Металлургический район</li>
        <li>Советский район</li>
        <li>Тракторозаводский район</li>
        <li>Целиноградский район</li>
      </ul>
      <br/>
      <strong>Города Челябинской области (радиус 150 км):</strong><br/>
      <ul class="list-disc pl-5 space-y-1">
        <li>Златоуст</li>
        <li>Миасс</li>
        <li>Копейск</li>
        <li>Сатка</li>
        <li>Кыштым</li>
        <li>Чебаркуль</li>
        <li>Еманжелинск</li>
        <li>Долгодеревенское</li>
        <li>Троицк</li>
        <li>Южноуральск</li>
        <li>Коркино</li>
        <li>Еткуль</li>
        <li>Лазурный</li>
        <li>Первомайский</li>
        <li>Пласт</li>
      </ul>
      <br/>
      <p>Если ваш город не в списке — все равно пишите или звоните! Иногда выезжаем и дальше, особенно на крупные объекты.</p>
    `,
    schemaAnswer:
      "Мы работаем в Челябинске и в радиусе 150 км: Златоуст, Миасс, Копейск, Сатка, Кыштым, Чебаркуль, Еманжелинск, Долгодеревенское, Троицк, Южноуральск, Коркино, Еткуль, Лазурный, Первомайский, Пласт и другие города области.",
  },
  {
    question: "Какая толщина ПВХ-пленки у ваших мягких окон?",
    answer:
      "Мы используем пленку разной толщины в зависимости от требований проекта:<br/><br/>" +
      "<strong>• 0.5 мм</strong> — для легких конструкций, внутренних перегородок, временных установок<br/>" +
      "<strong>• 0.7 мм</strong> — оптимальный вариант для большинства террас и веранд (цена/качество)<br/>" +
      "<strong>• 0.9 мм</strong> — для повышенной прочности, коммерческих объектов с высокой проходимостью<br/>" +
      "<strong>• 1.2 мм</strong> — максимальная прочность, сложные климатические условия, промышленные объекты<br/><br/>" +
      "Толщину подбираем индивидуально:<br/>" +
      "• Учитываем площадь конструкции<br/>" +
      "• Учитываем ветровые нагрузки (особенно для высотных зданий)<br/>" +
      "• Учитываем бюджет клиента<br/>" +
      "• Учитываем требования к тепло- и шумоизоляции<br/><br/>" +
      "При замере инженер рекомендует оптимальный вариант. Все материалы сертифицированы и имеют паспорта.",
  },
  {
    question: "Как ухаживать за мягкими окнами и как часто их нужно мыть?",
    answer:
      "Уход за мягкими окнами простой и не требует специальных средств:<br/><br/>" +
      "<strong>Регулярная чистка:</strong><br/>" +
      "• Раз в 1-2 месяца — мягкая губка или швабра с мягкой щетиной<br/>" +
      "• Используйте обычное мыльное решение или специальные средства для ПВХ<br/>" +
      "• Избегайте абразивов, жестких щеток, растворителей, ацетона<br/>" +
      "• Не используйте острые предметы для соскребания загрязнений<br/><br/>" +
      "<strong>Осенне-зимний период:</strong><br/>" +
      "• Убирайте снег с помощью мягкой щетки или швабры<br/>" +
      "• Не ударяйте по пленке лопатой или металлическими инструментами<br/>" +
      "• Снег можно сбрасывать снизу, аккуратно постукивая по каркасу<br/><br/>" +
      "<strong>Весенне-летний период:</strong><br/>" +
      "• Промывайте от пыли, птичий помет, следы насекомых<br/>" +
      "• После дождя окна часто самоочищаются<br/><br/>" +
      "<strong>Важно:</strong><br/>" +
      "• Не используйте мойки высокого давления ближе 50 см<br/>" +
      "• Не прикладывайте усилия к замерзшей пленке<br/>" +
      "• При серьезных повреждениях — обращайтесь по гарантии<br/><br/>" +
      "При правильном уходе мягкие окна сохраняют прозрачность и внешний вид на весь срок службы.",
  },
  {
    question: "Можно ли демонтировать и переустановить мягкие окна?",
    answer:
      "Да, это одно из ключевых преимуществ! Мягкие окна можно:<br/><br/>" +
      "<strong>1. Демонтировать полностью</strong><br/>" +
      "• Открутить крепления<br/>" +
      "• Аккуратно снять пленку с каркаса<br/>" +
      "• Пленку можно сложить и убрать на хранение на лето<br/><br/>" +
      "<strong>2. Переместить в другое место</strong><br/>" +
      "• Если конструкция стандартная — подойдет на другом объекте<br/>" +
      "• Пленка не теряет свойств при демонтаже<br/><br/>" +
      "<strong>3. Изменить размеры</strong><br/>" +
      "• При переезде или ремонте можно подогнать под новые размеры<br/>" +
      "• Профессионалы перекроят и переустановят<br/><br/>" +
      "<strong>Важно:</strong><br/>" +
      "• При демонтаже не повредите пленку и крепления<br/>" +
      "• Сохраните крепежные элементы<br/>" +
      "• При повторном монтаже лучше вызвать мастера — он проверит состояние материалов и правильно установит<br/><br/>" +
      "Это удобно для сезонных кафе, которые работают только летом, или для тех, кто переезжает.",
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
      telephone: "+73512222222",
      contactType: "customer service",
      areaServed: [
        "RU-CHE", // Челябинск
        "RU-CHE-ZL", // Златоуст
        "RU-CHE-MI", // Миасс
        "RU-CHE-KO", // Копейск
        "RU-CHE-SA", // Сатка
        "RU-CHE-KY", // Кыштым
        "RU-CHE-CH", // Чебаркуль
        "RU-CHE-EM", // Еманжелинск
        "RU-CHE-DO", // Долгодеревенское
        "RU-CHE-TR", // Троицк
        "RU-CHE-YU", // Южноуральск
        "RU-CHE-KR", // Коркино
        "RU-CHE-ET", // Еткуль
        "RU-CHE-LA", // Лазурный
        "RU-CHE-PE", // Первомайский
        "RU-CHE-PL", // Пласт
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
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Calculator } from "@/components/Calculator";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { useEffect } from "react";

// SEO мета-данные для каждого раздела
const seoMetadata = {
  default: {
    title: "Прозрачный комфорт — Мягкие окна премиум-класса в Челябинске",
    description: "Мягкие окна премиум-класса для террас, кафе и загородных домов. 9 лет опыта, гарантия 7 лет. Работаем в Челябинске и области."
  },
  about: {
    title: "О компании — Прозрачный комфорт",
    description: "Компания Прозрачный комфорт — 9 лет опыта в установке мягких окон. Надёжность, качество и индивидуальный подход."
  },
  products: {
    title: "Наши решения — Мягкие окна для террас, кафе, беседок",
    description: "Профессиональные мягкие окна для частных домов, кафе, беседок, защитные ПВХ пленки и чехлы на заказ. Цены от 500 ₽/м²."
  },
  benefits: {
    title: "Почему выбирают нас — Преимущества мягких окон",
    description: "Материалы высокого качества, монтаж за 1-2 дня, гарантия. Узнайте, почему более 3000 клиентов доверяют Прозрачному комфорту."
  },
  process: {
    title: "Как всё происходит — Процесс установки мягких окон",
    description: "Прозрачный процесс от заявки до установки: замер, производство, монтаж за 1-2 дня."
  },
  calculator: {
    title: "Калькулятор стоимости мягких окон",
    description: "Рассчитайте предварительную стоимость мягких окон за 1 минуту. Укажите тип, размеры и материал для быстрого расчета."
  },
  gallery: {
    title: "Наши работы — Галерея реализованных проектов",
    description: "Более 3000 выполненных проектов. Фотографии установленных мягких окон для частных домов, кафе, беседок."
  },
  reviews: {
    title: "Отзывы клиентов — Прозрачный комфорт",
    description: "Честные отзывы наших клиентов. Более 3000 довольных клиентов доверяют нам."
  },
  faq: {
    title: "Частые вопросы о мягких окнах",
    description: "Ответы на популярные вопросы: стоимость, монтаж, гарантия, уход, сравнение со стеклопакетами. Всё о мягких окнах."
  },
  contact: {
    title: "Контакты — Прозрачный комфорт",
    description: "Свяжитесь с нами: телефон, WhatsApp, email. Работаем по Челябинску и области."
  }
};

const Index = () => {
  // Динамическое обновление title/description при изменении хэша URL
  useEffect(() => {
    const updateSEO = () => {
      const hash = window.location.hash.replace('#', '') || 'default';
      const metadata = seoMetadata[hash as keyof typeof seoMetadata] || seoMetadata.default;
      
      // Устанавливаем title
      document.title = metadata.title;
      
      // Обновляем meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description);
      }
    };

    // Обновляем при загрузке и при изменении хэша
    updateSEO();
    
    // Используем popstate для отслеживания изменений хэша
    window.addEventListener('popstate', updateSEO);
    window.addEventListener('hashchange', updateSEO);
    
    return () => {
      window.removeEventListener('popstate', updateSEO);
      window.removeEventListener('hashchange', updateSEO);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Skip link для доступности */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-white px-4 py-2 rounded-md">
        Перейти к основному содержанию
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="products">
          <Products />
        </div>
        <div id="benefits">
          <Benefits />
        </div>
        <div id="process">
          <Process />
        </div>
        <div id="calculator">
          <Calculator />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="reviews">
          <Reviews />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Contact />
    </div>
  );
};

// Определяем тип для глобального объекта window с дополнительным свойством debugComponents
declare global {
  interface Window {
    debugComponents?: Record<string, unknown>;
  }
}

// Экспортируем компоненты для доступа из консоли (для отладки)
if (typeof window !== 'undefined') {
  (window as Window).debugComponents = {
    Header,
    Hero,
    About,
    Products,
    Benefits,
    Process,
    Calculator,
    Gallery,
    Reviews,
    FAQ,
    Contact
  };
}

export default Index;

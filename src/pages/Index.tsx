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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
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

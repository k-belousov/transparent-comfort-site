import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronUp } from "lucide-react";
import logo from "@/assets/logo.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Показываем шапку только при скролле, скрываем в самом верху
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navigation = [
    { name: "О нас", href: "about" },
    { name: "Услуги", href: "products" },
    { name: "Преимущества", href: "benefits" },
    { name: "Процесс", href: "process" },
    { name: "Калькулятор", href: "calculator" },
    { name: "Галерея", href: "gallery" },
    { name: "Отзывы", href: "reviews" },
    { name: "FAQ", href: "faq" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Прозрачный комфорт - мягкие окна премиум-класса" className="h-8 w-auto sm:h-10" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8" role="navigation" aria-label="Основная навигация">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm xl:text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-1"
                  aria-label={`Перейти к разделу ${item.name}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button
                onClick={() => scrollToSection("calculator")}
                className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl text-sm xl:text-base px-3 xl:px-6 py-2 xl:py-2.5 premium-button shimmer-effect relative overflow-hidden group"
              >
                <span className="relative z-10 hidden sm:inline">Рассчитать</span>
                <span className="relative z-10 sm:hidden">Цена</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-accent/20 transition-all duration-300 h-9 w-9 xl:h-10 xl:w-10"
                onClick={() => window.open("tel:+73510000000")}
              >
                <Phone className="w-3 h-3 xl:w-4 xl:h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center justify-center space-x-3 py-2 border-t border-border/50" role="navigation" aria-label="Навигация для планшетов">
            {navigation.slice(0, 5).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
                aria-label={`Перейти к разделу ${item.name}`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation - Full Screen */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden fixed inset-0 z-[100] bg-background/98 backdrop-blur-md flex flex-col" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50">
              <img src={logo} alt="Прозрачный комфорт - мягкие окна премиум-класса" className="h-8 w-auto" />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Mobile Navigation Content */}
            <div className="flex-1 overflow-y-auto py-8">
              <div className="container mx-auto px-6">
                <h2 id="mobile-menu-title" className="sr-only">Мобильное меню навигации</h2>
                <nav className="flex flex-col space-y-4" role="navigation" aria-label="Мобильная навигация">
                  {navigation.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-all duration-300 text-left py-4 px-4 rounded-lg hover:bg-accent/10 hover:scale-[1.02] transform"
                      style={{ animationDelay: `${index * 50}ms` }}
                      aria-label={`Перейти к разделу ${item.name}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 space-y-4 pt-8 border-t border-border/30">
                  <Button
                    onClick={() => scrollToSection("calculator")}
                    className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl text-lg py-4 premium-button shimmer-effect relative overflow-hidden group"
                  >
                    <span className="relative z-10">Рассчитать стоимость</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-accent/20 transition-all duration-300 text-lg py-4"
                    onClick={() => window.open("tel:+73510000000")}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Кнопка "Наверх" */}
      {lastScrollY > 500 && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-40 bg-accent hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl h-12 w-12 rounded-full"
          aria-label="Наверх страницы"
          title="Вернуться наверх"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};
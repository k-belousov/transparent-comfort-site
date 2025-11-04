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
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="Прозрачный комфорт" className="h-8 w-auto sm:h-10" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm xl:text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-1"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button
                onClick={() => scrollToSection("calculator")}
                className="bg-accent hover:bg-primary transition-all duration-300 text-sm xl:text-base px-3 xl:px-6 py-2 xl:py-2.5"
              >
                <span className="hidden sm:inline">Рассчитать</span>
                <span className="sm:hidden">Цена</span>
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
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center justify-center space-x-3 py-2 border-t border-border/50">
            {navigation.slice(0, 5).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors text-left py-3 border-b border-border/30"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  <Button
                    onClick={() => scrollToSection("calculator")}
                    className="w-full bg-accent hover:bg-primary transition-all duration-300 text-lg py-3"
                  >
                    Рассчитать стоимость
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-accent/20 transition-all duration-300 text-lg py-3"
                    onClick={() => window.open("tel:+73510000000")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </Button>
                </div>
              </nav>
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
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};
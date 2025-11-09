import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronUp, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [needsScroll, setNeedsScroll] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null);

  // Блокируем прокрутку body когда открыто мобильное меню, предотвращая "скачок" сайта
  useEffect(() => {
    if (isMenuOpen) {
      // Сохраняем текущую ширину скролла, чтобы избежать "скачка"
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, [isMenuOpen]);

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

  // Логирование размера экрана для диагностики
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      
      // Определяем тип устройства с учетом особенностей iPad Air
      let deviceType = 'mobile';
      if (width >= 1024) deviceType = 'desktop';
      else if (width >= 768) {
        // Дополнительная проверка для iPad Air и других планшетов с высоким разрешением
        const isPortrait = height > width;
        const isLargeTablet = width >= 820 && height >= 1100; // iPad Air и другие большие планшеты
        const isSmallTablet = width >= 768 && width < 1024 && height < 900; // Маленькие планшеты
        
        if (isLargeTablet || isSmallTablet) {
          deviceType = 'tablet';
        } else if (width >= 768 && width < 1024) {
          // Для пограничных случаев используем соотношение сторон
          const aspectRatio = width / height;
          if (aspectRatio < 1.0) { // Портретная ориентация
            deviceType = 'tablet';
          }
        }
      }
      
      console.log(`Screen size: ${width}x${height}, Device type: ${deviceType}, Aspect ratio: ${width/height}`);
      
      // Дополнительная диагностика для скролла
      if (isMenuOpen) {
        console.log(`Menu open - Device: ${deviceType}, Height: ${height}, Menu height: ${deviceType === 'tablet' ? 'dynamic' : 'calc(100vh - 4rem)'}`);
        
        // Проверяем, нужно ли добавлять скролл
        const menuElement = document.getElementById('mobile-menu');
        if (menuElement) {
          const menuHeight = menuElement.scrollHeight;
          const availableHeight = deviceType === 'tablet' ? height * 0.7 : height - 64; // 64px = 4rem
          console.log(`Menu scroll height: ${menuHeight}px, Available height: ${availableHeight}px, Needs scroll: ${menuHeight > availableHeight}`);
        }
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [isMenuOpen]);

  // Проверяем, нужен ли скролл для меню
  useEffect(() => {
    if (isMenuOpen && menuContentRef.current) {
      const checkScroll = () => {
        if (menuContentRef.current) {
          const contentHeight = menuContentRef.current.scrollHeight;
          const containerHeight = menuContentRef.current.clientHeight;
          const scrollTop = menuContentRef.current.scrollTop;
          // Показываем индикатор, если есть контент ниже видимой области
          const hasScrollableContent = contentHeight > containerHeight;
          // Скрываем индикатор, если пользователь доскроллил до конца
          const isAtBottom = scrollTop + containerHeight >= contentHeight - 10; // 10px погрешность
          setNeedsScroll(hasScrollableContent && !isAtBottom);
          console.log(`Menu scroll check: content=${contentHeight}px, container=${containerHeight}px, scrollTop=${scrollTop}px, needsScroll=${hasScrollableContent && !isAtBottom}`);
        }
      };

      // Небольшая задержка, чтобы DOM успел обновиться
      const timeoutId = setTimeout(checkScroll, 100);
      
      // Добавляем listener для resize и scroll
      window.addEventListener('resize', checkScroll);
      if (menuContentRef.current) {
        menuContentRef.current.addEventListener('scroll', checkScroll);
      }
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', checkScroll);
        if (menuContentRef.current) {
          menuContentRef.current.removeEventListener('scroll', checkScroll);
        }
      };
    }
  }, [isMenuOpen, screenSize]);


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
        className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50 transition-transform duration-300 ${
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
            <nav className="hidden md:hidden lg:flex items-center space-x-4 xl:space-x-8" role="navigation" aria-label="Основная навигация">
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
            <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
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
              className="md:flex lg:hidden h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Tablet Navigation */}
          <nav className="hidden" role="navigation" aria-label="Навигация для планшетов">
            {navigation.slice(0, 4).map((item) => (
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

        {/* Mobile Navigation - Full Screen for Mobile, Corner Menu for Tablet */}
        {isMenuOpen && (
          <>
            {/* Overlay for tablet version - прозрачный оверлей для закрытия меню */}
            {screenSize.width >= 768 && screenSize.width < 1024 && (
              <div
                className="lg:hidden fixed inset-0 z-[998] bg-transparent"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
           
            {/* Mobile Menu Container */}
            <div
              id="mobile-menu"
              className={`lg:hidden fixed z-[999] flex-col shadow-2xl border border-border/50 ${
                screenSize.width >= 768 && screenSize.width < 1024
                  ? 'fixed top-16 right-4 bottom-4 left-auto w-[70%] max-w-md'
                  : 'fixed top-16 left-0 right-0 bottom-0 w-full'
              }`}
              style={{
                backgroundColor: '#f9f7f5',
                // Для планшетов: адаптивная высота в зависимости от размера экрана
                // Для маленьких планшетов (768-850px): 85vh
                // Для средних планшетов (850-1024px): 80vh  
                // Для мобильных: всегда calc(100vh - 4rem)
                height: screenSize.width >= 768 && screenSize.width < 1024 
                  ? (screenSize.width < 850 ? '85vh' : '80vh')
                  : 'calc(100vh - 4rem)',
                // Убираем maxHeight限制, чтобы скролл работал всегда
                maxHeight: 'none',
                // Добавляем специальные стили для обеспечения скролла на маленьких экранах
                overflow: 'hidden',
                position: 'fixed'
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              onClick={(e) => {
                // Предотвращаем закрытие при клике на само меню
                e.stopPropagation();
                console.log('Click on mobile menu content', e.target);
              }}
            >
              {/* Mobile Navigation Content - без внутренней шапки */}
              <div
                ref={menuContentRef}
                className={`${screenSize.width >= 768 && screenSize.width < 1024 ? 'overflow-y-auto flex flex-col' : 'flex-1 overflow-y-auto flex flex-col'} py-8 min-h-0`}
                style={{
                     // Убеждаемся, что скролл работает на всех устройствах
                     overflowY: 'auto',
                     // Для планшетов добавляем минимальную высоту для правильного отображения
                     minHeight: screenSize.width >= 768 && screenSize.width < 1024 ? '400px' : 'auto',
                     // Добавляем отступы для правильного отображения скролла
                     paddingBottom: screenSize.width >= 768 && screenSize.width < 1024 ? '2rem' : '0',
                     // Обеспечиваем правильную работу скролла на всех устройствах
                     WebkitOverflowScrolling: 'touch',
                     // Устанавливаем максимальную высоту для контейнера, адаптивно под размер планшета
                     maxHeight: screenSize.width >= 768 && screenSize.width < 1024 
                       ? (screenSize.width < 850 ? 'calc(85vh - 2rem)' : 'calc(80vh - 2rem)')
                       : 'calc(100vh - 6rem)',
                     // Добавляем fallback для очень маленьких экранов
                     height: screenSize.height < 500 ? 'calc(100vh - 4rem)' : 'auto'
                }}>
                <div className={`${screenSize.width >= 768 && screenSize.width < 1024 ? 'px-6' : 'container mx-auto px-6'}`}
                     style={{
                       // Убеждаемся, что контент привязан к фону
                       backgroundColor: 'transparent',
                       // Добавляем отступ снизу для планшетов, чтобы кнопки не прилипали к краю
                       paddingBottom: screenSize.width >= 768 && screenSize.width < 1024 ? '1rem' : '0'
                     }}>
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
                   
                  <div className="mt-8 space-y-4 pt-8 border-t border-border/30"
                       style={{
                          // Убеждаемся, что кнопки привязаны к фону
                          backgroundColor: 'transparent'
                        }}>
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
              
              {/* Индикатор скролла "Далее" как в Hero-секции */}
              {needsScroll && (
                <button
                  className="absolute bottom-4 right-4 z-[1000] flex flex-col items-center text-muted-foreground hover:text-primary transition-all duration-300 group"
                  onClick={() => {
                    // Плавно скроллим вниз
                    if (menuContentRef.current) {
                      menuContentRef.current.scrollBy({
                        top: 200,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  aria-label="Прокрутить вниз для просмотра большего контента"
                  title="Показать больше пунктов меню"
                >
                  <span className="text-sm font-medium group-hover:text-accent mb-1">Далее</span>
                  <div className="relative">
                    <ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm animate-pulse" />
                  </div>
                </button>
              )}
            </div>
          </>
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